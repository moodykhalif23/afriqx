import type { ComponentChildren } from "preact";

type Placement = "top" | "bottom" | "left" | "right";

const place: Record<Placement, string> = {
  top: "tooltip-top",
  bottom: "tooltip-bottom",
  left: "tooltip-left",
  right: "tooltip-right",
};

export interface TooltipProps {
  tip: string;
  placement?: Placement;
  /** Use the accent (emerald) tooltip colour. */
  accent?: boolean;
  class?: string;
  children?: ComponentChildren;
}

/** Thin wrapper over DaisyUI's `tooltip` (pure CSS, hover/focus). */
export function Tooltip(
  { tip, placement = "top", accent = false, class: className = "", children }:
    TooltipProps,
) {
  return (
    <span
      class={`tooltip ${place[placement]} ${
        accent ? "tooltip-accent" : ""
      } ${className}`}
      data-tip={tip}
    >
      {children}
    </span>
  );
}
