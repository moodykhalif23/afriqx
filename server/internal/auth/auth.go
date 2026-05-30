// Package auth provides password hashing, JWT issuing/verification and the
// HTTP middleware that protects authenticated routes.
package auth

import (
	"context"
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type ctxKey int

const userIDKey ctxKey = iota

// ErrUnauthorized indicates a missing or invalid token.
var ErrUnauthorized = errors.New("unauthorized")

// Authenticator issues and verifies JWTs and hashes passwords.
type Authenticator struct {
	secret []byte
	ttl    time.Duration
}

// New creates an Authenticator with the given signing secret and token TTL.
func New(secret string, ttl time.Duration) *Authenticator {
	return &Authenticator{secret: []byte(secret), ttl: ttl}
}

// HashPassword returns a bcrypt hash of the plaintext password.
func (a *Authenticator) HashPassword(plain string) (string, error) {
	h, err := bcrypt.GenerateFromPassword([]byte(plain), bcrypt.DefaultCost)
	return string(h), err
}

// CheckPassword reports whether plain matches the stored bcrypt hash.
func (a *Authenticator) CheckPassword(hash, plain string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(plain)) == nil
}

// Issue creates a signed JWT for the given user id.
func (a *Authenticator) Issue(userID string) (string, time.Time, error) {
	exp := time.Now().Add(a.ttl)
	claims := jwt.RegisteredClaims{
		Subject:   userID,
		ExpiresAt: jwt.NewNumericDate(exp),
		IssuedAt:  jwt.NewNumericDate(time.Now()),
		Issuer:    "afriqx",
	}
	tok := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signed, err := tok.SignedString(a.secret)
	return signed, exp, err
}

// parse validates a token string and returns the subject (user id).
func (a *Authenticator) parse(tokenStr string) (string, error) {
	claims := &jwt.RegisteredClaims{}
	tok, err := jwt.ParseWithClaims(tokenStr, claims, func(t *jwt.Token) (any, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, ErrUnauthorized
		}
		return a.secret, nil
	})
	if err != nil || !tok.Valid || claims.Subject == "" {
		return "", ErrUnauthorized
	}
	return claims.Subject, nil
}

// Middleware enforces a valid Bearer token and stores the user id in the
// request context. Requests without a valid token receive 401.
func (a *Authenticator) Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		header := r.Header.Get("Authorization")
		token, ok := strings.CutPrefix(header, "Bearer ")
		if !ok || strings.TrimSpace(token) == "" {
			http.Error(w, `{"error":"missing bearer token"}`, http.StatusUnauthorized)
			return
		}
		userID, err := a.parse(strings.TrimSpace(token))
		if err != nil {
			http.Error(w, `{"error":"invalid or expired token"}`, http.StatusUnauthorized)
			return
		}
		ctx := context.WithValue(r.Context(), userIDKey, userID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// UserID returns the authenticated user id from the request context.
func UserID(ctx context.Context) (string, bool) {
	id, ok := ctx.Value(userIDKey).(string)
	return id, ok && id != ""
}
