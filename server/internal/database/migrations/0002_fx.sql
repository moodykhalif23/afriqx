-- Direct African FX: a currency rate table (no USD routing) and a per-user
-- conversion ledger.

CREATE TABLE IF NOT EXISTS fx_rates (
    code         TEXT PRIMARY KEY,
    name         TEXT NOT NULL,
    kes_per_unit DOUBLE PRECISION NOT NULL, -- value of 1 unit expressed in KES
    ord          INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS conversions (
    id         UUID PRIMARY KEY,
    user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    from_ccy   TEXT NOT NULL,
    to_ccy     TEXT NOT NULL,
    amount     DOUBLE PRECISION NOT NULL,
    rate       DOUBLE PRECISION NOT NULL,
    converted  DOUBLE PRECISION NOT NULL
);

CREATE INDEX IF NOT EXISTS conversions_user_created_idx ON conversions (user_id, created_at DESC);
