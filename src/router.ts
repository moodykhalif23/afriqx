import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: "/", name: "Dashboard", component: () => import("@/views/DashboardView.vue") },
    { path: "/markets", name: "Markets", component: () => import("@/views/MarketsView.vue") },
    { path: "/watchlist", name: "Watchlist", component: () => import("@/views/WatchlistView.vue") },
    { path: "/trade", name: "Trade", component: () => import("@/views/TradeView.vue") },
    { path: "/portfolio", name: "Portfolio", component: () => import("@/views/PortfolioView.vue") },
    { path: "/orders", name: "Orders", component: () => import("@/views/OrdersView.vue") },
    { path: "/analytics", name: "Analytics", component: () => import("@/views/AnalyticsView.vue") },
    { path: "/news", name: "News & Insights", component: () => import("@/views/NewsView.vue") },
    { path: "/explore", name: "AFX Explore", component: () => import("@/views/ExploreView.vue") },
    { path: "/settings", name: "Settings", component: () => import("@/views/SettingsView.vue") },
  ],
});
