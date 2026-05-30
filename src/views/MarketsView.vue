<script setup lang="ts">
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
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import { COMMODITIES, EQUITIES, FX_PAIRS, INDEXES } from "@/data/mock";

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2 });
</script>

<template>
  <AppShell title="Markets">
    <div class="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="font-display text-xl font-bold text-ivory sm:text-2xl">Markets</h1>
        <p class="text-sm text-platinum-400">African indices, equities, FX and commodities — priced in African value.</p>
      </div>
      <IconField class="w-full sm:w-72">
        <InputIcon class="pi pi-search" />
        <InputText placeholder="Search instruments..." class="w-full" />
      </IconField>
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
          <DataTable :value="INDEXES" dataKey="symbol" scrollable size="small" stripedRows>
            <Column field="symbol" header="Index">
              <template #body="{ data }"><span class="font-semibold text-ivory">{{ data.symbol }}</span></template>
            </Column>
            <Column field="name" header="Name"><template #body="{ data }"><span class="text-platinum-300">{{ data.name }}</span></template></Column>
            <Column header="Value"><template #body="{ data }"><span class="nums text-ivory">{{ fmt(data.value) }}</span></template></Column>
            <Column header="24h"><template #body="{ data }"><PriceChange :value="data.change" percent :arrow="false" /></template></Column>
            <Column header="Trend"><template #body="{ data }"><div class="w-24"><Sparkline :data="data.series" :height="28" /></div></template></Column>
          </DataTable>
        </TabPanel>
        <!-- Equities -->
        <TabPanel value="1">
          <DataTable :value="EQUITIES" dataKey="symbol" scrollable size="small" stripedRows>
            <Column field="symbol" header="Symbol"><template #body="{ data }"><span class="font-semibold text-ivory">{{ data.symbol }}</span></template></Column>
            <Column field="name" header="Name"><template #body="{ data }"><span class="text-platinum-300">{{ data.name }}</span></template></Column>
            <Column header="Exch."><template #body="{ data }"><Tag :value="data.exchange" severity="secondary" /></template></Column>
            <Column field="sector" header="Sector"><template #body="{ data }"><span class="text-platinum-300">{{ data.sector }}</span></template></Column>
            <Column header="Last"><template #body="{ data }"><span class="nums text-ivory">{{ data.last }}</span></template></Column>
            <Column header="24h"><template #body="{ data }"><PriceChange :value="data.change" percent :arrow="false" /></template></Column>
            <Column header="Mkt Cap"><template #body="{ data }"><span class="nums text-platinum-300">{{ data.marketCap }}</span></template></Column>
            <Column header="Volume"><template #body="{ data }"><span class="nums text-platinum-300">{{ data.volume }}</span></template></Column>
            <Column header="Trend"><template #body="{ data }"><div class="w-20"><Sparkline :data="data.series" :height="26" /></div></template></Column>
          </DataTable>
        </TabPanel>
        <!-- FX -->
        <TabPanel value="2">
          <DataTable :value="FX_PAIRS" dataKey="pair" scrollable size="small" stripedRows>
            <Column field="pair" header="Pair"><template #body="{ data }"><span class="font-semibold text-ivory">{{ data.pair }}</span></template></Column>
            <Column field="name" header="Name"><template #body="{ data }"><span class="text-platinum-300">{{ data.name }}</span></template></Column>
            <Column header="Rate"><template #body="{ data }"><span class="nums text-ivory">{{ data.rate }}</span></template></Column>
            <Column header="24h"><template #body="{ data }"><PriceChange :value="data.change" percent :arrow="false" /></template></Column>
          </DataTable>
        </TabPanel>
        <!-- Commodities -->
        <TabPanel value="3">
          <DataTable :value="COMMODITIES" dataKey="symbol" scrollable size="small" stripedRows>
            <Column field="name" header="Commodity"><template #body="{ data }"><span class="font-semibold text-ivory">{{ data.name }}</span></template></Column>
            <Column field="unit" header="Unit"><template #body="{ data }"><span class="text-platinum-400">{{ data.unit }}</span></template></Column>
            <Column header="Price"><template #body="{ data }"><span class="nums text-ivory">{{ data.last }}</span></template></Column>
            <Column header="24h"><template #body="{ data }"><PriceChange :value="data.change" percent :arrow="false" /></template></Column>
            <Column header="Trend"><template #body="{ data }"><div class="w-24"><Sparkline :data="data.series" :height="28" /></div></template></Column>
          </DataTable>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </AppShell>
</template>
