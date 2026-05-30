# AFRIQX API Reference

_Auto-generated from the chi router by `cmd/docgen`. Do not edit by hand._

**36 endpoints.** 🔒 = requires `Authorization: Bearer <token>`.

## System

| Method | Path | Auth | Summary | Request | Response |
|--------|------|:----:|---------|---------|----------|
| `GET` | `/healthz` |  | Liveness probe + database ping | — | `{status}` |

## Auth

| Method | Path | Auth | Summary | Request | Response |
|--------|------|:----:|---------|---------|----------|
| `POST` | `/api/v1/auth/login` |  | Authenticate and receive a JWT | `{email,password}` | `AuthResponse` |
| `POST` | `/api/v1/auth/register` |  | Create an account and provision starter data | `{email,password,name}` | `AuthResponse` |

## Markets

| Method | Path | Auth | Summary | Request | Response |
|--------|------|:----:|---------|---------|----------|
| `GET` | `/api/v1/markets/active-pair` |  | Headline dashboard instrument | — | `ActivePair` |
| `GET` | `/api/v1/markets/afxi` |  | AFXI benchmark | — | `Benchmark` |
| `GET` | `/api/v1/markets/candles` |  | OHLC candle series | `?pair` | `Candle[]` |
| `GET` | `/api/v1/markets/commodities` |  | Tracked commodity contracts | — | `Commodity[]` |
| `GET` | `/api/v1/markets/equities` |  | Listed African equities | — | `Equity[]` |
| `GET` | `/api/v1/markets/fx` |  | Direct African FX pairs | — | `FxPair[]` |
| `GET` | `/api/v1/markets/fx/currencies` |  | Tradable currencies for conversion | — | `Currency[]` |
| `GET` | `/api/v1/markets/fx/heatmap` |  | Currency-strength buckets | — | `FxHeatmap` |
| `GET` | `/api/v1/markets/fx/quote` |  | Direct conversion quote (no USD routing) | `?from&to&amount` | `FxQuote` |
| `GET` | `/api/v1/markets/indices` |  | Proprietary AFQX indices | — | `MarketIndex[]` |
| `GET` | `/api/v1/markets/movers` |  | Top gainers | — | `Mover[]` |
| `GET` | `/api/v1/markets/ticker` |  | Ticker-bar items | — | `TickerItem[]` |

## FX Conversion

| Method | Path | Auth | Summary | Request | Response |
|--------|------|:----:|---------|---------|----------|
| `GET` | `/api/v1/conversions` | 🔒 | Conversion ledger (newest first) | — | `Conversion[]` |
| `POST` | `/api/v1/convert` | 🔒 | Execute & record a direct FX conversion | `{from,to,amount}` | `Conversion` |

## News

| Method | Path | Auth | Summary | Request | Response |
|--------|------|:----:|---------|---------|----------|
| `GET` | `/api/v1/news` |  | News feed | — | `NewsItem[]` |
| `GET` | `/api/v1/news/featured` |  | Featured stories | — | `FeatureNews[]` |

## Explore

| Method | Path | Auth | Summary | Request | Response |
|--------|------|:----:|---------|---------|----------|
| `GET` | `/api/v1/explore/layers` |  | Exchange-architecture layers | — | `ExploreLayer[]` |
| `GET` | `/api/v1/explore/products` |  | AFX Explore product cards | — | `ExploreProduct[]` |

## Live Feed

| Method | Path | Auth | Summary | Request | Response |
|--------|------|:----:|---------|---------|----------|
| `GET` | `/api/v1/ws` |  | WebSocket live price feed (origin-checked) | — | `stream<LiveTick>` |

## Account

| Method | Path | Auth | Summary | Request | Response |
|--------|------|:----:|---------|---------|----------|
| `GET` | `/api/v1/me` | 🔒 | Current account | — | `PublicUser` |
| `GET` | `/api/v1/settings` | 🔒 | Read preferences | — | `Settings` |
| `PUT` | `/api/v1/settings` | 🔒 | Update preferences | `Settings` | `Settings` |

## Watchlist

| Method | Path | Auth | Summary | Request | Response |
|--------|------|:----:|---------|---------|----------|
| `GET` | `/api/v1/watchlist` | 🔒 | User's tracked instruments | — | `Holding[]` |
| `POST` | `/api/v1/watchlist` | 🔒 | Add an instrument | `{symbol}` | `Holding[]` |
| `GET` | `/api/v1/watchlist/catalog` | 🔒 | All addable instruments | — | `Holding[]` |
| `DELETE` | `/api/v1/watchlist/{symbol}` | 🔒 | Remove an instrument | — | `204` |

## Portfolio

| Method | Path | Auth | Summary | Request | Response |
|--------|------|:----:|---------|---------|----------|
| `GET` | `/api/v1/portfolio` | 🔒 | Portfolio overview (donut + totals) | — | `Portfolio` |
| `GET` | `/api/v1/portfolio/positions` | 🔒 | Holdings table | — | `Position[]` |
| `GET` | `/api/v1/portfolio/summary` | 🔒 | Headline portfolio stat cards | — | `PortfolioSummary` |

## Orders

| Method | Path | Auth | Summary | Request | Response |
|--------|------|:----:|---------|---------|----------|
| `GET` | `/api/v1/orders` | 🔒 | Order ledger (newest first) | — | `Order[]` |
| `POST` | `/api/v1/orders` | 🔒 | Place an order (Market fills, Limit/Stop rest) | `PlaceOrderInput` | `Order` |
| `DELETE` | `/api/v1/orders/{id}` | 🔒 | Cancel a pending order | — | `Order` |

## Analytics

| Method | Path | Auth | Summary | Request | Response |
|--------|------|:----:|---------|---------|----------|
| `GET` | `/api/v1/analytics` | 🔒 | Performance, KPI stats, sector allocation | — | `Analytics` |

