<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import AppShell from "@/components/shell/AppShell.vue";
import Card from "@/components/ui/Card.vue";
import PriceChange from "@/components/ui/PriceChange.vue";
import Sparkline from "@/components/charts/Sparkline.vue";
import CandleChart from "@/components/charts/CandleChart.vue";
import DonutChart from "@/components/charts/DonutChart.vue";
import FxHeatmap from "@/components/charts/FxHeatmap.vue";
import Button from "primevue/button";
import Tag from "primevue/tag";
import { TIMEFRAMES } from "@/data/mock";
import { marketsApi, newsApi, portfolioApi, ordersApi, watchlistApi, type ActivePair, type Portfolio } from "@/api";
import { useApi } from "@/composables/useApi";

const activeTf = ref("1D");

const emptyPair: ActivePair = {
  pair: "—", name: "", flag: "🌍", price: 0, change: 0,
  changeAbs: 0, high24h: 0, low24h: 0, volume24h: "",
};
const emptyPortfolio: Portfolio = { total: "—", change: 0, changeAbs: "", allocations: [] };

const { data: ACTIVE_PAIR } = useApi(() => marketsApi.activePair(), emptyPair);
const { data: candles } = useApi(() => marketsApi.candles(), []);
const { data: movers } = useApi(() => marketsApi.movers(), []);
const { data: news } = useApi(() => newsApi.feed(), []);
const { data: portfolio } = useApi(() => portfolioApi.overview(), emptyPortfolio);
const { data: watchlist } = useApi(() => watchlistApi.list(), []);
const { data: orders } = useApi(() => ordersApi.list(), []);

const newsTop = computed(() => news.value.slice(0, 3));
const recentOrders = computed(() => orders.value.slice(0, 5));
const topWatchlist = computed(() => watchlist.value.slice(0, 6));
</script>

<template>
  <AppShell title="Dashboard">
    <!-- Index strip -->

    <div class="mt-5 grid grid-cols-1 gap-5 sm:mt-7 sm:gap-7 xl:grid-cols-[1fr_360px]">
      <div class="min-w-0 space-y-5 sm:space-y-7">
        <!-- Chart panel -->
        <Card flush>
          <div class="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-obsidian-500/50 px-5 py-4">
            <div class="flex items-center gap-3">
              <span class="grid h-9 w-9 place-items-center rounded-full bg-obsidian-700 text-lg">{{ ACTIVE_PAIR.flag }}</span>
              <div class="leading-tight">
                <div class="font-display text-base font-bold text-ivory">{{ ACTIVE_PAIR.pair }}</div>
                <div class="text-[11px] text-platinum-400">{{ ACTIVE_PAIR.name }}</div>
              </div>
            </div>
            <div class="leading-tight">
              <div class="nums text-2xl font-bold text-ivory">{{ ACTIVE_PAIR.price.toFixed(4) }}</div>
              <PriceChange :value="ACTIVE_PAIR.changeAbs" :decimals="4" class="text-xs" />
              <span class="ml-1 text-xs text-emerald-400">({{ ACTIVE_PAIR.change }}%)</span>
            </div>
            <div class="hidden items-center gap-6 sm:flex">
              <div class="leading-tight"><div class="text-[10px] uppercase tracking-wider text-platinum-400">24h High</div><div class="nums text-sm text-ivory">{{ ACTIVE_PAIR.high24h.toFixed(4) }}</div></div>
              <div class="leading-tight"><div class="text-[10px] uppercase tracking-wider text-platinum-400">24h Low</div><div class="nums text-sm text-ivory">{{ ACTIVE_PAIR.low24h.toFixed(4) }}</div></div>
              <div class="leading-tight"><div class="text-[10px] uppercase tracking-wider text-platinum-400">24h Vol</div><div class="nums text-sm text-ivory">{{ ACTIVE_PAIR.volume24h }}</div></div>
            </div>
            <div class="ml-auto flex items-center gap-2">
              <Button v-tooltip.bottom="'Add to watchlist'" icon="pi pi-star" text rounded severity="warn"
                @click="$router.push('/watchlist')" />
              <Button label="Add to Watchlist" size="small" severity="secondary" outlined
                @click="$router.push('/watchlist')" />
            </div>
          </div>
          <div class="flex items-center gap-1 border-b border-obsidian-500/50 px-3 py-2">
            <button v-for="tf in TIMEFRAMES" :key="tf" type="button"
              class="nums rounded-md px-2.5 py-1 text-xs font-medium"
              :class="tf === activeTf ? 'bg-emerald-500/20 text-emerald-300' : 'text-platinum-400 hover:bg-obsidian-700 hover:text-ivory'"
              @click="activeTf = tf">{{ tf }}</button>
            <div class="ml-auto flex items-center gap-1 text-platinum-400">
              <i class="pi pi-chart-bar text-xs" />
              <i class="pi pi-window-maximize text-xs" />
              <i class="pi pi-camera text-xs" />
            </div>
          </div>
          <div class="afriqx-grid bg-obsidian-900/40 px-2 py-3">
            <CandleChart :candles="candles" :last-price="ACTIVE_PAIR.price" :height="400" />
          </div>
        </Card>

        <!-- Lower trio -->
        <div class="grid grid-cols-1 gap-5 sm:gap-7 lg:grid-cols-3">
          <Card title="Market Movers">
            <template #action><span class="text-emerald-300">Top Gainers</span></template>
            <ul class="space-y-3">
              <li v-for="(m, i) in movers" :key="m.symbol" class="flex items-center gap-3">
                <span class="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-obsidian-600 text-[10px] font-bold text-platinum-200">{{ i + 1 }}</span>
                <div class="min-w-0 flex-1"><div class="truncate text-sm font-medium text-ivory">{{ m.name }}</div><div class="nums text-[11px] text-platinum-400">{{ m.price }}</div></div>
                <div class="w-14"><Sparkline :data="m.series" tone="up" :height="24" /></div>
                <PriceChange :value="m.change" percent :arrow="false" class="w-14 justify-end text-xs" />
              </li>
            </ul>
          </Card>

          <Card title="News & Insights">
            <template #action><RouterLink to="/news">View all</RouterLink></template>
            <ul class="space-y-4">
              <li v-for="n in newsTop" :key="n.title" class="flex gap-3">
                <div class="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-linear-to-br from-obsidian-600 to-obsidian-700 text-platinum-400"><i class="pi pi-image" /></div>
                <div class="min-w-0">
                  <p class="line-clamp-2 text-sm font-medium leading-snug text-ivory">{{ n.title }}</p>
                  <div class="mt-1 flex items-center gap-2"><Tag :value="n.category" severity="success" /><span class="text-[11px] text-platinum-400">{{ n.time }}</span></div>
                </div>
              </li>
            </ul>
          </Card>

          <Card title="Portfolio Overview">
            <template #action><RouterLink to="/portfolio">View full portfolio</RouterLink></template>
            <DonutChart :data="portfolio.allocations" :height="160" center-label="Total Value" :center-value="portfolio.total">
              <template #sub><PriceChange :value="portfolio.change" percent class="text-[11px]" /></template>
            </DonutChart>
            <ul class="mt-4 space-y-3">
              <li v-for="a in portfolio.allocations" :key="a.label" class="flex items-center gap-3">
                <span class="h-2.5 w-2.5 shrink-0 rounded-full" :style="{ backgroundColor: a.color }" />
                <span class="flex-1 text-sm text-platinum-200">{{ a.label }}</span>
                <span class="nums text-sm font-medium text-ivory">{{ a.value }}</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      <!-- Right rail -->
      <div class="space-y-5 sm:space-y-7">
        <Card title="Watchlist">
          <template #action><RouterLink to="/watchlist">View all</RouterLink></template>
          <ul class="space-y-2.5">
            <li v-for="h in topWatchlist" :key="h.symbol" class="flex items-center gap-3">
              <div class="min-w-0 flex-1"><div class="truncate text-sm font-medium text-ivory">{{ h.name }}</div></div>
              <span class="nums text-sm text-platinum-200">{{ h.price }}</span>
              <PriceChange :value="h.change" percent :arrow="false" class="w-16 justify-end text-xs" />
            </li>
          </ul>
        </Card>

        <FxHeatmap />

        <Card title="Recent Orders" flush>
          <template #action><RouterLink to="/orders">View all</RouterLink></template>
          <div class="px-5 pb-4">
            <table class="w-full text-left text-xs">
              <thead><tr class="text-[10px] uppercase tracking-wider text-platinum-400">
                <th class="pb-2 font-medium">Symbol</th><th class="pb-2 font-medium">Side</th><th class="pb-2 text-right font-medium">Price</th>
              </tr></thead>
              <tbody class="divide-y divide-obsidian-500/40">
                <tr v-for="o in recentOrders" :key="o.id">
                  <td class="py-2 font-medium text-ivory">{{ o.symbol }}</td>
                  <td class="py-2 font-semibold" :class="o.side === 'Buy' ? 'text-emerald-400' : 'text-down'">{{ o.side }}</td>
                  <td class="nums py-2 text-right text-platinum-200">{{ o.price }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  </AppShell>
</template>
