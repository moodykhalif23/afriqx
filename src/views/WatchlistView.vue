<script setup lang="ts">
import AppShell from "@/components/shell/AppShell.vue";
import PriceChange from "@/components/ui/PriceChange.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import { WATCHLIST } from "@/data/mock";
</script>

<template>
  <AppShell title="Watchlist">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="font-display text-xl font-bold text-ivory sm:text-2xl">Watchlist</h1>
        <p class="text-sm text-platinum-400">{{ WATCHLIST.length }} instruments you're tracking.</p>
      </div>
      <Button label="Add instrument" icon="pi pi-plus" size="small" class="font-display font-semibold" />
    </div>

    <DataTable :value="WATCHLIST" dataKey="symbol" scrollable stripedRows
      class="rounded-2xl border border-obsidian-500/60 bg-obsidian-800/80 p-2 sm:p-3">
      <Column field="symbol" header="Symbol"><template #body="{ data }"><span class="font-semibold text-ivory">{{ data.symbol }}</span></template></Column>
      <Column field="name" header="Name"><template #body="{ data }"><span class="text-platinum-300">{{ data.name }}</span></template></Column>
      <Column header="Last Price"><template #body="{ data }"><span class="nums text-ivory">{{ data.price }}</span></template></Column>
      <Column header="24h Change"><template #body="{ data }"><PriceChange :value="data.change" percent :arrow="false" /></template></Column>
      <Column header=""><template #body><Button label="Trade" size="small" severity="secondary" outlined /></template></Column>
    </DataTable>
  </AppShell>
</template>
