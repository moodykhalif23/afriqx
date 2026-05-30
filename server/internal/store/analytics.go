package store

import (
	"context"

	"github.com/afriqx/server/internal/models"
)

// Analytics returns the analytics view payload for a user.
func (s *Store) Analytics(ctx context.Context, userID string) (*models.Analytics, error) {
	a := &models.Analytics{
		Performance: []float64{},
		Stats:       []models.AnalyticsStat{},
		Sectors:     []models.SectorSlice{},
	}

	perfRows, err := s.pool.Query(ctx,
		`SELECT value FROM analytics_performance WHERE user_id = $1 ORDER BY ord`, userID)
	if err != nil {
		return nil, err
	}
	for perfRows.Next() {
		var v float64
		if err := perfRows.Scan(&v); err != nil {
			perfRows.Close()
			return nil, err
		}
		a.Performance = append(a.Performance, v)
	}
	perfRows.Close()
	if err := perfRows.Err(); err != nil {
		return nil, err
	}

	statRows, err := s.pool.Query(ctx,
		`SELECT label, value, change, sub FROM analytics_stats WHERE user_id = $1 ORDER BY ord`, userID)
	if err != nil {
		return nil, err
	}
	for statRows.Next() {
		var st models.AnalyticsStat
		if err := statRows.Scan(&st.Label, &st.Value, &st.Change, &st.Sub); err != nil {
			statRows.Close()
			return nil, err
		}
		a.Stats = append(a.Stats, st)
	}
	statRows.Close()
	if err := statRows.Err(); err != nil {
		return nil, err
	}

	secRows, err := s.pool.Query(ctx,
		`SELECT label, pct, color FROM analytics_sectors WHERE user_id = $1 ORDER BY ord`, userID)
	if err != nil {
		return nil, err
	}
	defer secRows.Close()
	for secRows.Next() {
		var sec models.SectorSlice
		if err := secRows.Scan(&sec.Label, &sec.Pct, &sec.Color); err != nil {
			return nil, err
		}
		a.Sectors = append(a.Sectors, sec)
	}
	return a, secRows.Err()
}
