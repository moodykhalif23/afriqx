<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  data: number[];
  labels?: string[];
  height?: number;
  tone?: "up" | "down" | "gold";
}>(), { height: 220, tone: "up" });

const STROKE = { up: "#34d27b", down: "#e5565b", gold: "#d9b769" };

const option = computed(() => {
  const c = STROKE[props.tone];
  return {
    animation: false,
    grid: { top: 12, bottom: 24, left: 8, right: 12 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "#0d1310",
      borderColor: "#28382f",
      textStyle: { color: "#f4efe4", fontSize: 11 },
    },
    xAxis: {
      type: "category",
      data: props.labels ?? props.data.map((_, i) => i),
      boundaryGap: false,
      axisLine: { lineStyle: { color: "rgba(40,56,47,0.55)" } },
      axisTick: { show: false },
      axisLabel: { color: "#8b9694", fontSize: 10 },
    },
    yAxis: {
      type: "value",
      scale: true,
      splitLine: { lineStyle: { color: "rgba(40,56,47,0.4)" } },
      axisLabel: { color: "#8b9694", fontFamily: "JetBrains Mono", fontSize: 10 },
    },
    series: [{
      type: "line",
      data: props.data,
      smooth: true,
      showSymbol: false,
      lineStyle: { color: c, width: 2 },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: c + "40" },
            { offset: 1, color: c + "00" },
          ],
        },
      },
    }],
  };
});
</script>

<template>
  <VChart :option="option" :style="{ height: height + 'px', width: '100%' }" autoresize />
</template>
