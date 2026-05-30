/** API response types — mirror the Go backend's JSON (internal/models). */

export interface PublicUser {
  id: string;
  email: string;
  name: string;
  tier: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: string;
  user: PublicUser;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  series: number[];
}

export interface Benchmark {
  symbol: string;
  name: string;
  value: number;
  change: number;
}

export interface FxPair {
  pair: string;
  name: string;
  rate: number;
  change: number;
}

export interface Equity {
  symbol: string;
  name: string;
  exchange: string;
  sector: string;
  last: string;
  change: number;
  marketCap: string;
  volume: string;
  series: number[];
}

export interface Commodity {
  symbol: string;
  name: string;
  last: string;
  change: number;
  unit: string;
  series: number[];
}

export interface Mover {
  symbol: string;
  name: string;
  price: string;
  change: number;
  series: number[];
}

export interface Holding {
  symbol: string;
  name: string;
  price: string;
  change: number;
}

export interface FxStrength {
  code: string;
  change: number;
}

export interface FxHeatmap {
  strong: FxStrength[];
  neutral: FxStrength[];
  weak: FxStrength[];
}

export interface TickerItem {
  label: string;
  value: string;
  change: number;
}

export interface ActivePair {
  pair: string;
  name: string;
  flag: string;
  price: number;
  change: number;
  changeAbs: number;
  high24h: number;
  low24h: number;
  volume24h: string;
}

export interface Candle {
  i: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface NewsItem {
  title: string;
  category: string;
  time: string;
}

export interface FeatureNews {
  title: string;
  excerpt: string;
  category: string;
  time: string;
  accent: string;
}

export interface Allocation {
  label: string;
  value: string;
  pct: number;
  color: string;
}

export interface Portfolio {
  total: string;
  change: number;
  changeAbs: string;
  allocations: Allocation[];
}

export interface PortfolioSummary {
  totalValue: string;
  dayChange: number;
  dayChangeAbs: string;
  totalPnl: number;
  totalPnlAbs: string;
  buyingPower: string;
  invested: string;
}

export interface Position {
  symbol: string;
  name: string;
  qty: string;
  avgCost: string;
  last: string;
  value: string;
  pnl: number;
  pnlAbs: string;
  weight: number;
}

export interface Order {
  id: string;
  date: string;
  symbol: string;
  type: "Market" | "Limit" | "Stop";
  side: "Buy" | "Sell";
  qty: string;
  price: string;
  status: "Filled" | "Pending" | "Cancelled";
}

export interface PlaceOrderInput {
  symbol: string;
  type: "Market" | "Limit" | "Stop";
  side: "Buy" | "Sell";
  qty: number;
  price: number;
  currency?: string;
}

export interface AnalyticsStat {
  label: string;
  value: string;
  change?: number;
  sub?: string;
}

export interface SectorSlice {
  label: string;
  pct: number;
  color: string;
}

export interface Analytics {
  performance: number[];
  stats: AnalyticsStat[];
  sectors: SectorSlice[];
}

export interface ExploreProduct {
  name: string;
  tagline: string;
  icon: string;
  badge?: string;
}

export interface ExploreLayer {
  n: string;
  title: string;
  desc: string;
}

export interface Settings {
  name: string;
  email: string;
  baseCcy: string;
  theme: string;
  twoFa: boolean;
  biometric: boolean;
  priceAlerts: boolean;
  orderFills: boolean;
  newsDigest: boolean;
  aiSummary: boolean;
  compactTables: boolean;
  ticker: boolean;
}

export interface Currency {
  code: string;
  name: string;
}

export interface FxQuote {
  from: string;
  to: string;
  amount: number;
  rate: number;
  converted: number;
}

export interface Conversion {
  id: string;
  date: string;
  from: string;
  to: string;
  amount: number;
  rate: number;
  converted: number;
}

/** Live-feed tick pushed over the WebSocket. */
export interface LiveTick {
  type: "tick";
  ts: number;
  ticker: TickerItem[];
  activePair: {
    pair: string;
    price: number;
    change: number;
    changeAbs: number;
  };
}
