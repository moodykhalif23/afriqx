<script setup lang="ts">
import AppShell from "@/components/shell/AppShell.vue";
import Card from "@/components/ui/Card.vue";
import PriceChange from "@/components/ui/PriceChange.vue";
import DonutChart from "@/components/charts/DonutChart.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { computed } from "vue";
import { portfolioApi, type Portfolio, type Position } from "@/api";
import { useApi } from "@/composables/useApi";
import { useStub } from "@/composables/useStub";

const stub = useStub();

const emptyPortfolio: Portfolio = { total: "—", change: 0, changeAbs: "", allocations: [] };
const { data: portfolio } = useApi(() => portfolioApi.overview(), emptyPortfolio);
const { data: summaryData } = useApi(() => portfolioApi.summary(), null);
const { data: positions } = useApi(() => portfolioApi.positions(), [] as Position[]);

const summary = computed(() => {
  const s = summaryData.value;
  if (!s) return [];
  return [
    { label: "Total Value", value: s.totalValue, change: s.dayChange, suffix: "today" },
    { label: "Total P&L", value: s.totalPnlAbs, change: s.totalPnl, accent: true },
    { label: "Invested", value: s.invested, change: undefined, suffix: undefined, accent: false },
    { label: "Buying Power", value: s.buyingPower, change: undefined, suffix: undefined, accent: false },
  ];
});
</script>

<template>
  <AppShell title="Portfolio">
    <div class="mb-6">
      <h1 class="font-display text-xl font-bold text-ivory sm:text-2xl">Portfolio</h1>
      <p class="text-sm text-platinum-400">Your African holdings, valued in real time.</p>
    </div>

    <div class="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      <div v-for="c in summary" :key="c.label" class="rounded-3xl border border-obsidian-500/60 bg-obsidian-800/80 p-4">
        <div class="text-[11px] uppercase tracking-wider text-platinum-400">{{ c.label }}</div>
        <div class="mt-1 nums text-lg font-bold sm:text-xl" :class="c.accent ? 'text-emerald-300' : 'text-ivory'">{{ c.value }}</div>
        <div v-if="c.change !== undefined" class="mt-1 flex items-center gap-1">
          <PriceChange :value="c.change" percent class="text-xs" />
          <span v-if="c.suffix" class="text-xs text-platinum-400">{{ c.suffix }}</span>
        </div>
      </div>
    </div>

    <div class="mt-5 grid grid-cols-1 gap-5 sm:mt-7 sm:gap-7 xl:grid-cols-[360px_1fr]">
      <Card title="Allocation">
        <DonutChart :data="portfolio.allocations" :height="180" center-label="Total Value" :center-value="portfolio.total" />
        <ul class="mt-4 space-y-2">
          <li v-for="a in portfolio.allocations" :key="a.label" class="flex items-center gap-2 text-xs">
            <span class="h-2.5 w-2.5 rounded-sm" :style="{ backgroundColor: a.color }" />
            <span class="flex-1 text-platinum-200">{{ a.label }}</span>
            <span class="text-platinum-400">{{ a.pct }}%</span>
            <span class="nums w-24 text-right text-ivory">{{ a.value }}</span>
          </li>
        </ul>
      </Card>

      <Card title="Holdings" flush>
        <template #action><button type="button" class="hover:underline" @click="stub('Export', 'Exporting holdings to CSV — coming soon.')">Export</button></template>
        <DataTable :value="positions" dataKey="symbol" scrollable size="small" stripedRows class="p-2 sm:p-3">
          <Column field="symbol" header="Symbol"><template #body="{ data }"><span class="font-semibold text-ivory">{{ data.symbol }}</span></template></Column>
          <Column field="name" header="Name"><template #body="{ data }"><span class="text-platinum-300">{{ data.name }}</span></template></Column>
          <Column header="Qty"><template #body="{ data }"><span class="nums text-platinum-200">{{ data.qty }}</span></template></Column>
          <Column header="Avg Cost"><template #body="{ data }"><span class="nums text-platinum-200">{{ data.avgCost }}</span></template></Column>
          <Column header="Last"><template #body="{ data }"><span class="nums text-platinum-200">{{ data.last }}</span></template></Column>
          <Column header="Value"><template #body="{ data }"><span class="nums font-medium text-ivory">{{ data.value }}</span></template></Column>
          <Column header="Weight"><template #body="{ data }"><span class="nums text-platinum-300">{{ data.weight }}%</span></template></Column>
          <Column header="P&L">
            <template #body="{ data }">
              <PriceChange :value="data.pnl" percent :arrow="false" />
              <div class="nums text-[11px] text-platinum-400">{{ data.pnlAbs }}</div>
            </template>
          </Column>
        </DataTable>
      </Card>
    </div>
  </AppShell>
</template>
