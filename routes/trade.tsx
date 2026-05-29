import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { AppShell } from "../components/dashboard/AppShell.tsx";
import { Card } from "../components/ui/Card.tsx";
import { PriceChange } from "../components/ui/PriceChange.tsx";
import { Sparkline } from "../components/ui/Sparkline.tsx";
import TradeTicket from "../islands/TradeTicket.tsx";
import { ACTIVE_PAIR, CANDLES } from "../data/mock.ts";

const FAQ = [
  {
    q: "Direct African conversion",
    a: "Convert NGN → KES directly without routing through the US Dollar, removing a layer of cost and delay.",
  },
  {
    q: "Faster settlement",
    a: "Fewer intermediaries means trades clear faster and you lose less to the spread on every conversion.",
  },
  {
    q: "Improved regional liquidity",
    a: "African-denominated order flow deepens local liquidity, tightening prices across connected markets.",
  },
  {
    q: "Lower cross-border costs",
    a: "Reduced FX friction lowers the cost of doing business across the continent for traders and institutions.",
  },
];

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
              <div class="join join-vertical w-full">
                {FAQ.map((f, i) => (
                  <div
                    key={f.q}
                    class="collapse-arrow join-item collapse border border-base-300 bg-base-100"
                  >
                    <input
                      type="radio"
                      name="why-afriqx"
                      checked={i === 0}
                    />
                    <div class="collapse-title text-sm font-semibold text-base-content">
                      {f.q}
                    </div>
                    <div class="collapse-content text-sm text-base-content/70">
                      {f.a}
                    </div>
                  </div>
                ))}
              </div>
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
