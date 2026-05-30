<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import AppShell from "@/components/shell/AppShell.vue";
import PriceChange from "@/components/ui/PriceChange.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Select from "primevue/select";
import { watchlistApi, ApiError, type Holding } from "@/api";
import { useApi } from "@/composables/useApi";
import { useStub } from "@/composables/useStub";

const router = useRouter();
const toast = useStub();

const { data: watchlist, refresh } = useApi(() => watchlistApi.list(), [] as Holding[]);
const { data: catalog } = useApi(() => watchlistApi.catalog(), [] as Holding[]);

const dialogOpen = ref(false);
const selected = ref<string | null>(null);
const busy = ref(false);

// Catalog instruments not already on the watchlist.
const addable = computed(() => {
  const have = new Set(watchlist.value.map((h) => h.symbol));
  return catalog.value.filter((h) => !have.has(h.symbol));
});

function openAdd() {
  selected.value = null;
  dialogOpen.value = true;
}

async function add() {
  if (!selected.value) return;
  busy.value = true;
  try {
    await watchlistApi.add(selected.value);
    await refresh();
    dialogOpen.value = false;
    toast("Added", "Instrument added to your watchlist.", "success");
  } catch (e) {
    toast("Could not add", e instanceof ApiError ? e.message : "Try again.", "warn");
  } finally {
    busy.value = false;
  }
}

async function remove(symbol: string) {
  try {
    await watchlistApi.remove(symbol);
    await refresh();
  } catch (e) {
    toast("Could not remove", e instanceof ApiError ? e.message : "Try again.", "warn");
  }
}
</script>

<template>
  <AppShell title="Watchlist">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="font-display text-xl font-bold text-ivory sm:text-2xl">Watchlist</h1>
        <p class="text-sm text-platinum-400">{{ watchlist.length }} instruments you're tracking.</p>
      </div>
      <Button label="Add instrument" icon="pi pi-plus" size="small" class="font-display font-semibold"
        :disabled="!addable.length" @click="openAdd" />
    </div>

    <DataTable :value="watchlist" dataKey="symbol" scrollable stripedRows>
      <Column field="symbol" header="Symbol"><template #body="{ data }"><span class="font-semibold text-ivory">{{ data.symbol }}</span></template></Column>
      <Column field="name" header="Name"><template #body="{ data }"><span class="text-platinum-300">{{ data.name }}</span></template></Column>
      <Column header="Last Price"><template #body="{ data }"><span class="nums text-ivory">{{ data.price }}</span></template></Column>
      <Column header="24h Change"><template #body="{ data }"><PriceChange :value="data.change" percent :arrow="false" /></template></Column>
      <Column header="">
        <template #body="{ data }">
          <div class="flex items-center justify-end gap-1">
            <Button label="Trade" size="small" severity="secondary" outlined @click="router.push('/trade')" />
            <Button v-tooltip.bottom="'Remove'" icon="pi pi-trash" size="small" text rounded severity="danger"
              @click="remove(data.symbol)" />
          </div>
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="dialogOpen" modal header="Add instrument" :style="{ width: '24rem' }">
      <p class="mb-3 text-sm text-platinum-400">Pick an instrument to track.</p>
      <Select v-model="selected" :options="addable" optionLabel="name" optionValue="symbol"
        placeholder="Select an instrument" class="w-full" filter>
        <template #option="{ option }">
          <div class="flex w-full items-center justify-between gap-3">
            <span><span class="font-semibold text-ivory">{{ option.symbol }}</span>
              <span class="ml-2 text-platinum-400">{{ option.name }}</span></span>
            <span class="nums text-platinum-300">{{ option.price }}</span>
          </div>
        </template>
      </Select>
      <template #footer>
        <Button label="Cancel" text severity="secondary" @click="dialogOpen = false" />
        <Button label="Add" :disabled="!selected" :loading="busy" @click="add" />
      </template>
    </Dialog>
  </AppShell>
</template>
