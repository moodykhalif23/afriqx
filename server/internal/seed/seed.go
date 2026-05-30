package seed

import (
	"context"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

func EnsureMarketData(ctx context.Context, pool *pgxpool.Pool) error {
	b := &pgx.Batch{}

	for i, r := range indices {
		b.Queue(`INSERT INTO indices (symbol, name, value, change, series, ord)
			VALUES ($1,$2,$3,$4,$5,$6)
			ON CONFLICT (symbol) DO UPDATE SET name=EXCLUDED.name, value=EXCLUDED.value,
				change=EXCLUDED.change, series=EXCLUDED.series, ord=EXCLUDED.ord`,
			r.symbol, r.name, r.value, r.change, r.series, i)
	}
	b.Queue(`INSERT INTO benchmarks (symbol, name, value, change) VALUES ($1,$2,$3,$4)
		ON CONFLICT (symbol) DO UPDATE SET name=EXCLUDED.name, value=EXCLUDED.value, change=EXCLUDED.change`,
		"AFXI", "African FX Index", 98.65, 0.72)

	for i, r := range fxPairs {
		b.Queue(`INSERT INTO fx_pairs (pair, name, rate, change, ord) VALUES ($1,$2,$3,$4,$5)
			ON CONFLICT (pair) DO UPDATE SET name=EXCLUDED.name, rate=EXCLUDED.rate,
				change=EXCLUDED.change, ord=EXCLUDED.ord`,
			r.pair, r.name, r.rate, r.change, i)
	}
	for i, r := range equities {
		b.Queue(`INSERT INTO equities (symbol, name, exchange, sector, last, change, market_cap, volume, series, ord)
			VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
			ON CONFLICT (symbol) DO UPDATE SET name=EXCLUDED.name, exchange=EXCLUDED.exchange,
				sector=EXCLUDED.sector, last=EXCLUDED.last, change=EXCLUDED.change,
				market_cap=EXCLUDED.market_cap, volume=EXCLUDED.volume, series=EXCLUDED.series, ord=EXCLUDED.ord`,
			r.symbol, r.name, r.exchange, r.sector, r.last, r.change, r.marketCap, r.volume, r.series, i)
	}
	for i, r := range commodities {
		b.Queue(`INSERT INTO commodities (symbol, name, last, change, unit, series, ord)
			VALUES ($1,$2,$3,$4,$5,$6,$7)
			ON CONFLICT (symbol) DO UPDATE SET name=EXCLUDED.name, last=EXCLUDED.last,
				change=EXCLUDED.change, unit=EXCLUDED.unit, series=EXCLUDED.series, ord=EXCLUDED.ord`,
			r.symbol, r.name, r.last, r.change, r.unit, r.series, i)
	}
	for i, r := range movers {
		b.Queue(`INSERT INTO movers (symbol, name, price, change, series, ord)
			VALUES ($1,$2,$3,$4,$5,$6)
			ON CONFLICT (symbol) DO UPDATE SET name=EXCLUDED.name, price=EXCLUDED.price,
				change=EXCLUDED.change, series=EXCLUDED.series, ord=EXCLUDED.ord`,
			r.symbol, r.name, r.price, r.change, r.series, i)
	}
	for i, r := range holdingsCatalog {
		b.Queue(`INSERT INTO holdings_catalog (symbol, name, price, change, ord)
			VALUES ($1,$2,$3,$4,$5)
			ON CONFLICT (symbol) DO UPDATE SET name=EXCLUDED.name, price=EXCLUDED.price,
				change=EXCLUDED.change, ord=EXCLUDED.ord`,
			r.symbol, r.name, r.price, r.change, i)
	}
	for i, r := range heatmap {
		b.Queue(`INSERT INTO fx_heatmap (code, bucket, change, ord) VALUES ($1,$2,$3,$4)
			ON CONFLICT (code) DO UPDATE SET bucket=EXCLUDED.bucket, change=EXCLUDED.change, ord=EXCLUDED.ord`,
			r.code, r.bucket, r.change, i)
	}
	for i, r := range ticker {
		b.Queue(`INSERT INTO ticker (label, value, change, ord) VALUES ($1,$2,$3,$4)
			ON CONFLICT (label) DO UPDATE SET value=EXCLUDED.value, change=EXCLUDED.change, ord=EXCLUDED.ord`,
			r.label, r.value, r.change, i)
	}

	b.Queue(`INSERT INTO active_pair (id, pair, name, flag, price, change, change_abs, high_24h, low_24h, volume_24h)
		VALUES (1,$1,$2,$3,$4,$5,$6,$7,$8,$9)
		ON CONFLICT (id) DO UPDATE SET pair=EXCLUDED.pair, name=EXCLUDED.name, flag=EXCLUDED.flag,
			price=EXCLUDED.price, change=EXCLUDED.change, change_abs=EXCLUDED.change_abs,
			high_24h=EXCLUDED.high_24h, low_24h=EXCLUDED.low_24h, volume_24h=EXCLUDED.volume_24h`,
		activePairName, "Nigerian Naira / Kenyan Shilling", "🇳🇬", 0.1524, 1.38, 0.0021, 0.1538, 0.1496, "₦45.62B")

	for _, c := range generateCandles(120, 0.1402, 0x4f51a3) {
		b.Queue(`INSERT INTO candles (pair, i, open, high, low, close, volume)
			VALUES ($1,$2,$3,$4,$5,$6,$7)
			ON CONFLICT (pair, i) DO UPDATE SET open=EXCLUDED.open, high=EXCLUDED.high,
				low=EXCLUDED.low, close=EXCLUDED.close, volume=EXCLUDED.volume`,
			activePairName, c.i, c.open, c.high, c.low, c.close_, c.volume)
	}

	// News & explore replace-in-place: clear then insert to keep ordering stable.
	b.Queue(`DELETE FROM news_feed`)
	for i, r := range newsFeed {
		b.Queue(`INSERT INTO news_feed (title, category, time, ord) VALUES ($1,$2,$3,$4)`,
			r.title, r.category, r.time, i)
	}
	b.Queue(`DELETE FROM news_featured`)
	for i, r := range newsFeatured {
		b.Queue(`INSERT INTO news_featured (title, excerpt, category, time, accent, ord) VALUES ($1,$2,$3,$4,$5,$6)`,
			r.title, r.excerpt, r.category, r.time, r.accent, i)
	}
	b.Queue(`DELETE FROM explore_products`)
	for i, r := range exploreProducts {
		b.Queue(`INSERT INTO explore_products (name, tagline, icon, badge, ord) VALUES ($1,$2,$3,$4,$5)`,
			r.name, r.tagline, r.icon, r.badge, i)
	}
	for i, r := range exploreLayers {
		b.Queue(`INSERT INTO explore_layers (n, title, descr, ord) VALUES ($1,$2,$3,$4)
			ON CONFLICT (n) DO UPDATE SET title=EXCLUDED.title, descr=EXCLUDED.descr, ord=EXCLUDED.ord`,
			r.n, r.title, r.desc, i)
	}

	return pool.SendBatch(ctx, b).Close()
}

// ProvisionUser seeds a new account with default settings, a starter portfolio,
// analytics and a default watchlist. Idempotent: existing rows are left intact.
func ProvisionUser(ctx context.Context, pool *pgxpool.Pool, userID string) error {
	b := &pgx.Batch{}

	b.Queue(`INSERT INTO user_settings (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING`, userID)

	for i, p := range positions {
		b.Queue(`INSERT INTO positions (user_id, symbol, name, qty, avg_cost, last, value, pnl, pnl_abs, weight, ord)
			VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
			ON CONFLICT (user_id, symbol) DO NOTHING`,
			userID, p.symbol, p.name, p.qty, p.avgCost, p.last, p.value, p.pnl, p.pnlAbs, p.weight, i)
	}

	ps := portfolioSummary
	b.Queue(`INSERT INTO portfolio_summary
			(user_id, total_value, day_change, day_change_abs, total_pnl, total_pnl_abs,
			 buying_power, invested, total, change, change_abs)
			VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
			ON CONFLICT (user_id) DO NOTHING`,
		userID, ps.totalValue, ps.dayChange, ps.dayChangeAbs, ps.totalPnl, ps.totalPnlAbs,
		ps.buyingPower, ps.invested, ps.total, ps.change, ps.changeAbs)

	for i, a := range allocations {
		b.Queue(`INSERT INTO portfolio_allocations (user_id, label, value, pct, color, ord)
			VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (user_id, label) DO NOTHING`,
			userID, a.label, a.value, a.pct, a.color, i)
	}

	for i, v := range performance {
		b.Queue(`INSERT INTO analytics_performance (user_id, ord, value) VALUES ($1,$2,$3)
			ON CONFLICT (user_id, ord) DO NOTHING`, userID, i, v)
	}
	for i, st := range analyticsStats {
		b.Queue(`INSERT INTO analytics_stats (user_id, ord, label, value, change, sub)
			VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (user_id, ord) DO NOTHING`,
			userID, i, st.label, st.value, st.change, st.sub)
	}
	for i, sec := range sectors {
		b.Queue(`INSERT INTO analytics_sectors (user_id, ord, label, pct, color)
			VALUES ($1,$2,$3,$4,$5) ON CONFLICT (user_id, ord) DO NOTHING`,
			userID, i, sec.label, sec.pct, sec.color)
	}

	for _, h := range holdingsCatalog {
		b.Queue(`INSERT INTO user_watchlist (user_id, symbol) VALUES ($1,$2)
			ON CONFLICT (user_id, symbol) DO NOTHING`, userID, h.symbol)
	}

	return pool.SendBatch(ctx, b).Close()
}
