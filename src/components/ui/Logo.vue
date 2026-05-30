<script setup lang="ts">
withDefaults(defineProps<{
  variant?: "mark" | "full" | "stacked";
  size?: number;
  tagline?: boolean;
}>(), { variant: "full", size: 32, tagline: false });
</script>

<template>
  <span v-if="variant === 'mark'" class="inline-flex">
    <img src="/logo.svg" :width="size" :height="size" alt="AFRIQX"
      class="shrink-0" :style="{ width: size + 'px', height: size + 'px' }" />
  </span>

  <span v-else-if="variant === 'stacked'" class="inline-flex flex-col items-center gap-3">
    <img src="/logo.svg" :width="size" :height="size" alt="AFRIQX" :style="{ width: size + 'px', height: size + 'px' }" />
    <span class="flex flex-col items-center gap-1.5">
      <span class="font-display font-black tracking-[0.14em] leading-none text-ivory select-none"
        :style="{ fontSize: size * 0.66 + 'px' }">
        AFRI<span class="text-emerald-500">Q</span><span class="text-emerald-400">X</span>
      </span>
      <span v-if="tagline" class="font-display font-medium tracking-[0.2em] text-platinum-400 uppercase"
        :style="{ fontSize: Math.max(8, size * 0.16) + 'px' }">
        African Markets. African Value. <span class="text-emerald-400">African Future.</span>
      </span>
    </span>
  </span>

  <span v-else class="inline-flex items-center gap-2.5">
    <img src="/logo.svg" :width="size" :height="size" alt="AFRIQX" class="shrink-0"
      :style="{ width: size + 'px', height: size + 'px' }" />
    <span class="font-display font-black tracking-[0.14em] leading-none text-ivory select-none"
      :style="{ fontSize: size * 0.66 + 'px' }">
      AFRI<span class="text-emerald-500">Q</span><span class="text-emerald-400">X</span>
    </span>
  </span>
</template>
