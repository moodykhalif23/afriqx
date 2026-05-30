package store

import (
	"context"
	"errors"

	"github.com/afriqx/server/internal/models"
	"github.com/jackc/pgx/v5/pgconn"
)

// Watchlist returns a user's tracked instruments, joined with catalog data.
func (s *Store) Watchlist(ctx context.Context, userID string) ([]models.Holding, error) {
	rows, err := s.pool.Query(ctx, `
		SELECT c.symbol, c.name, c.price, c.change
		FROM user_watchlist w
		JOIN holdings_catalog c ON c.symbol = w.symbol
		WHERE w.user_id = $1
		ORDER BY c.ord`, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []models.Holding{}
	for rows.Next() {
		var h models.Holding
		if err := rows.Scan(&h.Symbol, &h.Name, &h.Price, &h.Change); err != nil {
			return nil, err
		}
		out = append(out, h)
	}
	return out, rows.Err()
}

// Catalog returns every instrument that can be added to a watchlist.
func (s *Store) Catalog(ctx context.Context) ([]models.Holding, error) {
	rows, err := s.pool.Query(ctx,
		`SELECT symbol, name, price, change FROM holdings_catalog ORDER BY ord`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []models.Holding{}
	for rows.Next() {
		var h models.Holding
		if err := rows.Scan(&h.Symbol, &h.Name, &h.Price, &h.Change); err != nil {
			return nil, err
		}
		out = append(out, h)
	}
	return out, rows.Err()
}

// AddToWatchlist adds an instrument. Returns ErrNotFound if the symbol is not
// in the catalog; a duplicate add is a no-op.
func (s *Store) AddToWatchlist(ctx context.Context, userID, symbol string) error {
	_, err := s.pool.Exec(ctx, `
		INSERT INTO user_watchlist (user_id, symbol) VALUES ($1, $2)
		ON CONFLICT (user_id, symbol) DO NOTHING`, userID, symbol)
	if err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) && pgErr.Code == "23503" { // foreign key violation
			return ErrNotFound
		}
		return err
	}
	return nil
}

// RemoveFromWatchlist removes an instrument. Returns ErrNotFound if absent.
func (s *Store) RemoveFromWatchlist(ctx context.Context, userID, symbol string) error {
	tag, err := s.pool.Exec(ctx,
		`DELETE FROM user_watchlist WHERE user_id = $1 AND symbol = $2`, userID, symbol)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return ErrNotFound
	}
	return nil
}
