import type { ComponentChildren } from "preact";
import { useSignal } from "@preact/signals";

export interface TabsProps {
  tabs: string[];
  /** One panel per tab, in the same order. */
  children: ComponentChildren[];
  /** Index of the initially active tab. */
  initial?: number;
  /** "segment" = boxed pill group (Trade) · "underline" = bordered tabs (Markets). */
  variant?: "segment" | "underline";
  class?: string;
}

/**
 * Touch-friendly DaisyUI tab switcher. All panels are server-rendered; the
 * active one is shown client-side, so it works as one small interactive island.
 */
export default function Tabs(
  { tabs, children, initial = 0, variant = "underline", class: className = "" }:
    TabsProps,
) {
  const active = useSignal(initial);
  const panels = Array.isArray(children) ? children : [children];

  const listClass = variant === "segment"
    ? "tabs tabs-box w-full"
    : "tabs tabs-border overflow-x-auto";

  return (
    <div class={className}>
      <div role="tablist" class={listClass}>
        {tabs.map((t, i) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={active.value === i}
            onClick={() => (active.value = i)}
            class={`tab h-11 whitespace-nowrap font-medium ${
              variant === "segment" ? "flex-1" : ""
            } ${
              active.value === i
                ? "tab-active text-accent"
                : "text-base-content/60"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div class="mt-4">
        {panels.map((panel, i) => (
          <div
            key={i}
            role="tabpanel"
            class={active.value === i ? "" : "hidden"}
          >
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}
