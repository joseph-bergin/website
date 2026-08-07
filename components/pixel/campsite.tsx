import { PixelLayerGroup, type PixelLayer } from "./sprite";

/**
 * The hero campsite.
 *
 * A 64x40 scene composed from small hand-authored grids placed at offsets,
 * rather than one enormous grid — each piece stays editable on its own.
 * Only the fire moves: flame flicker, a slow ground glow, and two embers.
 * The tent, grove, stump and stars are completely static.
 */

const SCENE_W = 64;
const SCENE_H = 40;
const GROUND_Y = 30;

/* ------------------------------------------------------------------ parts -- */

const tentPalette = { t: "#3f4a44", T: "#556258", o: "#161d1a", d: "#242c28" };

const tent = [
  ".........tt",
  "........tTTt",
  ".......tTTTTt",
  "......tTTTTTTt",
  ".....tTTTooTTTt",
  "....tTTTooooTTTt",
  "...tTTTTooooTTTTt",
  "..tTTTTTooooTTTTTt",
  ".tTTTTTTooooTTTTTTt",
  "tTTTTTTTooooTTTTTTTt",
  "tTTTTTTTooooTTTTTTTt",
  "dddddddddddddddddddd",
];

const pinePalette = { g: "#26402f", G: "#33543c", k: "#3f2e1e" };

const pineTall = [
  ".....g",
  "....gGg",
  "....gGg",
  "...ggGGg",
  "...ggGGg",
  "..gggGGgg",
  "..gggGGgg",
  ".ggggGGggg",
  ".ggggGGggg",
  "gggggGGgggg",
  "gggggGGgggg",
  "....kk",
  "....kk",
];

const pineShort = [
  ".....g",
  "....gGg",
  "...ggGGg",
  "...ggGGg",
  "..gggGGgg",
  "..gggGGgg",
  ".ggggGGggg",
  ".ggggGGggg",
  "....kk",
  "....kk",
];

const stumpPalette = { K: "#6b4a33", k: "#48311f", r: "#8a6244" };

const stump = [".KKKKKK", ".KrrrrK", ".KKKKKK", "..kkkk", "..kkkk", ".kkkkkk"];

const firePalette = { o: "#a84d1c", f: "#d8822f", y: "#f2c85c" };
const embersPalette = { y: "#e0a349" };
const logPalette = { l: "#5c4230", k: "#7a583d", d: "#3f2e1e", s: "#31313a", t: "#43434d" };

const flame = [
  ".....o",
  "....ofo",
  "....ofyo",
  "...offyfo",
  "...ofyyfo",
  "..offyyffo",
  "..ooffyffo",
];

const logs = ["", "", "", "", "", "", "", ".lkkddddkkl", "..dllkklld", "tsstsstsstss"];

/* ----------------------------------------------------------------- ground -- */

const groundPalette = { e: "#282830", g: "#131316", x: "#1d1d22" };

const ground: string[] = [
  ...Array(GROUND_Y).fill(""),
  "e".repeat(SCENE_W),
  ...Array(SCENE_H - GROUND_Y - 1).fill("g".repeat(SCENE_W)),
];

// Deterministic scatter so server and client markup match exactly.
const ditherRow = (seed: number) =>
  Array.from({ length: SCENE_W }, (_, x) => ((x * 7 + seed * 13) % 11 === 0 ? "x" : ".")).join("");

const dither: string[] = [
  ...Array(GROUND_Y + 2).fill(""),
  ditherRow(1),
  "",
  ditherRow(2),
  "",
  ditherRow(3),
];

/* ------------------------------------------------------------------ stars -- */

const starPositions: [x: number, y: number, bright: boolean][] = [
  [4, 4, false],
  [12, 8, true],
  [20, 3, false],
  [27, 10, false],
  [34, 5, true],
  [40, 2, false],
  [45, 12, false],
  [50, 6, true],
  [57, 3, false],
  [61, 9, false],
  [16, 13, false],
  [8, 1, false],
];

const stars: string[] = (() => {
  const rows = Array.from({ length: 16 }, () => Array(SCENE_W).fill("."));
  for (const [x, y, bright] of starPositions) rows[y][x] = bright ? "S" : "s";
  return rows.map((r) => r.join(""));
})();

/* ------------------------------------------------------------------ scene -- */

const layers: PixelLayer[] = [
  { grid: stars, palette: { s: "#26262e", S: "#3b3b46" } },
  { grid: pineTall, palette: pinePalette, dx: 0, dy: 17 },
  { grid: pineShort, palette: pinePalette, dx: 9, dy: 20 },
  { grid: tent, palette: tentPalette, dx: 18, dy: 18 },
  { grid: stump, palette: stumpPalette, dx: 56, dy: 24 },
  { grid: ground, palette: groundPalette },
  { grid: dither, palette: groundPalette },
  // Warm pool of light on the ground, breathing with the fire.
  {
    grid: [
      ...Array(GROUND_Y).fill(""),
      ".".repeat(37) + "w".repeat(23),
      ".".repeat(39) + "w".repeat(19),
      ".".repeat(42) + "w".repeat(13),
    ],
    palette: { w: "#2b1d11" },
    className: "anim-glow",
  },
  { grid: logs, palette: logPalette, dx: 42, dy: 20 },
  {
    grid: flame,
    palette: firePalette,
    dx: 42,
    dy: 20,
    className: "anim-flame",
    // Local to the translated group: bottom-centre of the flame.
    style: { transformOrigin: "6px 7px" },
  },
  {
    grid: [...Array(19).fill(""), ".".repeat(45) + "y"],
    palette: embersPalette,
    className: "anim-ember-a",
  },
  {
    grid: [...Array(18).fill(""), ".".repeat(49) + "y"],
    palette: embersPalette,
    className: "anim-ember-c",
  },
];

export function Campsite({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${SCENE_W} ${SCENE_H}`}
      className={`pixelated h-auto w-full ${className ?? ""}`}
      role="img"
      aria-label="A pixel-art campsite at night: a tent beside a grove of pines, a campfire burning, and a tree stump."
      focusable="false"
    >
      {layers.map((layer, i) => (
        <PixelLayerGroup key={i} layer={layer} />
      ))}
    </svg>
  );
}
