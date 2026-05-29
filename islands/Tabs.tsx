import type { ComponentChildren } from "preact";
import { useSignal } from "@preact/signals";

export interface TabsProps {
  tabs: string[];
  /** One panel per tab, in the same order. */
  children: ComponentChildren[];
  /** Index of the initially active tab. */
  initial?: number;
  /** "segment" = pill group (Trade) · "underline" = text + underline (Markets). */
  variant?: "segment" | "underline";
  class?: string;
}

/**
 * Touch-friendly tab switcher. All panels are server-rendered; the active one
 * is shown client-side, so it works as a single small interactive island.
 */
export default function Tabs(
  { tabs, children, initial = 0, variant = "underline", class: className = "" }:
    TabsProps,
) {
  const active = useSignal(initial);
  const panels = Array.isArray(children) ? children : [children];

  return (
    <div class={className}>
      {variant === "segment"
        ? (
          <div class="flex gap-1 rounded-xl bg-obsidian-800 p-1">
            {tabs.map((t, i) => (
              <button
                key={t}
                type="button"
                onClick={() => (active.value = i)}
                class={`h-10 flex-1 rounded-lg text-sm font-semibold transition-colors ${
                  active.value === i
                    ? "bg-emerald-500 text-obsidian-950"
                    : "text-platinum-300 active:bg-obsidian-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )
        : (
          <div class="flex gap-1 overflow-x-auto border-b border-obsidian-500/60">
            {tabs.map((t, i) => (
              <button
                key={t}
                type="button"
                onClick={() => (active.value = i)}
                class={`relative h-11 shrink-0 whitespace-nowrap px-4 text-sm font-medium transition-colors ${
                  active.value === i
                    ? "text-emerald-300"
                    : "text-platinum-400 hover:text-ivory"
                }`}
              >
                {t}
                {active.value === i && (
                  <span class="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-emerald-400" />
                )}
              </button>
            ))}
          </div>
        )}

      <div class="mt-4">
        {panels.map((panel, i) => (
          <div key={i} class={active.value === i ? "" : "hidden"}>
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}
