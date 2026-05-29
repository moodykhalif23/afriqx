import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { AppShell } from "../components/dashboard/AppShell.tsx";
import { Card } from "../components/ui/Card.tsx";
import { Sparkline } from "../components/ui/Sparkline.tsx";
import { PriceChange } from "../components/ui/PriceChange.tsx";
import { FxHeatmap } from "../components/dashboard/FxHeatmap.tsx";
import {
  ANALYTICS_STATS,
  PERFORMANCE,
  SECTOR_ALLOCATION,
} from "../data/mock.ts";

export default define.page(function Analytics() {
  return (
    <>
      <Head>
        <title>Analytics · AFRIQX</title>
      </Head>
      <AppShell active="Analytics" title="Analytics">
        <div class="mb-4">
          <h1 class="font-display text-xl font-bold text-base-content sm:text-2xl">
            Analytics
          </h1>
          <p class="text-sm text-base-content/60">
            Performance, allocation and continental FX intelligence.
          </p>
        </div>

        {/* Stat row */}
        <div class="stats stats-vertical w-full rounded-2xl border border-base-300 bg-base-200/80 shadow-xl shadow-black/30 sm:stats-horizontal">
          {ANALYTICS_STATS.map((s) => (
            <div class="stat" key={s.label}>
              <div class="stat-title text-[11px] uppercase tracking-wider text-base-content/50">
                {s.label}
              </div>
              <div class="stat-value nums text-xl text-base-content sm:text-2xl">
                {s.value}
              </div>
              <div class="stat-desc mt-1">
                {s.change !== undefined
                  ? <PriceChange value={s.change} percent class="text-xs" />
                  : <span class="text-xs text-base-content/50">{s.sub}</span>}
              </div>
            </div>
          ))}
        </div>

        <div class="mt-3 grid grid-cols-1 gap-3 sm:mt-5 sm:gap-5 lg:grid-cols-[1fr_360px]">
          {/* Performance */}
          <Card
            title="Portfolio Performance"
            action={<span>12M · rebased 100</span>}
          >
            <div class="mb-3 flex items-end gap-3">
              <span class="nums text-3xl font-bold text-base-content">
                {PERFORMANCE[PERFORMANCE.length - 1].toFixed(1)}
              </span>
              <PriceChange
                value={PERFORMANCE[PERFORMANCE.length - 1] - 100}
                percent
                class="pb-1 text-sm"
              />
            </div>
            <Sparkline
              data={PERFORMANCE}
              width={720}
              height={220}
              tone="up"
              area
              class="w-full"
            />
            <div class="mt-2 flex justify-between text-[10px] text-base-content/40">
              {["Jun", "Aug", "Oct", "Dec", "Feb", "Apr"].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </Card>

          {/* Sector allocation */}
          <Card title="Sector Allocation">
            <ul class="space-y-4">
              {SECTOR_ALLOCATION.map((s) => (
                <li key={s.label}>
                  <div class="mb-1.5 flex items-center justify-between text-sm">
                    <span class="text-base-content/80">{s.label}</span>
                    <span class="nums font-medium text-base-content">
                      {s.pct}%
                    </span>
                  </div>
                  <div class="h-2 w-full overflow-hidden rounded-full bg-base-300">
                    <div
                      class="h-full rounded-full"
                      style={{
                        width: `${s.pct}%`,
                        backgroundColor: s.color,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div class="mt-3 grid grid-cols-1 gap-3 sm:mt-5 sm:gap-5 lg:grid-cols-2">
          <FxHeatmap />
          <Card title="Continental Intelligence">
            <div class="grid grid-cols-2 gap-3">
              {[
                { k: "Cross-border flow", v: "₦2.4T", d: "24h" },
                { k: "Active markets", v: "9", d: "exchanges" },
                { k: "FX pairs live", v: "42", d: "direct" },
                { k: "Liquidity depth", v: "Strong", d: "AFXI 98.65" },
              ].map((x) => (
                <div
                  class="rounded-xl border border-base-300 bg-base-100 p-3 hover-lift"
                  key={x.k}
                >
                  <div class="text-[10px] uppercase tracking-wider text-base-content/50">
                    {x.k}
                  </div>
                  <div class="nums mt-1 text-lg font-bold text-base-content">
                    {x.v}
                  </div>
                  <div class="text-[11px] text-base-content/40">{x.d}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </AppShell>
    </>
  );
});
