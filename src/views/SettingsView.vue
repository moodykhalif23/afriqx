<script setup lang="ts">
import { ref } from "vue";
import AppShell from "@/components/shell/AppShell.vue";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import ToggleSwitch from "primevue/toggleswitch";
import Button from "primevue/button";
import { USER } from "@/data/mock";
import { useStub } from "@/composables/useStub";

const stub = useStub();

const name = ref(USER.name);
const email = ref("amara@afriqx.africa");
const baseCcy = ref("KES");
const theme = ref("AFRIQX Dark");
const flags = ref({
  twoFa: true, biometric: true, priceAlerts: true, orderFills: true,
  newsDigest: false, aiSummary: true, compactTables: true, ticker: true,
});
</script>

<template>
  <AppShell title="Settings">
    <div class="mx-auto max-w-3xl">
      <div class="mb-6">
        <h1 class="font-display text-xl font-bold text-ivory sm:text-2xl">Settings</h1>
        <p class="text-sm text-platinum-400">Manage your profile, security and preferences.</p>
      </div>

      <Accordion value="0">
        <AccordionPanel value="0">
          <AccordionHeader>Profile</AccordionHeader>
          <AccordionContent>
            <div class="space-y-4 pt-2">
              <div class="flex items-center justify-between gap-4">
                <span class="text-sm font-medium text-ivory">Full name</span>
                <InputText v-model="name" size="small" class="w-52" />
              </div>
              <div class="flex items-center justify-between gap-4">
                <span class="text-sm font-medium text-ivory">Email</span>
                <InputText v-model="email" size="small" class="w-60" />
              </div>
              <div class="flex items-center justify-between gap-4">
                <span class="text-sm font-medium text-ivory">Base currency</span>
                <Select v-model="baseCcy" :options="['KES', 'NGN', 'ZAR', 'USD']" class="w-32" />
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>

        <AccordionPanel value="1">
          <AccordionHeader>Security</AccordionHeader>
          <AccordionContent>
            <div class="space-y-4 pt-2">
              <div class="flex items-center justify-between gap-4">
                <div><div class="text-sm font-medium text-ivory">Two-factor authentication</div><div class="text-xs text-platinum-400">Recommended</div></div>
                <ToggleSwitch v-model="flags.twoFa" />
              </div>
              <div class="flex items-center justify-between gap-4">
                <div><div class="text-sm font-medium text-ivory">Biometric login</div><div class="text-xs text-platinum-400">Face / fingerprint on mobile</div></div>
                <ToggleSwitch v-model="flags.biometric" />
              </div>
              <div class="flex items-center justify-between gap-4">
                <span class="text-sm font-medium text-ivory">Change password</span>
                <Button label="Update" size="small" severity="secondary" outlined
                  @click="stub('Change password', 'Password management is coming soon.')" />
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>

        <AccordionPanel value="2">
          <AccordionHeader>Notifications</AccordionHeader>
          <AccordionContent>
            <div class="space-y-4 pt-2">
              <div class="flex items-center justify-between gap-4"><span class="text-sm font-medium text-ivory">Price alerts</span><ToggleSwitch v-model="flags.priceAlerts" /></div>
              <div class="flex items-center justify-between gap-4"><span class="text-sm font-medium text-ivory">Order fills</span><ToggleSwitch v-model="flags.orderFills" /></div>
              <div class="flex items-center justify-between gap-4"><div><div class="text-sm font-medium text-ivory">Market news digest</div><div class="text-xs text-platinum-400">Daily at 08:00 EAT</div></div><ToggleSwitch v-model="flags.newsDigest" /></div>
              <div class="flex items-center justify-between gap-4"><span class="text-sm font-medium text-ivory">AI market summaries</span><ToggleSwitch v-model="flags.aiSummary" /></div>
            </div>
          </AccordionContent>
        </AccordionPanel>

        <AccordionPanel value="3">
          <AccordionHeader>Preferences</AccordionHeader>
          <AccordionContent>
            <div class="space-y-4 pt-2">
              <div class="flex items-center justify-between gap-4"><span class="text-sm font-medium text-ivory">Theme</span><Select v-model="theme" :options="['AFRIQX Dark', 'Obsidian']" class="w-40" /></div>
              <div class="flex items-center justify-between gap-4"><span class="text-sm font-medium text-ivory">Compact data tables</span><ToggleSwitch v-model="flags.compactTables" /></div>
              <div class="flex items-center justify-between gap-4"><span class="text-sm font-medium text-ivory">Show ticker bar</span><ToggleSwitch v-model="flags.ticker" /></div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>

      <div class="mt-5 flex justify-end gap-3">
        <Button label="Cancel" text severity="secondary"
          @click="stub('Cancelled', 'No changes were saved.')" />
        <Button label="Save changes" class="font-display font-semibold"
          @click="stub('Settings saved', 'Your preferences have been updated.', 'success')" />
      </div>
    </div>
  </AppShell>
</template>
