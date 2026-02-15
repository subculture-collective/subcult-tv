package config

import (
	"fmt"
	"os"
	"strings"
)

// Config holds all application configuration.
type Config struct {
	Port         string
	DatabaseURL  string
	JWTSecret    string
	CORSOrigins  []string
	UmamiURL     string
}

// Load reads configuration from environment variables.
func Load() (*Config, error) {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		return nil, fmt.Errorf("DATABASE_URL is required")
	}

	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		return nil, fmt.Errorf("JWT_SECRET is required")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	corsRaw := os.Getenv("CORS_ORIGINS")
	var origins []string
	if corsRaw != "" {
		origins = strings.Split(corsRaw, ",")
		for i := range origins {
			origins[i] = strings.TrimSpace(origins[i])
		}
	} else {
		origins = []string{"http://localhost:5175"}
	}

	return &Config{
		Port:        port,
		DatabaseURL: dbURL,
		JWTSecret:   jwtSecret,
		CORSOrigins: origins,
		UmamiURL:    os.Getenv("UMAMI_URL"),
	}, nil
}
