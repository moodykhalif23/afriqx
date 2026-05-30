package main

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/afriqx/server/internal/auth"
	"github.com/afriqx/server/internal/config"
	"github.com/afriqx/server/internal/database"
	"github.com/afriqx/server/internal/httpapi"
	"github.com/afriqx/server/internal/market"
	"github.com/afriqx/server/internal/models"
	"github.com/afriqx/server/internal/seed"
	"github.com/afriqx/server/internal/store"
	"github.com/afriqx/server/internal/ws"
	"github.com/google/uuid"
)

func main() {
	logger := slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo}))
	slog.SetDefault(logger)

	if err := run(); err != nil {
		slog.Error("fatal", "err", err)
		os.Exit(1)
	}
}

func run() error {
	cfg, err := config.Load()
	if err != nil {
		return err
	}

	// Root context cancelled on SIGINT/SIGTERM for graceful shutdown.
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	pool, err := database.Connect(ctx, cfg.DatabaseURL)
	if err != nil {
		return err
	}
	defer pool.Close()
	slog.Info("connected to postgres")

	if err := database.Migrate(ctx, pool); err != nil {
		return err
	}
	slog.Info("migrations applied")

	if err := seed.EnsureMarketData(ctx, pool); err != nil {
		return err
	}
	slog.Info("market data seeded")

	st := store.New(pool)
	authn := auth.New(cfg.JWTSecret, cfg.JWTTTL)
	provision := func(ctx context.Context, userID string) error {
		return seed.ProvisionUser(ctx, pool, userID)
	}

	if err := seedDemoUser(ctx, st, authn, provision, cfg); err != nil {
		return err
	}

	// Live feed: hub + engine.
	hub := ws.NewHub()
	go hub.Run(ctx)

	engine := market.New(hub, cfg.TickInterval, time.Now().UnixNano())
	if err := engine.Load(ctx, st); err != nil {
		return err
	}
	go engine.Run(ctx)
	slog.Info("live market engine started", "interval", cfg.TickInterval.String())

	srv := httpapi.NewServer(st, authn, hub, cfg, provision)
	httpServer := &http.Server{
		Addr:              ":" + cfg.Port,
		Handler:           srv.Handler(),
		ReadHeaderTimeout: 10 * time.Second,
	}

	// Run the HTTP server until the context is cancelled.
	errCh := make(chan error, 1)
	go func() {
		slog.Info("http server listening", "addr", httpServer.Addr)
		if err := httpServer.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			errCh <- err
		}
	}()

	select {
	case err := <-errCh:
		return err
	case <-ctx.Done():
		slog.Info("shutdown signal received")
	}

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	return httpServer.Shutdown(shutdownCtx)
}

// seedDemoUser creates the configured demo account on first run and provisions
// its starter data. A blank email or password skips this entirely.
func seedDemoUser(
	ctx context.Context,
	st *store.Store,
	authn *auth.Authenticator,
	provision func(context.Context, string) error,
	cfg *config.Config,
) error {
	if cfg.SeedUserEmail == "" || cfg.SeedUserPassword == "" {
		return nil
	}
	if _, err := st.GetUserByEmail(ctx, cfg.SeedUserEmail); err == nil {
		return nil // already exists
	} else if !errors.Is(err, store.ErrNotFound) {
		return err
	}

	hash, err := authn.HashPassword(cfg.SeedUserPassword)
	if err != nil {
		return err
	}
	user := &models.User{
		ID:           uuid.NewString(),
		Email:        cfg.SeedUserEmail,
		Name:         cfg.SeedUserName,
		Tier:         "Pro Trader",
		PasswordHash: hash,
	}
	if err := st.CreateUser(ctx, user); err != nil {
		return err
	}
	if err := provision(ctx, user.ID); err != nil {
		return err
	}
	slog.Info("demo user seeded", "email", cfg.SeedUserEmail)
	return nil
}
