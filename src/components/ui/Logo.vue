<script setup lang="ts">
// Renders the cropped /logo.svg lockup. `size` is the rendered HEIGHT;
// width follows the artwork's aspect ratio so it fits its section exactly.
withDefaults(defineProps<{
  variant?: "mark" | "full" | "stacked";
  size?: number;
  tagline?: boolean;
}>(), { variant: "full", size: 32, tagline: false });
</script>

<template>
  <img
    src="/logo.svg"
    alt="AFRIQX"
    class="block w-auto shrink-0 object-contain"
    :style="{ height: size + 'px' }"
  />
</template>
