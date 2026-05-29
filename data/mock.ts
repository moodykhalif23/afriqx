/**
 * Static mock market data for AFRIQX — shaped to mirror the brand's proprietary
 * indexes, African FX pairs and sample equities. No live feed yet; these values
 * back the design-system showcase and will seed early screens.
 */

export interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number; // percent
  series: number[];
}

export interface FxPair {
  pair: string;
  name: string;
  rate: number;
  change: number; // percent
}

export interface Holding {
  symbol: string;
  name: string;
  price: string; // pre-formatted with currency
  change: number; // percent
}

/** Proprietary African market indexes (AFQX family). */
export const INDEXES: MarketIndex[] = [
  {
    symbol: "AFQX 50",
    name: "Pan-African Composite",
    value: 2158.45,
    change: 3.45,
    series: [2010, 2032, 2025, 2068, 2090, 2075, 2120, 2143, 2158],
  },
  {
    symbol: "SAHARA 100",
    name: "Cross-Continental Enterprise",
    value: 3245.80,
    change: 2.91,
    series: [3120, 3140, 3132, 3175, 3190, 3210, 3225, 3240, 3246],
  },
  {
    symbol: "NILE TECH",
    name: "African Technology",
    value: 1872.36,
    change: 4.32,
    series: [1760, 1788, 1772, 1810, 1835, 1820, 1855, 1868, 1872],
  },
  {
    symbol: "KIFARU BANKS",
    name: "African Banking Sector",
    value: 2612.18,
    change: 2.18,
    series: [2540, 2558, 2549, 2575, 2588, 2600, 2596, 2608, 2612],
  },
  {
    symbol: "BAOBAB SMALLCAP",
    name: "Emerging African Business",
    value: 1105.72,
    change: 1.32,
    series: [1078, 1085, 1080, 1092, 1098, 1090, 1100, 1103, 1106],
  },
  {
    symbol: "UBUNTU ESG",
    name: "Sustainability & Governance",
    value: 1643.90,
    change: 2.75,
    series: [1590, 1605, 1598, 1618, 1630, 1622, 1638, 1641, 1644],
  },
];

/** African FX Index — the AFXI benchmark. */
export const AFXI = {
  symbol: "AFXI",
  name: "African FX Index",
  value: 98.65,
  change: 0.72,
};

/** Direct African currency pairs — no USD routing. */
export const FX_PAIRS: FxPair[] = [
  { pair: "NGN/KES", name: "Naira / Shilling", rate: 0.1524, change: 1.38 },
  { pair: "ZAR/NGN", name: "Rand / Naira", rate: 26.45, change: 1.12 },
  { pair: "GHS/KES", name: "Cedi / Shilling", rate: 92.35, change: -0.28 },
  { pair: "EGP/NGN", name: "Pound / Naira", rate: 18.75, change: 2.11 },
  { pair: "ETB/ZAR", name: "Birr / Rand", rate: 0.32, change: -0.45 },
];

/** Sample watchlist / movers. */
export const WATCHLIST: Holding[] = [
  {
    symbol: "AIRTEL AFRIQX",
    name: "Airtel Africa",
    price: "KES 123.45",
    change: 2.35,
  },
  {
    symbol: "MTN GROUP",
    name: "MTN Group",
    price: "ZAR 1,764.00",
    change: 4.21,
  },
  {
    symbol: "NASPERS",
    name: "Naspers Ltd",
    price: "ZAR 3,214.50",
    change: 3.18,
  },
  {
    symbol: "DANGCEM",
    name: "Dangote Cement",
    price: "NGN 682.50",
    change: 7.21,
  },
  {
    symbol: "SAFARICOM",
    name: "Safaricom PLC",
    price: "KES 19.35",
    change: 3.18,
  },
  {
    symbol: "EGX EGYPT",
    name: "Egyptian Exchange",
    price: "EGP 18.75",
    change: 2.11,
  },
  {
    symbol: "ABSA GROUP",
    name: "Absa Group",
    price: "ZAR 186.20",
    change: 1.89,
  },
  {
    symbol: "LOSSENIAM",
    name: "Losseniam Gold",
    price: "GHS 28.40",
    change: 3.42,
  },
];

/* ------------------------------------------------------------------ *
 *  Dashboard data
 * ------------------------------------------------------------------ */

/** Seeded PRNG (mulberry32) — deterministic candles so SSR output is stable. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Candle {
  /** index along the series (oldest → newest) */
  i: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/** Generate a believable OHLC series with an upward drift. */
function generateCandles(
  count: number,
  start: number,
  seed: number,
): Candle[] {
  const rng = mulberry32(seed);
  const candles: Candle[] = [];
  let price = start;
  for (let i = 0; i < count; i++) {
    const drift = 0.0006; // gentle bullish bias
    const vol = 0.018;
    const open = price;
    const change = (rng() - 0.5) * vol + drift;
    const close = open * (1 + change);
    const high = Math.max(open, close) * (1 + rng() * 0.01);
    const low = Math.min(open, close) * (1 - rng() * 0.01);
    const volume = Math.round(2_000_000 + rng() * 6_000_000);
    candles.push({ i, open, high, low, close, volume });
    price = close;
  }
  return candles;
}

/** Headline instrument shown on the dashboard chart: the NGN/KES African FX pair. */
export const ACTIVE_PAIR = {
  pair: "NGN / KES",
  name: "Nigerian Naira / Kenyan Shilling",
  flag: "🇳🇬",
  price: 0.1524,
  change: 1.38,
  changeAbs: 0.0021,
  high24h: 0.1538,
  low24h: 0.1496,
  volume24h: "₦45.62B",
};

/** ~120 candles feeding the main chart. */
export const CANDLES: Candle[] = generateCandles(120, 0.1402, 0x4f51a3);

export const TIMEFRAMES = ["1m", "5m", "15m", "1H", "4H", "1D", "1W"] as const;

/** Left-hand navigation. */
export interface NavItem {
  label: string;
  icon: string; // inline svg path key (see Sidebar)
  active?: boolean;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: "dashboard", active: true },
  { label: "Markets", icon: "markets" },
  { label: "Watchlist", icon: "watchlist" },
  { label: "Trade", icon: "trade" },
  { label: "Portfolio", icon: "portfolio" },
  { label: "Orders", icon: "orders" },
  { label: "Analytics", icon: "analytics" },
  { label: "News & Insights", icon: "news" },
  { label: "AFX Explore", icon: "explore", badge: "NEW" },
  { label: "Settings", icon: "settings" },
];

/** Market Movers (Top Gainers tab). */
export interface Mover {
  symbol: string;
  name: string;
  price: string;
  change: number;
  series: number[];
}

export const MARKET_MOVERS: Mover[] = [
  { symbol: "DANGCEM", name: "Dangote Cement", price: "NGN 682.50", change: 7.21, series: [636, 642, 650, 648, 661, 670, 682] },
  { symbol: "NBL", name: "Nile Breweries", price: "KES 4.35", change: 6.18, series: [4.05, 4.1, 4.08, 4.18, 4.25, 4.3, 4.35] },
  { symbol: "JUMIA", name: "Jumia Technologies", price: "EGP 18.75", change: 5.32, series: [17.6, 17.9, 17.8, 18.1, 18.4, 18.6, 18.75] },
  { symbol: "EQTY", name: "Equity Group Holdings", price: "KES 44.10", change: 4.89, series: [41.8, 42.3, 42.1, 43.0, 43.6, 43.9, 44.1] },
  { symbol: "MTNN", name: "MTN Nigeria", price: "NGN 432.50", change: 4.35, series: [412, 416, 414, 422, 428, 430, 432.5] },
];

/** News & Insights feed. */
export interface NewsItem {
  title: string;
  category: string;
  time: string;
}

export const NEWS: NewsItem[] = [
  { title: "Afriqx Launches Intra-African Currency Trading Pairs", category: "Markets", time: "2h ago" },
  { title: "African Markets Extend Gains as Investor Confidence Rises", category: "Equities", time: "4h ago" },
  { title: "PAPSS Boosts Cross-Border Settlements Across 15 African Countries", category: "Economy", time: "6h ago" },
];

/** Portfolio allocation donut. */
export interface Allocation {
  label: string;
  value: string;
  pct: number;
  color: string; // css color
}

export const PORTFOLIO = {
  total: "$124,568.75",
  change: 6.26,
  changeAbs: "+$7,345.60",
  allocations: [
    { label: "Equities", value: "$74,741.25", pct: 60, color: "#1fae5f" },
    { label: "ETFs", value: "$24,913.75", pct: 20, color: "#34d27b" },
    { label: "Bonds", value: "$12,456.88", pct: 10, color: "#c79b3f" },
    { label: "Cash", value: "$12,456.87", pct: 10, color: "#8b9694" },
  ] as Allocation[],
};

/** Recent orders table. */
export interface Order {
  type: "Market" | "Limit";
  symbol: string;
  side: "Buy" | "Sell";
  status: "Filled" | "Pending";
  price: string;
}

export const RECENT_ORDERS: Order[] = [
  { type: "Market", symbol: "AIRTEL AFRIQX", side: "Buy", status: "Filled", price: "123.45" },
  { type: "Limit", symbol: "MTN GROUP", side: "Buy", status: "Filled", price: "1,764.00" },
  { type: "Limit", symbol: "SAFARICOM", side: "Sell", status: "Pending", price: "19.50" },
  { type: "Market", symbol: "DANGCEM", side: "Buy", status: "Filled", price: "682.50" },
  { type: "Limit", symbol: "NILE BREWERIES", side: "Buy", status: "Filled", price: "4.35" },
];

/** African FX Heatmap — currency strength buckets. */
export interface FxStrength {
  code: string;
  change: number;
}

export const FX_HEATMAP: {
  strong: FxStrength[];
  neutral: FxStrength[];
  weak: FxStrength[];
} = {
  strong: [
    { code: "ZAR", change: 1.35 },
    { code: "NGN", change: 1.28 },
    { code: "KES", change: 1.18 },
  ],
  neutral: [
    { code: "GHS", change: 0.32 },
    { code: "EGP", change: 0.21 },
  ],
  weak: [
    { code: "UGX", change: -0.45 },
    { code: "XOF", change: -0.62 },
    { code: "ETB", change: -0.91 },
  ],
};

/** Bottom ticker bar items. */
export const TICKER: { label: string; value: string; change: number }[] = [
  { label: "AFQX 50", value: "2,158.45", change: 3.45 },
  { label: "AFXI", value: "98.65", change: 0.72 },
  { label: "NGN/KES", value: "0.1524", change: 1.38 },
  { label: "ZAR/NGN", value: "26.45", change: 1.12 },
  { label: "GHS/NGN", value: "92.35", change: -0.28 },
];

/** Signed-in user (top bar). */
export const USER = { name: "Amara Okafor", tier: "Pro Trader" };
