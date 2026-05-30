.PHONY: run build test vet tidy db-up db-down db-logs fmt

run:
	go run ./cmd/api

build:
	go build -o bin/api ./cmd/api

vet:
	go vet ./...

fmt:
	gofmt -w .

tidy:
	go mod tidy

test:
	go test ./...

# Postgres lifecycle (requires Docker)
db-up:
	docker compose up -d postgres

db-down:
	docker compose down

db-logs:
	docker compose logs -f postgres
