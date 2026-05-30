// Package store is the data-access layer over Postgres. A single Store value
// exposes all repository methods, grouped by domain across the package files.
package store

import (
	"errors"

	"github.com/jackc/pgx/v5/pgxpool"
)

// ErrNotFound is returned when a requested row does not exist.
var ErrNotFound = errors.New("not found")

// ErrDuplicate is returned on a unique-constraint violation (e.g. email taken).
var ErrDuplicate = errors.New("duplicate")

// Store wraps the connection pool and provides all data-access methods.
type Store struct {
	pool *pgxpool.Pool
}

// New constructs a Store backed by the given pool.
func New(pool *pgxpool.Pool) *Store {
	return &Store{pool: pool}
}

// Pool exposes the underlying pool for advanced callers (e.g. health checks).
func (s *Store) Pool() *pgxpool.Pool { return s.pool }
