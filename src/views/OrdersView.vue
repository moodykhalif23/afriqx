<script setup lang="ts">
import { ref } from "vue";
import AppShell from "@/components/shell/AppShell.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Button from "primevue/button";
import Select from "primevue/select";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import { FilterMatchMode, FilterOperator } from "@primevue/core/api";
import { ordersApi, ApiError, type Order } from "@/api";
import { useApi } from "@/composables/useApi";
import { useStub } from "@/composables/useStub";

const toast = useStub();
const { data: orders, loading, refresh } = useApi(() => ordersApi.list(), [] as Order[]);

const types = ["Market", "Limit", "Stop"];
const sides = ["Buy", "Sell"];
const statuses = ["Filled", "Pending", "Cancelled"];

const filters = ref();
function initFilters() {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    symbol: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    type: { value: null, matchMode: FilterMatchMode.EQUALS },
    side: { value: null, matchMode: FilterMatchMode.EQUALS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
  };
}
initFilters();
const clearFilter = () => initFilters();

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

    <DataTable
      v-model:filters="filters" :value="orders" :loading="loading" dataKey="id"
      paginator showGridlines :rows="10" filterDisplay="menu"
      :globalFilterFields="['symbol', 'date', 'type', 'side', 'status', 'qty', 'price']"
      stripedRows scrollable
    >
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-3">
          <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined size="small" @click="clearFilter" />
          <IconField>
            <InputIcon class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Keyword search" />
          </IconField>
        </div>
      </template>
      <template #empty>No orders found.</template>
      <template #loading>Loading orders…</template>

      <Column field="symbol" header="Symbol" style="min-width: 12rem">
        <template #body="{ data }"><span class="font-semibold text-ivory">{{ data.symbol }}</span></template>
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" type="text" placeholder="Search by symbol" />
        </template>
      </Column>
      <Column field="date" header="Date" style="min-width: 11rem">
        <template #body="{ data }"><span class="nums text-platinum-300">{{ data.date }}</span></template>
      </Column>
      <Column field="type" header="Type" :showFilterMatchModes="false" style="min-width: 9rem">
        <template #body="{ data }"><span class="text-platinum-200">{{ data.type }}</span></template>
        <template #filter="{ filterModel }">
          <Select v-model="filterModel.value" :options="types" placeholder="Any" showClear />
        </template>
      </Column>
      <Column field="side" header="Side" :showFilterMatchModes="false" style="min-width: 9rem">
        <template #body="{ data }">
          <span class="font-semibold" :class="data.side === 'Buy' ? 'text-emerald-400' : 'text-down'">{{ data.side }}</span>
        </template>
        <template #filter="{ filterModel }">
          <Select v-model="filterModel.value" :options="sides" placeholder="Any" showClear />
        </template>
      </Column>
      <Column field="qty" header="Qty" style="min-width: 8rem">
        <template #body="{ data }"><span class="nums text-platinum-200">{{ data.qty }}</span></template>
      </Column>
      <Column field="price" header="Price" style="min-width: 9rem">
        <template #body="{ data }"><span class="nums text-ivory">{{ data.price }}</span></template>
      </Column>
      <Column field="status" header="Status" :showFilterMatchModes="false" :filterMenuStyle="{ width: '12rem' }" style="min-width: 11rem">
        <template #body="{ data }"><Tag :value="data.status" :severity="sev(data.status)" /></template>
        <template #filter="{ filterModel }">
          <Select v-model="filterModel.value" :options="statuses" placeholder="Any" showClear>
            <template #option="{ option }"><Tag :value="option" :severity="sev(option)" /></template>
          </Select>
        </template>
      </Column>
      <Column header="" style="min-width: 7rem">
        <template #body="{ data }">
          <Button v-if="data.status === 'Pending'" label="Cancel" size="small" text severity="danger" @click="cancel(data.id)" />
        </template>
      </Column>
    </DataTable>
  </AppShell>
</template>
