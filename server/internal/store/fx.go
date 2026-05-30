package store

import (
	"context"
	"errors"
	"time"

	"github.com/afriqx/server/internal/models"
	"github.com/jackc/pgx/v5"
)

const conversionDateLayout = "2006-01-02 15:04"

// Currencies returns the tradable currencies in display order.
func (s *Store) Currencies(ctx context.Context) ([]models.Currency, error) {
	rows, err := s.pool.Query(ctx, `SELECT code, name FROM fx_rates ORDER BY ord`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []models.Currency{}
	for rows.Next() {
		var c models.Currency
		if err := rows.Scan(&c.Code, &c.Name); err != nil {
			return nil, err
		}
		out = append(out, c)
	}
	return out, rows.Err()
}

// kesPerUnit returns the KES value of one unit of the given currency.
// Returns ErrNotFound if the currency is unknown.
func (s *Store) kesPerUnit(ctx context.Context, code string) (float64, error) {
	var v float64
	err := s.pool.QueryRow(ctx, `SELECT kes_per_unit FROM fx_rates WHERE code = $1`, code).Scan(&v)
	if errors.Is(err, pgx.ErrNoRows) {
		return 0, ErrNotFound
	}
	return v, err
}

func (s *Store) FxRate(ctx context.Context, from, to string) (float64, error) {
	fromKes, err := s.kesPerUnit(ctx, from)
	if err != nil {
		return 0, err
	}
	toKes, err := s.kesPerUnit(ctx, to)
	if err != nil {
		return 0, err
	}
	if toKes == 0 {
		return 0, ErrInvalidState
	}
	return fromKes / toKes, nil
}

// ErrInsufficientFunds is returned when a conversion exceeds the source balance.
var ErrInsufficientFunds = errors.New("insufficient funds")

// Balances returns a user's per-currency cash balances in display order.
func (s *Store) Balances(ctx context.Context, userID string) ([]models.Balance, error) {
	rows, err := s.pool.Query(ctx, `
		SELECT b.currency, r.name, b.amount
		FROM cash_balances b
		JOIN fx_rates r ON r.code = b.currency
		WHERE b.user_id = $1
		ORDER BY r.ord`, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []models.Balance{}
	for rows.Next() {
		var b models.Balance
		if err := rows.Scan(&b.Currency, &b.Name, &b.Amount); err != nil {
			return nil, err
		}
		out = append(out, b)
	}
	return out, rows.Err()
}

// ConvertFunds atomically debits the source currency and credits the
// destination, then records the conversion. The caller supplies the id, rate
// and converted amount. Returns ErrInsufficientFunds if the source balance is
// too low (or absent).
func (s *Store) ConvertFunds(ctx context.Context, userID string, c *models.Conversion) error {
	tx, err := s.pool.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx) //nolint:errcheck // rolled back unless committed

	var bal float64
	err = tx.QueryRow(ctx,
		`SELECT amount FROM cash_balances WHERE user_id = $1 AND currency = $2 FOR UPDATE`,
		userID, c.From).Scan(&bal)
	if errors.Is(err, pgx.ErrNoRows) {
		return ErrInsufficientFunds
	}
	if err != nil {
		return err
	}
	if bal < c.Amount {
		return ErrInsufficientFunds
	}

	if _, err := tx.Exec(ctx,
		`UPDATE cash_balances SET amount = amount - $3 WHERE user_id = $1 AND currency = $2`,
		userID, c.From, c.Amount); err != nil {
		return err
	}
	if _, err := tx.Exec(ctx, `
		INSERT INTO cash_balances (user_id, currency, amount) VALUES ($1, $2, $3)
		ON CONFLICT (user_id, currency) DO UPDATE SET amount = cash_balances.amount + EXCLUDED.amount`,
		userID, c.To, c.Converted); err != nil {
		return err
	}

	var created time.Time
	if err := tx.QueryRow(ctx, `
		INSERT INTO conversions (id, user_id, from_ccy, to_ccy, amount, rate, converted)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING created_at`,
		c.ID, userID, c.From, c.To, c.Amount, c.Rate, c.Converted).Scan(&created); err != nil {
		return err
	}
	if err := tx.Commit(ctx); err != nil {
		return err
	}
	c.Date = created.Format(conversionDateLayout)
	return nil
}

// Conversions returns a user's conversion ledger, newest first.
func (s *Store) Conversions(ctx context.Context, userID string) ([]models.Conversion, error) {
	rows, err := s.pool.Query(ctx, `
		SELECT id, created_at, from_ccy, to_ccy, amount, rate, converted
		FROM conversions WHERE user_id = $1 ORDER BY created_at DESC`, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []models.Conversion{}
	for rows.Next() {
		var c models.Conversion
		var created time.Time
		if err := rows.Scan(&c.ID, &created, &c.From, &c.To, &c.Amount, &c.Rate, &c.Converted); err != nil {
			return nil, err
		}
		c.Date = created.Format(conversionDateLayout)
		out = append(out, c)
	}
	return out, rows.Err()
}
