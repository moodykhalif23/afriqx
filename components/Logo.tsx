import type { JSX } from "preact";

type LogoVariant = "mark" | "full" | "stacked";

export interface LogoProps {
  /** mark = symbol only · full = symbol + wordmark inline · stacked = symbol over wordmark */
  variant?: LogoVariant;
  /** Pixel height of the mark. Wordmark scales to match. */
  size?: number;
  /** Show the "African Markets. African Value. African Future." tagline (stacked only). */
  tagline?: boolean;
  class?: string;
}

/**
 * The AFRIQX logo: a geometric emerald "A" built from market structure —
 * a hollow apex, a muted-gold rising arrow, and platinum candlestick bars
 * at the base. Symbolizes capital flow, growth and pan-African connectivity.
 */
export function Logo(
  { variant = "full", size = 32, tagline = false, class: className = "" }:
    LogoProps,
) {
  const mark = <LogoMark size={size} />;

  if (variant === "mark") {
    return <span class={`inline-flex ${className}`}>{mark}</span>;
  }

  const wordmark = (
    <span
      class="font-display font-black tracking-[0.14em] leading-none text-ivory select-none"
      style={{ fontSize: `${size * 0.66}px` }}
    >
      AFRI<span class="text-emerald-500">Q</span>
      <span class="text-emerald-400">X</span>
    </span>
  );

  if (variant === "stacked") {
    return (
      <span
        class={`inline-flex flex-col items-center gap-3 ${className}`}
      >
        {mark}
        <span class="flex flex-col items-center gap-1.5">
          {wordmark}
          {tagline && (
            <span
              class="font-display font-medium tracking-[0.2em] text-platinum-400 uppercase"
              style={{ fontSize: `${Math.max(8, size * 0.16)}px` }}
            >
              African Markets. African Value.{" "}
              <span class="text-emerald-400">African Future.</span>
            </span>
          )}
        </span>
      </span>
    );
  }

  return (
    <span class={`inline-flex items-center gap-2.5 ${className}`}>
      {mark}
      {wordmark}
    </span>
  );
}

/** The standalone symbol. */
export function LogoMark(
  { size = 32, ...rest }: { size?: number } & JSX.SVGAttributes<SVGSVGElement>,
) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      role="img"
      aria-label="AFRIQX"
      {...rest}
    >
      <defs>
        <linearGradient id="afqx-a" x1="20" y1="92" x2="80" y2="8">
          <stop offset="0" stop-color="#0f6531" />
          <stop offset="0.55" stop-color="#15833f" />
          <stop offset="1" stop-color="#1fae5f" />
        </linearGradient>
        <linearGradient id="afqx-arrow" x1="14" y1="74" x2="82" y2="20">
          <stop offset="0" stop-color="#a87f2c" />
          <stop offset="1" stop-color="#e8cf94" />
        </linearGradient>
      </defs>

      {/* Geometric "A": outer triangle with an open V at the base */}
      <path
        d="M50 8 L90 92 L68 92 L50 51 L32 92 L10 92 Z"
        fill="url(#afqx-a)"
      />

      {/* Candlestick bars rising at the base */}
      <g fill="#eef1f2">
        <rect x="41" y="73" width="6" height="19" rx="1" />
        <rect x="50" y="63" width="6" height="29" rx="1" />
        <rect x="59" y="68" width="6" height="24" rx="1" />
      </g>

      {/* Muted-gold rising arrow sweeping up and to the right */}
      <path
        d="M16 76 C 36 70 54 56 64 33"
        stroke="url(#afqx-arrow)"
        stroke-width="7"
        stroke-linecap="round"
        fill="none"
      />
      <path
        d="M55 30 L70 26 L67 42 Z"
        fill="#e8cf94"
      />
    </svg>
  );
}
