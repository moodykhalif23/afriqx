<script setup lang="ts">
import AppShell from "@/components/shell/AppShell.vue";
import Card from "@/components/ui/Card.vue";
import Carousel from "primevue/carousel";
import Tag from "primevue/tag";
import { NEWS_FEATURED, NEWS_FEED } from "@/data/mock";

const sev = (c: string) =>
  c === "Equities" || c === "Technology" ? "warn" : c === "Economy" ? "secondary" : "success";
const responsive = [
  { breakpoint: "1024px", numVisible: 2, numScroll: 1 },
  { breakpoint: "640px", numVisible: 1, numScroll: 1 },
];
</script>

<template>
  <AppShell title="News">
    <div class="mb-6">
      <h1 class="font-display text-xl font-bold text-ivory sm:text-2xl">News &amp; Insights</h1>
      <p class="text-sm text-platinum-400">Continental market intelligence, updated through the trading day.</p>
    </div>

    <Carousel :value="NEWS_FEATURED" :numVisible="3" :numScroll="1" :responsiveOptions="responsive" :showIndicators="false">
      <template #item="{ data }">
        <div class="mr-4">
          <article class="card-3d flex h-48 flex-col justify-end overflow-hidden rounded-2xl border border-obsidian-500/60 bg-gradient-to-br from-emerald-700/30 to-obsidian-800 p-5">
            <Tag :value="data.category" :severity="sev(data.category)" class="mb-2 w-fit" />
            <h3 class="font-display text-lg font-bold leading-snug text-ivory">{{ data.title }}</h3>
            <p class="mt-1 line-clamp-2 text-sm text-platinum-300">{{ data.excerpt }}</p>
            <span class="mt-2 text-[11px] text-platinum-400">{{ data.time }}</span>
          </article>
        </div>
      </template>
    </Carousel>

    <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card v-for="item in NEWS_FEED" :key="item.title">
        <div class="flex gap-3">
          <div class="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-obsidian-600 to-obsidian-800 text-platinum-400"><i class="pi pi-image" /></div>
          <div class="min-w-0">
            <p class="text-sm font-medium leading-snug text-ivory">{{ item.title }}</p>
            <div class="mt-1.5 flex items-center gap-2">
              <Tag :value="item.category" :severity="sev(item.category)" />
              <span class="text-[11px] text-platinum-400">{{ item.time }}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </AppShell>
</template>
