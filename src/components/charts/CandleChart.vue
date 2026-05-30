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
const GRID = "rgba(63,90,75,0.16)";
const AXIS = "#8b9694";
const CROSS = "rgba(185,193,194,0.4)";

type TooltipParam = { seriesType: string; value: number[] | number };

const fmt4 = (n: number) => Number(n).toFixed(4);

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
    { left: 12, right: 66, top: 16, height: "66%" },
    { left: 12, right: 66, top: "80%", bottom: 8 },
  ],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      lineStyle: { color: CROSS, width: 1, type: "dashed" },
      crossStyle: { color: CROSS, width: 1, type: "dashed" },
      label: { backgroundColor: "#28382f", color: "#f4efe4", fontFamily: "JetBrains Mono", fontSize: 10 },
    },
    backgroundColor: "rgba(13,19,16,0.92)",
    borderColor: "#28382f",
    borderWidth: 1,
    padding: [8, 10],
    extraCssText: "border-radius:8px;box-shadow:0 8px 24px -8px rgba(0,0,0,0.6)",
    textStyle: { color: "#f4efe4", fontSize: 11 },
    formatter: (params: TooltipParam[]) => {
      const k = params.find((p) => p.seriesType === "candlestick");
      const vol = params.find((p) => p.seriesType === "bar");
      if (!k || !Array.isArray(k.value)) return "";
      const v = k.value; // [index, open, close, low, high]
      const up = v[2] >= v[1];
      const c = up ? UP : DOWN;
      const cell = (label: string, val: string, color = "#f4efe4") =>
        `<span style="color:#8b9694">${label}</span> <span style="color:${color}">${val}</span>`;
      const volTxt = vol && typeof vol.value === "number"
        ? `<div style="margin-top:3px;color:#8b9694">Vol&nbsp;${Number(vol.value).toLocaleString("en-US")}</div>`
        : "";
      return `<div style="font-family:'JetBrains Mono',monospace;font-size:11px;line-height:1.7">
        <div style="display:flex;gap:14px">${cell("O", fmt4(v[1]))}${cell("H", fmt4(v[4]))}</div>
        <div style="display:flex;gap:14px">${cell("L", fmt4(v[3]))}${cell("C", fmt4(v[2]), c)}</div>
        ${volTxt}</div>`;
    },
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
      barMaxWidth: 9,
      itemStyle: {
        color: UP,
        color0: DOWN,
        borderColor: UP,
        borderColor0: DOWN,
        borderWidth: 1,
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
      barMaxWidth: 9,
      itemStyle: {
        borderRadius: [1, 1, 0, 0],
        color: (p: { dataIndex: number }) =>
          props.candles[p.dataIndex].close >= props.candles[p.dataIndex].open
            ? UP + "33"
            : DOWN + "33",
      },
    },
  ],
}));
</script>

<template>
  <VChart :option="option" :style="{ height: height + 'px', width: '100%' }" autoresize />
</template>
