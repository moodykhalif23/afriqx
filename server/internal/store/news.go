package store

import (
	"context"

	"github.com/afriqx/server/internal/models"
)

// NewsFeed returns the news headline feed.
func (s *Store) NewsFeed(ctx context.Context) ([]models.NewsItem, error) {
	rows, err := s.pool.Query(ctx,
		`SELECT title, category, time FROM news_feed ORDER BY ord`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []models.NewsItem{}
	for rows.Next() {
		var n models.NewsItem
		if err := rows.Scan(&n.Title, &n.Category, &n.Time); err != nil {
			return nil, err
		}
		out = append(out, n)
	}
	return out, rows.Err()
}

// NewsFeatured returns the featured stories with excerpts.
func (s *Store) NewsFeatured(ctx context.Context) ([]models.FeatureNews, error) {
	rows, err := s.pool.Query(ctx,
		`SELECT title, excerpt, category, time, accent FROM news_featured ORDER BY ord`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []models.FeatureNews{}
	for rows.Next() {
		var n models.FeatureNews
		if err := rows.Scan(&n.Title, &n.Excerpt, &n.Category, &n.Time, &n.Accent); err != nil {
			return nil, err
		}
		out = append(out, n)
	}
	return out, rows.Err()
}
