-- Per-currency cash balances. A conversion debits the source currency and
-- credits the destination, so balances reflect executed conversions.

CREATE TABLE IF NOT EXISTS cash_balances (
    user_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    currency TEXT NOT NULL REFERENCES fx_rates(code),
    amount   DOUBLE PRECISION NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id, currency)
);
