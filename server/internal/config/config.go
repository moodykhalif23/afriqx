package config

import (
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/joho/godotenv"
)

// Config holds all runtime settings for the API.
type Config struct {
	Port         string
	CORSOrigins  []string
	DatabaseURL  string
	JWTSecret    string
	JWTTTL       time.Duration
	TickInterval time.Duration

	SeedUserEmail    string
	SeedUserPassword string
	SeedUserName     string
}

// Load reads configuration from the environment (and a local .env if present).
// Secrets — DATABASE_URL and JWT_SECRET — have NO hardcoded defaults and must be
// supplied via the environment; missing ones are a startup error. Non-secret
// operational settings fall back to sensible defaults.
func Load() (*Config, error) {
	_ = godotenv.Load()

	jwtTTL, err := time.ParseDuration(getenv("JWT_TTL", "24h"))
	if err != nil {
		return nil, fmt.Errorf("invalid JWT_TTL: %w", err)
	}
	tick, err := time.ParseDuration(getenv("TICK_INTERVAL", "2s"))
	if err != nil {
		return nil, fmt.Errorf("invalid TICK_INTERVAL: %w", err)
	}

	databaseURL, err := requireEnv("DATABASE_URL")
	if err != nil {
		return nil, err
	}
	jwtSecret, err := requireEnv("JWT_SECRET")
	if err != nil {
		return nil, err
	}

	cfg := &Config{
		Port:             getenv("PORT", "8080"),
		CORSOrigins:      splitCSV(getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:4173")),
		DatabaseURL:      databaseURL,
		JWTSecret:        jwtSecret,
		JWTTTL:           jwtTTL,
		TickInterval:     tick,
		SeedUserEmail:    strings.TrimSpace(os.Getenv("SEED_USER_EMAIL")),
		SeedUserPassword: os.Getenv("SEED_USER_PASSWORD"),
		SeedUserName:     getenv("SEED_USER_NAME", "Demo User"),
	}
	return cfg, nil
}

func getenv(key, fallback string) string {
	if v := strings.TrimSpace(os.Getenv(key)); v != "" {
		return v
	}
	return fallback
}

// requireEnv returns a non-empty environment value or an actionable error.
func requireEnv(key string) (string, error) {
	if v := strings.TrimSpace(os.Getenv(key)); v != "" {
		return v, nil
	}
	return "", fmt.Errorf("%s is required — set it in server/.env (see .env.example)", key)
}

func splitCSV(s string) []string {
	parts := strings.Split(s, ",")
	out := make([]string, 0, len(parts))
	for _, p := range parts {
		if t := strings.TrimSpace(p); t != "" {
			out = append(out, t)
		}
	}
	return out
}
