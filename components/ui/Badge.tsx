import type { ComponentChildren } from "preact";

type Tone = "emerald" | "gold" | "neutral" | "down" | "outline";

const tones: Record<Tone, string> = {
  emerald:
    "bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/30",
  gold: "bg-gold-500/15 text-gold-300 ring-1 ring-inset ring-gold-500/30",
  neutral:
    "bg-obsidian-600 text-platinum-300 ring-1 ring-inset ring-obsidian-400/60",
  down:
    "bg-[var(--color-down)]/15 text-[var(--color-down)] ring-1 ring-inset ring-[var(--color-down)]/30",
  outline: "text-platinum-300 ring-1 ring-inset ring-obsidian-400",
};

export interface BadgeProps {
  tone?: Tone;
  /** Show a small leading dot (status indicator). */
  dot?: boolean;
  class?: string;
  children?: ComponentChildren;
}

export function Badge(
  { tone = "neutral", dot = false, class: className = "", children }:
    BadgeProps,
) {
  return (
    <span
      class={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
        tones[tone]
      } ${className}`}
    >
      {dot && <span class="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
