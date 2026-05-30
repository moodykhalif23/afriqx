<script setup lang="ts">
withDefaults(defineProps<{ title?: string; flush?: boolean }>(), { flush: false });
</script>

<template>
  <section class="rounded-2xl border border-obsidian-500/60 bg-obsidian-800/80 shadow-xl shadow-black/30">
    <header
      v-if="title || $slots.action"
      class="flex items-center justify-between gap-4 border-b border-obsidian-500/50 px-6 pt-5 pb-4"
    >
      <h3 class="font-display text-sm font-semibold tracking-wide text-ivory">{{ title }}</h3>
      <div class="text-xs text-emerald-400"><slot name="action" /></div>
    </header>
    <div :class="flush ? '' : 'p-6'"><slot /></div>
  </section>
</template>
