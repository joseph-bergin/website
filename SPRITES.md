# Sprite production guide

Everything you need to draw, and exactly how to export it.

**Pipeline:** every sprite is a horizontal sprite sheet PNG. Static sprites are 1-frame
sheets. There is one set of export settings for all of them — no special cases.

You do **not** need to split anything onto separate layers. That requirement belonged to
the old inline-SVG system; with sheets, animation is frames and layers get flattened.

---

## 1. What to draw

**8 sprites — 7 delivered, 1 left.** Canvas sizes are fixed — the layout depends on them.

### Section icons — 32 × 32

| # | File | Where it appears | Frames | Animation | Plays | Status |
|---|---|---|---|---|---|---|
| 1 | `plant.png` | About heading | 1 | — static | — | ✅ **live** |
| 2 | `floppy.png` | Experience heading | 1 | — static | — | ✅ **live** |
| 3 | `chest.png` | Projects heading | 3 | Lid opens, holds open | on hover | ✅ **live** |
| 4 | `gear.png` | Skills heading | 2 | Rotates | on hover | ✅ **live** |
| 5 | `mailbox.png` | Contact heading | 1 | — static | — | ✅ **live** |
| 6 | `cat.png` | Footer + 404 page | 4 | Sleeping, breathing | always | ⬜ to draw |

`chest` replaced the fish for Projects and `gear` replaced the sword for Skills.

> **Don't draw `book` or `laptop`.** They belonged to the Writing and Uses sections, both
> of which have been removed. The old inline-SVG versions are still sitting in
> `components/pixel/sprites.ts` as dead code and will go when the last sheet lands.

### Project card icons — 32 × 32

| # | File | Where it appears | Frames | Animation | Plays | Status |
|---|---|---|---|---|---|---|
| 7 | `robot.png` | Akoe card + project page | 4 | Eyes blink | on hover | ⬜ to draw |
| 8 | `brain.png` | LLM Causal Reasoning card | 1 | — static | — | ✅ **live** |

> **Don't draw `gamepad` or `server` either.** They belonged to the Untitled Pixel Game and
> Retrieval Sandbox projects, both since removed. Only two projects remain.

### Hero cats — custom sizes

| # | File | Canvas | Frames | Animation | Plays | Status |
|---|---|---|---|---|---|---|
| 9 | `junecat.png` | **50 × 40** | 4 | Asleep, breathing | always | ✅ **live** |
| 10 | `eeveecat.png` | **50 × 80** | 7 | Sitting, tail swishing | always | ✅ **live** |

Both cats sit bottom-right of the hero on a **shared ground line**, June asleep beside
Eevee. Neither overlaps the heading any more.

#### The floor-padding convention

Both sprites have empty rows beneath the cat inside the frame — June has 14, Eevee has 24 —
so the hero pushes each one down by its own padding to land them on the same floor. That's
recorded in `CAT_FLOOR_PAD` in `components/pixel/sheets.ts`.

```
                            ┌──────────────┐  row 0
  ┌──────────────┐          │              │
  │  June, 50x40 │          │ Eevee, 50x80 │
  │  rows 0-25   │          │  rows 15-55  │
  ├──────────────┤ row 26   ├──────────────┤  row 56
  │ 14 empty rows│          │ 24 empty rows│
  └──────────────┘ row 39   └──────────────┘  row 79
  ═══════════════════════════════════════════  shared ground line
```

**If you re-export either cat with a different amount of space under its feet, tell me the
new number** — otherwise one of them will float or sink relative to the other. Everything
else (frame count, frame width) I derive automatically; this is the one measurement I can't
infer, because empty rows are indistinguishable from deliberate padding.

The tail swing must also stay inside the 50px frame width on every frame, or it clips
mid-animation.

### Optional

- `campfire.png` (32 × 32) — currently unused. The hero campsite scene was replaced by
  the cats, so this only matters if you want the campfire back somewhere.
- `icon.svg` — the browser-tab favicon (`public/icon.svg`), hand-written SVG, not a sprite.

---

## 2. Animation rules

Two categories, and the distinction matters for how you draw them:

**"Always" animations loop forever, on screen, while someone reads.** Keep them almost
imperceptible — a 1px rise and fall, a leaf tilting. If you notice it on a second glance,
it's too much. 4 frames is plenty.

**"On hover" animations only play when a visitor points at the card.** These can be more
expressive, because they're a reward for interacting. 4–6 frames.

Frame timing is **uniform** — every frame is on screen for the same duration. Aseprite's
per-frame durations are ignored by the CSS that drives this. So:

- Don't build a rare event (one blink every 5 seconds) by making frame 1 long. It won't work.
- If you want a pause, **draw the pause as repeated frames.** A blink at 6 frames could be
  4 identical open-eye frames, then half-closed, then closed.
- Design each animation to loop cleanly — the last frame should lead back into the first.

Suggested playback speeds (I set these in CSS; tell me if a sprite wants a different feel):

| Feel | Speed |
|---|---|
| Breathing, swaying | ~2 fps |
| Cursor blink | ~1.5 fps |
| Fish swim, bubbles, grooming | ~6 fps |
| Blink, button press, LED flash | ~8 fps |

---

## 3. Drawing rules

**Canvas.** Exactly the size in the table. Not 2×, not padded.

**Colour mode.** Indexed, **16 colours or fewer** per sprite. RGB works but keep the count
down — every extra colour is more work for the renderer and muddier art at 32px.

**No anti-aliasing.** Use the default hard pencil. No soft brushes, no gradients, no
partial transparency. A pixel is either a solid colour or fully transparent. Aseprite's
defaults are already correct — just don't turn AA on.

**Transparent background.** Not a black or coloured backdrop layer.

**Judge contrast against the real background.** This is the one that caught me out: these
sit on a near-black page, and a mid-grey cat that looks fine on Aseprite's checkerboard
disappears on the site. Add a temporary background layer filled with `#0B0B0C`, draw
against that, then **hide it before exporting.**

Keep the darkest large area no darker than about `#3A3A3A`, or it reads as a hole.

**Site palette** — for anything that should feel built-in rather than dropped in:

| Role | Hex |
|---|---|
| Page background | `#0B0B0C` |
| Card background | `#111112` |
| Hairline / border | `#232326` |
| Primary text | `#EDEDEC` |
| Muted text | `#9A9A97` |
| Faint text | `#6B6B68` |
| Ember accent | `#D98A3D` |
| Ember dim | `#8A5A2A` |

Use the ember accent sparingly — it's the one warm colour on the site (the laptop cursor,
robot eyes, server LEDs). Avoid saturated reds, greens and blues; the whole design is
desaturated on purpose.

**Outlines.** The current sprites use a dark outline one shade below the darkest fill. It's
what makes them readable at 32px. Worth keeping.

---

## 4. Export settings

`File → Export Sprite Sheet`

| Setting | Value | Why |
|---|---|---|
| **Sheet Type** | Horizontal Strip | Frames laid left to right in one row |
| **Trim Sprite** | **OFF** | Trimming shifts frames and breaks alignment |
| **Trim Cels** | **OFF** | Same |
| **Merge Duplicates** | **OFF** | Silently drops frames and breaks the count |
| **Border Padding** | 0 | Any padding offsets every frame |
| **Shape Padding** | 0 | Same |
| **Inner Padding** | 0 | Same |
| **Split Layers** | OFF | Frames, not layers |
| **Split Tags** | OFF | One sheet per sprite |
| **Scale** | 100% | Never export at 2× or 4× |
| **Output File** | `.png` | — |
| **JSON Data** | not needed | Frame count is derived from sheet width |

The three that will silently ruin a sprite are **Trim**, **Merge Duplicates**, and
**padding**. If an animation ever looks like it's jittering sideways, one of those got
switched on.

**Sanity check before you hand it over:** the exported PNG should be exactly
`canvas width × frame count` wide and `canvas height` tall. A 6-frame 32×32 fish is
**192 × 32**. If it isn't, something above is wrong.

---

## 5. Where files go

```
public/sprites/plant.png
public/sprites/floppy.png
public/sprites/fish.png
...
public/sprites/cat-mainecoon.png
public/sprites/cat-tabby.png
```

Exact filenames from the tables above, lowercase, hyphens not underscores.

Frame count is calculated automatically as `sheet width ÷ canvas width`, so you can change
how many frames an animation has without telling me — just re-export. Only the **canvas
size** is fixed, because it's declared in code.

Keep the `.aseprite` source files somewhere outside `public/` (they'd otherwise be served
to visitors). A `sprites-src/` folder at the repo root is fine — I'll gitignore it or not,
your call.

---

## 6. Display sizes

Sprites are shown at **integer multiples** of their canvas, which is what keeps pixels
sharp. Non-integer scaling (1.25×, 1.5×) makes some pixel rows a fraction wider than
others and looks subtly wrong.

| Sprite | Canvas | Shown at |
|---|---|---|
| Section icons | 32 × 32 | 32px (1×) |
| Project card icons | 32 × 32 | 64px (2×) |
| Project page icon | 32 × 32 | 64px (2×) |
| Footer cat | 32 × 32 | 64px (2×) |
| 404 cat | 32 × 32 | 96px (3×) |
| June (grey) | 50 × 40 | 300 × 240px (6×) |
| Eevee (ginger) | 50 × 80 | 300 × 480px (6×) |

> Note: the current site renders some icons at 30px, 40px and 48px — fractional multiples
> of 32. That's fine for the inline-SVG sprites it uses today, but it will look soft once
> these become PNGs. I'll move them to 32/64/96 when I wire up your sheets. It's a small
> layout adjustment, nothing you need to account for while drawing.

---

## 7. Checklist per sprite

- [ ] Canvas is exactly the size in the table
- [ ] 16 colours or fewer
- [ ] No anti-aliasing anywhere
- [ ] Background layer hidden before export
- [ ] Reads clearly against `#0B0B0C` at final display size — zoom out and check
- [ ] Loops cleanly (last frame leads into first)
- [ ] Trim off, Merge Duplicates off, all padding 0, scale 100%
- [ ] Exported PNG is `canvas width × frames` wide
- [ ] Named correctly, in `public/sprites/`

---

## 8. Palettes of the delivered sprites

Pulled from your PNGs — useful for keeping the remaining sprites consistent with these.

**plant** (6) `#A46422` pot · `#BA7732` pot light · `#844D13` pot shadow ·
`#44891A` leaf · `#3A7B13` leaf shadow · `#A3CE27` leaf highlight

**floppy** (4) `#005784` shell · `#00476C` shell shadow · `#B2DCEF` label ·
`#78A6BA` label shadow

**gear** (2) `#807979` face · `#6C6363` shadow

**chest** (5) `#844D13` wood · `#6C3D0B` wood shadow · `#493C2B` interior ·
`#9D9D9D` metal band · `#807979` metal shadow

**mailbox** (7) `#807979` body · `#898888` body light · `#584F4F` body shadow ·
`#6C6363` mid · `#844D13` post · `#71400C` post shadow · `#BE2633` flag

You've settled into a shared set worth reusing across the rest:

| Role | Hex |
|---|---|
| Metal / grey light | `#898888` |
| Metal / grey mid | `#807979` |
| Metal / grey dark | `#6C6363` |
| Metal / grey shadow | `#584F4F` |
| Wood light | `#A46422` |
| Wood mid | `#844D13` |
| Wood dark | `#6C3D0B` |
| Wood shadow | `#493C2B` |
| Accent red | `#BE2633` |

Two notes on how these sit on the site: the greys land close to the muted text colour
(`#9A9A97`), which is why they read as "part of the page" rather than stickers — worth
keeping. And nothing you've drawn uses the site's ember accent (`#D98A3D`); it's close to
your wood-light `#A46422`, so if you ever want a sprite to feel deliberately tied to the
site's one accent colour, that's the hex.

## 9. What I do once you deliver

I swap the inline-SVG renderer for a `<PixelSheet>` component that plays a strip with
`steps()`, wire the hover-only ones to the card hover state, fix the display sizes to
integer multiples, and delete `components/pixel/sprites.ts` and `cats.ts`.

All motion stays disabled under `prefers-reduced-motion` — animated sprites will hold on
frame 1 rather than looping.

You can hand them over in batches. Nothing breaks if only some exist; I'll migrate one
sprite at a time and leave the rest on the current grids until they're replaced.
