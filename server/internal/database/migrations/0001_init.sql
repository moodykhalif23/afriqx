-- AFRIQX backend schema.
-- Global market data has no owner; per-user data is keyed by user_id.

CREATE TABLE IF NOT EXISTS users (
    id            UUID PRIMARY KEY,
    email         TEXT NOT NULL UNIQUE,
    name          TEXT NOT NULL,
    tier          TEXT NOT NULL DEFAULT 'Trader',
    password_hash TEXT NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_settings (
    user_id      UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    base_ccy     TEXT NOT NULL DEFAULT 'KES',
    theme        TEXT NOT NULL DEFAULT 'AFRIQX Dark',
    two_fa       BOOLEAN NOT NULL DEFAULT true,
    biometric    BOOLEAN NOT NULL DEFAULT true,
    price_alerts BOOLEAN NOT NULL DEFAULT true,
    order_fills  BOOLEAN NOT NULL DEFAULT true,
    news_digest  BOOLEAN NOT NULL DEFAULT false,
    ai_summary   BOOLEAN NOT NULL DEFAULT true,
    compact      BOOLEAN NOT NULL DEFAULT true,
    ticker       BOOLEAN NOT NULL DEFAULT true
);

-- ---------------------------------------------------------------- Global market data

CREATE TABLE IF NOT EXISTS indices (
    symbol TEXT PRIMARY KEY,
    name   TEXT NOT NULL,
    value  DOUBLE PRECISION NOT NULL,
    change DOUBLE PRECISION NOT NULL,
    series DOUBLE PRECISION[] NOT NULL,
    ord    INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS benchmarks (
    symbol TEXT PRIMARY KEY,
    name   TEXT NOT NULL,
    value  DOUBLE PRECISION NOT NULL,
    change DOUBLE PRECISION NOT NULL
);

CREATE TABLE IF NOT EXISTS fx_pairs (
    pair   TEXT PRIMARY KEY,
    name   TEXT NOT NULL,
    rate   DOUBLE PRECISION NOT NULL,
    change DOUBLE PRECISION NOT NULL,
    ord    INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS equities (
    symbol     TEXT PRIMARY KEY,
    name       TEXT NOT NULL,
    exchange   TEXT NOT NULL,
    sector     TEXT NOT NULL,
    last       TEXT NOT NULL,
    change     DOUBLE PRECISION NOT NULL,
    market_cap TEXT NOT NULL,
    volume     TEXT NOT NULL,
    series     DOUBLE PRECISION[] NOT NULL,
    ord        INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS commodities (
    symbol TEXT PRIMARY KEY,
    name   TEXT NOT NULL,
    last   TEXT NOT NULL,
    change DOUBLE PRECISION NOT NULL,
    unit   TEXT NOT NULL,
    series DOUBLE PRECISION[] NOT NULL,
    ord    INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS movers (
    symbol TEXT PRIMARY KEY,
    name   TEXT NOT NULL,
    price  TEXT NOT NULL,
    change DOUBLE PRECISION NOT NULL,
    series DOUBLE PRECISION[] NOT NULL,
    ord    INT NOT NULL DEFAULT 0
);

-- Catalog of instruments available to add to a watchlist.
CREATE TABLE IF NOT EXISTS holdings_catalog (
    symbol TEXT PRIMARY KEY,
    name   TEXT NOT NULL,
    price  TEXT NOT NULL,
    change DOUBLE PRECISION NOT NULL,
    ord    INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS fx_heatmap (
    code   TEXT PRIMARY KEY,
    bucket TEXT NOT NULL CHECK (bucket IN ('strong', 'neutral', 'weak')),
    change DOUBLE PRECISION NOT NULL,
    ord    INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS ticker (
    label  TEXT PRIMARY KEY,
    value  TEXT NOT NULL,
    change DOUBLE PRECISION NOT NULL,
    ord    INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS active_pair (
    id         INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    pair       TEXT NOT NULL,
    name       TEXT NOT NULL,
    flag       TEXT NOT NULL,
    price      DOUBLE PRECISION NOT NULL,
    change     DOUBLE PRECISION NOT NULL,
    change_abs DOUBLE PRECISION NOT NULL,
    high_24h   DOUBLE PRECISION NOT NULL,
    low_24h    DOUBLE PRECISION NOT NULL,
    volume_24h TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS candles (
    pair   TEXT NOT NULL,
    i      INT NOT NULL,
    open   DOUBLE PRECISION NOT NULL,
    high   DOUBLE PRECISION NOT NULL,
    low    DOUBLE PRECISION NOT NULL,
    close  DOUBLE PRECISION NOT NULL,
    volume BIGINT NOT NULL,
    PRIMARY KEY (pair, i)
);

CREATE TABLE IF NOT EXISTS news_feed (
    id       SERIAL PRIMARY KEY,
    title    TEXT NOT NULL,
    category TEXT NOT NULL,
    time     TEXT NOT NULL,
    ord      INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS news_featured (
    id       SERIAL PRIMARY KEY,
    title    TEXT NOT NULL,
    excerpt  TEXT NOT NULL,
    category TEXT NOT NULL,
    time     TEXT NOT NULL,
    accent   TEXT NOT NULL,
    ord      INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS explore_products (
    id      SERIAL PRIMARY KEY,
    name    TEXT NOT NULL,
    tagline TEXT NOT NULL,
    icon    TEXT NOT NULL,
    badge   TEXT NOT NULL DEFAULT '',
    ord     INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS explore_layers (
    n     TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    descr TEXT NOT NULL,
    ord   INT NOT NULL DEFAULT 0
);

-- ---------------------------------------------------------------- Per-user data

CREATE TABLE IF NOT EXISTS user_watchlist (
    user_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    symbol   TEXT NOT NULL REFERENCES holdings_catalog(symbol) ON DELETE CASCADE,
    added_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, symbol)
);

CREATE TABLE IF NOT EXISTS positions (
    user_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    symbol   TEXT NOT NULL,
    name     TEXT NOT NULL,
    qty      TEXT NOT NULL,
    avg_cost TEXT NOT NULL,
    last     TEXT NOT NULL,
    value    TEXT NOT NULL,
    pnl      DOUBLE PRECISION NOT NULL,
    pnl_abs  TEXT NOT NULL,
    weight   DOUBLE PRECISION NOT NULL,
    ord      INT NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id, symbol)
);

CREATE TABLE IF NOT EXISTS portfolio_summary (
    user_id        UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    total_value    TEXT NOT NULL,
    day_change     DOUBLE PRECISION NOT NULL,
    day_change_abs TEXT NOT NULL,
    total_pnl      DOUBLE PRECISION NOT NULL,
    total_pnl_abs  TEXT NOT NULL,
    buying_power   TEXT NOT NULL,
    invested       TEXT NOT NULL,
    total          TEXT NOT NULL,
    change         DOUBLE PRECISION NOT NULL,
    change_abs     TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS portfolio_allocations (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    label   TEXT NOT NULL,
    value   TEXT NOT NULL,
    pct     DOUBLE PRECISION NOT NULL,
    color   TEXT NOT NULL,
    ord     INT NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id, label)
);

CREATE TABLE IF NOT EXISTS orders (
    id         UUID PRIMARY KEY,
    user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    symbol     TEXT NOT NULL,
    type       TEXT NOT NULL CHECK (type IN ('Market', 'Limit', 'Stop')),
    side       TEXT NOT NULL CHECK (side IN ('Buy', 'Sell')),
    qty        TEXT NOT NULL,
    price      TEXT NOT NULL,
    status     TEXT NOT NULL CHECK (status IN ('Filled', 'Pending', 'Cancelled'))
);

CREATE INDEX IF NOT EXISTS orders_user_created_idx ON orders (user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS analytics_performance (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ord     INT NOT NULL,
    value   DOUBLE PRECISION NOT NULL,
    PRIMARY KEY (user_id, ord)
);

CREATE TABLE IF NOT EXISTS analytics_stats (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ord     INT NOT NULL,
    label   TEXT NOT NULL,
    value   TEXT NOT NULL,
    change  DOUBLE PRECISION,
    sub     TEXT NOT NULL DEFAULT '',
    PRIMARY KEY (user_id, ord)
);

CREATE TABLE IF NOT EXISTS analytics_sectors (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ord     INT NOT NULL,
    label   TEXT NOT NULL,
    pct     DOUBLE PRECISION NOT NULL,
    color   TEXT NOT NULL,
    PRIMARY KEY (user_id, ord)
);
