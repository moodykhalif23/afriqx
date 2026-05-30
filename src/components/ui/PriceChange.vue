<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  value: number;
  percent?: boolean;
  arrow?: boolean;
  decimals?: number;
}>(), { percent: false, arrow: true, decimals: 2 });

const up = computed(() => props.value >= 0);
const magnitude = computed(() => Math.abs(props.value).toFixed(props.decimals));
</script>

<template>
  <span class="nums inline-flex items-center gap-1 font-medium"
    :class="up ? 'text-up' : 'text-down'">
    <span v-if="arrow" class="text-[0.7em] leading-none">{{ up ? "▲" : "▼" }}</span>
    {{ up ? "+" : "−" }}{{ magnitude }}<template v-if="percent">%</template>
  </span>
</template>
