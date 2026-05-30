<script setup lang="ts">
import { computed } from "vue";
import type { Candle } from "@/data/mock";

const props = withDefaults(defineProps<{
  candles: Candle[];
  lastPrice: number;
  height?: number;
}>(), { height: 400 });

const UP = "#34d27b";
const DOWN = "#e5565b";
const GRID = "rgba(40,56,47,0.55)";
const AXIS = "#8b9694";

// ECharts candlestick expects [open, close, low, high]
const ohlc = computed(() => props.candles.map((c) => [c.open, c.close, c.low, c.high]));
const volumes = computed(() =>
  props.candles.map((c, i) => ({
    value: c.volume,
    itemStyle: { color: c.close >= c.open ? UP + "44" : DOWN + "44" },
    xAxisIndex: i,
  }))
);
const labels = computed(() => props.candles.map((c) => `#${c.i}`));

const option = computed(() => ({
  animation: false,
  backgroundColor: "transparent",
  grid: [
    { left: 8, right: 64, top: 12, height: "68%" },
    { left: 8, right: 64, top: "78%", height: "14%" },
  ],
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "cross" },
    backgroundColor: "#0d1310",
    borderColor: "#28382f",
    textStyle: { color: "#f4efe4", fontSize: 11 },
  },
  axisPointer: { link: [{ xAxisIndex: "all" }], label: { backgroundColor: "#15833f" } },
  xAxis: [
    {
      type: "category",
      data: labels.value,
      gridIndex: 0,
      axisLine: { lineStyle: { color: GRID } },
      axisLabel: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    {
      type: "category",
      data: labels.value,
      gridIndex: 1,
      axisLine: { lineStyle: { color: GRID } },
      axisLabel: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
  ],
  yAxis: [
    {
      scale: true,
      gridIndex: 0,
      position: "right",
      splitLine: { lineStyle: { color: GRID } },
      axisLabel: { color: AXIS, fontFamily: "JetBrains Mono", fontSize: 10, formatter: (v: number) => v.toFixed(4) },
      axisLine: { show: false },
    },
    {
      scale: true,
      gridIndex: 1,
      position: "right",
      splitNumber: 2,
      axisLabel: { show: false },
      splitLine: { show: false },
      axisLine: { show: false },
    },
  ],
  series: [
    {
      type: "candlestick",
      data: ohlc.value,
      xAxisIndex: 0,
      yAxisIndex: 0,
      itemStyle: {
        color: UP,
        color0: DOWN,
        borderColor: UP,
        borderColor0: DOWN,
      },
      markLine: {
        symbol: "none",
        data: [{ yAxis: props.lastPrice }],
        lineStyle: { color: UP, type: "dashed", width: 1 },
        label: {
          color: "#06120b",
          backgroundColor: UP,
          padding: [3, 4],
          borderRadius: 3,
          fontFamily: "JetBrains Mono",
          fontSize: 10,
          formatter: () => props.lastPrice.toFixed(4),
        },
      },
    },
    {
      type: "bar",
      data: volumes.value.map((v) => v.value),
      xAxisIndex: 1,
      yAxisIndex: 1,
      itemStyle: {
        color: (p: { dataIndex: number }) =>
          props.candles[p.dataIndex].close >= props.candles[p.dataIndex].open
            ? UP + "3a"
            : DOWN + "3a",
      },
    },
  ],
}));
</script>

<template>
  <VChart :option="option" :style="{ height: height + 'px', width: '100%' }" autoresize />
</template>
