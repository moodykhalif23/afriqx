<script setup lang="ts">
import AppShell from "@/components/shell/AppShell.vue";
import Card from "@/components/ui/Card.vue";
import PriceChange from "@/components/ui/PriceChange.vue";
import LineChart from "@/components/charts/LineChart.vue";
import FxHeatmap from "@/components/charts/FxHeatmap.vue";
import { ANALYTICS_STATS, PERFORMANCE, SECTOR_ALLOCATION } from "@/data/mock";

const perfLabels = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
const intel = [
  { k: "Cross-border flow", v: "₦2.4T", d: "24h" },
  { k: "Active markets", v: "9", d: "exchanges" },
  { k: "FX pairs live", v: "42", d: "direct" },
  { k: "Liquidity depth", v: "Strong", d: "AFXI 98.65" },
];
</script>

<template>
  <AppShell title="Analytics">
    <div class="mb-6">
      <h1 class="font-display text-xl font-bold text-ivory sm:text-2xl">Analytics</h1>
      <p class="text-sm text-platinum-400">Performance, allocation and continental FX intelligence.</p>
    </div>

    <div class="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      <div v-for="st in ANALYTICS_STATS" :key="st.label" class="rounded-3xl border border-obsidian-500/60 bg-obsidian-800/80 p-4">
        <div class="text-[11px] uppercase tracking-wider text-platinum-400">{{ st.label }}</div>
        <div class="mt-1 nums text-xl font-bold text-ivory sm:text-2xl">{{ st.value }}</div>
        <div class="mt-1">
          <PriceChange v-if="st.change !== undefined" :value="st.change" percent class="text-xs" />
          <span v-else class="text-xs text-platinum-400">{{ st.sub }}</span>
        </div>
      </div>
    </div>

    <div class="mt-5 grid grid-cols-1 gap-5 sm:mt-7 sm:gap-7 lg:grid-cols-[1fr_360px]">
      <Card title="Portfolio Performance">
        <template #action><span>12M · rebased 100</span></template>
        <div class="mb-3 flex items-end gap-3">
          <span class="nums text-3xl font-bold text-ivory">{{ PERFORMANCE[PERFORMANCE.length - 1].toFixed(1) }}</span>
          <PriceChange :value="PERFORMANCE[PERFORMANCE.length - 1] - 100" percent class="pb-1 text-sm" />
        </div>
        <LineChart :data="PERFORMANCE" :labels="perfLabels" :height="240" tone="up" />
      </Card>

      <Card title="Sector Allocation">
        <ul class="space-y-4">
          <li v-for="s in SECTOR_ALLOCATION" :key="s.label">
            <div class="mb-1.5 flex items-center justify-between text-sm">
              <span class="text-platinum-200">{{ s.label }}</span>
              <span class="nums font-medium text-ivory">{{ s.pct }}%</span>
            </div>
            <div class="h-2 w-full overflow-hidden rounded-full bg-obsidian-600">
              <div class="h-full rounded-full" :style="{ width: s.pct + '%', backgroundColor: s.color }" />
            </div>
          </li>
        </ul>
      </Card>
    </div>

    <div class="mt-5 grid grid-cols-1 gap-5 sm:mt-7 sm:gap-7 lg:grid-cols-2">
      <FxHeatmap />
      <Card title="Continental Intelligence">
        <div class="grid grid-cols-2 gap-3">
          <div v-for="x in intel" :key="x.k" class="rounded-xl border border-obsidian-500/60 bg-obsidian-900 p-3">
            <div class="text-[10px] uppercase tracking-wider text-platinum-400">{{ x.k }}</div>
            <div class="nums mt-1 text-lg font-bold text-ivory">{{ x.v }}</div>
            <div class="text-[11px] text-platinum-400">{{ x.d }}</div>
          </div>
        </div>
      </Card>
    </div>
  </AppShell>
</template>
