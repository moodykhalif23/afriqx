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

	cfg := &Config{
		Port:             getenv("PORT", "8080"),
		CORSOrigins:      splitCSV(getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:4173")),
		DatabaseURL:      getenv("DATABASE_URL", "postgres://afriqx:afriqx@localhost:5432/afriqx?sslmode=disable"),
		JWTSecret:        getenv("JWT_SECRET", "dev-secret-change-me-in-production"),
		JWTTTL:           jwtTTL,
		TickInterval:     tick,
		SeedUserEmail:    getenv("SEED_USER_EMAIL", "amara@afriqx.africa"),
		SeedUserPassword: getenv("SEED_USER_PASSWORD", "afriqx123"),
		SeedUserName:     getenv("SEED_USER_NAME", "Amara Okafor"),
	}
	return cfg, nil
}

func getenv(key, fallback string) string {
	if v := strings.TrimSpace(os.Getenv(key)); v != "" {
		return v
	}
	return fallback
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
