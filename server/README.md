# AFRIQX Backend

Go API for the AFRIQX trading platform — chi-routed HTTP + WebSocket, backed by
PostgreSQL, with JWT auth and a simulated live-price engine. It serves every
dataset the Vue frontend uses, shaped to match the frontend's TypeScript
interfaces.

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
make db-up                    # start Postgres in Docker
make run                      # apply migrations, seed, serve on :8080
```

On first run the server applies migrations, seeds global market data, and creates
the demo account from `SEED_USER_*` (default `amara@afriqx.africa` / `afriqx123`),
provisioning it with a starter portfolio, watchlist and analytics.

> **Port note:** `docker-compose.yml` maps Postgres to host port **5433** (5432
> was already taken on the dev machine). Keep `DATABASE_URL` in `.env` pointed at
> the same port.


## API reference

The full endpoint reference is **auto-generated** from the chi router and lives in
[`docs/api.md`](docs/api.md) (human-readable) and [`docs/api.json`](docs/api.json)
(machine-readable). Regenerate after changing routes:

```bash
make docs               # writes docs/api.json + docs/api.md
go run ./cmd/docgen -format md -stdout   # preview Markdown
go run ./cmd/docgen -format json         # JSON only
```

## Development

```bash
make build   # compile to bin/api
make vet     # go vet ./...
make fmt     # gofmt -w .
make test    # go test ./...
make docs    # regenerate API docs
```
