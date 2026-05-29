import type { ComponentChildren } from "preact";
import { useComputed, useSignal } from "@preact/signals";
import { Button } from "../components/ui/Button.tsx";
import { TRADE_PAIRS, TRADE_TABS } from "../data/mock.ts";

/** Value of 1 unit of each currency expressed in KES (mock rates). */
const RATE_IN_KES: Record<string, number> = {
  KES: 1,
  NGN: 0.1524,
  ZAR: 6.95,
  GHS: 8.6,
  EGP: 2.6,
};

const fmt = (n: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function TradeTicket() {
  const tab = useSignal(0); // 0 Buy · 1 Sell · 2 FX · 3 Convert
  const isExchange = useComputed(() => tab.value >= 2); // FX or Convert

  // FX / Convert state
  const from = useSignal("NGN");
  const to = useSignal("KES");
  const amount = useSignal("1000000");

  const rate = useComputed(() =>
    (RATE_IN_KES[from.value] ?? 1) / (RATE_IN_KES[to.value] ?? 1)
  );
  const converted = useComputed(() => {
    const a = parseFloat(amount.value.replace(/,/g, "")) || 0;
    return a * rate.value;
  });

  // Buy / Sell state
  const orderType = useSignal<"Market" | "Limit">("Market");
  const qty = useSignal("100");
  const limitPrice = useSignal("682.50");
  const marketPrice = 682.5; // DANGCEM NGN
  const estCost = useComputed(() => {
    const q = parseFloat(qty.value.replace(/,/g, "")) || 0;
    const p = orderType.value === "Market"
      ? marketPrice
      : parseFloat(limitPrice.value.replace(/,/g, "")) || 0;
    return q * p;
  });

  const buy = tab.value === 0;
  const ctaTone = tab.value === 1 ? "danger" : "primary";
  const ctaLabel = isExchange.value
    ? "Review Conversion"
    : `Review ${TRADE_TABS[tab.value]} Order`;

  return (
    <div class="rounded-2xl border border-obsidian-500/60 bg-obsidian-800/80 p-4 sm:p-5">
      {/* Segment tabs */}
      <div class="flex gap-1 rounded-xl bg-obsidian-900 p-1">
        {TRADE_TABS.map((t, i) => (
          <button
            key={t}
            type="button"
            onClick={() => (tab.value = i)}
            class={`h-10 flex-1 rounded-lg text-sm font-semibold transition-colors ${
              tab.value === i
                ? (i === 1
                  ? "bg-[var(--color-down)] text-obsidian-950"
                  : "bg-emerald-500 text-obsidian-950")
                : "text-platinum-300 active:bg-obsidian-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {isExchange.value
        ? (
          <div class="mt-5 space-y-3">
            <FieldShell label="From">
              <CurrencySelect signal={from} />
              <AmountInput signal={amount} />
            </FieldShell>

            <div class="flex justify-center">
              <button
                type="button"
                aria-label="Swap currencies"
                onClick={() => {
                  const f = from.value;
                  from.value = to.value;
                  to.value = f;
                }}
                class="grid h-9 w-9 place-items-center rounded-full border border-obsidian-500/70 bg-obsidian-700 text-emerald-300 active:bg-obsidian-600"
              >
                ⇅
              </button>
            </div>

            <FieldShell label="To (estimated)">
              <CurrencySelect signal={to} />
              <div class="flex h-12 items-center justify-end px-3 nums text-lg font-semibold text-ivory">
                {fmt(converted.value)}
              </div>
            </FieldShell>

            <RateLine
              text={`1 ${from.value} = ${
                rate.value.toFixed(4)
              } ${to.value} · No USD routing`}
            />
          </div>
        )
        : (
          <div class="mt-5 space-y-4">
            <div>
              <Label>Instrument</Label>
              <div class="flex h-12 items-center gap-3 rounded-lg border border-obsidian-500/70 bg-obsidian-900 px-3">
                <span class="grid h-7 w-7 place-items-center rounded-md bg-emerald-500/20 text-[10px] font-bold text-emerald-300">
                  DA
                </span>
                <div class="min-w-0 leading-tight">
                  <div class="truncate text-sm font-semibold text-ivory">
                    DANGCEM
                  </div>
                  <div class="truncate text-[11px] text-platinum-400">
                    Dangote Cement · NGX
                  </div>
                </div>
                <span class="ml-auto nums text-sm text-ivory">NGN 682.50</span>
              </div>
            </div>

            {/* Order type */}
            <div class="flex gap-1 rounded-lg bg-obsidian-900 p-1">
              {(["Market", "Limit"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => (orderType.value = t)}
                  class={`h-9 flex-1 rounded-md text-xs font-semibold transition-colors ${
                    orderType.value === t
                      ? "bg-obsidian-600 text-ivory"
                      : "text-platinum-400 active:text-ivory"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div>
              <Label>Quantity</Label>
              <AmountInput signal={qty} boxed />
            </div>

            {orderType.value === "Limit" && (
              <div>
                <Label>Limit Price (NGN)</Label>
                <AmountInput signal={limitPrice} boxed />
              </div>
            )}

            <div class="flex items-center justify-between rounded-lg bg-obsidian-900 px-3 py-3">
              <span class="text-sm text-platinum-300">
                Estimated {buy ? "Cost" : "Proceeds"}
              </span>
              <span class="nums text-base font-semibold text-ivory">
                NGN {fmt(estCost.value)}
              </span>
            </div>
          </div>
        )}

      <Button variant={ctaTone} block size="lg" class="mt-5">
        {ctaLabel}
      </Button>
      <p class="mt-2 text-center text-[11px] text-platinum-400">
        Settled in African value · Powered by the Pan-African Liquidity Network
      </p>
    </div>
  );
}

function Label({ children }: { children: string }) {
  return (
    <div class="mb-1.5 text-xs font-medium uppercase tracking-wider text-platinum-400">
      {children}
    </div>
  );
}

function FieldShell(
  { label, children }: { label: string; children: ComponentChildren },
) {
  return (
    <div class="rounded-xl border border-obsidian-500/70 bg-obsidian-900 p-3">
      <Label>{label}</Label>
      <div class="grid grid-cols-[120px_1fr] gap-2">{children}</div>
    </div>
  );
}

function CurrencySelect({ signal }: { signal: { value: string } }) {
  return (
    <select
      value={signal.value}
      onChange={(e) => (signal.value = (e.target as HTMLSelectElement).value)}
      class="select h-12 border-base-300 bg-base-200 text-sm font-semibold text-base-content focus:border-primary"
    >
      {TRADE_PAIRS.map((p) => (
        <option key={p.code} value={p.code}>{p.code}</option>
      ))}
    </select>
  );
}

function AmountInput(
  { signal, boxed = false }: { signal: { value: string }; boxed?: boolean },
) {
  return (
    <input
      type="text"
      inputMode="decimal"
      value={signal.value}
      onInput={(e) => (signal.value = (e.target as HTMLInputElement).value)}
      class={`h-12 w-full text-right nums text-lg font-semibold text-base-content ${
        boxed
          ? "input border-base-300 bg-base-100 focus:border-primary"
          : "bg-transparent px-3 outline-none"
      }`}
    />
  );
}

function RateLine({ text }: { text: string }) {
  return (
    <div class="flex items-center justify-center gap-2 text-[11px] text-platinum-400">
      <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      {text}
    </div>
  );
}
