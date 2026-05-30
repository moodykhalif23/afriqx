<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Menu from "primevue/menu";
import { computed } from "vue";
import Logo from "@/components/ui/Logo.vue";
import { auth } from "@/stores/auth";
import { useStub } from "@/composables/useStub";

defineProps<{ title?: string }>();
const router = useRouter();
const stub = useStub();
const menu = ref();

const user = computed(() => auth.state.user);
const displayName = computed(() => user.value?.name ?? "Guest");
const tier = computed(() => user.value?.tier ?? "");
const initials = computed(() =>
  displayName.value.split(" ").map((n) => n[0]).join("").slice(0, 2),
);

function signOut() {
  auth.logout();
  router.replace("/login");
}

const items = computed(() => [
  { label: `Signed in as ${displayName.value}`, disabled: true },
  { separator: true },
  { label: "Profile", icon: "pi pi-user", command: () => router.push("/settings") },
  { label: "Settings", icon: "pi pi-cog", command: () => router.push("/settings") },
  { label: "Upgrade plan", icon: "pi pi-star", command: () => stub("AFRIQX Pro", "Pro plans launch soon — you'll be the first to know.", "warn") },
  { separator: true },
  { label: "Sign out", icon: "pi pi-sign-out", command: signOut },
]);
</script>

<template>
  <header
    class="flex h-14 shrink-0 items-center gap-3 border-b border-obsidian-500/60 bg-obsidian-900/80 px-3 backdrop-blur-md sm:h-16 sm:px-5"
  >
    <div class="lg:hidden"><Logo variant="mark" :size="32" /></div>
    <h1 v-if="title" class="truncate font-display text-base font-bold text-ivory sm:hidden">
      {{ title }}
    </h1>

    <IconField class="mx-auto hidden w-full max-w-md sm:block">
      <InputIcon class="pi pi-search" />
      <InputText placeholder="Search markets, stocks, ETFs, currencies..." class="w-full" size="small" />
    </IconField>

    <div class="ml-auto flex items-center gap-1 sm:ml-0">
      <span class="sm:hidden">
        <Button v-tooltip.bottom="'Search'" icon="pi pi-search" text rounded severity="secondary"
          @click="stub('Search', 'Search isn\'t wired up in the preview yet.')" />
      </span>
      <div class="mr-2 hidden items-center gap-2 lg:flex">
        <span class="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/70" />
        <div class="leading-tight">
          <div class="text-xs font-semibold text-ivory">Market Open</div>
          <div class="nums text-[10px] text-platinum-400">09:45:32 EAT</div>
        </div>
      </div>
      <Button v-tooltip.bottom="'Notifications'" icon="pi pi-bell" text rounded severity="secondary"
        @click="stub('Notifications', 'No new notifications.')" />
      <span class="hidden sm:inline-flex">
        <Button v-tooltip.bottom="'Messages'" icon="pi pi-envelope" text rounded severity="secondary"
          @click="stub('Messages', 'You\'re all caught up.')" />
      </span>

      <button
        type="button"
        class="ml-1 flex items-center gap-2 rounded-lg border border-obsidian-500/60 bg-obsidian-800 py-1 pl-1 pr-1 hover:border-obsidian-400 sm:pr-2"
        @click="menu.toggle($event)"
      >
        <span class="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-linear-to-br from-emerald-500 to-gold-500 text-sm font-bold text-obsidian-950">
          {{ initials }}
        </span>
        <span class="hidden leading-tight md:block">
          <span class="block text-xs font-semibold text-ivory">{{ displayName }}</span>
          <span class="block text-[10px] text-gold-400">{{ tier }}</span>
        </span>
        <i class="pi pi-chevron-down hidden text-xs text-platinum-400 md:block" />
      </button>
      <Menu ref="menu" :model="items" popup />
    </div>
  </header>
</template>
