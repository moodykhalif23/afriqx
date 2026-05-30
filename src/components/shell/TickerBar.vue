<script setup lang="ts">
import Logo from "@/components/ui/Logo.vue";
import PriceChange from "@/components/ui/PriceChange.vue";
import { TICKER } from "@/data/mock";
import { useStub } from "@/composables/useStub";

const stub = useStub();

// Duplicate the list so the marquee loops seamlessly (−50% translate).
const doubled = [...TICKER, ...TICKER];
</script>

<template>
  <footer
    class="hidden h-12 shrink-0 items-center gap-5 border-t border-obsidian-500/60 bg-obsidian-850 px-5 lg:flex"
  >
    <div class="flex shrink-0 items-center gap-2">
      <span class="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-platinum-400 xl:inline">
        African Markets. African Value. <span class="text-emerald-400">African Future.</span>
      </span>
    </div>
    <div class="flex flex-1 items-center overflow-hidden">
      <div class="ticker-track flex shrink-0 items-center">
        <div
          v-for="(t, i) in doubled"
          :key="i"
          class="flex shrink-0 items-center gap-2 pr-8 text-xs"
        >
          <span class="font-semibold text-platinum-300">{{ t.label }}</span>
          <span class="nums text-ivory">{{ t.value }}</span>
          <PriceChange :value="t.change" percent class="text-[11px]" />
        </div>
      </div>
    </div>
    <button type="button"
      class="flex shrink-0 items-center gap-1.5 rounded-lg border border-obsidian-500/60 px-3 py-1.5 text-xs text-platinum-300 hover:border-obsidian-400 hover:text-ivory"
      @click="stub('Customize Dashboard', 'Dashboard customization is coming soon.')">
      <i class="pi pi-cog" /> Customize Dashboard
    </button>
  </footer>
</template>
