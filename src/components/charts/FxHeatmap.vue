<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { registerMap } from "echarts/core";
import PriceChange from "@/components/ui/PriceChange.vue";
import { marketsApi, type FxHeatmap } from "@/api";
import { useApi } from "@/composables/useApi";
import africa from "@/data/africa.geo.json";

// The bundled GeoJSON mixes Polygon/MultiPolygon features with GeometryCollection
// ones (e.g. South Africa, Tanzania, Madagascar). ECharts can't parse
// GeometryCollection and throws "Invalid geoJson format", which blanks the entire
// map — so flatten every feature to a MultiPolygon before registering.
type Geom = { type: string; coordinates?: unknown; geometries?: Geom[] };
function toMultiPolygon(geom: Geom | null | undefined): { type: "MultiPolygon"; coordinates: unknown[] } {
  const coordinates: unknown[] = [];
  const collect = (g?: Geom | null) => {
    if (!g) return;
    if (g.type === "Polygon") coordinates.push(g.coordinates);
    else if (g.type === "MultiPolygon") coordinates.push(...(g.coordinates as unknown[]));
    else if (g.type === "GeometryCollection") (g.geometries ?? []).forEach(collect);
  };
  collect(geom);
  return { type: "MultiPolygon", coordinates };
}

const africaGeo = {
  type: "FeatureCollection",
  features: (africa as { features: { properties: unknown; geometry: Geom }[] }).features
    .map((f) => ({ ...f, geometry: toMultiPolygon(f.geometry) }))
    .filter((f) => f.geometry.coordinates.length > 0),
};

// Register the (normalized) Africa map once.
registerMap("africa", africaGeo as never);

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
      areaColor: "#243a30",
      borderColor: "#3f5a4b",
      borderWidth: 0.8,
    },
    emphasis: {
      label: { show: false },
      itemStyle: { areaColor: "#2f4d3d" },
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

const emptyHeatmap: FxHeatmap = { strong: [], neutral: [], weak: [] };
const { data: heatmap } = useApi(() => marketsApi.fxHeatmap(), emptyHeatmap);

const groups = computed(() => [
  { label: "Strong", color: STRONG, items: heatmap.value.strong },
  { label: "Neutral", color: NEUTRAL, items: heatmap.value.neutral },
  { label: "Weak", color: WEAK, items: heatmap.value.weak },
]);
</script>

<template>
  <section>
    <header class="mb-3 flex items-center justify-between gap-4">
      <h3 class="font-display text-sm font-semibold tracking-wide text-ivory">African FX Heatmap</h3>
      <RouterLink to="/markets" class="text-xs text-emerald-400 hover:underline">View full map</RouterLink>
    </header>
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
  </section>
</template>
