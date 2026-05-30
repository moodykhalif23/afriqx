<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  data: { label: string; pct: number; color: string }[];
  height?: number;
  centerLabel?: string;
  centerValue?: string;
}>(), { height: 180 });

const option = computed(() => ({
  animation: false,
  tooltip: {
    trigger: "item",
    backgroundColor: "#0d1310",
    borderColor: "#28382f",
    textStyle: { color: "#f4efe4", fontSize: 11 },
    formatter: (p: { name: string; value: number }) => `${p.name}: ${p.value}%`,
  },
  series: [{
    type: "pie",
    radius: ["62%", "88%"],
    avoidLabelOverlap: false,
    label: { show: false },
    labelLine: { show: false },
    data: props.data.map((d) => ({
      name: d.label,
      value: d.pct,
      itemStyle: { color: d.color, borderColor: "#0a0e0c", borderWidth: 2 },
    })),
  }],
}));
</script>

<template>
  <div class="relative" :style="{ height: height + 'px' }">
    <VChart :option="option" :style="{ height: height + 'px', width: '100%' }" autoresize />
    <div
      v-if="centerValue"
      class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
    >
      <span class="text-[10px] uppercase tracking-wider text-platinum-400">{{ centerLabel }}</span>
      <span class="nums text-base font-bold text-ivory">{{ centerValue }}</span>
      <slot name="sub" />
    </div>
  </div>
</template>
