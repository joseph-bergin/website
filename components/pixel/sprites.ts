import type { PixelSprite } from "./sprite";

/**
 * Hand-authored 32x32 sprites, one per section.
 *
 * Rows only need their *leading* offset to be right — the renderer treats
 * anything past the end of a row as transparent, so trailing dots are optional.
 * "." is empty. Keep the palettes desaturated: these are accents, not decoration
 * that should pull focus from the content.
 */

const SIZE = { width: 32, height: 32 };

/* ------------------------------------------------------------------ fire -- */

const firePalette = {
  o: "#a84d1c", // outer flame
  f: "#d8822f", // mid flame
  y: "#f2c85c", // core
};

const woodPalette = {
  d: "#3f2e1e",
  l: "#5c4230",
  k: "#7a583d",
  s: "#31313a",
  t: "#43434d",
};

const flameGrid = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "...............o",
  "..............ofo",
  "..............offo",
  ".............ofyfo",
  ".............offyfo",
  "............ooffyffo",
  "............offyyyfo",
  "...........ooffyyyffo",
  "...........offyyyyyfo",
  "...........offyyyyyfo",
  "...........ooffyyyffo",
  "............offfyffo",
  "............oofffffo",
];

export const campfire: PixelSprite = {
  ...SIZE,
  layers: [
    {
      // Warm ground pool under the fire. Barely there, but it grounds the sprite.
      grid: [
        ...Array(24).fill(""),
        "......tttttttttttttttttt",
        ".......tttttttttttttttt",
      ],
      palette: { t: "#2a1f16" },
      className: "anim-glow",
    },
    {
      grid: [
        ...Array(20).fill(""),
        "........lkd..........dkl",
        ".........lkkd......dkkl",
        "...........lkkddddkkl",
        "............dllkklld",
        ".......tts.tts.tts.tts.tt",
        "........ssssssssssssssss",
      ],
      palette: woodPalette,
    },
    {
      grid: flameGrid,
      palette: firePalette,
      className: "anim-flame",
      style: { transformOrigin: "16px 20px" },
    },
    // Three embers on staggered delays. One pixel each.
    {
      grid: [...Array(6).fill(""), "............y"],
      palette: { y: "#e0a349" },
      className: "anim-ember-a",
    },
    {
      grid: [...Array(4).fill(""), "..................y"],
      palette: { y: "#e0a349" },
      className: "anim-ember-b",
    },
    {
      grid: [...Array(3).fill(""), "...............y"],
      palette: { y: "#e0a349" },
      className: "anim-ember-c",
    },
  ],
};

/* ----------------------------------------------------------------- plant -- */

export const plant: PixelSprite = {
  ...SIZE,
  layers: [
    {
      // Pot first so foliage overlaps its rim.
      grid: [
        ...Array(19).fill(""),
        ".........qqqqqqqqqqqqqq",
        ".........qmmmmmmmmmmmmq",
        "..........mmmmmmmmmmmm",
        "..........mmmmmmmmmmmm",
        "...........mmmmmmmmmm",
        "...........mmmmmmmmmm",
        "............mmmmmmmm",
        "............rrrrrrrr",
      ],
      palette: { q: "#b9673f", m: "#9c5636", r: "#7a412a" },
    },
    {
      grid: [
        "",
        "",
        "",
        "",
        "...............nnn",
        "..............nhhhn",
        ".............nhhhhhn",
        "..............nhhhn",
        "...............nnn",
        "..........nnn...g",
        ".........nhhhn..g",
        "........nhhhhn..g.nnn",
        ".........nhhhn..gnhhhn",
        "..........nnn...gnhhhhn",
        "............g...gnhhhn",
        ".............g..g.nnn",
        ".............g..g.g",
        "..............g.gg",
        "...............gg",
      ],
      palette: { g: "#2f5c3a", n: "#3d7449", h: "#4f9159" },
      className: "anim-sway",
      style: { transformOrigin: "16px 19px" },
    },
  ],
};

/* ------------------------------------------------------------ floppy disk -- */

const floppyBody = "#333a47";
const floppyEdge = "#1b1f28";

export const floppy: PixelSprite = {
  ...SIZE,
  layers: [
    {
      grid: [
        ...Array(4).fill(""),
        "....kkkkkkkkkkkkkkkkkkkkkk",
        "....kcccccceeeeeeeeeecccckk",
        "....kcccccceewwwwwweecccccck",
        "....kcccccceewwwwwweecccccck",
        "....kcccccceewwwwwweecccccck",
        "....kcccccceewwwwwweecccccck",
        "....kcccccceeeeeeeeeecccccck",
        "....kcccccccccccccccccccccck",
        "....kcccccccccccccccccccccck",
        "....kcccccccccccccccccccccck",
        "....kcccccccccccccccccccccck",
        "....kcccccccccccccccccccccck",
        "....kccwwwwwwwwwwwwwwwwwwcck",
        "....kccwwwwwwwwwwwwwwwwwwcck",
        "....kccwwbbbbbbbbbbbbbbwwcck",
        "....kccwwwwwwwwwwwwwwwwwwcck",
        "....kccwwbbbbbbbbbbwwwwwwcck",
        "....kccwwwwwwwwwwwwwwwwwwcck",
        "....kccwwbbbbbbbbbbbbbbwwcck",
        "....kccwwwwwwwwwwwwwwwwwwcck",
        "....kccwwwwwwwwwwwwwwwwwwcck",
        "....kccwwwwwwwwwwwwwwwwwwcck",
        "....kcccccccccccccccccccccck",
        "....kkkkkkkkkkkkkkkkkkkkkkkk",
      ],
      palette: {
        k: floppyEdge,
        c: floppyBody,
        e: "#7d8593", // shutter
        w: "#c6cbd4", // label / shutter window
        b: "#9aa1ad", // ruled lines on the label
      },
    },
  ],
};

/* ------------------------------------------------------------------ fish -- */

const fishPalette = {
  b: "#3f6d80", // back
  c: "#5c8fa2", // belly
  f: "#2f5464", // fins
};

export const fish: PixelSprite = {
  ...SIZE,
  layers: [
    {
      // Tail is its own layer so it can flick independently of the body.
      grid: [
        ...Array(12).fill(""),
        ".....f",
        ".....ff",
        ".....fff",
        "......fff",
        ".......fff",
        ".......fff",
        "......fff",
        ".....fff",
        ".....ff",
        ".....f",
      ],
      palette: fishPalette,
      className: "hv-tail",
      style: { transformOrigin: "9px 17px" },
    },
    {
      grid: [
        ...Array(10).fill(""),
        "..............ffff",
        ".............ffffff",
        "............bbbbbbbb",
        "..........bbbbbbbbbbbb",
        ".........bbbbbbbbbbbbbbb",
        "........bbbbbbbbbbbbbbbbbb",
        "........bbbbbbbbbbbbbbbbbb",
        "........cccccccccccccccccc",
        ".........ccccffffccccccc",
        "..........ccffffcccccc",
        "............cccccccc",
        ".............fffff",
      ],
      palette: fishPalette,
      className: "hv-swim",
    },
    {
      grid: [...Array(15).fill(""), ".....................we", ".....................ee"],
      palette: { w: "#e8eef0", e: "#12171b" },
      className: "hv-swim",
    },
  ],
};

/* ----------------------------------------------------------------- sword -- */

export const sword: PixelSprite = {
  ...SIZE,
  layers: [
    {
      grid: [
        ...Array(3).fill(""),
        "...............ss",
        "..............dssS",
        "..............dssS",
        "..............dssS",
        "..............dssS",
        "..............dssS",
        "..............dssS",
        "..............dssS",
        "..............dssS",
        "..............dssS",
        "..............dssS",
        "..............dssS",
        "..............dssS",
        "..............dssS",
        "..............dssS",
        "..............dssS",
        "..............dssS",
        ".........GGGGGGGGGGGGGG",
        "..........gggggggggggg",
        "..............hhhh",
        "..............hhhh",
        "..............hhhh",
        "..............hhhh",
        "..............hhhh",
        ".............GGGGGG",
        ".............gggggg",
      ],
      palette: {
        s: "#aeb4bd",
        S: "#dfe4ea",
        d: "#767d88",
        G: "#a98652",
        g: "#7d6039",
        h: "#453224",
      },
    },
    {
      // A single highlight that catches the light once per cycle.
      grid: [...Array(7).fill(""), "................S", "................S", "................S"],
      palette: { S: "#ffffff" },
      className: "anim-glint",
    },
  ],
};

/* ------------------------------------------------------------------ book -- */

const bookPalette = {
  W: "#e9edf2",
  w: "#d5dae1",
  l: "#a4abb6",
  C: "#4c5768",
  c: "#39424f",
};

export const book: PixelSprite = {
  ...SIZE,
  layers: [
    {
      grid: [
        ...Array(10).fill(""),
        "...........WWWW",
        ".........WWWWWW",
        ".......WWWWWWWW",
        ".....WWWWWWWWWW",
        "....WWWWWWWWWWW",
        "....wwwwwwwwwww",
        "....wwlllllllww",
        "....wwwwwwwwwww",
        "....wwlllllllww",
        "....wwwwwwwwwww",
        "....wwlllllwwww",
        "....CCCCCCCCCCC",
      ],
      palette: bookPalette,
      className: "hv-page-l",
      style: { transformOrigin: "15px 22px" },
    },
    {
      grid: [
        ...Array(10).fill(""),
        ".................WWWW",
        ".................WWWWWW",
        ".................WWWWWWWW",
        ".................WWWWWWWWWW",
        ".................WWWWWWWWWWW",
        ".................wwwwwwwwwww",
        ".................wwlllllllww",
        ".................wwwwwwwwwww",
        ".................wwlllllllww",
        ".................wwwwwwwwwww",
        ".................wwlllllwwww",
        ".................CCCCCCCCCCC",
      ],
      palette: bookPalette,
      className: "hv-page-r",
      style: { transformOrigin: "17px 22px" },
    },
    {
      grid: [
        ...Array(10).fill(""),
        "...............cc",
        "...............cc",
        "...............cc",
        "...............cc",
        "...............cc",
        "...............cc",
        "...............cc",
        "...............cc",
        "...............cc",
        "...............cc",
        "...............cc",
        "...............cc",
        "....cccccccccccccccccccccccc",
      ],
      palette: bookPalette,
    },
  ],
};

/* ---------------------------------------------------------------- laptop -- */

const laptopPalette = {
  M: "#8b929c",
  m: "#666d78",
  d: "#2a2e35",
  s: "#14171c",
  t: "#49515c",
};

export const laptop: PixelSprite = {
  ...SIZE,
  layers: [
    {
      grid: [
        ...Array(6).fill(""),
        "......MMMMMMMMMMMMMMMMMMMM",
        "......MssssssssssssssssssM",
        "......MssssssssssssssssssM",
        "......MssttttttttssssssssM",
        "......MssssssssssssssssssM",
        "......MsstttttttttttsssssM",
        "......MssssssssssssssssssM",
        "......MssttttttssssssssssM",
        "......MssssssssssssssssssM",
        "......MsstttttttttsssssssM",
        "......MssssssssssssssssssM",
        "......MssssssssssssssssssM",
        "......MssssssssssssssssssM",
        "......MMMMMMMMMMMMMMMMMMMM",
        "....MMMMMMMMMMMMMMMMMMMMMMMM",
        "...MMMMMMMMMMMdddddMMMMMMMMMM",
        "...mmmmmmmmmmmmmmmmmmmmmmmmmm",
      ],
      palette: laptopPalette,
    },
    {
      // Terminal cursor.
      grid: [...Array(17).fill(""), ".........cc"],
      palette: { c: "#d98a3d" },
      className: "anim-cursor",
    },
  ],
};

/* --------------------------------------------------------------- mailbox -- */

const mailPalette = {
  b: "#3d4450",
  B: "#5b6472",
  d: "#262b33",
  p: "#5c4230",
  P: "#7a583d",
};

export const mailbox: PixelSprite = {
  ...SIZE,
  layers: [
    {
      grid: [
        ...Array(6).fill(""),
        "..........bbbbbbbbbb",
        "........bbbbbbbbbbbbbb",
        ".......bbbbbbbbbbbbbbbb",
        ".......bBBBBBBBBBBBBBBb",
        ".......bBBBBBBBBBBBBBBb",
        ".......bBBddddddddddBBb",
        ".......bBBddddddddddBBb",
        ".......bBBBBBBBBBBBBBBb",
        ".......bBBBBBBBBBBBBBBb",
        ".......bBBBBBBBBBBBBBBb",
        ".......bbbbbbbbbbbbbbbb",
        ".......dddddddddddddddd",
        ".............PPPPPP",
        "..............Pppp",
        "..............Pppp",
        "..............Pppp",
        "..............Pppp",
        "..............Pppp",
        "..............Pppp",
        "..............Pppp",
        "..............Pppp",
        "...........pppppppppp",
        "...........dddddddddd",
      ],
      palette: mailPalette,
    },
    {
      grid: [
        ...Array(7).fill(""),
        ".......................rRRRR",
        ".......................rRRRR",
        ".......................rRRRR",
        ".......................rrrrr",
        ".......................r",
        ".......................r",
        ".......................r",
        ".......................r",
      ],
      palette: { r: "#8f3a2e", R: "#b4483a" },
      className: "hv-flag",
      style: { transformOrigin: "23px 15px" },
    },
  ],
};

/* ------------------------------------------------------------ sleeping cat -- */

const catPalette = {
  o: "#2c2826", // outline — what makes the silhouette read at 32px
  f: "#5a5350", // head fur
  F: "#6e6763", // body fur, one step lighter so the head separates
  d: "#332e2b", // closed eyes
  n: "#8a6f68", // nose
};

// Body first, then the tail curling over it, then the head on top.
export const cat: PixelSprite = {
  ...SIZE,
  layers: [
    {
      grid: [
        ...Array(18).fill(""),
        ".................oFFFFFFFFo",
        "...............oFFFFFFFFFFFFo",
        "..............oFFFFFFFFFFFFFFo",
        ".............oFFFFFFFFFFFFFFFFo",
        ".............oFFFFFFFFFFFFFFFFo",
        ".............oFFFFFFFFFFFFFFFFo",
        ".............oFFFFFFFFFFFFFFFFo",
        "..............oFFFFFFFFFFFFFFo",
        "......oooooooooooooooooooooooo",
      ],
      palette: catPalette,
      className: "anim-breathe",
    },
    {
      // Tail sweeping from the right hip, around the front, tip toward the head.
      grid: [
        ...Array(23).fill(""),
        "...........................offo",
        "..................offffffffffo",
        "..............offffffffffo",
      ],
      palette: catPalette,
      className: "anim-breathe",
    },
    {
      grid: [
        ...Array(12).fill(""),
        ".....oo....oo",
        "....offo..offo",
        "...offffffffffo",
        "..offffffffffffo",
        "..offffffffffffo",
        "..offddffffddffo",
        "..offffffffffffo",
        "..offfffnnfffffo",
        "..offffffffffffo",
        "...offffffffffo",
        "...offffffffffo",
        "....offffffffo",
        ".....offffffo",
        "......offffo",
      ],
      palette: catPalette,
      className: "anim-breathe",
    },
  ],
};

/* ------------------------------------------------- project sprites (hover) -- */

export const robot: PixelSprite = {
  ...SIZE,
  layers: [
    {
      grid: [
        ...Array(4).fill(""),
        "...............ee",
        "...............mm",
        "...............mm",
        "...............mm",
        "........MMMMMMMMMMMMMMMM",
        "........MddddddddddddddM",
        "........MdssssssssssssdM",
        "........MdssssssssssssdM",
        "........MdssssssssssssdM",
        "........MdssssssssssssdM",
        "........MdssssssssssssdM",
        "........MdssssssssssssdM",
        "........MddddddddddddddM",
        "........MMMMMMMMMMMMMMMM",
        ".............mmmmmm",
        ".............mmmmmm",
        "......MMMMMMMMMMMMMMMMMMMM",
        "......MmmmmmmmmmmmmmmmmmmM",
        "......MmmmmddddddddddmmmmM",
        "......MmmmmddddddddddmmmmM",
        "......MmmmmddddddddddmmmmM",
        "......MmmmmmmmmmmmmmmmmmmM",
        "......dddddddddddddddddddd",
      ],
      palette: {
        M: "#8b929c",
        m: "#666d78",
        d: "#2a2e35",
        s: "#171b21",
        e: "#d98a3d",
      },
    },
    {
      grid: [
        ...Array(12).fill(""),
        "............eee..eee",
        "............eee..eee",
        "............eee..eee",
      ],
      palette: { e: "#d98a3d" },
      className: "hv-blink",
      style: { transformOrigin: "16px 14px" },
    },
  ],
};

const serverUnitBody = "M" + "m".repeat(20) + "M";
const serverUnitVent = "M" + "m".repeat(6) + "d".repeat(12) + "mm" + "M";
const serverUnitEdge = "M".repeat(22);
const serverUnitFoot = "d".repeat(22);

const serverRow = (s: string) => "....." + s;

export const server: PixelSprite = {
  ...SIZE,
  layers: [
    {
      grid: [
        ...Array(5).fill(""),
        ...[0, 1, 2].flatMap(() => [
          serverRow(serverUnitEdge),
          serverRow(serverUnitBody),
          serverRow(serverUnitVent),
          serverRow(serverUnitBody),
          serverRow(serverUnitVent),
          serverRow(serverUnitBody),
          serverRow(serverUnitFoot),
        ]),
        ".......ddd..............ddd",
      ],
      palette: { M: "#5b6270", m: "#41474f", d: "#23272e" },
    },
    {
      grid: [...Array(6).fill(""), ".......ee"],
      palette: { e: "#d98a3d" },
      className: "hv-led-a",
    },
    {
      grid: [...Array(13).fill(""), ".......ee"],
      palette: { e: "#d98a3d" },
      className: "hv-led-b",
    },
    {
      grid: [...Array(20).fill(""), ".......ee"],
      palette: { e: "#d98a3d" },
      className: "hv-led-c",
    },
  ],
};

export const flask: PixelSprite = {
  ...SIZE,
  layers: [
    {
      grid: [
        ...Array(5).fill(""),
        ".............gggggg",
        ".............g....g",
        ".............g....g",
        ".............g....g",
        ".............g....g",
        ".............g....g",
        ".............g....g",
        ".............g....g",
        "............g......g",
        "...........g........g",
        "..........g..........g",
        ".........g............g",
        "........g..............g",
        ".......g................g",
        ".......gLLLLLLLLLLLLLLLLg",
        ".......gllllllllllllllllg",
        ".......gllllllllllllllllg",
        ".......gllllllllllllllllg",
        ".......gllllllllllllllllg",
        ".......gllllllllllllllllg",
        ".......gllllllllllllllllg",
        ".......gggggggggggggggggg",
      ],
      palette: {
        g: "#767d88",
        L: "#5b8fa1",
        l: "#41707f",
      },
    },
    {
      grid: [...Array(24).fill(""), "............b"],
      palette: { b: "#bcd6de" },
      className: "hv-bubble-a",
    },
    {
      grid: [...Array(25).fill(""), ".................b"],
      palette: { b: "#bcd6de" },
      className: "hv-bubble-b",
    },
    {
      grid: [...Array(23).fill(""), "...............b"],
      palette: { b: "#bcd6de" },
      className: "hv-bubble-c",
    },
  ],
};

export const gamepad: PixelSprite = {
  ...SIZE,
  layers: [
    {
      grid: [
        ...Array(10).fill(""),
        ".......MMMMMMMMMMMMMMMMMM",
        ".....MMMMMMMMMMMMMMMMMMMMMM",
        "....MMMMMMMMMMMMMMMMMMMMMMMM",
        "...MMMMMMMMMMMMMMMMMMMMMMMMMM",
        "...MmmmmmmmmmmmmmmmmmmmmmmmmM",
        "...MmmmmmmmmmmmmmmmmmmmmmmmmM",
        "...MmmmmmmmmmmmmmmmmmmmmmmmmM",
        "...MmmmmmmmmmmmmmmmmmmmmmmmmM",
        "...MmmmmmmmmmmmmmmmmmmmmmmmmM",
        "...MmmmmmmmmmmmmmmmmmmmmmmmmM",
        "....MmmmmmmmmmmmmmmmmmmmmmmM",
        "...mmmmmm..............mmmmmm",
        "...mmmmmm..............mmmmmm",
        "....ddddd..............ddddd",
      ],
      palette: { M: "#767d88", m: "#565c66", d: "#2a2e35" },
    },
    {
      grid: [
        ...Array(14).fill(""),
        ".........dd..........bb",
        ".........dd..........bb",
        ".......dddddd......bb..bb",
        ".......dddddd......bb..bb",
        ".........dd..........bb",
        ".........dd..........bb",
      ],
      palette: { d: "#22262c", b: "#98a0aa" },
      className: "hv-press",
      style: { transformOrigin: "16px 17px" },
    },
  ],
};

export const sectionSprites = {
  hero: campfire,
  about: plant,
  experience: floppy,
  projects: fish,
  skills: sword,
  writing: book,
  uses: laptop,
  contact: mailbox,
  footer: cat,
} as const;

export const projectSprites = {
  robot,
  server,
  flask,
  gamepad,
  fish,
} as const;

export type ProjectSpriteName = keyof typeof projectSprites;
