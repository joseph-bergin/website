import type { CSSProperties } from "react";

/**
 * A tiny pixel-art renderer.
 *
 * Sprites are authored as character grids — one character per pixel — which
 * keeps them editable by hand the way real pixel art should be. At render time
 * the grid is compiled into the smallest set of <rect> elements that reproduce
 * it exactly (horizontal runs merged first, then vertically identical runs
 * stacked). A 32x32 sprite that would naively cost ~600 rects usually lands
 * under 60, so these stay cheap enough to inline everywhere.
 *
 * Everything here renders on the server. No client JS ships for pixel art;
 * all motion is CSS, and all motion stops under prefers-reduced-motion.
 */

export type Palette = Record<string, string>;

export type PixelLayer = {
  /** Rows of single-character pixels. "." and " " are transparent. */
  grid: string[];
  palette: Palette;
  /** Utility class driving this layer's animation, if any. */
  className?: string;
  style?: CSSProperties;
  /** Offset within the sprite's coordinate space, in pixel units. */
  dx?: number;
  dy?: number;
};

export type PixelSprite = {
  /** Grid width in pixel units. Rows shorter than this are padded with transparency. */
  width: number;
  height: number;
  layers: PixelLayer[];
};

type Rect = { x: number; y: number; w: number; h: number; fill: string };

const TRANSPARENT = new Set([".", " ", "_"]);

/** Horizontal runs of identical, non-transparent pixels, one pass per row. */
function runsFor(grid: string[], palette: Palette) {
  const runs: { x: number; y: number; w: number; fill: string }[] = [];

  grid.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      const fill = palette[ch];
      if (TRANSPARENT.has(ch) || !fill) {
        x += 1;
        continue;
      }
      let w = 1;
      while (x + w < row.length && row[x + w] === ch) w += 1;
      runs.push({ x, y, w, fill });
      x += w;
    }
  });

  return runs;
}

/** Stack runs that share x/width/fill and sit on consecutive rows. */
function compile(grid: string[], palette: Palette): Rect[] {
  const runs = runsFor(grid, palette);
  const byKey = new Map<string, typeof runs>();

  for (const run of runs) {
    const key = `${run.x}:${run.w}:${run.fill}`;
    const bucket = byKey.get(key);
    if (bucket) bucket.push(run);
    else byKey.set(key, [run]);
  }

  const rects: Rect[] = [];
  for (const bucket of byKey.values()) {
    bucket.sort((a, b) => a.y - b.y);
    let start = bucket[0];
    let height = 1;

    for (let i = 1; i < bucket.length; i += 1) {
      const run = bucket[i];
      if (run.y === start.y + height) {
        height += 1;
        continue;
      }
      rects.push({ x: start.x, y: start.y, w: start.w, h: height, fill: start.fill });
      start = run;
      height = 1;
    }
    rects.push({ x: start.x, y: start.y, w: start.w, h: height, fill: start.fill });
  }

  // Stable order keeps server and client markup identical.
  return rects.sort((a, b) => a.y - b.y || a.x - b.x);
}

export function PixelLayerGroup({ layer }: { layer: PixelLayer }) {
  const rects = compile(layer.grid, layer.palette);
  const { dx = 0, dy = 0 } = layer;

  // Placement and animation must live on separate <g> elements. A CSS
  // `transform` from an animation replaces the element's whole transform,
  // which silently wipes out an SVG `transform` attribute on the same node.
  const pixels = (
    <g className={layer.className} style={{ transformBox: "fill-box", ...layer.style }}>
      {rects.map((r) => (
        <rect
          key={`${r.x}-${r.y}-${r.w}-${r.h}-${r.fill}`}
          x={r.x}
          y={r.y}
          width={r.w}
          height={r.h}
          fill={r.fill}
        />
      ))}
    </g>
  );

  if (!dx && !dy) return pixels;
  return <g transform={`translate(${dx} ${dy})`}>{pixels}</g>;
}

export function Sprite({
  sprite,
  size = 32,
  className,
  label,
}: {
  sprite: PixelSprite;
  /** Rendered CSS size in px. Use integer multiples of the grid for crisp edges. */
  size?: number;
  className?: string;
  /** Accessible name. Omit for purely decorative sprites (the default). */
  label?: string;
}) {
  const height = Math.round((size * sprite.height) / sprite.width);

  return (
    <svg
      viewBox={`0 0 ${sprite.width} ${sprite.height}`}
      width={size}
      height={height}
      className={`pixelated shrink-0 ${className ?? ""}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {sprite.layers.map((layer, i) => (
        <PixelLayerGroup key={i} layer={layer} />
      ))}
    </svg>
  );
}
