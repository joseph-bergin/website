import type { PixelSheetProps } from "./pixel-sheet";

/**
 * Hand-drawn Aseprite sprites, exported as horizontal strips into
 * `public/sprites/`.
 *
 * Frame counts live here rather than being inferred at runtime — the renderer
 * is a background image, so nothing reads the PNG's dimensions. If you
 * re-export a sprite with a different number of frames, update `frames` here.
 */

export type SheetDef = Omit<PixelSheetProps, "className" | "label">;

const S = 32; // every sprite so far is 32x32 per frame

/**
 * Optical sizing, not mathematical. The floppy is a solid block that fills its
 * canvas, so it carries at 1x; the others have more empty space in them (the
 * gear is a ring, the plant is 14x18 of art in a 32x32 frame) and read small
 * beside it. Bumping those four evens out how heavy they all look.
 *
 * 1.5x is also the friendlier number on a 2x display: 32 -> 48 CSS px -> 96
 * device px, exactly 3 device pixels per source pixel, so the grid stays even.
 */
const BUMP = 1.5; // 48px
const BASE = 1.25; // 40px — the floppy, which fills its canvas and needs less

export const sheets = {
  plant: {
    src: "/sprites/plant.png",
    scale: BUMP,
    frameWidth: S,
    frameHeight: S,
    frames: 1,
    mode: "static",
  },
  floppy: {
    src: "/sprites/floppy.png",
    scale: BASE,
    frameWidth: S,
    frameHeight: S,
    frames: 1,
    mode: "static",
  },
  gear: {
    src: "/sprites/gear.png",
    scale: BUMP,
    frameWidth: S,
    frameHeight: S,
    frames: 2,
    mode: "hover-loop",
    durationMs: 700,
  },
  chest: {
    src: "/sprites/chest.png",
    scale: BUMP,
    frameWidth: S,
    frameHeight: S,
    frames: 3,
    // Opens on hover and stays open, rather than flapping in a loop.
    mode: "hover-once",
    durationMs: 260,
  },
  mailbox: {
    src: "/sprites/mailbox.png",
    scale: BUMP,
    frameWidth: S,
    frameHeight: S,
    frames: 1,
    mode: "static",
  },
  /**
   * June, asleep beside the tabby in the hero. 50x40 frames, but she only
   * occupies rows 0-25 — the bottom 14 rows are empty padding, so anything
   * lining her up with the ground has to offset by CAT_PAD_ROWS x scale.
   */
  junecat: {
    src: "/sprites/junecat.png",
    scale: 6,
    frameWidth: 50,
    frameHeight: 40,
    frames: 4,
    mode: "loop",
    durationMs: 2600,
  },
  /** Eevee, sitting upright with a swishing tail. */
  eeveecat: {
    src: "/sprites/eeveecat.png",
    scale: 6,
    frameWidth: 50,
    frameHeight: 80,
    frames: 7,
    mode: "loop",
    durationMs: 1800,
  },
  brain: {
    src: "/sprites/brain.png",
    scale: 2,
    frameWidth: S,
    frameHeight: S,
    frames: 1,
    mode: "static",
  },
} satisfies Record<string, SheetDef>;

/**
 * Empty rows beneath each cat's feet inside its frame. Both sprites have dead
 * space at the bottom of the canvas, and by different amounts, so seating them
 * on one shared ground line means offsetting each by its own padding.
 */
export const CAT_FLOOR_PAD = { junecat: 14, eeveecat: 24 } as const;

/** Dead space under a hero cat, in CSS pixels at its configured scale. */
export function catFloorOffset(name: keyof typeof CAT_FLOOR_PAD) {
  return CAT_FLOOR_PAD[name] * sheets[name].scale;
}

export type SheetName = keyof typeof sheets;
