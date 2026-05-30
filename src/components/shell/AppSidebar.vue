<script setup lang="ts">
import { useRoute } from "vue-router";
import Button from "primevue/button";
import Logo from "@/components/ui/Logo.vue";
import { NAV_ITEMS } from "@/data/mock";
import { NAV_ICON } from "@/icons";

const route = useRoute();
</script>

<template>
  <aside
    class="hidden h-full w-60 shrink-0 flex-col border-r border-obsidian-500/60 bg-obsidian-850 lg:flex"
  >
    <div class="flex h-16 items-center px-5">
      <Logo variant="full" :size="40" />
    </div>

    <nav class="flex-1 space-y-1 overflow-y-auto px-3 py-2">
      <RouterLink
        v-for="item in NAV_ITEMS"
        :key="item.label"
        :to="item.href"
        class="group flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
        :class="route.name === item.label
          ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/25'
          : 'text-platinum-300 hover:bg-obsidian-700/70 hover:text-ivory'"
      >
        <i :class="NAV_ICON[item.icon]" class="text-base" />
        <span class="flex-1 truncate">{{ item.label }}</span>
        <span
          v-if="item.badge"
          class="rounded bg-gold-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gold-300"
        >{{ item.badge }}</span>
      </RouterLink>
    </nav>

    <div class="mx-3 mb-3 rounded-xl border border-obsidian-500/60 bg-obsidian-800 p-4">
      <Logo variant="full" :size="30" class="mb-3" />
      <p class="font-display text-sm font-bold text-ivory">The Home of<br />African Markets</p>
      <p class="mt-1 text-xs text-platinum-400">Trade. Invest. Build Africa.</p>
      <Button label="Upgrade to Pro" size="small" severity="warn"
        class="mt-3 w-full font-display font-semibold" />
    </div>

    <div class="border-t border-obsidian-500/60 px-5 py-3">
      <div class="flex items-center gap-2">
        <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/70" />
        <span class="text-[11px] font-medium text-platinum-300">All Systems Operational</span>
      </div>
      <p class="mt-1 nums text-[10px] text-platinum-400">Connected · EAT 09:45:32</p>
    </div>
  </aside>
</template>
