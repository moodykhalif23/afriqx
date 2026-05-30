<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import Menu from "primevue/menu";

const route = useRoute();
const menu = ref();

const primary = [
  { label: "Home", icon: "pi pi-objects-column", to: "/", match: "Dashboard" },
  { label: "Markets", icon: "pi pi-chart-line", to: "/markets", match: "Markets" },
];
const secondary = [
  { label: "Portfolio", icon: "pi pi-briefcase", to: "/portfolio", match: "Portfolio" },
];
const moreItems = [
  { label: "Watchlist", icon: "pi pi-eye", route: "/watchlist" },
  { label: "Orders", icon: "pi pi-receipt", route: "/orders" },
  { label: "Analytics", icon: "pi pi-chart-bar", route: "/analytics" },
  { label: "News & Insights", icon: "pi pi-megaphone", route: "/news" },
  { label: "AFX Explore", icon: "pi pi-compass", route: "/explore" },
  { label: "Settings", icon: "pi pi-cog", route: "/settings" },
];
</script>

<template>
  <nav
    class="relative z-20 flex h-16 shrink-0 items-stretch border-t border-obsidian-500/60 bg-obsidian-850 pb-[env(safe-area-inset-bottom)] lg:hidden"
  >
    <RouterLink
      v-for="t in primary" :key="t.label" :to="t.to"
      class="flex w-1/5 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors"
      :class="route.name === t.match ? 'text-emerald-300' : 'text-platinum-400'"
    >
      <i :class="t.icon" style="font-size: 1.25rem" />
      <span>{{ t.label }}</span>
    </RouterLink>

    <div class="relative flex w-1/5 items-start justify-center">
      <RouterLink to="/trade" aria-label="Trade"
        class="absolute -top-5 grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-obsidian-950 shadow-lg shadow-emerald-900/50 ring-4 ring-obsidian-850 active:bg-emerald-400">
        <i class="pi pi-arrow-right-arrow-left" style="font-size: 1.4rem" />
      </RouterLink>
      <span class="mt-9 text-[10px] font-medium text-platinum-400">Trade</span>
    </div>

    <RouterLink
      v-for="t in secondary" :key="t.label" :to="t.to"
      class="flex w-1/5 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors"
      :class="route.name === t.match ? 'text-emerald-300' : 'text-platinum-400'"
    >
      <i :class="t.icon" style="font-size: 1.25rem" />
      <span>{{ t.label }}</span>
    </RouterLink>

    <button type="button"
      class="flex w-1/5 flex-col items-center justify-center gap-1 text-[10px] font-medium text-platinum-400"
      @click="menu.toggle($event)">
      <i class="pi pi-bars" style="font-size: 1.25rem" />
      <span>More</span>
    </button>
    <Menu ref="menu" popup :model="moreItems.map((m) => ({ label: m.label, icon: m.icon, command: () => $router.push(m.route) }))" />
  </nav>
</template>
