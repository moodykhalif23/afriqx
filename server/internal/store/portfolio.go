package store

import (
	"context"
	"errors"

	"github.com/afriqx/server/internal/models"
	"github.com/jackc/pgx/v5"
)

// Portfolio returns the overview block (totals + allocation donut) for a user.
func (s *Store) Portfolio(ctx context.Context, userID string) (*models.Portfolio, error) {
	var p models.Portfolio
	err := s.pool.QueryRow(ctx,
		`SELECT total, change, change_abs FROM portfolio_summary WHERE user_id = $1`, userID).
		Scan(&p.Total, &p.Change, &p.ChangeAbs)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, err
	}

	rows, err := s.pool.Query(ctx,
		`SELECT label, value, pct, color FROM portfolio_allocations WHERE user_id = $1 ORDER BY ord`, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	p.Allocations = []models.Allocation{}
	for rows.Next() {
		var a models.Allocation
		if err := rows.Scan(&a.Label, &a.Value, &a.Pct, &a.Color); err != nil {
			return nil, err
		}
		p.Allocations = append(p.Allocations, a)
	}
	return &p, rows.Err()
}

// PortfolioSummary returns the headline stat cards for a user.
func (s *Store) PortfolioSummary(ctx context.Context, userID string) (*models.PortfolioSummary, error) {
	var ps models.PortfolioSummary
	err := s.pool.QueryRow(ctx, `
		SELECT total_value, day_change, day_change_abs, total_pnl, total_pnl_abs, buying_power, invested
		FROM portfolio_summary WHERE user_id = $1`, userID).
		Scan(&ps.TotalValue, &ps.DayChange, &ps.DayChangeAbs, &ps.TotalPnl,
			&ps.TotalPnlAbs, &ps.BuyingPower, &ps.Invested)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, err
	}
	return &ps, nil
}

// Positions returns a user's holdings in display order.
func (s *Store) Positions(ctx context.Context, userID string) ([]models.Position, error) {
	rows, err := s.pool.Query(ctx, `
		SELECT symbol, name, qty, avg_cost, last, value, pnl, pnl_abs, weight
		FROM positions WHERE user_id = $1 ORDER BY ord`, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []models.Position{}
	for rows.Next() {
		var p models.Position
		if err := rows.Scan(&p.Symbol, &p.Name, &p.Qty, &p.AvgCost, &p.Last,
			&p.Value, &p.Pnl, &p.PnlAbs, &p.Weight); err != nil {
			return nil, err
		}
		out = append(out, p)
	}
	return out, rows.Err()
}
