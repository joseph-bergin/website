import type { CSSProperties } from "react";

/**
 * Renders an Aseprite horizontal sprite sheet.
 *
 * The sheet is a background image on a frame-sized box; the animation walks
 * `background-position-x` with `steps()`, so one PNG covers every frame with no
 * JS and no layout work.
 *
 * Integer scales (1, 2, 3) map every source pixel to the same number of device
 * pixels and stay perfectly even. Fractional scales are allowed — 1.25x is used
 * for the section icons — but some source pixels end up a device pixel wider
 * than their neighbours. At icon size that's invisible; at 96px+ it isn't, so
 * prefer integers for anything large.
 *
 * Modes:
 *   static      — frame 0, never animates
 *   loop        — cycles all frames continuously (idle animation, e.g. breathing)
 *   hover-loop  — cycles all frames while a parent `.group` is hovered
 *   hover-once  — plays to the last frame and holds there (chest opening),
 *                 snapping back when the pointer leaves
 */

export type SheetMode = "static" | "loop" | "hover-loop" | "hover-once";

export type PixelSheetProps = {
  src: string;
  /** Frame size in source pixels. */
  frameWidth: number;
  frameHeight: number;
  frames: number;
  /** Integer multiplier. 32px art at scale 2 renders at 64px. */
  scale?: number;
  mode?: SheetMode;
  durationMs?: number;
  /** Accessible name. Omit for decorative sprites (the default). */
  label?: string;
  className?: string;
  /** Merged after the internal sizing variables — used for layout nudges. */
  style?: CSSProperties;
};

export function PixelSheet({
  src,
  frameWidth,
  frameHeight,
  frames,
  scale = 1,
  mode = "static",
  durationMs = 600,
  label,
  className,
  style: styleOverride,
}: PixelSheetProps) {
  const w = frameWidth * scale;
  const h = frameHeight * scale;

  // Precomputed in JS rather than calc() so `steps()` always gets a plain
  // integer — some engines refuse a var() there.
  const style = {
    "--ps-w": `${w}px`,
    "--ps-h": `${h}px`,
    "--ps-sheet-w": `${w * frames}px`,
    "--ps-end-loop": `-${w * frames}px`,
    "--ps-end-once": `-${w * (frames - 1)}px`,
    "--ps-steps-loop": frames,
    "--ps-steps-once": Math.max(1, frames - 1),
    "--ps-dur": `${durationMs}ms`,
    backgroundImage: `url(${src})`,
    ...styleOverride,
  } as CSSProperties;

  const modeClass =
    mode === "loop"
      ? "pixel-sheet--loop"
      : mode === "hover-loop"
        ? "pixel-sheet--hover-loop"
        : mode === "hover-once"
          ? "pixel-sheet--hover-once"
          : "";

  return (
    <span
      className={`pixel-sheet ${modeClass} ${className ?? ""}`}
      style={style}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
