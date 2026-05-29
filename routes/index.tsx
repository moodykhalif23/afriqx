import type { ComponentChildren } from "preact";
import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { Logo } from "../components/Logo.tsx";
import {
  Badge,
  Button,
  Card,
  PriceChange,
  Sparkline,
  Stat,
} from "../components/ui/index.ts";
import { AFXI, FX_PAIRS, INDEXES, WATCHLIST } from "../data/mock.ts";

const SWATCHES: { name: string; token: string; cls: string; note: string }[] = [
  {
    name: "Obsidian",
    token: "obsidian-900",
    cls: "bg-obsidian-900 border border-obsidian-500",
    note: "Trust · Stability",
  },
  {
    name: "Deep Emerald",
    token: "emerald-500",
    cls: "bg-emerald-500",
    note: "Wealth · Growth",
  },
  {
    name: "Bright Emerald",
    token: "emerald-400",
    cls: "bg-emerald-400",
    note: "Up moves",
  },
  {
    name: "Muted Gold",
    token: "gold-500",
    cls: "bg-gold-500",
    note: "Premium · Value",
  },
  {
    name: "Platinum",
    token: "platinum-300",
    cls: "bg-platinum-300",
    note: "Precision · Tech",
  },
  { name: "Warm Ivory", token: "ivory", cls: "bg-ivory", note: "Clarity" },
];

function Section(
  { eyebrow, title, children }: {
    eyebrow: string;
    title: string;
    children: ComponentChildren;
  },
) {
  return (
    <section class="space-y-6">
      <div class="space-y-1">
        <div class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
          {eyebrow}
        </div>
        <h2 class="font-display text-2xl font-bold text-ivory">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default define.page(function DesignSystem() {
  return (
    <div class="min-h-screen afriqx-aurora">
      <Head>
        <title>AFRIQX — Design System</title>
      </Head>

      {/* Top bar */}
      <header class="sticky top-0 z-10 border-b border-obsidian-500/60 bg-obsidian-900/80 backdrop-blur-md">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo variant="full" size={30} />
          <div class="flex items-center gap-3">
            <Badge tone="emerald" dot>Design System</Badge>
            <span class="hidden text-xs text-platinum-400 sm:inline">v0.1</span>
          </div>
        </div>
      </header>

      <main class="mx-auto max-w-6xl space-y-20 px-6 py-16">
        {/* Hero / brand statement */}
        <section class="space-y-8 text-center">
          <Logo variant="stacked" size={84} tagline />
          <div class="mx-auto max-w-2xl space-y-4">
            <h1 class="font-display text-4xl font-bold leading-tight text-ivory sm:text-5xl">
              The Operating System for{" "}
              <span class="text-gradient-brand">African Capital Markets</span>
            </h1>
            <p class="text-platinum-300">
              Pricing Africa in African value. The brand foundation — colour,
              type, logo and core interface primitives for the AFRIQX terminal.
            </p>
          </div>
          <div class="flex flex-wrap items-center justify-center gap-3">
            <Button variant="primary" size="lg">Open Terminal</Button>
            <Button variant="gold" size="lg">Upgrade to Pro</Button>
            <Button variant="secondary" size="lg">View Markets</Button>
          </div>
        </section>

        {/* Live index strip preview */}
        <Card flush class="overflow-hidden">
          <div class="grid grid-cols-2 divide-obsidian-500/50 sm:grid-cols-3 lg:grid-cols-6 lg:divide-x">
            {INDEXES.map((ix) => (
              <div class="border-b border-obsidian-500/50 px-5 py-4 lg:border-b-0">
                <Stat
                  label={ix.symbol}
                  value={ix.value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                  change={ix.change}
                  series={ix.series}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Colour */}
        <Section eyebrow="Foundations" title="Colour">
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {SWATCHES.map((s) => (
              <div class="space-y-3">
                <div
                  class={`h-24 rounded-2xl shadow-lg shadow-black/30 ${s.cls}`}
                />
                <div>
                  <div class="text-sm font-semibold text-ivory">{s.name}</div>
                  <div class="nums text-xs text-platinum-400">{s.token}</div>
                  <div class="mt-0.5 text-xs text-platinum-400">{s.note}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Typography */}
        <Section eyebrow="Foundations" title="Typography">
          <div class="grid gap-6 lg:grid-cols-3">
            <Card title="Satoshi · Display">
              <p class="font-display text-3xl font-black text-ivory">AFRIQX</p>
              <p class="font-display text-xl font-bold text-ivory">
                African Markets
              </p>
              <p class="mt-2 text-xs text-platinum-400">
                Headlines · wordmark · numbers of scale
              </p>
            </Card>
            <Card title="Inter · Body">
              <p class="text-base text-ivory">
                Borderless exchange for African capital.
              </p>
              <p class="mt-1 text-sm text-platinum-300">
                Clean, geometric and highly readable across dense dashboards.
              </p>
              <p class="mt-2 text-xs text-platinum-400">
                UI · paragraphs · labels
              </p>
            </Card>
            <Card title="JetBrains Mono · Data">
              <p class="nums text-2xl font-semibold text-ivory">2,158.45</p>
              <p class="nums text-sm text-emerald-400">
                +3.45% · NGN/KES 0.1524
              </p>
              <p class="mt-2 text-xs text-platinum-400">
                Tabular figures — prices never jitter
              </p>
            </Card>
          </div>
        </Section>

        {/* Logo lockups */}
        <Section eyebrow="Brand" title="Logo Lockups">
          <div class="grid gap-6 sm:grid-cols-3">
            <Card class="flex items-center justify-center py-12">
              <Logo variant="mark" size={72} />
            </Card>
            <Card class="flex items-center justify-center py-12">
              <Logo variant="full" size={40} />
            </Card>
            <Card class="flex items-center justify-center py-12">
              <Logo variant="stacked" size={56} tagline />
            </Card>
          </div>
        </Section>

        {/* Components */}
        <Section eyebrow="Components" title="Core Primitives">
          <div class="grid gap-6 lg:grid-cols-2">
            <Card title="Buttons">
              <div class="flex flex-wrap items-center gap-3">
                <Button variant="primary">Invest</Button>
                <Button variant="gold">Upgrade to Pro</Button>
                <Button variant="secondary">Add to Watchlist</Button>
                <Button variant="danger">Sell</Button>
                <Button variant="ghost">Cancel</Button>
              </div>
              <div class="mt-4 flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </div>
            </Card>

            <Card title="Badges & Status">
              <div class="flex flex-wrap items-center gap-3">
                <Badge tone="emerald" dot>Market Open</Badge>
                <Badge tone="gold">Pro Trader</Badge>
                <Badge tone="neutral">Equities</Badge>
                <Badge tone="down" dot>Halted</Badge>
                <Badge tone="outline">New</Badge>
              </div>
              <div class="mt-5 flex flex-wrap items-center gap-5">
                <PriceChange value={3.45} percent />
                <PriceChange value={-0.28} percent />
                <PriceChange value={1764.0} arrow={false} />
                <Sparkline
                  data={INDEXES[2].series}
                  width={120}
                  height={36}
                  area
                />
              </div>
            </Card>
          </div>

          <div class="grid gap-6 lg:grid-cols-3">
            {/* Watchlist sample */}
            <Card title="Watchlist" action={<span>View all</span>}>
              <ul class="space-y-3">
                {WATCHLIST.slice(0, 5).map((h) => (
                  <li class="flex items-center justify-between gap-3">
                    <div class="min-w-0">
                      <div class="truncate text-sm font-semibold text-ivory">
                        {h.symbol}
                      </div>
                      <div class="nums text-xs text-platinum-400">
                        {h.price}
                      </div>
                    </div>
                    <PriceChange
                      value={h.change}
                      percent
                      arrow={false}
                      class="text-sm"
                    />
                  </li>
                ))}
              </ul>
            </Card>

            {/* FX pairs */}
            <Card
              title="African FX — Direct Pairs"
              action={<span>AFXI {AFXI.value}</span>}
            >
              <ul class="space-y-3">
                {FX_PAIRS.map((p) => (
                  <li class="flex items-center justify-between gap-3">
                    <div>
                      <div class="text-sm font-semibold text-ivory">
                        {p.pair}
                      </div>
                      <div class="text-xs text-platinum-400">{p.name}</div>
                    </div>
                    <div class="text-right">
                      <div class="nums text-sm text-ivory">{p.rate}</div>
                      <PriceChange
                        value={p.change}
                        percent
                        arrow={false}
                        class="text-xs"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            {/* AFXI highlight */}
            <Card title="African FX Index">
              <div class="flex h-full flex-col justify-between">
                <div>
                  <div class="nums text-4xl font-bold text-ivory">
                    {AFXI.value}
                  </div>
                  <PriceChange value={AFXI.change} percent class="text-sm" />
                </div>
                <Sparkline
                  data={[97.1, 97.6, 97.3, 98.0, 98.2, 97.9, 98.4, 98.65]}
                  width={260}
                  height={64}
                  tone="up"
                  area
                  class="mt-4 w-full"
                />
              </div>
            </Card>
          </div>
        </Section>

        {/* Footer */}
        <footer class="flex flex-col items-center gap-4 border-t border-obsidian-500/60 pt-10 text-center">
          <Logo variant="full" size={26} />
          <p class="text-xs uppercase tracking-[0.2em] text-platinum-400">
            African Markets. African Value.{" "}
            <span class="text-emerald-400">African Future.</span>
          </p>
        </footer>
      </main>
    </div>
  );
});
