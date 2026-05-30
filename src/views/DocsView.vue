<script setup lang="ts">
import { computed } from "vue";
import AppShell from "@/components/shell/AppShell.vue";
import Card from "@/components/ui/Card.vue";
import Tag from "primevue/tag";
import { docsApi, apiBaseUrl, type ApiRoute } from "@/api";
import { useApi } from "@/composables/useApi";

const { data: routes, loading } = useApi(() => docsApi.routes(), [] as ApiRoute[]);

// Preserve the server's group ordering while grouping rows.
const groups = computed(() => {
  const order: string[] = [];
  const map = new Map<string, ApiRoute[]>();
  for (const r of routes.value) {
    if (!map.has(r.group)) {
      map.set(r.group, []);
      order.push(r.group);
    }
    map.get(r.group)!.push(r);
  }
  return order.map((name) => ({ name, routes: map.get(name)! }));
});

const methodSeverity = (m: string) =>
  m === "GET" ? "info" : m === "POST" ? "success" : m === "DELETE" ? "danger" : "warn";
</script>

<template>
  <AppShell title="API Docs">
    <div class="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="font-display text-xl font-bold text-ivory sm:text-2xl">API Reference</h1>
        <p class="text-sm text-platinum-400">
          Auto-generated from the live router · <span class="nums">{{ routes.length }}</span> endpoints ·
          base <code class="text-emerald-400">{{ apiBaseUrl }}</code>
        </p>
      </div>
      <span class="text-[11px] text-platinum-400">🔒 requires a bearer token</span>
    </div>

    <p v-if="loading" class="text-sm text-platinum-400">Loading…</p>

    <div class="space-y-6">
      <Card v-for="g in groups" :key="g.name" :title="g.name" flush>
        <div class="overflow-x-auto px-2 pb-2 sm:px-3">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="text-[10px] uppercase tracking-wider text-platinum-400">
                <th class="px-3 py-2 font-medium">Method</th>
                <th class="px-3 py-2 font-medium">Path</th>
                <th class="px-3 py-2 font-medium">Summary</th>
                <th class="px-3 py-2 font-medium">Request</th>
                <th class="px-3 py-2 font-medium">Response</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-obsidian-500/40">
              <tr v-for="r in g.routes" :key="r.method + r.path" class="align-top">
                <td class="px-3 py-2"><Tag :value="r.method" :severity="methodSeverity(r.method)" /></td>
                <td class="px-3 py-2">
                  <span class="nums text-ivory">{{ r.path }}</span>
                  <span v-if="r.auth" v-tooltip.top="'Requires authentication'" class="ml-1">🔒</span>
                </td>
                <td class="px-3 py-2 text-platinum-200">{{ r.summary }}</td>
                <td class="px-3 py-2"><code v-if="r.request" class="text-platinum-300">{{ r.request }}</code><span v-else class="text-platinum-500">—</span></td>
                <td class="px-3 py-2"><code v-if="r.response" class="text-emerald-300">{{ r.response }}</code><span v-else class="text-platinum-500">—</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  </AppShell>
</template>
