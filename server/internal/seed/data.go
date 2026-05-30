package seed

import "math"

type indexRow struct {
	symbol string
	name   string
	value  float64
	change float64
	series []float64
}

var indices = []indexRow{
	{"AFQX 50", "Pan-African Composite", 2158.45, 3.45, []float64{2010, 2032, 2025, 2068, 2090, 2075, 2120, 2143, 2158}},
	{"SAHARA 100", "Cross-Continental Enterprise", 3245.80, 2.91, []float64{3120, 3140, 3132, 3175, 3190, 3210, 3225, 3240, 3246}},
	{"NILE TECH", "African Technology", 1872.36, 4.32, []float64{1760, 1788, 1772, 1810, 1835, 1820, 1855, 1868, 1872}},
	{"KIFARU BANKS", "African Banking Sector", 2612.18, 2.18, []float64{2540, 2558, 2549, 2575, 2588, 2600, 2596, 2608, 2612}},
	{"BAOBAB SMALLCAP", "Emerging African Business", 1105.72, 1.32, []float64{1078, 1085, 1080, 1092, 1098, 1090, 1100, 1103, 1106}},
	{"UBUNTU ESG", "Sustainability & Governance", 1643.90, 2.75, []float64{1590, 1605, 1598, 1618, 1630, 1622, 1638, 1641, 1644}},
}

type fxRow struct {
	pair   string
	name   string
	rate   float64
	change float64
}

var fxPairs = []fxRow{
	{"NGN/KES", "Naira / Shilling", 0.1524, 1.38},
	{"ZAR/NGN", "Rand / Naira", 26.45, 1.12},
	{"GHS/KES", "Cedi / Shilling", 92.35, -0.28},
	{"EGP/NGN", "Pound / Naira", 18.75, 2.11},
	{"ETB/ZAR", "Birr / Rand", 0.32, -0.45},
}

type equityRow struct {
	symbol, name, exchange, sector, last string
	change                               float64
	marketCap, volume                    string
	series                               []float64
}

var equities = []equityRow{
	{"DANGCEM", "Dangote Cement", "NGX", "Materials", "NGN 682.50", 7.21, "₦11.6T", "4.2M", []float64{636, 642, 650, 648, 661, 670, 682}},
	{"MTNN", "MTN Nigeria", "NGX", "Telecom", "NGN 432.50", 4.35, "₦9.0T", "8.1M", []float64{412, 416, 414, 422, 428, 430, 432}},
	{"SAFCOM", "Safaricom PLC", "NSE", "Telecom", "KES 19.35", 3.18, "KES 775B", "12.4M", []float64{18.6, 18.8, 18.7, 19.0, 19.2, 19.3, 19.35}},
	{"MTNG", "MTN Group", "JSE", "Telecom", "ZAR 1,764.00", 4.21, "R332B", "2.1M", []float64{1690, 1705, 1698, 1722, 1748, 1755, 1764}},
	{"NPN", "Naspers Ltd", "JSE", "Technology", "ZAR 3,214.50", 3.18, "R1.4T", "1.3M", []float64{3105, 3130, 3120, 3170, 3190, 3205, 3214}},
	{"EQTY", "Equity Group Holdings", "NSE", "Banking", "KES 44.10", 4.89, "KES 166B", "5.6M", []float64{41.8, 42.3, 42.1, 43.0, 43.6, 43.9, 44.1}},
	{"ABG", "Absa Group", "JSE", "Banking", "ZAR 186.20", 1.89, "R157B", "3.4M", []float64{182, 183, 182.5, 184, 185, 185.8, 186.2}},
	{"JMIA", "Jumia Technologies", "EGX", "Technology", "EGP 18.75", 5.32, "$1.9B", "9.8M", []float64{17.6, 17.9, 17.8, 18.1, 18.4, 18.6, 18.75}},
	{"COMI", "Commercial Intl Bank", "EGX", "Banking", "EGP 84.20", -0.62, "EGP 252B", "6.1M", []float64{85.1, 84.9, 85.0, 84.6, 84.4, 84.3, 84.2}},
	{"GCB", "GCB Bank", "GSE", "Banking", "GHS 6.45", 2.05, "GHS 1.7B", "1.1M", []float64{6.28, 6.31, 6.3, 6.37, 6.41, 6.43, 6.45}},
}

type commodityRow struct {
	symbol, name, last string
	change             float64
	unit               string
	series             []float64
}

var commodities = []commodityRow{
	{"COCOA", "Cocoa", "$9,240", 2.84, "/ tonne", []float64{8900, 8980, 8950, 9080, 9150, 9200, 9240}},
	{"GOLD", "Gold", "$2,348.50", 0.92, "/ oz", []float64{2320, 2330, 2325, 2338, 2342, 2345, 2348}},
	{"CRUDE", "Brent Crude", "$82.15", -1.24, "/ bbl", []float64{83.6, 83.2, 83.4, 82.8, 82.5, 82.3, 82.1}},
	{"COFFEE", "Coffee (Arabica)", "$2.41", 3.10, "/ lb", []float64{2.31, 2.34, 2.33, 2.37, 2.39, 2.4, 2.41}},
	{"PLAT", "Platinum", "$978.40", 1.45, "/ oz", []float64{958, 963, 960, 969, 973, 976, 978}},
	{"COPPER", "Copper", "$4.28", -0.55, "/ lb", []float64{4.32, 4.3, 4.31, 4.29, 4.28, 4.28, 4.28}},
}

type moverRow struct {
	symbol, name, price string
	change              float64
	series              []float64
}

var movers = []moverRow{
	{"DANGCEM", "Dangote Cement", "NGN 682.50", 7.21, []float64{636, 642, 650, 648, 661, 670, 682}},
	{"NBL", "Nile Breweries", "KES 4.35", 6.18, []float64{4.05, 4.1, 4.08, 4.18, 4.25, 4.3, 4.35}},
	{"JUMIA", "Jumia Technologies", "EGP 18.75", 5.32, []float64{17.6, 17.9, 17.8, 18.1, 18.4, 18.6, 18.75}},
	{"EQTY", "Equity Group Holdings", "KES 44.10", 4.89, []float64{41.8, 42.3, 42.1, 43.0, 43.6, 43.9, 44.1}},
	{"MTNN", "MTN Nigeria", "NGN 432.50", 4.35, []float64{412, 416, 414, 422, 428, 430, 432.5}},
}

type holdingRow struct {
	symbol, name, price string
	change              float64
}

// Watchlist catalog (the default WATCHLIST in the mock).
var holdingsCatalog = []holdingRow{
	{"AIRTEL AFRIQX", "Airtel Africa", "KES 123.45", 2.35},
	{"MTN GROUP", "MTN Group", "ZAR 1,764.00", 4.21},
	{"NASPERS", "Naspers Ltd", "ZAR 3,214.50", 3.18},
	{"DANGCEM", "Dangote Cement", "NGN 682.50", 7.21},
	{"SAFARICOM", "Safaricom PLC", "KES 19.35", 3.18},
	{"EGX EGYPT", "Egyptian Exchange", "EGP 18.75", 2.11},
	{"ABSA GROUP", "Absa Group", "ZAR 186.20", 1.89},
	{"LOSSENIAM", "Losseniam Gold", "GHS 28.40", 3.42},
}

type heatRow struct {
	code, bucket string
	change       float64
}

var heatmap = []heatRow{
	{"ZAR", "strong", 1.35}, {"NGN", "strong", 1.28}, {"KES", "strong", 1.18},
	{"GHS", "neutral", 0.32}, {"EGP", "neutral", 0.21},
	{"UGX", "weak", -0.45}, {"XOF", "weak", -0.62}, {"ETB", "weak", -0.91},
}

type tickerRow struct {
	label, value string
	change       float64
}

var ticker = []tickerRow{
	{"AFQX 50", "2,158.45", 3.45},
	{"AFXI", "98.65", 0.72},
	{"NGN/KES", "0.1524", 1.38},
	{"ZAR/NGN", "26.45", 1.12},
	{"GHS/NGN", "92.35", -0.28},
}

// The headline dashboard instrument.
const activePairName = "NGN / KES"

type newsRow struct {
	title, category, time string
}

var newsFeed = []newsRow{
	{"African Markets Extend Gains as Investor Confidence Rises", "Equities", "4h ago"},
	{"Dangote Cement Leads Gainers on Strong Q2 Output", "Markets", "5h ago"},
	{"Naira Strengthens Against Regional Peers on AFXI", "FX", "7h ago"},
	{"Safaricom Expands M-Pesa Rails Into Three New Markets", "Technology", "9h ago"},
	{"Continental Reserve Index Signals Improving Stability", "Economy", "11h ago"},
	{"NILE TECH Index Rallies on African Fintech Momentum", "Markets", "13h ago"},
}

type featureRow struct {
	title, excerpt, category, time, accent string
}

var newsFeatured = []featureRow{
	{"Afriqx Launches Intra-African Currency Trading Pairs", "Direct NGN/KES, ZAR/NGN and more — settling African trade without routing through the US Dollar.", "Markets", "2h ago", "from-emerald-600/40"},
	{"PAPSS Boosts Cross-Border Settlements Across 15 Countries", "The Pan-African Payment and Settlement System reports record continental clearing volumes this quarter.", "Economy", "6h ago", "from-gold-600/40"},
	{"AFQX 50 Hits Record High as Investor Confidence Climbs", "The pan-African composite gained 3.45% on the back of strong telecom and banking earnings.", "Equities", "8h ago", "from-emerald-700/40"},
}

type productRow struct {
	name, tagline, icon, badge string
}

var exploreProducts = []productRow{
	{"Afriqx Exchange", "Primary trading & market infrastructure.", "markets", ""},
	{"Afriqx FX", "Direct African currency exchange — no USD routing.", "trade", ""},
	{"Afriqx Intelligence", "Data analytics & institutional insights.", "analytics", "NEW"},
	{"Afriqx Terminal", "Professional institutional trading workspace.", "dashboard", ""},
	{"Afriqx Markets", "Live market data & trading environment.", "watchlist", ""},
	{"Afriqx API", "Developer-focused financial infrastructure APIs.", "explore", ""},
}

type layerRow struct {
	n, title, desc string
}

var exploreLayers = []layerRow{
	{"01", "Market Exchange Core", "Ultra-low-latency engine for equities, ETFs, debt, commodities and tokenized assets."},
	{"02", "African FX Engine", "Direct African currency conversion without routing through the US Dollar."},
	{"03", "Pan-African Liquidity Network", "Connecting banks, fintechs, mobile money, brokers and regional exchanges."},
	{"04", "Data & Intelligence Layer", "Bloomberg-scale African market analytics, FX heatmaps and capital-flow monitoring."},
	{"05", "AI Market Layer", "Predictive liquidity modeling, currency-stress detection and automated reporting."},
}

// ---------------------------------------------------------------- per-user starter data

type positionRow struct {
	symbol, name, qty, avgCost, last, value string
	pnl                                     float64
	pnlAbs                                  string
	weight                                  float64
}

var positions = []positionRow{
	{"DANGCEM", "Dangote Cement", "12,500", "NGN 612.00", "NGN 682.50", "$26,180.20", 11.52, "+$2,704.10", 21.0},
	{"MTNG", "MTN Group", "1,800", "ZAR 1,540.00", "ZAR 1,764.00", "$18,742.50", 14.55, "+$2,381.20", 15.0},
	{"SAFCOM", "Safaricom PLC", "84,000", "KES 17.80", "KES 19.35", "$15,640.75", 8.71, "+$1,253.40", 12.6},
	{"NPN", "Naspers Ltd", "640", "ZAR 2,980.00", "ZAR 3,214.50", "$13,420.00", 7.87, "+$979.60", 10.8},
	{"EQTY", "Equity Group", "210,000", "KES 41.20", "KES 44.10", "$11,890.30", 7.04, "+$782.10", 9.5},
	{"JMIA", "Jumia Technologies", "9,400", "EGP 19.90", "EGP 18.75", "$3,620.40", -5.78, "-$222.10", 2.9},
}

type allocationRow struct {
	label, value string
	pct          float64
	color        string
}

var allocations = []allocationRow{
	{"Equities", "$74,741.25", 60, "#1fae5f"},
	{"ETFs", "$24,913.75", 20, "#34d27b"},
	{"Bonds", "$12,456.88", 10, "#c79b3f"},
	{"Cash", "$12,456.87", 10, "#8b9694"},
}

var portfolioSummary = struct {
	totalValue, dayChangeAbs, totalPnlAbs, buyingPower, invested, total, changeAbs string
	dayChange, totalPnl, change                                                    float64
}{
	totalValue:   "$124,568.75",
	dayChange:    6.26,
	dayChangeAbs: "+$7,345.60",
	totalPnl:     18.42,
	totalPnlAbs:  "+$19,378.30",
	buyingPower:  "$12,456.87",
	invested:     "$105,190.45",
	total:        "$124,568.75",
	change:       6.26,
	changeAbs:    "+$7,345.60",
}

var performance = []float64{100, 103.2, 101.8, 106.5, 109.1, 107.4, 112.8, 115.3, 113.9, 119.2, 122.6, 124.6}

type statRow struct {
	label, value string
	change       *float64
	sub          string
}

func f(v float64) *float64 { return &v }

var analyticsStats = []statRow{
	{"Total Return", "+24.57%", f(24.57), ""},
	{"Best Sector", "Telecom", nil, "+12.4%"},
	{"Volatility", "11.8%", nil, "30-day"},
	{"Sharpe Ratio", "1.84", nil, "annualised"},
}

type sectorRow struct {
	label string
	pct   float64
	color string
}

var sectors = []sectorRow{
	{"Telecom", 34, "#1fae5f"},
	{"Banking", 28, "#34d27b"},
	{"Materials", 18, "#c79b3f"},
	{"Technology", 12, "#d9b769"},
	{"Consumer", 8, "#8b9694"},
}

// ---------------------------------------------------------------- candle generation

// mulberry32 is a seeded PRNG, ported from mock.ts so candles match the frontend.
func mulberry32(seed uint32) func() float64 {
	a := seed
	return func() float64 {
		a += 0x6d2b79f5
		t := (a ^ (a >> 15)) * (1 | a)
		t = (t + (t^(t>>7))*(61|t)) ^ t
		return float64(t^(t>>14)) / 4294967296.0
	}
}

type candle struct {
	i                       int
	open, high, low, close_ float64
	volume                  int64
}

// generateCandles mirrors the frontend's OHLC generator.
func generateCandles(count int, start float64, seed uint32) []candle {
	rng := mulberry32(seed)
	out := make([]candle, 0, count)
	price := start
	for i := 0; i < count; i++ {
		const drift = 0.0006
		const vol = 0.018
		open := price
		change := (rng()-0.5)*vol + drift
		cl := open * (1 + change)
		high := math.Max(open, cl) * (1 + rng()*0.01)
		low := math.Min(open, cl) * (1 - rng()*0.01)
		volume := int64(math.Round(2_000_000 + rng()*6_000_000))
		out = append(out, candle{i: i, open: open, high: high, low: low, close_: cl, volume: volume})
		price = cl
	}
	return out
}
