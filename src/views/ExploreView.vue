<script setup lang="ts">
import AppShell from "@/components/shell/AppShell.vue";
import Card from "@/components/ui/Card.vue";
import PriceChange from "@/components/ui/PriceChange.vue";
import Sparkline from "@/components/charts/Sparkline.vue";
import Button from "primevue/button";
import Carousel from "primevue/carousel";
import Tag from "primevue/tag";
import { useRouter } from "vue-router";
import { marketsApi, exploreApi } from "@/api";
import { useApi } from "@/composables/useApi";
import { useStub } from "@/composables/useStub";

const router = useRouter();
const stub = useStub();

const { data: indices } = useApi(() => marketsApi.indices(), []);
const { data: layers } = useApi(() => exploreApi.layers(), []);

const idxResponsive = [
  { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
  { breakpoint: "640px", numVisible: 2, numScroll: 1 },
];
const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2 });
</script>

<template>
  <AppShell title="AFX Explore">
    <section class="afriqx-aurora relative overflow-hidden rounded-2xl border border-obsidian-500/60 p-6 sm:p-10">
      <Tag value="Explore" severity="success" class="mb-3" />
      <h1 class="max-w-2xl font-display text-2xl font-bold leading-tight text-ivory sm:text-4xl">
        The Operating System for <span class="text-gradient-brand">African Capital Markets</span>
      </h1>
      <p class="mt-3 max-w-xl text-sm text-platinum-300 sm:text-base">
        One platform across trading, FX, liquidity, intelligence and AI — pricing Africa in African value.
      </p>
      <div class="mt-5 flex flex-wrap gap-3">
        <Button label="Open Terminal" class="font-display font-semibold" @click="router.push('/trade')" />
        <Button label="Upgrade to Pro" severity="warn" class="font-display font-semibold"
          @click="stub('AFRIQX Pro', 'Pro plans launch soon — you\'ll be the first to know.', 'warn')" />
      </div>
    </section>

    <h2 class="mb-3 mt-8 font-display text-lg font-bold text-ivory">African Indices</h2>
    <Carousel :value="indices" :numVisible="4" :numScroll="1" :responsiveOptions="idxResponsive" :showIndicators="false">
      <template #item="{ data }">
        <div class="mr-4">
          <div class="rounded-2xl border border-obsidian-500/60 bg-linear-to-br from-emerald-700/30 to-obsidian-800 p-4">
            <div class="flex items-center justify-between">
              <span class="font-display text-sm font-bold text-ivory">{{ data.symbol }}</span>
              <PriceChange :value="data.change" percent :arrow="false" class="text-xs" />
            </div>
            <div class="nums mt-1 text-lg font-semibold text-ivory">{{ fmt(data.value) }}</div>
            <Sparkline :data="data.series" :height="44" class="mt-2" />
          </div>
        </div>
      </template>
    </Carousel>

    <h2 class="mb-3 mt-8 font-display text-lg font-bold text-ivory">Exchange Architecture</h2>
    <Card flush>
      <ul class="divide-y divide-obsidian-500/50">
        <li v-for="l in layers" :key="l.n" class="flex items-start gap-4 p-4 transition-colors hover:bg-obsidian-700/40 sm:p-5">
          <span class="nums font-display text-2xl font-black text-emerald-500/40">{{ l.n }}</span>
          <div><h3 class="font-semibold text-ivory">{{ l.title }}</h3><p class="mt-0.5 text-sm text-platinum-400">{{ l.desc }}</p></div>
        </li>
      </ul>
    </Card>
  </AppShell>
</template>
