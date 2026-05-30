package store

import (
	"context"

	"github.com/afriqx/server/internal/models"
)

// ExploreProducts returns the AFX Explore product cards.
func (s *Store) ExploreProducts(ctx context.Context) ([]models.ExploreProduct, error) {
	rows, err := s.pool.Query(ctx,
		`SELECT name, tagline, icon, badge FROM explore_products ORDER BY ord`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []models.ExploreProduct{}
	for rows.Next() {
		var p models.ExploreProduct
		if err := rows.Scan(&p.Name, &p.Tagline, &p.Icon, &p.Badge); err != nil {
			return nil, err
		}
		out = append(out, p)
	}
	return out, rows.Err()
}

// ExploreLayers returns the exchange-architecture layers.
func (s *Store) ExploreLayers(ctx context.Context) ([]models.ExploreLayer, error) {
	rows, err := s.pool.Query(ctx,
		`SELECT n, title, descr FROM explore_layers ORDER BY ord`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []models.ExploreLayer{}
	for rows.Next() {
		var l models.ExploreLayer
		if err := rows.Scan(&l.N, &l.Title, &l.Desc); err != nil {
			return nil, err
		}
		out = append(out, l)
	}
	return out, rows.Err()
}
