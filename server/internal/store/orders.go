package store

import (
	"context"
	"errors"
	"time"

	"github.com/afriqx/server/internal/models"
	"github.com/jackc/pgx/v5"
)

const orderDateLayout = "2006-01-02 15:04"

// Orders returns a user's order ledger, newest first.
func (s *Store) Orders(ctx context.Context, userID string) ([]models.Order, error) {
	rows, err := s.pool.Query(ctx, `
		SELECT id, created_at, symbol, type, side, qty, price, status
		FROM orders WHERE user_id = $1 ORDER BY created_at DESC`, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []models.Order{}
	for rows.Next() {
		var o models.Order
		var created time.Time
		if err := rows.Scan(&o.ID, &created, &o.Symbol, &o.Type, &o.Side,
			&o.Qty, &o.Price, &o.Status); err != nil {
			return nil, err
		}
		o.Date = created.Format(orderDateLayout)
		out = append(out, o)
	}
	return out, rows.Err()
}

// CreateOrder inserts an order. The caller supplies the id, formatted qty/price
// and status; created_at defaults to now and is echoed back in o.Date.
func (s *Store) CreateOrder(ctx context.Context, userID string, o *models.Order) error {
	var created time.Time
	err := s.pool.QueryRow(ctx, `
		INSERT INTO orders (id, user_id, symbol, type, side, qty, price, status)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING created_at`,
		o.ID, userID, o.Symbol, o.Type, o.Side, o.Qty, o.Price, o.Status).
		Scan(&created)
	if err != nil {
		return err
	}
	o.Date = created.Format(orderDateLayout)
	return nil
}

// CancelOrder marks a pending order cancelled. Returns ErrNotFound if the order
// does not exist or is not owned by the user; ErrInvalidState if not pending.
func (s *Store) CancelOrder(ctx context.Context, userID, orderID string) (*models.Order, error) {
	tx, err := s.pool.Begin(ctx)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx) //nolint:errcheck // rolled back unless committed

	var status string
	err = tx.QueryRow(ctx,
		`SELECT status FROM orders WHERE id = $1 AND user_id = $2 FOR UPDATE`, orderID, userID).
		Scan(&status)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, err
	}
	if status != "Pending" {
		return nil, ErrInvalidState
	}

	var o models.Order
	var created time.Time
	err = tx.QueryRow(ctx, `
		UPDATE orders SET status = 'Cancelled' WHERE id = $1
		RETURNING id, created_at, symbol, type, side, qty, price, status`, orderID).
		Scan(&o.ID, &created, &o.Symbol, &o.Type, &o.Side, &o.Qty, &o.Price, &o.Status)
	if err != nil {
		return nil, err
	}
	if err := tx.Commit(ctx); err != nil {
		return nil, err
	}
	o.Date = created.Format(orderDateLayout)
	return &o, nil
}

// ErrInvalidState is returned when an operation is not valid for the current
// state of a record (e.g. cancelling an already-filled order).
var ErrInvalidState = errors.New("invalid state")
