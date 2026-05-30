// Crops public/logo.svg to its true artwork bounds.
//
// The source logo is a 1536×1024 canvas with a solid #030305 background and
// wide margins, so it renders tiny when fit into the UI. This script:
//   1. parses every <path>, applying its translate() transform
//   2. computes the union bounding box of the artwork (excluding the
//      full-canvas background fill)
//   3. rewrites the <svg> with a tight viewBox (no fixed width/height) and
//      makes the background transparent
//
// Usage:  node scripts/crop-logo.mjs [input.svg] [output.svg]
import { readFileSync, writeFileSync } from "node:fs";
import { svgPathBbox } from "svg-path-bbox";

const IN = process.argv[2] ?? "scripts/logo.source.svg";
const OUT = process.argv[3] ?? "public/logo.svg";
const BG_FILL = "#030305";

const src = readFileSync(IN, "utf8");

// Canvas size from the root <svg>.
const canvasW = Number(src.match(/width="(\d+(?:\.\d+)?)"/)?.[1] ?? 1536);
const canvasH = Number(src.match(/height="(\d+(?:\.\d+)?)"/)?.[1] ?? 1024);
const canvasArea = canvasW * canvasH;

const pathRe = /<path\b[\s\S]*?\/>/g;
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
let counted = 0, skipped = 0;

for (const block of src.match(pathRe) ?? []) {
  const d = block.match(/\bd="([^"]*)"/)?.[1];
  if (!d) continue;
  const fill = block.match(/\bfill="([^"]*)"/)?.[1] ?? "";
  const tr = block.match(/translate\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/);
  const tx = tr ? Number(tr[1]) : 0;
  const ty = tr ? Number(tr[2]) : 0;

  let bb;
  try {
    bb = svgPathBbox(d); // [x0, y0, x1, y1]
  } catch {
    continue;
  }
  const [x0, y0, x1, y1] = [bb[0] + tx, bb[1] + ty, bb[2] + tx, bb[3] + ty];
  const area = Math.abs((x1 - x0) * (y1 - y0));

  // Skip the background: the dark fill and/or any near-full-canvas shape.
  if (fill.toLowerCase() === BG_FILL || area >= canvasArea * 0.85) {
    skipped++;
    continue;
  }
  counted++;
  minX = Math.min(minX, x0);
  minY = Math.min(minY, y0);
  maxX = Math.max(maxX, x1);
  maxY = Math.max(maxY, y1);
}

if (!Number.isFinite(minX)) {
  console.error("No artwork paths found — aborting.");
  process.exit(1);
}

// Small breathing-room padding (1.5% of the larger side).
const pad = Math.round(Math.max(maxX - minX, maxY - minY) * 0.015);
const vx = Math.floor(minX - pad);
const vy = Math.floor(minY - pad);
const vw = Math.ceil(maxX - minX + pad * 2);
const vh = Math.ceil(maxY - minY + pad * 2);

let out = src
  // make the background transparent
  .replaceAll(`fill="${BG_FILL}"`, 'fill="none"')
  // drop fixed pixel dimensions so the viewBox + CSS drive sizing
  .replace(/\s+width="[^"]*"/, "")
  .replace(/\s+height="[^"]*"/, "");

// Inject the cropped viewBox into the root <svg> tag.
out = out.replace(
  /<svg\b/,
  `<svg viewBox="${vx} ${vy} ${vw} ${vh}" preserveAspectRatio="xMidYMid meet"`,
);

writeFileSync(OUT, out);
console.log(
  `cropped ${counted} paths (skipped ${skipped} bg) → viewBox "${vx} ${vy} ${vw} ${vh}"  (${(vw / vh).toFixed(2)}:1)  ${OUT}`,
);
