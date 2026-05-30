<script setup lang="ts">
import { onMounted, ref } from "vue";
import AppShell from "@/components/shell/AppShell.vue";
import Card from "@/components/ui/Card.vue";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import ToggleSwitch from "primevue/toggleswitch";
import Button from "primevue/button";
import { settingsApi, ApiError, type Settings } from "@/api";
import { auth } from "@/stores/auth";
import { useStub } from "@/composables/useStub";

const stub = useStub();

const name = ref(auth.state.user?.name ?? "");
const email = ref(auth.state.user?.email ?? "");
const baseCcy = ref("KES");
const theme = ref("AFRIQX Dark");
const flags = ref({
  twoFa: true, biometric: true, priceAlerts: true, orderFills: true,
  newsDigest: false, aiSummary: true, compactTables: true, ticker: true,
});
const saving = ref(false);

onMounted(async () => {
  try {
    const s = await settingsApi.get();
    name.value = s.name;
    email.value = s.email;
    baseCcy.value = s.baseCcy;
    theme.value = s.theme;
    flags.value = {
      twoFa: s.twoFa, biometric: s.biometric, priceAlerts: s.priceAlerts,
      orderFills: s.orderFills, newsDigest: s.newsDigest, aiSummary: s.aiSummary,
      compactTables: s.compactTables, ticker: s.ticker,
    };
  } catch {
    // 401 handled globally; other errors leave defaults in place.
  }
});

async function save() {
  saving.value = true;
  const payload: Settings = {
    name: name.value.trim(),
    email: email.value,
    baseCcy: baseCcy.value,
    theme: theme.value,
    ...flags.value,
  };
  try {
    const updated = await settingsApi.update(payload);
    auth.patchUser({ name: updated.name });
    stub("Settings saved", "Your preferences have been updated.", "success");
  } catch (e) {
    stub("Could not save", e instanceof ApiError ? e.message : "Try again.", "warn");
  } finally {
    saving.value = false;
  }
}

function cancel() {
  stub("Cancelled", "No changes were saved.");
}
</script>

<template>
  <AppShell title="Settings">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="font-display text-xl font-bold text-ivory sm:text-2xl">Settings</h1>
        <p class="text-sm text-platinum-400">Manage your profile, security and preferences.</p>
      </div>
      <div class="flex items-center gap-3 rounded-2xl border border-obsidian-500/60 bg-linear-to-br from-emerald-700/30 to-obsidian-800 px-4 py-2.5">
        <span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-linear-to-br from-emerald-500 to-gold-500 text-sm font-bold text-obsidian-950">
          {{ name.split(" ").map((n) => n[0]).join("").slice(0, 2) }}
        </span>
        <div class="leading-tight">
          <div class="text-sm font-semibold text-ivory">{{ name }}</div>
          <div class="text-[11px] text-gold-400">{{ auth.state.user?.tier ?? "Trader" }}</div>
        </div>
      </div>
    </div>

    <div class="grid gap-5 sm:gap-6 lg:grid-cols-2">
      <!-- Profile -->
      <Card title="Profile">
        <div class="space-y-4">
          <div>
            <label class="mb-1.5 block text-sm font-medium text-platinum-200">Full name</label>
            <InputText v-model="name" class="w-full" />
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-medium text-platinum-200">Email</label>
            <InputText v-model="email" type="email" class="w-full" />
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-medium text-platinum-200">Base currency</label>
            <Select v-model="baseCcy" :options="['KES', 'NGN', 'ZAR', 'USD']" class="w-full" />
          </div>
        </div>
      </Card>

      <!-- Security -->
      <Card title="Security">
        <div class="space-y-3">
          <div class="flex items-center justify-between gap-4 rounded-xl border border-obsidian-500/50 bg-obsidian-900/40 px-4 py-3">
            <div><div class="text-sm font-medium text-ivory">Two-factor authentication</div><div class="text-xs text-platinum-400">Recommended</div></div>
            <ToggleSwitch v-model="flags.twoFa" />
          </div>
          <div class="flex items-center justify-between gap-4 rounded-xl border border-obsidian-500/50 bg-obsidian-900/40 px-4 py-3">
            <div><div class="text-sm font-medium text-ivory">Biometric login</div><div class="text-xs text-platinum-400">Face / fingerprint on mobile</div></div>
            <ToggleSwitch v-model="flags.biometric" />
          </div>
          <div class="flex items-center justify-between gap-4 rounded-xl border border-obsidian-500/50 bg-obsidian-900/40 px-4 py-3">
            <div><div class="text-sm font-medium text-ivory">Password</div><div class="text-xs text-platinum-400">Last changed 3 months ago</div></div>
            <Button label="Update" size="small" severity="secondary" outlined
              @click="stub('Change password', 'Password management is coming soon.')" />
          </div>
        </div>
      </Card>

      <!-- Notifications -->
      <Card title="Notifications">
        <div class="space-y-3">
          <div class="flex items-center justify-between gap-4 rounded-xl border border-obsidian-500/50 bg-obsidian-900/40 px-4 py-3"><span class="text-sm font-medium text-ivory">Price alerts</span><ToggleSwitch v-model="flags.priceAlerts" /></div>
          <div class="flex items-center justify-between gap-4 rounded-xl border border-obsidian-500/50 bg-obsidian-900/40 px-4 py-3"><span class="text-sm font-medium text-ivory">Order fills</span><ToggleSwitch v-model="flags.orderFills" /></div>
          <div class="flex items-center justify-between gap-4 rounded-xl border border-obsidian-500/50 bg-obsidian-900/40 px-4 py-3"><div><div class="text-sm font-medium text-ivory">Market news digest</div><div class="text-xs text-platinum-400">Daily at 08:00 EAT</div></div><ToggleSwitch v-model="flags.newsDigest" /></div>
          <div class="flex items-center justify-between gap-4 rounded-xl border border-obsidian-500/50 bg-obsidian-900/40 px-4 py-3"><span class="text-sm font-medium text-ivory">AI market summaries</span><ToggleSwitch v-model="flags.aiSummary" /></div>
        </div>
      </Card>

      <!-- Preferences -->
      <Card title="Preferences">
        <div class="space-y-3">
          <div>
            <label class="mb-1.5 block text-sm font-medium text-platinum-200">Theme</label>
            <Select v-model="theme" :options="['AFRIQX Dark', 'Obsidian']" class="w-full" />
          </div>
          <div class="flex items-center justify-between gap-4 rounded-xl border border-obsidian-500/50 bg-obsidian-900/40 px-4 py-3"><span class="text-sm font-medium text-ivory">Compact data tables</span><ToggleSwitch v-model="flags.compactTables" /></div>
          <div class="flex items-center justify-between gap-4 rounded-xl border border-obsidian-500/50 bg-obsidian-900/40 px-4 py-3"><span class="text-sm font-medium text-ivory">Show ticker bar</span><ToggleSwitch v-model="flags.ticker" /></div>
        </div>
      </Card>
    </div>

    <div class="mt-6 flex justify-end gap-3">
      <Button label="Cancel" text severity="secondary" @click="cancel" />
      <Button label="Save changes" class="font-display font-semibold" :loading="saving" @click="save" />
    </div>
  </AppShell>
</template>
