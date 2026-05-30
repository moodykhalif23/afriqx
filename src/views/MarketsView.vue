<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import AppShell from "@/components/shell/AppShell.vue";
import PriceChange from "@/components/ui/PriceChange.vue";
import Sparkline from "@/components/charts/Sparkline.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import Tag from "primevue/tag";
import Button from "primevue/button";
import Select from "primevue/select";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import { FilterMatchMode, FilterOperator } from "@primevue/core/api";
import { marketsApi } from "@/api";
import { useApi } from "@/composables/useApi";

const { data: indices, loading: loadingIndices } = useApi(() => marketsApi.indices(), []);
const { data: equities, loading: loadingEquities } = useApi(() => marketsApi.equities(), []);
const { data: fxPairs, loading: loadingFx } = useApi(() => marketsApi.fx(), []);
const { data: commodities, loading: loadingCommodities } = useApi(() => marketsApi.commodities(), []);

const exchanges = computed(() => [...new Set(equities.value.map((e) => e.exchange))].sort());
const sectors = computed(() => [...new Set(equities.value.map((e) => e.sector))].sort());

const txt = () => ({ operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] });
const starts = () => ({ operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] });
const num = () => ({ operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO }] });
const sel = () => ({ value: null, matchMode: FilterMatchMode.EQUALS });
const glob = () => ({ value: null, matchMode: FilterMatchMode.CONTAINS });

const fIndices = ref();
const fEquities = ref();
const fFx = ref();
const fCommodities = ref();

function initFilters() {
  fIndices.value = { global: glob(), symbol: starts(), name: txt(), value: num(), change: num() };
  fEquities.value = { global: glob(), symbol: starts(), name: txt(), exchange: sel(), sector: sel(), change: num() };
  fFx.value = { global: glob(), pair: starts(), name: txt(), rate: num(), change: num() };
  fCommodities.value = { global: glob(), name: txt(), unit: txt(), change: num() };
}
initFilters();
const clearFilter = () => initFilters();

// Seed every table's global search from a ?q= term (e.g. the top-bar search).
function applyGlobal(q: string | null) {
  for (const f of [fIndices, fEquities, fFx, fCommodities]) f.value.global.value = q;
}
const route = useRoute();
if (typeof route.query.q === "string") applyGlobal(route.query.q);
watch(() => route.query.q, (q) => applyGlobal(typeof q === "string" ? q : null));

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2 });
</script>

<template>
  <AppShell title="Markets">
    <div class="mb-6">
      <h1 class="font-display text-xl font-bold text-ivory sm:text-2xl">Markets</h1>
      <p class="text-sm text-platinum-400">African indices, equities, FX and commodities — priced in African value.</p>
    </div>

    <Tabs value="0">
      <TabList>
        <Tab value="0">Indices</Tab>
        <Tab value="1">Equities</Tab>
        <Tab value="2">FX</Tab>
        <Tab value="3">Commodities</Tab>
      </TabList>
      <TabPanels>
        <!-- Indices -->
        <TabPanel value="0">
          <DataTable v-model:filters="fIndices" :value="indices" :loading="loadingIndices" dataKey="symbol"
            paginator showGridlines :rows="10" filterDisplay="menu" :globalFilterFields="['symbol', 'name']" stripedRows scrollable>
            <template #header>
              <div class="flex flex-wrap items-center justify-between gap-3">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined size="small" @click="clearFilter" />
                <IconField><InputIcon class="pi pi-search" /><InputText v-model="fIndices['global'].value" placeholder="Keyword search" /></IconField>
              </div>
            </template>
            <template #empty>No indices found.</template>
            <template #loading>Loading indices…</template>
            <Column field="symbol" header="Index" style="min-width: 12rem">
              <template #body="{ data }"><span class="font-semibold text-ivory">{{ data.symbol }}</span></template>
              <template #filter="{ filterModel }"><InputText v-model="filterModel.value" type="text" placeholder="Search by symbol" /></template>
            </Column>
            <Column field="name" header="Name" style="min-width: 14rem">
              <template #body="{ data }"><span class="text-platinum-300">{{ data.name }}</span></template>
              <template #filter="{ filterModel }"><InputText v-model="filterModel.value" type="text" placeholder="Search by name" /></template>
            </Column>
            <Column field="value" header="Value" dataType="numeric" style="min-width: 10rem">
              <template #body="{ data }"><span class="nums text-ivory">{{ fmt(data.value) }}</span></template>
              <template #filter="{ filterModel }"><InputNumber v-model="filterModel.value" placeholder="≥ value" /></template>
            </Column>
            <Column field="change" header="24h" dataType="numeric" style="min-width: 9rem">
              <template #body="{ data }"><PriceChange :value="data.change" percent :arrow="false" /></template>
              <template #filter="{ filterModel }"><InputNumber v-model="filterModel.value" suffix="%" placeholder="≥ change" /></template>
            </Column>
            <Column header="Trend"><template #body="{ data }"><div class="w-24"><Sparkline :data="data.series" :height="28" /></div></template></Column>
          </DataTable>
        </TabPanel>

        <!-- Equities -->
        <TabPanel value="1">
          <DataTable v-model:filters="fEquities" :value="equities" :loading="loadingEquities" dataKey="symbol"
            paginator showGridlines :rows="10" filterDisplay="menu" :globalFilterFields="['symbol', 'name', 'exchange', 'sector']" stripedRows scrollable>
            <template #header>
              <div class="flex flex-wrap items-center justify-between gap-3">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined size="small" @click="clearFilter" />
                <IconField><InputIcon class="pi pi-search" /><InputText v-model="fEquities['global'].value" placeholder="Keyword search" /></IconField>
              </div>
            </template>
            <template #empty>No equities found.</template>
            <template #loading>Loading equities…</template>
            <Column field="symbol" header="Symbol" style="min-width: 11rem">
              <template #body="{ data }"><span class="font-semibold text-ivory">{{ data.symbol }}</span></template>
              <template #filter="{ filterModel }"><InputText v-model="filterModel.value" type="text" placeholder="Search by symbol" /></template>
            </Column>
            <Column field="name" header="Name" style="min-width: 13rem">
              <template #body="{ data }"><span class="text-platinum-300">{{ data.name }}</span></template>
              <template #filter="{ filterModel }"><InputText v-model="filterModel.value" type="text" placeholder="Search by name" /></template>
            </Column>
            <Column field="exchange" header="Exch." :showFilterMatchModes="false" style="min-width: 10rem">
              <template #body="{ data }"><Tag :value="data.exchange" severity="secondary" /></template>
              <template #filter="{ filterModel }"><Select v-model="filterModel.value" :options="exchanges" placeholder="Any" showClear /></template>
            </Column>
            <Column field="sector" header="Sector" :showFilterMatchModes="false" style="min-width: 11rem">
              <template #body="{ data }"><span class="text-platinum-300">{{ data.sector }}</span></template>
              <template #filter="{ filterModel }"><Select v-model="filterModel.value" :options="sectors" placeholder="Any" showClear /></template>
            </Column>
            <Column header="Last"><template #body="{ data }"><span class="nums text-ivory">{{ data.last }}</span></template></Column>
            <Column field="change" header="24h" dataType="numeric" style="min-width: 9rem">
              <template #body="{ data }"><PriceChange :value="data.change" percent :arrow="false" /></template>
              <template #filter="{ filterModel }"><InputNumber v-model="filterModel.value" suffix="%" placeholder="≥ change" /></template>
            </Column>
            <Column header="Mkt Cap"><template #body="{ data }"><span class="nums text-platinum-300">{{ data.marketCap }}</span></template></Column>
            <Column header="Volume"><template #body="{ data }"><span class="nums text-platinum-300">{{ data.volume }}</span></template></Column>
            <Column header="Trend"><template #body="{ data }"><div class="w-20"><Sparkline :data="data.series" :height="26" /></div></template></Column>
          </DataTable>
        </TabPanel>

        <!-- FX -->
        <TabPanel value="2">
          <DataTable v-model:filters="fFx" :value="fxPairs" :loading="loadingFx" dataKey="pair"
            paginator showGridlines :rows="10" filterDisplay="menu" :globalFilterFields="['pair', 'name']" stripedRows scrollable>
            <template #header>
              <div class="flex flex-wrap items-center justify-between gap-3">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined size="small" @click="clearFilter" />
                <IconField><InputIcon class="pi pi-search" /><InputText v-model="fFx['global'].value" placeholder="Keyword search" /></IconField>
              </div>
            </template>
            <template #empty>No pairs found.</template>
            <template #loading>Loading FX pairs…</template>
            <Column field="pair" header="Pair" style="min-width: 11rem">
              <template #body="{ data }"><span class="font-semibold text-ivory">{{ data.pair }}</span></template>
              <template #filter="{ filterModel }"><InputText v-model="filterModel.value" type="text" placeholder="Search by pair" /></template>
            </Column>
            <Column field="name" header="Name" style="min-width: 13rem">
              <template #body="{ data }"><span class="text-platinum-300">{{ data.name }}</span></template>
              <template #filter="{ filterModel }"><InputText v-model="filterModel.value" type="text" placeholder="Search by name" /></template>
            </Column>
            <Column field="rate" header="Rate" dataType="numeric" style="min-width: 9rem">
              <template #body="{ data }"><span class="nums text-ivory">{{ data.rate }}</span></template>
              <template #filter="{ filterModel }"><InputNumber v-model="filterModel.value" :maxFractionDigits="4" placeholder="≥ rate" /></template>
            </Column>
            <Column field="change" header="24h" dataType="numeric" style="min-width: 9rem">
              <template #body="{ data }"><PriceChange :value="data.change" percent :arrow="false" /></template>
              <template #filter="{ filterModel }"><InputNumber v-model="filterModel.value" suffix="%" placeholder="≥ change" /></template>
            </Column>
          </DataTable>
        </TabPanel>

        <!-- Commodities -->
        <TabPanel value="3">
          <DataTable v-model:filters="fCommodities" :value="commodities" :loading="loadingCommodities" dataKey="symbol"
            paginator showGridlines :rows="10" filterDisplay="menu" :globalFilterFields="['name', 'unit']" stripedRows scrollable>
            <template #header>
              <div class="flex flex-wrap items-center justify-between gap-3">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined size="small" @click="clearFilter" />
                <IconField><InputIcon class="pi pi-search" /><InputText v-model="fCommodities['global'].value" placeholder="Keyword search" /></IconField>
              </div>
            </template>
            <template #empty>No commodities found.</template>
            <template #loading>Loading commodities…</template>
            <Column field="name" header="Commodity" style="min-width: 12rem">
              <template #body="{ data }"><span class="font-semibold text-ivory">{{ data.name }}</span></template>
              <template #filter="{ filterModel }"><InputText v-model="filterModel.value" type="text" placeholder="Search by name" /></template>
            </Column>
            <Column field="unit" header="Unit" style="min-width: 9rem">
              <template #body="{ data }"><span class="text-platinum-400">{{ data.unit }}</span></template>
              <template #filter="{ filterModel }"><InputText v-model="filterModel.value" type="text" placeholder="Search by unit" /></template>
            </Column>
            <Column header="Price"><template #body="{ data }"><span class="nums text-ivory">{{ data.last }}</span></template></Column>
            <Column field="change" header="24h" dataType="numeric" style="min-width: 9rem">
              <template #body="{ data }"><PriceChange :value="data.change" percent :arrow="false" /></template>
              <template #filter="{ filterModel }"><InputNumber v-model="filterModel.value" suffix="%" placeholder="≥ change" /></template>
            </Column>
            <Column header="Trend"><template #body="{ data }"><div class="w-24"><Sparkline :data="data.series" :height="28" /></div></template></Column>
          </DataTable>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </AppShell>
</template>
