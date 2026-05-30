package store

import (
	"context"
	"errors"

	"github.com/afriqx/server/internal/models"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
)

// CreateUser inserts a new user. Returns ErrDuplicate if the email is taken.
func (s *Store) CreateUser(ctx context.Context, u *models.User) error {
	_, err := s.pool.Exec(ctx, `
		INSERT INTO users (id, email, name, tier, password_hash)
		VALUES ($1, $2, $3, $4, $5)`,
		u.ID, u.Email, u.Name, u.Tier, u.PasswordHash)
	if err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) && pgErr.Code == "23505" {
			return ErrDuplicate
		}
		return err
	}
	return nil
}

// GetUserByEmail looks up a user by email. Returns ErrNotFound if absent.
func (s *Store) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
	return s.scanUser(ctx,
		`SELECT id, email, name, tier, password_hash, created_at FROM users WHERE email = $1`, email)
}

// GetUserByID looks up a user by id. Returns ErrNotFound if absent.
func (s *Store) GetUserByID(ctx context.Context, id string) (*models.User, error) {
	return s.scanUser(ctx,
		`SELECT id, email, name, tier, password_hash, created_at FROM users WHERE id = $1`, id)
}

func (s *Store) scanUser(ctx context.Context, query string, args ...any) (*models.User, error) {
	var u models.User
	err := s.pool.QueryRow(ctx, query, args...).
		Scan(&u.ID, &u.Email, &u.Name, &u.Tier, &u.PasswordHash, &u.CreatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, err
	}
	return &u, nil
}
