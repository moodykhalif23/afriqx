# AFRIQX Backend

Go API for the AFRIQX trading platform — chi-routed HTTP + WebSocket, backed by
PostgreSQL, with JWT auth and a simulated live-price engine. It serves every
dataset the Vue frontend currently mocks in `src/data/mock.ts`, shaped to match
those TypeScript interfaces so the SPA can consume it with minimal change.

## Stack

| Concern        | Choice |
|----------------|--------|
| Router         | [chi](https://github.com/go-chi/chi) v5 + chi/cors |
| Database       | PostgreSQL (via [pgx](https://github.com/jackc/pgx) v5 pool) |
| Migrations     | Embedded SQL, applied on startup (`schema_migrations` ledger) |
| Auth           | JWT (HS256, `golang-jwt`) + bcrypt password hashing |
| Live feed      | WebSocket (`gorilla/websocket`) fed by an in-memory price engine |
| Config         | Environment / `.env` (`godotenv`) |
```

## Quick start

```bash
cp .env.example .env          # adjust if needed
make db-up                    # start Postgres in Docker (port 5432)
make run                      # apply migrations, seed, serve on :8080
```

On first run the server applies migrations, seeds global market data, and creates
the demo account from `SEED_USER_*` (default `amara@afriqx.africa` / `afriqx123`),
provisioning it with a starter portfolio, watchlist and analytics.