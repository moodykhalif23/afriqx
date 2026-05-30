// Package httpapi wires the chi router, middleware and all HTTP handlers.
package httpapi

import (
	"context"
	"net/http"
	"time"

	"github.com/afriqx/server/internal/auth"
	"github.com/afriqx/server/internal/config"
	"github.com/afriqx/server/internal/store"
	"github.com/afriqx/server/internal/ws"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

// Server holds the dependencies shared by all handlers.
type Server struct {
	store     *store.Store
	auth      *auth.Authenticator
	hub       *ws.Hub
	cfg       *config.Config
	provision func(context.Context, string) error
}

// NewServer constructs a Server. provision seeds starter data for a new user.
func NewServer(
	st *store.Store,
	a *auth.Authenticator,
	hub *ws.Hub,
	cfg *config.Config,
	provision func(context.Context, string) error,
) *Server {
	return &Server{store: st, auth: a, hub: hub, cfg: cfg, provision: provision}
}

// Handler builds the fully-configured HTTP handler.
func (s *Server) Handler() http.Handler {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(30 * time.Second))
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   s.cfg.CORSOrigins,
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	r.Get("/healthz", s.handleHealth)

	r.Route("/api/v1", func(r chi.Router) {
		// --- Public auth
		r.Post("/auth/register", s.handleRegister)
		r.Post("/auth/login", s.handleLogin)

		// --- Public market data
		r.Route("/markets", func(r chi.Router) {
			r.Get("/indices", s.handleIndices)
			r.Get("/afxi", s.handleAFXI)
			r.Get("/fx", s.handleFx)
			r.Get("/fx/heatmap", s.handleFxHeatmap)
			r.Get("/equities", s.handleEquities)
			r.Get("/commodities", s.handleCommodities)
			r.Get("/movers", s.handleMovers)
			r.Get("/ticker", s.handleTicker)
			r.Get("/active-pair", s.handleActivePair)
			r.Get("/candles", s.handleCandles)
		})

		// --- Public news & explore
		r.Get("/news", s.handleNewsFeed)
		r.Get("/news/featured", s.handleNewsFeatured)
		r.Get("/explore/products", s.handleExploreProducts)
		r.Get("/explore/layers", s.handleExploreLayers)

		// --- Live feed (token optional; origin-checked)
		r.Get("/ws", s.handleWS)

		// --- Protected
		r.Group(func(r chi.Router) {
			r.Use(s.auth.Middleware)

			r.Get("/me", s.handleMe)

			r.Get("/watchlist", s.handleGetWatchlist)
			r.Get("/watchlist/catalog", s.handleGetCatalog)
			r.Post("/watchlist", s.handleAddWatchlist)
			r.Delete("/watchlist/{symbol}", s.handleRemoveWatchlist)

			r.Get("/portfolio", s.handleGetPortfolio)
			r.Get("/portfolio/summary", s.handleGetPortfolioSummary)
			r.Get("/portfolio/positions", s.handleGetPositions)

			r.Get("/orders", s.handleGetOrders)
			r.Post("/orders", s.handlePlaceOrder)
			r.Delete("/orders/{id}", s.handleCancelOrder)

			r.Get("/analytics", s.handleGetAnalytics)

			r.Get("/settings", s.handleGetSettings)
			r.Put("/settings", s.handleUpdateSettings)
		})
	})

	return r
}

func (s *Server) handleHealth(w http.ResponseWriter, r *http.Request) {
	if err := s.store.Pool().Ping(r.Context()); err != nil {
		writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status": "degraded", "db": "down"})
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

// mustUserID returns the authenticated user id; handlers behind the auth
// middleware can rely on it being present.
func mustUserID(r *http.Request) string {
	id, _ := auth.UserID(r.Context())
	return id
}
