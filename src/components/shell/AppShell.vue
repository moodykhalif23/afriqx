<script setup lang="ts">
import AppSidebar from "./AppSidebar.vue";
import AppTopbar from "./AppTopbar.vue";
import TickerBar from "./TickerBar.vue";
import BottomNav from "./BottomNav.vue";

defineProps<{ title?: string }>();
</script>

<template>
  <div class="flex h-dvh overflow-hidden bg-obsidian-900 text-ivory">
    <AppSidebar />
    <div class="flex min-w-0 flex-1 flex-col">
      <AppTopbar :title="title" />
      <main class="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
        <slot />
      </main>
      <TickerBar />
      <BottomNav />
    </div>
  </div>
</template>
