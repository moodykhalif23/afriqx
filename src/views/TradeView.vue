<script setup lang="ts">
import { computed, ref } from "vue";
import AppShell from "@/components/shell/AppShell.vue";
import Card from "@/components/ui/Card.vue";
import PriceChange from "@/components/ui/PriceChange.vue";
import LineChart from "@/components/charts/LineChart.vue";
import SelectButton from "primevue/selectbutton";
import Select from "primevue/select";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import { ACTIVE_PAIR, CANDLES, TRADE_PAIRS } from "@/data/mock";

const RATE_IN_KES: Record<string, number> = { KES: 1, NGN: 0.1524, ZAR: 6.95, GHS: 8.6, EGP: 2.6 };
const tabs = ["Buy", "Sell", "FX", "Convert"];
const tab = ref("Buy");
const isExchange = computed(() => tab.value === "FX" || tab.value === "Convert");

const from = ref("NGN");
const to = ref("KES");
const amount = ref(1_000_000);
const rate = computed(() => (RATE_IN_KES[from.value] ?? 1) / (RATE_IN_KES[to.value] ?? 1));
const converted = computed(() => (amount.value || 0) * rate.value);

const orderType = ref("Market");
const qty = ref(100);
const limitPrice = ref(682.5);
const estCost = computed(() => (qty.value || 0) * (orderType.value === "Market" ? 682.5 : (limitPrice.value || 0)));

const closes = CANDLES.map((c) => c.close);
const ccyOptions = TRADE_PAIRS.map((p) => p.code);
const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const faq = [
  { q: "Direct African conversion", a: "Convert NGN → KES directly without routing through the US Dollar, removing a layer of cost and delay." },
  { q: "Faster settlement", a: "Fewer intermediaries means trades clear faster and you lose less to the spread on every conversion." },
  { q: "Improved regional liquidity", a: "African-denominated order flow deepens local liquidity, tightening prices across connected markets." },
  { q: "Lower cross-border costs", a: "Reduced FX friction lowers the cost of doing business across the continent." },
];

function swap() { const f = from.value; from.value = to.value; to.value = f; }
</script>

<template>
  <AppShell title="Trade">
    <div class="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:gap-7 lg:grid-cols-[1fr_400px]">
      <!-- Market info -->
      <div class="order-2 space-y-5 sm:space-y-7 lg:order-1">
        <Card>
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <span class="grid h-10 w-10 place-items-center rounded-full bg-obsidian-700 text-lg">{{ ACTIVE_PAIR.flag }}</span>
              <div class="leading-tight">
                <div class="font-display text-base font-bold text-ivory">{{ ACTIVE_PAIR.pair }}</div>
                <div class="text-[11px] text-platinum-400">{{ ACTIVE_PAIR.name }}</div>
              </div>
            </div>
            <div class="text-right leading-tight">
              <div class="nums text-xl font-bold text-ivory">{{ ACTIVE_PAIR.price.toFixed(4) }}</div>
              <PriceChange :value="ACTIVE_PAIR.change" percent class="text-xs" />
            </div>
          </div>
          <LineChart :data="closes" :height="160" tone="up" class="mt-4" />
        </Card>

        <Card title="Why African pairs?">
          <Accordion value="0">
            <AccordionPanel v-for="(f, i) in faq" :key="f.q" :value="String(i)">
              <AccordionHeader>{{ f.q }}</AccordionHeader>
              <AccordionContent><p class="text-sm text-platinum-300">{{ f.a }}</p></AccordionContent>
            </AccordionPanel>
          </Accordion>
        </Card>
      </div>

      <!-- Order ticket -->
      <div class="order-1 lg:order-2">
        <div class="lg:sticky lg:top-4">
          <Card>
            <SelectButton v-model="tab" :options="tabs" :allowEmpty="false" class="w-full" />

            <div v-if="isExchange" class="mt-5 space-y-3">
              <div class="rounded-xl border border-obsidian-500/70 bg-obsidian-900 p-3">
                <div class="mb-1.5 text-xs font-medium uppercase tracking-wider text-platinum-400">From</div>
                <div class="flex gap-2">
                  <Select v-model="from" :options="ccyOptions" class="w-28" />
                  <InputNumber v-model="amount" class="flex-1" inputClass="text-right nums" :minFractionDigits="0" />
                </div>
              </div>
              <div class="flex justify-center">
                <Button icon="pi pi-arrow-right-arrow-left" rounded text severity="secondary" class="rotate-90" @click="swap" />
              </div>
              <div class="rounded-xl border border-obsidian-500/70 bg-obsidian-900 p-3">
                <div class="mb-1.5 text-xs font-medium uppercase tracking-wider text-platinum-400">To (estimated)</div>
                <div class="flex items-center gap-2">
                  <Select v-model="to" :options="ccyOptions" class="w-28" />
                  <div class="flex-1 text-right nums text-lg font-semibold text-ivory">{{ fmt(converted) }}</div>
                </div>
              </div>
              <div class="flex items-center justify-center gap-2 text-[11px] text-platinum-400">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                1 {{ from }} = {{ rate.toFixed(4) }} {{ to }} · No USD routing
              </div>
            </div>

            <div v-else class="mt-5 space-y-4">
              <div>
                <div class="mb-1.5 text-xs font-medium uppercase tracking-wider text-platinum-400">Instrument</div>
                <div class="flex h-12 items-center gap-3 rounded-lg border border-obsidian-500/70 bg-obsidian-900 px-3">
                  <span class="grid h-7 w-7 place-items-center rounded-md bg-emerald-500/20 text-[10px] font-bold text-emerald-300">DA</span>
                  <div class="leading-tight"><div class="text-sm font-semibold text-ivory">DANGCEM</div><div class="text-[11px] text-platinum-400">Dangote Cement · NGX</div></div>
                  <span class="ml-auto nums text-sm text-ivory">NGN 682.50</span>
                </div>
              </div>
              <SelectButton v-model="orderType" :options="['Market', 'Limit']" :allowEmpty="false" class="w-full" />
              <div>
                <div class="mb-1.5 text-xs font-medium uppercase tracking-wider text-platinum-400">Quantity</div>
                <InputNumber v-model="qty" class="w-full" inputClass="text-right nums" />
              </div>
              <div v-if="orderType === 'Limit'">
                <div class="mb-1.5 text-xs font-medium uppercase tracking-wider text-platinum-400">Limit Price (NGN)</div>
                <InputNumber v-model="limitPrice" class="w-full" inputClass="text-right nums" :minFractionDigits="2" />
              </div>
              <div class="flex items-center justify-between rounded-lg bg-obsidian-900 px-3 py-3">
                <span class="text-sm text-platinum-300">Estimated {{ tab === "Buy" ? "Cost" : "Proceeds" }}</span>
                <span class="nums text-base font-semibold text-ivory">NGN {{ fmt(estCost) }}</span>
              </div>
            </div>

            <Button
              :label="isExchange ? 'Review Conversion' : `Review ${tab} Order`"
              :severity="tab === 'Sell' ? 'danger' : 'primary'"
              class="mt-5 w-full font-display font-semibold" size="large" />
            <p class="mt-2 text-center text-[11px] text-platinum-400">Settled in African value · Pan-African Liquidity Network</p>
          </Card>
        </div>
      </div>
    </div>
  </AppShell>
</template>
