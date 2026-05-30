// Package models defines the domain types served by the API. JSON tags mirror
// the frontend's TypeScript interfaces in src/data/mock.ts so the SPA can
// consume the API with minimal change.
package models

import "time"

// User is an authenticated account.
type User struct {
	ID           string    `json:"id"`
	Email        string    `json:"email"`
	Name         string    `json:"name"`
	Tier         string    `json:"tier"`
	PasswordHash string    `json:"-"`
	CreatedAt    time.Time `json:"createdAt"`
}

// MarketIndex is a proprietary AFRIQX index (AFQX family).
type MarketIndex struct {
	Symbol string    `json:"symbol"`
	Name   string    `json:"name"`
	Value  float64   `json:"value"`
	Change float64   `json:"change"` // percent
	Series []float64 `json:"series"`
}

// Benchmark is a single headline index value (e.g. AFXI).
type Benchmark struct {
	Symbol string  `json:"symbol"`
	Name   string  `json:"name"`
	Value  float64 `json:"value"`
	Change float64 `json:"change"`
}

// FxPair is a direct African currency pair (no USD routing).
type FxPair struct {
	Pair   string  `json:"pair"`
	Name   string  `json:"name"`
	Rate   float64 `json:"rate"`
	Change float64 `json:"change"`
}

// Equity is a listed African share.
type Equity struct {
	Symbol    string    `json:"symbol"`
	Name      string    `json:"name"`
	Exchange  string    `json:"exchange"`
	Sector    string    `json:"sector"`
	Last      string    `json:"last"` // formatted with currency
	Change    float64   `json:"change"`
	MarketCap string    `json:"marketCap"`
	Volume    string    `json:"volume"`
	Series    []float64 `json:"series"`
}

// Commodity is a tracked commodity contract.
type Commodity struct {
	Symbol string    `json:"symbol"`
	Name   string    `json:"name"`
	Last   string    `json:"last"`
	Change float64   `json:"change"`
	Unit   string    `json:"unit"`
	Series []float64 `json:"series"`
}

// Mover is a top-gainer entry.
type Mover struct {
	Symbol string    `json:"symbol"`
	Name   string    `json:"name"`
	Price  string    `json:"price"`
	Change float64   `json:"change"`
	Series []float64 `json:"series"`
}

// Holding is a watchlist row.
type Holding struct {
	Symbol string  `json:"symbol"`
	Name   string  `json:"name"`
	Price  string  `json:"price"`
	Change float64 `json:"change"`
}

// FxStrength is a currency-strength bucket entry.
type FxStrength struct {
	Code   string  `json:"code"`
	Change float64 `json:"change"`
}

// FxHeatmap groups currencies by relative strength.
type FxHeatmap struct {
	Strong  []FxStrength `json:"strong"`
	Neutral []FxStrength `json:"neutral"`
	Weak    []FxStrength `json:"weak"`
}

// TickerItem is a scrolling ticker entry.
type TickerItem struct {
	Label  string  `json:"label"`
	Value  string  `json:"value"`
	Change float64 `json:"change"`
}

// ActivePair is the headline instrument on the dashboard chart.
type ActivePair struct {
	Pair      string  `json:"pair"`
	Name      string  `json:"name"`
	Flag      string  `json:"flag"`
	Price     float64 `json:"price"`
	Change    float64 `json:"change"`
	ChangeAbs float64 `json:"changeAbs"`
	High24h   float64 `json:"high24h"`
	Low24h    float64 `json:"low24h"`
	Volume24h string  `json:"volume24h"`
}

// Candle is one OHLC bar.
type Candle struct {
	I      int     `json:"i"`
	Open   float64 `json:"open"`
	High   float64 `json:"high"`
	Low    float64 `json:"low"`
	Close  float64 `json:"close"`
	Volume int64   `json:"volume"`
}

// NewsItem is a feed headline.
type NewsItem struct {
	Title    string `json:"title"`
	Category string `json:"category"`
	Time     string `json:"time"`
}

// FeatureNews is a featured story with an excerpt.
type FeatureNews struct {
	Title    string `json:"title"`
	Excerpt  string `json:"excerpt"`
	Category string `json:"category"`
	Time     string `json:"time"`
	Accent   string `json:"accent"`
}

// Allocation is a portfolio donut slice.
type Allocation struct {
	Label string  `json:"label"`
	Value string  `json:"value"`
	Pct   float64 `json:"pct"`
	Color string  `json:"color"`
}

// Portfolio is the overview block (donut + totals).
type Portfolio struct {
	Total       string       `json:"total"`
	Change      float64      `json:"change"`
	ChangeAbs   string       `json:"changeAbs"`
	Allocations []Allocation `json:"allocations"`
}

// PortfolioSummary holds the headline portfolio stat cards.
type PortfolioSummary struct {
	TotalValue   string  `json:"totalValue"`
	DayChange    float64 `json:"dayChange"`
	DayChangeAbs string  `json:"dayChangeAbs"`
	TotalPnl     float64 `json:"totalPnl"`
	TotalPnlAbs  string  `json:"totalPnlAbs"`
	BuyingPower  string  `json:"buyingPower"`
	Invested     string  `json:"invested"`
}

// Position is a holding in the portfolio table.
type Position struct {
	Symbol  string  `json:"symbol"`
	Name    string  `json:"name"`
	Qty     string  `json:"qty"`
	AvgCost string  `json:"avgCost"`
	Last    string  `json:"last"`
	Value   string  `json:"value"`
	Pnl     float64 `json:"pnl"`
	PnlAbs  string  `json:"pnlAbs"`
	Weight  float64 `json:"weight"`
}

// Order is a row in the orders ledger.
type Order struct {
	ID     string `json:"id"`
	Date   string `json:"date"`
	Symbol string `json:"symbol"`
	Type   string `json:"type"` // Market | Limit | Stop
	Side   string `json:"side"` // Buy | Sell
	Qty    string `json:"qty"`
	Price  string `json:"price"`
	Status string `json:"status"` // Filled | Pending | Cancelled
}

// AnalyticsStat is a single analytics KPI card.
type AnalyticsStat struct {
	Label  string   `json:"label"`
	Value  string   `json:"value"`
	Change *float64 `json:"change,omitempty"`
	Sub    string   `json:"sub,omitempty"`
}

// SectorSlice is a sector allocation entry.
type SectorSlice struct {
	Label string  `json:"label"`
	Pct   float64 `json:"pct"`
	Color string  `json:"color"`
}

// Analytics bundles the analytics view payload.
type Analytics struct {
	Performance []float64       `json:"performance"`
	Stats       []AnalyticsStat `json:"stats"`
	Sectors     []SectorSlice   `json:"sectors"`
}

// ExploreProduct is an AFX Explore product card.
type ExploreProduct struct {
	Name    string `json:"name"`
	Tagline string `json:"tagline"`
	Icon    string `json:"icon"`
	Badge   string `json:"badge,omitempty"`
}

// ExploreLayer is an exchange-architecture layer entry.
type ExploreLayer struct {
	N     string `json:"n"`
	Title string `json:"title"`
	Desc  string `json:"desc"`
}

// Settings holds a user's preferences.
type Settings struct {
	Name        string `json:"name"`
	Email       string `json:"email"`
	BaseCcy     string `json:"baseCcy"`
	Theme       string `json:"theme"`
	TwoFa       bool   `json:"twoFa"`
	Biometric   bool   `json:"biometric"`
	PriceAlerts bool   `json:"priceAlerts"`
	OrderFills  bool   `json:"orderFills"`
	NewsDigest  bool   `json:"newsDigest"`
	AiSummary   bool   `json:"aiSummary"`
	Compact     bool   `json:"compactTables"`
	Ticker      bool   `json:"ticker"`
}
