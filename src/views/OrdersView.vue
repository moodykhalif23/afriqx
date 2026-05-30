<script setup lang="ts">
import { computed, ref } from "vue";
import AppShell from "@/components/shell/AppShell.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import { ORDERS, type OrderRow } from "@/data/mock";

const active = ref("0");
const rows = computed(() =>
  active.value === "1"
    ? ORDERS.filter((o) => o.status === "Pending")
    : active.value === "2"
    ? ORDERS.filter((o) => o.status === "Filled")
    : ORDERS
);
const sev = (s: OrderRow["status"]) =>
  s === "Filled" ? "success" : s === "Pending" ? "warn" : "secondary";
</script>

<template>
  <AppShell title="Orders">
    <div class="mb-6">
      <h1 class="font-display text-xl font-bold text-ivory sm:text-2xl">Orders</h1>
      <p class="text-sm text-platinum-400">Your order history across all African markets.</p>
    </div>

    <Tabs v-model:value="active">
      <TabList>
        <Tab value="0">All</Tab>
        <Tab value="1">Open</Tab>
        <Tab value="2">Filled</Tab>
      </TabList>
    </Tabs>

    <DataTable :value="rows" dataKey="date" scrollable size="small" stripedRows class="mt-4">
      <Column field="symbol" header="Symbol"><template #body="{ data }"><span class="font-semibold text-ivory">{{ data.symbol }}</span></template></Column>
      <Column field="date" header="Date"><template #body="{ data }"><span class="nums text-platinum-300">{{ data.date }}</span></template></Column>
      <Column field="type" header="Type"><template #body="{ data }"><span class="text-platinum-200">{{ data.type }}</span></template></Column>
      <Column header="Side"><template #body="{ data }"><span class="font-semibold" :class="data.side === 'Buy' ? 'text-emerald-400' : 'text-down'">{{ data.side }}</span></template></Column>
      <Column header="Qty"><template #body="{ data }"><span class="nums text-platinum-200">{{ data.qty }}</span></template></Column>
      <Column header="Price"><template #body="{ data }"><span class="nums text-ivory">{{ data.price }}</span></template></Column>
      <Column header="Status"><template #body="{ data }"><Tag :value="data.status" :severity="sev(data.status)" /></template></Column>
    </DataTable>
  </AppShell>
</template>
