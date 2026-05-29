import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { AppShell } from "../components/dashboard/AppShell.tsx";
import { Card } from "../components/ui/Card.tsx";
import { PriceChange } from "../components/ui/PriceChange.tsx";
import { Sparkline } from "../components/ui/Sparkline.tsx";
import TradeTicket from "../islands/TradeTicket.tsx";
import { ACTIVE_PAIR, CANDLES } from "../data/mock.ts";

export default define.page(function Trade() {
  const closes = CANDLES.map((c) => c.close);
  return (
    <>
      <Head>
        <title>Trade · AFRIQX</title>
      </Head>
      <AppShell active="Trade" title="Trade">
        <div class="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:gap-5 lg:grid-cols-[1fr_400px]">
          {/* Market info */}
          <div class="order-2 space-y-3 sm:space-y-5 lg:order-1">
            <Card>
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  <span class="grid h-10 w-10 place-items-center rounded-full bg-obsidian-700 text-lg">
                    {ACTIVE_PAIR.flag}
                  </span>
                  <div class="leading-tight">
                    <div class="font-display text-base font-bold text-ivory">
                      {ACTIVE_PAIR.pair}
                    </div>
                    <div class="text-[11px] text-platinum-400">
                      {ACTIVE_PAIR.name}
                    </div>
                  </div>
                </div>
                <div class="text-right leading-tight">
                  <div class="nums text-xl font-bold text-ivory">
                    {ACTIVE_PAIR.price.toFixed(4)}
                  </div>
                  <PriceChange
                    value={ACTIVE_PAIR.change}
                    percent
                    class="text-xs"
                  />
                </div>
              </div>
              <Sparkline
                data={closes}
                width={640}
                height={120}
                tone="up"
                area
                class="mt-4 w-full"
              />
              <div class="mt-4 grid grid-cols-2 gap-3 xs:grid-cols-4">
                <MiniStat
                  label="24h High"
                  value={ACTIVE_PAIR.high24h.toFixed(4)}
                />
                <MiniStat
                  label="24h Low"
                  value={ACTIVE_PAIR.low24h.toFixed(4)}
                />
                <MiniStat label="24h Vol" value={ACTIVE_PAIR.volume24h} />
                <MiniStat
                  label="24h Chg"
                  value={`+${ACTIVE_PAIR.change}%`}
                  up
                />
              </div>
            </Card>

            <Card title="Why African pairs?">
              <ul class="grid gap-3 text-sm text-platinum-300 sm:grid-cols-2">
                <Bullet>
                  Direct conversion — no routing through the US Dollar.
                </Bullet>
                <Bullet>Faster settlement and reduced spread loss.</Bullet>
                <Bullet>Improved regional liquidity across markets.</Bullet>
                <Bullet>Lower FX costs for cross-border African trade.</Bullet>
              </ul>
            </Card>
          </div>

          {/* Order ticket */}
          <div class="order-1 lg:order-2">
            <div class="lg:sticky lg:top-4">
              <TradeTicket />
            </div>
          </div>
        </div>
      </AppShell>
    </>
  );
});

function MiniStat(
  { label, value, up = false }: { label: string; value: string; up?: boolean },
) {
  return (
    <div class="rounded-lg bg-obsidian-900 px-3 py-2">
      <div class="text-[10px] uppercase tracking-wider text-platinum-400">
        {label}
      </div>
      <div class={`nums text-sm font-medium ${up ? "text-up" : "text-ivory"}`}>
        {value}
      </div>
    </div>
  );
}

function Bullet({ children }: { children: string }) {
  return (
    <li class="flex items-start gap-2">
      <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
      <span>{children}</span>
    </li>
  );
}
