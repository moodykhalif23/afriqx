import type { ComponentChildren } from "preact";

type Tone = "emerald" | "gold" | "neutral" | "down" | "outline";

/** Brand tone → DaisyUI soft badge (semantic theme colours). */
const tones: Record<Tone, string> = {
  emerald: "badge-soft badge-success",
  gold: "badge-soft badge-warning",
  neutral: "badge-soft badge-neutral",
  down: "badge-soft badge-error",
  outline: "badge-outline",
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
      class={`badge badge-sm gap-1.5 font-semibold uppercase tracking-wider ${
        tones[tone]
      } ${className}`}
    >
      {dot && <span class="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
