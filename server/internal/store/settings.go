package store

import (
	"context"
	"errors"

	"github.com/afriqx/server/internal/models"
	"github.com/jackc/pgx/v5"
)

// Settings returns a user's preferences, joining in name/email from the account.
func (s *Store) Settings(ctx context.Context, userID string) (*models.Settings, error) {
	var st models.Settings
	err := s.pool.QueryRow(ctx, `
		SELECT u.name, u.email, s.base_ccy, s.theme, s.two_fa, s.biometric,
		       s.price_alerts, s.order_fills, s.news_digest, s.ai_summary, s.compact, s.ticker
		FROM user_settings s
		JOIN users u ON u.id = s.user_id
		WHERE s.user_id = $1`, userID).
		Scan(&st.Name, &st.Email, &st.BaseCcy, &st.Theme, &st.TwoFa, &st.Biometric,
			&st.PriceAlerts, &st.OrderFills, &st.NewsDigest, &st.AiSummary, &st.Compact, &st.Ticker)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, err
	}
	return &st, nil
}

// UpdateSettings persists preference changes and the editable account name.
func (s *Store) UpdateSettings(ctx context.Context, userID string, st *models.Settings) error {
	tx, err := s.pool.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx) //nolint:errcheck // rolled back unless committed

	if _, err := tx.Exec(ctx,
		`UPDATE users SET name = $2 WHERE id = $1`, userID, st.Name); err != nil {
		return err
	}
	if _, err := tx.Exec(ctx, `
		UPDATE user_settings SET
			base_ccy = $2, theme = $3, two_fa = $4, biometric = $5,
			price_alerts = $6, order_fills = $7, news_digest = $8,
			ai_summary = $9, compact = $10, ticker = $11
		WHERE user_id = $1`,
		userID, st.BaseCcy, st.Theme, st.TwoFa, st.Biometric, st.PriceAlerts,
		st.OrderFills, st.NewsDigest, st.AiSummary, st.Compact, st.Ticker); err != nil {
		return err
	}
	return tx.Commit(ctx)
}
