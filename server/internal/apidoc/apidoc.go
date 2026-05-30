package apidoc

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sort"
	"strings"

	"github.com/go-chi/chi/v5"
)

// Route is one documented endpoint.
type Route struct {
	Method   string `json:"method"`
	Path     string `json:"path"`
	Group    string `json:"group"`
	Auth     bool   `json:"auth"`
	Summary  string `json:"summary"`
	Request  string `json:"request,omitempty"`
	Response string `json:"response,omitempty"`
}

type meta struct {
	auth     bool
	summary  string
	request  string
	response string
}

var routeMeta = map[string]meta{
	"GET /healthz": {summary: "Liveness probe + database ping", response: "{status}"},

	"POST /api/v1/auth/register": {summary: "Create an account and provision starter data", request: "{email,password,name}", response: "AuthResponse"},
	"POST /api/v1/auth/login":    {summary: "Authenticate and receive a JWT", request: "{email,password}", response: "AuthResponse"},

	"GET /api/v1/markets/indices":       {summary: "Proprietary AFQX indices", response: "MarketIndex[]"},
	"GET /api/v1/markets/afxi":          {summary: "AFXI benchmark", response: "Benchmark"},
	"GET /api/v1/markets/fx":            {summary: "Direct African FX pairs", response: "FxPair[]"},
	"GET /api/v1/markets/fx/heatmap":    {summary: "Currency-strength buckets", response: "FxHeatmap"},
	"GET /api/v1/markets/fx/currencies": {summary: "Tradable currencies for conversion", response: "Currency[]"},
	"GET /api/v1/markets/fx/quote":      {summary: "Direct conversion quote (no USD routing)", request: "?from&to&amount", response: "FxQuote"},
	"GET /api/v1/markets/equities":      {summary: "Listed African equities", response: "Equity[]"},
	"GET /api/v1/markets/commodities":   {summary: "Tracked commodity contracts", response: "Commodity[]"},
	"GET /api/v1/markets/movers":        {summary: "Top gainers", response: "Mover[]"},
	"GET /api/v1/markets/ticker":        {summary: "Ticker-bar items", response: "TickerItem[]"},
	"GET /api/v1/markets/active-pair":   {summary: "Headline dashboard instrument", response: "ActivePair"},
	"GET /api/v1/markets/candles":       {summary: "OHLC candle series", request: "?pair", response: "Candle[]"},

	"GET /api/v1/docs": {summary: "Self-describing route map (powers this reference)", response: "Route[]"},

	"GET /api/v1/news":             {summary: "News feed", response: "NewsItem[]"},
	"GET /api/v1/news/featured":    {summary: "Featured stories", response: "FeatureNews[]"},
	"GET /api/v1/explore/products": {summary: "AFX Explore product cards", response: "ExploreProduct[]"},
	"GET /api/v1/explore/layers":   {summary: "Exchange-architecture layers", response: "ExploreLayer[]"},
	"GET /api/v1/ws":               {summary: "WebSocket live price feed (origin-checked)", response: "stream<LiveTick>"},

	"GET /api/v1/me":                    {auth: true, summary: "Current account", response: "PublicUser"},
	"GET /api/v1/watchlist":             {auth: true, summary: "User's tracked instruments", response: "Holding[]"},
	"GET /api/v1/watchlist/catalog":     {auth: true, summary: "All addable instruments", response: "Holding[]"},
	"POST /api/v1/watchlist":            {auth: true, summary: "Add an instrument", request: "{symbol}", response: "Holding[]"},
	"DELETE /api/v1/watchlist/{symbol}": {auth: true, summary: "Remove an instrument", response: "204"},
	"GET /api/v1/portfolio":             {auth: true, summary: "Portfolio overview (donut + totals)", response: "Portfolio"},
	"GET /api/v1/portfolio/summary":     {auth: true, summary: "Headline portfolio stat cards", response: "PortfolioSummary"},
	"GET /api/v1/portfolio/positions":   {auth: true, summary: "Holdings table", response: "Position[]"},
	"GET /api/v1/orders":                {auth: true, summary: "Order ledger (newest first)", response: "Order[]"},
	"POST /api/v1/orders":               {auth: true, summary: "Place an order (Market fills, Limit/Stop rest)", request: "PlaceOrderInput", response: "Order"},
	"DELETE /api/v1/orders/{id}":        {auth: true, summary: "Cancel a pending order", response: "Order"},
	"GET /api/v1/balances":              {auth: true, summary: "Per-currency cash balances", response: "Balance[]"},
	"POST /api/v1/convert":              {auth: true, summary: "Execute a direct FX conversion (debits/credits balances)", request: "{from,to,amount}", response: "Conversion"},
	"GET /api/v1/conversions":           {auth: true, summary: "Conversion ledger (newest first)", response: "Conversion[]"},
	"GET /api/v1/analytics":             {auth: true, summary: "Performance, KPI stats, sector allocation", response: "Analytics"},
	"GET /api/v1/settings":              {auth: true, summary: "Read preferences", response: "Settings"},
	"PUT /api/v1/settings":              {auth: true, summary: "Update preferences", request: "Settings", response: "Settings"},
}

// Generate walks the router and returns the documented routes, sorted by group
// then path. Unknown routes are included with a derived summary.
func Generate(router chi.Routes) ([]Route, error) {
	var routes []Route
	err := chi.Walk(router, func(method, path string, _ http.Handler, _ ...func(http.Handler) http.Handler) error {
		path = normalize(path)
		key := method + " " + path
		m := routeMeta[key]
		summary := m.summary
		if summary == "" {
			summary = "(undocumented)"
		}
		routes = append(routes, Route{
			Method:   method,
			Path:     path,
			Group:    groupFor(path),
			Auth:     m.auth,
			Summary:  summary,
			Request:  m.request,
			Response: m.response,
		})
		return nil
	})
	if err != nil {
		return nil, err
	}
	sort.SliceStable(routes, func(i, j int) bool {
		if routes[i].Group != routes[j].Group {
			return groupRank(routes[i].Group) < groupRank(routes[j].Group)
		}
		if routes[i].Path != routes[j].Path {
			return routes[i].Path < routes[j].Path
		}
		return routes[i].Method < routes[j].Method
	})
	return routes, nil
}

// Missing returns routes that have no metadata entry, so callers can warn.
func Missing(routes []Route) []string {
	var out []string
	for _, r := range routes {
		if r.Summary == "(undocumented)" {
			out = append(out, r.Method+" "+r.Path)
		}
	}
	return out
}

// RenderJSON serializes routes as indented JSON.
func RenderJSON(routes []Route) ([]byte, error) {
	return json.MarshalIndent(routes, "", "  ")
}

// RenderMarkdown renders a grouped Markdown reference.
func RenderMarkdown(routes []Route, title string) string {
	var b strings.Builder
	fmt.Fprintf(&b, "# %s\n\n", title)
	b.WriteString("_Auto-generated from the chi router by `cmd/docgen`. Do not edit by hand._\n\n")
	fmt.Fprintf(&b, "**%d endpoints.** 🔒 = requires `Authorization: Bearer <token>`.\n\n", len(routes))

	var group string
	for _, r := range routes {
		if r.Group != group {
			if group != "" {
				b.WriteString("\n")
			}
			group = r.Group
			fmt.Fprintf(&b, "## %s\n\n", group)
			b.WriteString("| Method | Path | Auth | Summary | Request | Response |\n")
			b.WriteString("|--------|------|:----:|---------|---------|----------|\n")
		}
		lock := ""
		if r.Auth {
			lock = "🔒"
		}
		fmt.Fprintf(&b, "| `%s` | `%s` | %s | %s | %s | %s |\n",
			r.Method, r.Path, lock, r.Summary, code(r.Request), code(r.Response))
	}
	b.WriteString("\n")
	return b.String()
}

func code(s string) string {
	if s == "" {
		return "—"
	}
	return "`" + s + "`"
}

// normalize strips chi's trailing "/*" artifacts from sub-router mounts.
func normalize(path string) string {
	if path != "/" && strings.HasSuffix(path, "/") {
		path = strings.TrimSuffix(path, "/")
	}
	return path
}

func groupFor(path string) string {
	if path == "/healthz" {
		return "System"
	}
	rest := strings.TrimPrefix(path, "/api/v1/")
	seg := rest
	if i := strings.IndexByte(rest, '/'); i >= 0 {
		seg = rest[:i]
	}
	switch seg {
	case "docs":
		return "System"
	case "auth":
		return "Auth"
	case "markets":
		return "Markets"
	case "news":
		return "News"
	case "explore":
		return "Explore"
	case "ws":
		return "Live Feed"
	case "me", "settings":
		return "Account"
	case "watchlist":
		return "Watchlist"
	case "portfolio":
		return "Portfolio"
	case "orders":
		return "Orders"
	case "convert", "conversions", "balances":
		return "FX Conversion"
	case "analytics":
		return "Analytics"
	default:
		return "Other"
	}
}

func groupRank(group string) int {
	order := []string{
		"System", "Auth", "Markets", "FX Conversion", "News", "Explore",
		"Live Feed", "Account", "Watchlist", "Portfolio", "Orders", "Analytics", "Other",
	}
	for i, g := range order {
		if g == group {
			return i
		}
	}
	return len(order)
}
