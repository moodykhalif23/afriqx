<script setup lang="ts">
import Card from "@/components/ui/Card.vue";
import PriceChange from "@/components/ui/PriceChange.vue";
import { FX_HEATMAP } from "@/data/mock";

const regions = [
  { d: "M120 18 L168 26 L172 54 L150 64 L116 52 L108 30 Z", fill: "#15833f" },
  { d: "M70 40 L116 52 L120 78 L92 92 L66 76 L58 52 Z", fill: "#1fae5f" },
  { d: "M150 64 L172 54 L190 84 L168 104 L148 92 L150 64 Z", fill: "#0f6531" },
  { d: "M92 92 L120 78 L148 92 L150 120 L120 140 L96 122 Z", fill: "#34d27b" },
  { d: "M120 140 L150 120 L156 150 L138 178 L112 168 L108 146 Z", fill: "#15833f" },
  { d: "M112 168 L138 178 L130 200 L106 196 L100 176 Z", fill: "#1fae5f" },
  { d: "M148 92 L168 104 L172 132 L150 120 Z", fill: "#c79b3f" },
  { d: "M150 120 L172 132 L162 156 L156 150 Z", fill: "#e5565b" },
];
const groups = [
  { label: "Strong", color: "#1fae5f", items: FX_HEATMAP.strong },
  { label: "Neutral", color: "#c79b3f", items: FX_HEATMAP.neutral },
  { label: "Weak", color: "#e5565b", items: FX_HEATMAP.weak },
];
</script>

<template>
  <Card title="African FX Heatmap">
    <template #action><a href="#">View full map</a></template>
    <div class="flex gap-3">
      <div class="flex-1">
        <svg viewBox="40 0 170 210" class="h-44 w-full" aria-hidden="true">
          <g stroke="#0a0e0c" stroke-width="1.2" stroke-linejoin="round">
            <path v-for="(r, i) in regions" :key="i" :d="r.d" :fill="r.fill" opacity="0.92" />
          </g>
        </svg>
      </div>
      <div class="flex w-28 shrink-0 flex-col gap-3">
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
