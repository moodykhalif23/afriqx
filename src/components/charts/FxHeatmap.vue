<script setup lang="ts">
import { computed } from "vue";
import { registerMap } from "echarts/core";
import Card from "@/components/ui/Card.vue";
import PriceChange from "@/components/ui/PriceChange.vue";
import { FX_HEATMAP } from "@/data/mock";
import africa from "@/data/africa.geo.json";

// Register the real Africa map once.
registerMap("africa", africa as never);

const STRONG = "#1fae5f";
const NEUTRAL = "#c79b3f";
const WEAK = "#e5565b";

// Currency → representative country, coloured by FX strength.
const countryColor: Record<string, string> = {
  "South Africa": STRONG,
  Nigeria: STRONG,
  Kenya: STRONG,
  Ghana: NEUTRAL,
  Egypt: NEUTRAL,
  Uganda: WEAK,
  "Ivory Coast": WEAK,
  Ethiopia: WEAK,
};

const option = computed(() => ({
  backgroundColor: "transparent",
  tooltip: {
    trigger: "item",
    backgroundColor: "#0d1310",
    borderColor: "#28382f",
    textStyle: { color: "#f4efe4", fontSize: 11 },
    formatter: (p: { name: string }) => p.name,
  },
  series: [{
    type: "map",
    map: "africa",
    roam: false,
    aspectScale: 0.92,
    zoom: 1.15,
    itemStyle: {
      areaColor: "#16201b",
      borderColor: "#0a0e0c",
      borderWidth: 0.6,
    },
    emphasis: {
      label: { show: false },
      itemStyle: { areaColor: "#1d2a23" },
    },
    select: { disabled: true },
    label: { show: false },
    data: Object.entries(countryColor).map(([name, color]) => ({
      name,
      itemStyle: { areaColor: color },
      emphasis: { itemStyle: { areaColor: color } },
    })),
  }],
}));

const groups = [
  { label: "Strong", color: STRONG, items: FX_HEATMAP.strong },
  { label: "Neutral", color: NEUTRAL, items: FX_HEATMAP.neutral },
  { label: "Weak", color: WEAK, items: FX_HEATMAP.weak },
];
</script>

<template>
  <Card title="African FX Heatmap">
    <template #action><a href="#">View full map</a></template>
    <div class="flex gap-3">
      <div class="min-w-0 flex-1">
        <VChart :option="option" style="height: 200px; width: 100%" autoresize />
      </div>
      <div class="flex w-24 shrink-0 flex-col gap-3">
        <div v-for="g in groups" :key="g.label">
          <div class="mb-1.5 flex items-center gap-1.5">
            <span class="h-2 w-2 rounded-sm" :style="{ backgroundColor: g.color }" />
            <span class="text-[10px] font-semibold uppercase tracking-wider text-platinum-300">{{ g.label }}</span>
          </div>
          <ul class="space-y-1">
            <li v-for="it in g.items" :key="it.code" class="flex items-center justify-between gap-2">
              <span class="nums text-xs font-medium text-ivory">{{ it.code }}</span>
              <PriceChange :value="it.change" percent :arrow="false" class="text-[11px]" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Card>
</template>
