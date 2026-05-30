package store

import (
	"context"
	"errors"

	"github.com/afriqx/server/internal/models"
	"github.com/jackc/pgx/v5"
)

// Indices returns the proprietary AFRIQX indices in display order.
func (s *Store) Indices(ctx context.Context) ([]models.MarketIndex, error) {
	rows, err := s.pool.Query(ctx,
		`SELECT symbol, name, value, change, series FROM indices ORDER BY ord`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []models.MarketIndex{}
	for rows.Next() {
		var m models.MarketIndex
		if err := rows.Scan(&m.Symbol, &m.Name, &m.Value, &m.Change, &m.Series); err != nil {
			return nil, err
		}
		out = append(out, m)
	}
	return out, rows.Err()
}

// Benchmark returns a single benchmark (e.g. AFXI).
func (s *Store) Benchmark(ctx context.Context, symbol string) (*models.Benchmark, error) {
	var b models.Benchmark
	err := s.pool.QueryRow(ctx,
		`SELECT symbol, name, value, change FROM benchmarks WHERE symbol = $1`, symbol).
		Scan(&b.Symbol, &b.Name, &b.Value, &b.Change)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, err
	}
	return &b, nil
}

// FxPairs returns the direct African currency pairs.
func (s *Store) FxPairs(ctx context.Context) ([]models.FxPair, error) {
	rows, err := s.pool.Query(ctx,
		`SELECT pair, name, rate, change FROM fx_pairs ORDER BY ord`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []models.FxPair{}
	for rows.Next() {
		var p models.FxPair
		if err := rows.Scan(&p.Pair, &p.Name, &p.Rate, &p.Change); err != nil {
			return nil, err
		}
		out = append(out, p)
	}
	return out, rows.Err()
}

// Equities returns listed African shares.
func (s *Store) Equities(ctx context.Context) ([]models.Equity, error) {
	rows, err := s.pool.Query(ctx,
		`SELECT symbol, name, exchange, sector, last, change, market_cap, volume, series
		 FROM equities ORDER BY ord`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []models.Equity{}
	for rows.Next() {
		var e models.Equity
		if err := rows.Scan(&e.Symbol, &e.Name, &e.Exchange, &e.Sector, &e.Last,
			&e.Change, &e.MarketCap, &e.Volume, &e.Series); err != nil {
			return nil, err
		}
		out = append(out, e)
	}
	return out, rows.Err()
}

// Commodities returns tracked commodity contracts.
func (s *Store) Commodities(ctx context.Context) ([]models.Commodity, error) {
	rows, err := s.pool.Query(ctx,
		`SELECT symbol, name, last, change, unit, series FROM commodities ORDER BY ord`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []models.Commodity{}
	for rows.Next() {
		var c models.Commodity
		if err := rows.Scan(&c.Symbol, &c.Name, &c.Last, &c.Change, &c.Unit, &c.Series); err != nil {
			return nil, err
		}
		out = append(out, c)
	}
	return out, rows.Err()
}

// Movers returns the top-gainer entries.
func (s *Store) Movers(ctx context.Context) ([]models.Mover, error) {
	rows, err := s.pool.Query(ctx,
		`SELECT symbol, name, price, change, series FROM movers ORDER BY ord`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []models.Mover{}
	for rows.Next() {
		var m models.Mover
		if err := rows.Scan(&m.Symbol, &m.Name, &m.Price, &m.Change, &m.Series); err != nil {
			return nil, err
		}
		out = append(out, m)
	}
	return out, rows.Err()
}

// FxHeatmap returns currency-strength buckets.
func (s *Store) FxHeatmap(ctx context.Context) (*models.FxHeatmap, error) {
	rows, err := s.pool.Query(ctx,
		`SELECT code, bucket, change FROM fx_heatmap ORDER BY ord`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	hm := &models.FxHeatmap{
		Strong:  []models.FxStrength{},
		Neutral: []models.FxStrength{},
		Weak:    []models.FxStrength{},
	}
	for rows.Next() {
		var code, bucket string
		var change float64
		if err := rows.Scan(&code, &bucket, &change); err != nil {
			return nil, err
		}
		fs := models.FxStrength{Code: code, Change: change}
		switch bucket {
		case "strong":
			hm.Strong = append(hm.Strong, fs)
		case "neutral":
			hm.Neutral = append(hm.Neutral, fs)
		case "weak":
			hm.Weak = append(hm.Weak, fs)
		}
	}
	return hm, rows.Err()
}

// Ticker returns the scrolling ticker items.
func (s *Store) Ticker(ctx context.Context) ([]models.TickerItem, error) {
	rows, err := s.pool.Query(ctx,
		`SELECT label, value, change FROM ticker ORDER BY ord`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []models.TickerItem{}
	for rows.Next() {
		var t models.TickerItem
		if err := rows.Scan(&t.Label, &t.Value, &t.Change); err != nil {
			return nil, err
		}
		out = append(out, t)
	}
	return out, rows.Err()
}

// ActivePair returns the headline dashboard instrument.
func (s *Store) ActivePair(ctx context.Context) (*models.ActivePair, error) {
	var p models.ActivePair
	err := s.pool.QueryRow(ctx,
		`SELECT pair, name, flag, price, change, change_abs, high_24h, low_24h, volume_24h
		 FROM active_pair WHERE id = 1`).
		Scan(&p.Pair, &p.Name, &p.Flag, &p.Price, &p.Change, &p.ChangeAbs,
			&p.High24h, &p.Low24h, &p.Volume24h)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, err
	}
	return &p, nil
}

// Candles returns the OHLC series for a pair, oldest first.
func (s *Store) Candles(ctx context.Context, pair string) ([]models.Candle, error) {
	rows, err := s.pool.Query(ctx,
		`SELECT i, open, high, low, close, volume FROM candles WHERE pair = $1 ORDER BY i`, pair)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	out := []models.Candle{}
	for rows.Next() {
		var c models.Candle
		if err := rows.Scan(&c.I, &c.Open, &c.High, &c.Low, &c.Close, &c.Volume); err != nil {
			return nil, err
		}
		out = append(out, c)
	}
	return out, rows.Err()
}
