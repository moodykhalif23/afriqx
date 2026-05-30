import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from "@/stores/auth";

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    // Public auth pages (no app shell)
    { path: "/login", name: "Login", component: () => import("@/views/LoginView.vue"), meta: { public: true } },
    { path: "/register", name: "Register", component: () => import("@/views/RegisterView.vue"), meta: { public: true } },

    // Authenticated app
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

// Auth guard: protected routes require a token; signed-in users skip auth pages.
router.beforeEach((to) => {
  const authed = isAuthenticated.value;
  if (!to.meta.public && !authed) {
    return { name: "Login", query: to.fullPath === "/" ? {} : { redirect: to.fullPath } };
  }
  if (to.meta.public && authed) {
    return { name: "Dashboard" };
  }
  return true;
});
