<script setup lang="ts">
import Logo from "@/components/ui/Logo.vue";

defineProps<{ title: string; subtitle?: string }>();
</script>

<template>
  <div class="grid min-h-[100dvh] bg-obsidian-900 text-ivory lg:grid-cols-2">
    <!-- Brand panel (desktop) -->
    <aside class="afriqx-aurora relative hidden flex-col justify-between overflow-hidden border-r border-obsidian-500/60 p-12 lg:flex">
      <Logo variant="full" :size="44" />
      <div>
        <h2 class="max-w-md font-display text-3xl font-bold leading-tight text-ivory">
          The Operating System for <span class="text-gradient-brand">African Capital Markets</span>
        </h2>
        <p class="mt-4 max-w-sm text-sm text-platinum-300">
          Trade equities, FX and commodities priced in African value — one platform across the continent.
        </p>
      </div>
      <p class="text-[11px] uppercase tracking-[0.18em] text-platinum-400">
        African Markets. African Value. <span class="text-emerald-400">African Future.</span>
      </p>
    </aside>

    <!-- Form panel -->
    <main class="flex flex-col items-center justify-center px-5 py-10">
      <div class="w-full max-w-sm">
        <div class="mb-8 flex justify-center lg:hidden">
          <Logo variant="full" :size="40" />
        </div>
        <h1 class="font-display text-2xl font-bold text-ivory">{{ title }}</h1>
        <p v-if="subtitle" class="mt-1 text-sm text-platinum-400">{{ subtitle }}</p>

        <div class="mt-7">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>
