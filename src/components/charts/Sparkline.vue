<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  data: number[];
  tone?: "up" | "down" | "gold" | "auto";
  area?: boolean;
  height?: number;
}>(), { tone: "auto", area: false, height: 32 });

const STROKE = { up: "#34d27b", down: "#e5565b", gold: "#d9b769" };

const color = computed(() => {
  if (props.tone !== "auto") return STROKE[props.tone];
  return props.data[props.data.length - 1] >= props.data[0]
    ? STROKE.up
    : STROKE.down;
});

const option = computed(() => ({
  animation: false,
  grid: { top: 2, bottom: 2, left: 2, right: 2 },
  xAxis: { type: "category", show: false, data: props.data.map((_, i) => i) },
  yAxis: { type: "value", show: false, scale: true },
  series: [{
    type: "line",
    data: props.data,
    showSymbol: false,
    lineStyle: { color: color.value, width: 1.75 },
    areaStyle: props.area
      ? {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: color.value + "47" },
            { offset: 1, color: color.value + "00" },
          ],
        },
      }
      : undefined,
  }],
}));
</script>

<template>
  <VChart :option="option" :style="{ height: height + 'px', width: '100%' }" autoresize />
</template>
