import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { AppShell } from "../components/dashboard/AppShell.tsx";
import { Card } from "../components/ui/Card.tsx";
import { Button } from "../components/ui/Button.tsx";
import { Icon, type IconName } from "../components/dashboard/Icon.tsx";
import { EXPLORE_LAYERS, EXPLORE_PRODUCTS, INDEXES } from "../data/mock.ts";
import { Sparkline } from "../components/ui/Sparkline.tsx";
import { PriceChange } from "../components/ui/PriceChange.tsx";

export default define.page(function Explore() {
  return (
    <>
      <Head>
        <title>AFX Explore · AFRIQX</title>
      </Head>
      <AppShell active="AFX Explore" title="AFX Explore">
        {/* Hero */}
        <section class="afriqx-aurora relative overflow-hidden rounded-2xl border border-base-300 p-6 sm:p-10">
          <span class="badge badge-soft badge-success mb-3 font-semibold uppercase tracking-wider">
            Explore
          </span>
          <h1 class="max-w-2xl font-display text-2xl font-bold leading-tight text-base-content sm:text-4xl">
            The Operating System for{" "}
            <span class="text-gradient-brand">African Capital Markets</span>
          </h1>
          <p class="mt-3 max-w-xl text-sm text-base-content/70 sm:text-base">
            One platform across trading, FX, liquidity, intelligence and AI —
            pricing Africa in African value.
          </p>
          <div class="mt-5 flex flex-wrap gap-3">
            <Button variant="primary">Open Terminal</Button>
            <Button variant="gold">Upgrade to Pro</Button>
          </div>
        </section>

        {/* Product ecosystem — hover-3D cards */}
        <h2 class="mb-3 mt-6 font-display text-lg font-bold text-base-content">
          Product Ecosystem
        </h2>
        <div class="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3">
          {EXPLORE_PRODUCTS.map((p) => (
            <a
              href="#"
              key={p.name}
              class="card-3d block rounded-2xl border border-base-300 bg-base-200 p-5"
            >
              <div class="flex items-center justify-between">
                <span class="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
                  <Icon name={p.icon as IconName} size={22} />
                </span>
                {p.badge && (
                  <span class="badge badge-sm badge-soft badge-warning font-bold">
                    {p.badge}
                  </span>
                )}
              </div>
              <h3 class="mt-4 font-display text-base font-bold text-base-content">
                {p.name}
              </h3>
              <p class="mt-1 text-sm text-base-content/60">{p.tagline}</p>
              <span class="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                Learn more <Icon name="markets" size={14} />
              </span>
            </a>
          ))}
        </div>

        {/* Trending indexes carousel */}
        <h2 class="mb-3 mt-8 font-display text-lg font-bold text-base-content">
          Trending Indexes
        </h2>
        <div class="carousel carousel-center w-full gap-4 pb-2">
          {INDEXES.map((ix) => (
            <div key={ix.symbol} class="carousel-item w-56">
              <div class="card-3d w-full rounded-2xl border border-base-300 bg-base-200 p-4">
                <div class="flex items-center justify-between">
                  <span class="font-display text-sm font-bold text-base-content">
                    {ix.symbol}
                  </span>
                  <PriceChange
                    value={ix.change}
                    percent
                    arrow={false}
                    class="text-xs"
                  />
                </div>
                <div class="nums mt-1 text-lg font-semibold text-base-content">
                  {ix.value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </div>
                <Sparkline
                  data={ix.series}
                  width={200}
                  height={44}
                  class="mt-2 w-full"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Architecture layers */}
        <h2 class="mb-3 mt-8 font-display text-lg font-bold text-base-content">
          Exchange Architecture
        </h2>
        <Card flush>
          <ul class="divide-y divide-base-300">
            {EXPLORE_LAYERS.map((l) => (
              <li
                key={l.n}
                class="flex items-start gap-4 p-4 transition-colors hover:bg-base-300/40 sm:p-5"
              >
                <span class="nums font-display text-2xl font-black text-primary/40">
                  {l.n}
                </span>
                <div>
                  <h3 class="font-semibold text-base-content">{l.title}</h3>
                  <p class="mt-0.5 text-sm text-base-content/60">{l.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </AppShell>
    </>
  );
});
