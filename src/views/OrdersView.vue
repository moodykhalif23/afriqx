<script setup lang="ts">
import { computed, ref } from "vue";
import AppShell from "@/components/shell/AppShell.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Button from "primevue/button";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import { ordersApi, ApiError, type Order } from "@/api";
import { useApi } from "@/composables/useApi";
import { useStub } from "@/composables/useStub";

const toast = useStub();
const active = ref("0");
const { data: orders, refresh } = useApi(() => ordersApi.list(), [] as Order[]);

const rows = computed(() =>
  active.value === "1"
    ? orders.value.filter((o) => o.status === "Pending")
    : active.value === "2"
    ? orders.value.filter((o) => o.status === "Filled")
    : orders.value
);
const sev = (s: Order["status"]) =>
  s === "Filled" ? "success" : s === "Pending" ? "warn" : "secondary";

async function cancel(id: string) {
  try {
    await ordersApi.cancel(id);
    toast("Order cancelled", "The pending order was cancelled.", "success");
    await refresh();
  } catch (e) {
    toast("Could not cancel", e instanceof ApiError ? e.message : "Try again.", "warn");
  }
}
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

    <DataTable :value="rows" dataKey="id" scrollable size="small" stripedRows class="mt-4">
      <Column field="symbol" header="Symbol"><template #body="{ data }"><span class="font-semibold text-ivory">{{ data.symbol }}</span></template></Column>
      <Column field="date" header="Date"><template #body="{ data }"><span class="nums text-platinum-300">{{ data.date }}</span></template></Column>
      <Column field="type" header="Type"><template #body="{ data }"><span class="text-platinum-200">{{ data.type }}</span></template></Column>
      <Column header="Side"><template #body="{ data }"><span class="font-semibold" :class="data.side === 'Buy' ? 'text-emerald-400' : 'text-down'">{{ data.side }}</span></template></Column>
      <Column header="Qty"><template #body="{ data }"><span class="nums text-platinum-200">{{ data.qty }}</span></template></Column>
      <Column header="Price"><template #body="{ data }"><span class="nums text-ivory">{{ data.price }}</span></template></Column>
      <Column header="Status"><template #body="{ data }"><Tag :value="data.status" :severity="sev(data.status)" /></template></Column>
      <Column header="">
        <template #body="{ data }">
          <Button v-if="data.status === 'Pending'" label="Cancel" size="small" text severity="danger"
            @click="cancel(data.id)" />
        </template>
      </Column>
    </DataTable>
  </AppShell>
</template>
