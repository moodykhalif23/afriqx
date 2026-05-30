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

	port, err := requireEnv("PORT")
	if err != nil {
		return nil, err
	}
	corsRaw, err := requireEnv("CORS_ORIGINS")
	if err != nil {
		return nil, err
	}
	databaseURL, err := requireEnv("DATABASE_URL")
	if err != nil {
		return nil, err
	}
	jwtSecret, err := requireEnv("JWT_SECRET")
	if err != nil {
		return nil, err
	}
	jwtTTLRaw, err := requireEnv("JWT_TTL")
	if err != nil {
		return nil, err
	}
	tickRaw, err := requireEnv("TICK_INTERVAL")
	if err != nil {
		return nil, err
	}

	jwtTTL, err := time.ParseDuration(jwtTTLRaw)
	if err != nil {
		return nil, fmt.Errorf("invalid JWT_TTL: %w", err)
	}
	tick, err := time.ParseDuration(tickRaw)
	if err != nil {
		return nil, fmt.Errorf("invalid TICK_INTERVAL: %w", err)
	}

	return &Config{
		Port:             port,
		CORSOrigins:      splitCSV(corsRaw),
		DatabaseURL:      databaseURL,
		JWTSecret:        jwtSecret,
		JWTTTL:           jwtTTL,
		TickInterval:     tick,
		SeedUserEmail:    strings.TrimSpace(os.Getenv("SEED_USER_EMAIL")),
		SeedUserPassword: os.Getenv("SEED_USER_PASSWORD"),
		SeedUserName:     strings.TrimSpace(os.Getenv("SEED_USER_NAME")),
	}, nil
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
