/** Typed endpoint functions for the AFRIQX API, grouped by domain. */

import { http } from "./http";
import type {
  Analytics,
  AuthResponse,
  Benchmark,
  Candle,
  Commodity,
  Conversion,
  Currency,
  Equity,
  FxQuote,
  ExploreLayer,
  ExploreProduct,
  FeatureNews,
  FxHeatmap,
  FxPair,
  Holding,
  MarketIndex,
  Mover,
  NewsItem,
  Order,
  PlaceOrderInput,
  Portfolio,
  PortfolioSummary,
  Position,
  PublicUser,
  Settings,
  TickerItem,
  ActivePair,
} from "./types";

export * from "./types";
export { ApiError, getToken, apiBaseUrl } from "./http";

const enc = encodeURIComponent;

export const authApi = {
  register: (email: string, password: string, name: string) =>
    http.post<AuthResponse>("/auth/register", { email, password, name }),
  login: (email: string, password: string) =>
    http.post<AuthResponse>("/auth/login", { email, password }),
  me: () => http.get<PublicUser>("/me"),
};

export const marketsApi = {
  indices: () => http.get<MarketIndex[]>("/markets/indices"),
  afxi: () => http.get<Benchmark>("/markets/afxi"),
  fx: () => http.get<FxPair[]>("/markets/fx"),
  fxHeatmap: () => http.get<FxHeatmap>("/markets/fx/heatmap"),
  equities: () => http.get<Equity[]>("/markets/equities"),
  commodities: () => http.get<Commodity[]>("/markets/commodities"),
  movers: () => http.get<Mover[]>("/markets/movers"),
  ticker: () => http.get<TickerItem[]>("/markets/ticker"),
  activePair: () => http.get<ActivePair>("/markets/active-pair"),
  candles: (pair?: string) => http.get<Candle[]>(pair ? `/markets/candles?pair=${enc(pair)}` : "/markets/candles"),
};

export const newsApi = {
  feed: () => http.get<NewsItem[]>("/news"),
  featured: () => http.get<FeatureNews[]>("/news/featured"),
};

export const exploreApi = {
  products: () => http.get<ExploreProduct[]>("/explore/products"),
  layers: () => http.get<ExploreLayer[]>("/explore/layers"),
};

export const watchlistApi = {
  list: () => http.get<Holding[]>("/watchlist"),
  catalog: () => http.get<Holding[]>("/watchlist/catalog"),
  add: (symbol: string) => http.post<Holding[]>("/watchlist", { symbol }),
  remove: (symbol: string) => http.del<void>(`/watchlist/${enc(symbol)}`),
};

export const portfolioApi = {
  overview: () => http.get<Portfolio>("/portfolio"),
  summary: () => http.get<PortfolioSummary>("/portfolio/summary"),
  positions: () => http.get<Position[]>("/portfolio/positions"),
};

export const ordersApi = {
  list: () => http.get<Order[]>("/orders"),
  place: (input: PlaceOrderInput) => http.post<Order>("/orders", input),
  cancel: (id: string) => http.del<Order>(`/orders/${enc(id)}`),
};

export const analyticsApi = {
  get: () => http.get<Analytics>("/analytics"),
};

export const settingsApi = {
  get: () => http.get<Settings>("/settings"),
  update: (settings: Settings) => http.put<Settings>("/settings", settings),
};
