# joseph-bergin.com

Personal portfolio. Next.js 15 (App Router) · TypeScript · Tailwind v4 · Framer Motion.
Dark mode only. Every route is statically prerendered.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

> **Stop the dev server before running `npm run build`.** Both write to `.next`, and a
> production build run alongside `next dev` overwrites the dev server's chunks and client
> manifest. The symptom is the page rendering as unstyled HTML, with
> `/_next/static/css/app/layout.css` 404ing and "Could not find the module … in the React
> Client Manifest" in the terminal. The fix is `rm -rf .next` and restart `npm run dev`.

## Before you deploy

1. **Set your domain.** Add `NEXT_PUBLIC_SITE_URL=https://your-domain.com` in Vercel's
   environment variables. It feeds canonical URLs, OpenGraph, and the sitemap.
   The fallback in `lib/site.ts` is `https://josephbergin.com`.
2. **Add projects as you finish them** in `lib/projects.ts`. Setting `draft: true` renders a
   visible "unfinished" banner on a project's page, so a half-written write-up can ship
   without pretending to be complete.

## Sections

Hero · About · Experience · Projects · Skills · Contact · Footer.

## Where the content lives

| What | File |
|---|---|
| Name, links, headline, email | `lib/site.ts` |
| Experience, education, certs, skills | `lib/resume.ts` |
| Projects + their detail pages | `lib/projects.ts` |
| Résumé PDF | `public/resume.pdf` |

All content is typed data, so a wrong field name is a build error rather than a silently
broken page.

## Pixel art

The sprites are not images. They are character grids in
`components/pixel/sprites.ts`, compiled to inline SVG by `components/pixel/sprite.tsx`.

```ts
const palette = { o: "#a84d1c", f: "#d8822f" };
const grid = [
  "....o",       // "." is transparent
  "...off",      // only the LEADING offset has to be right —
  "..offfo",     // anything past the end of a row is transparent
];
```

The renderer merges horizontal runs, then stacks vertically identical runs, so a 32×32
sprite costs tens of `<rect>`s rather than hundreds. Nothing ships to the client: sprites
render on the server and all motion is CSS.

Adding a sprite:

1. Write the grid + palette in `sprites.ts`.
2. Give any animated layer a `className` from the `anim-*` / `hv-*` utilities in
   `app/globals.css` (`hv-*` only fire inside a hovered `.group`).
3. If a layer needs both placement (`dx`/`dy`) **and** an animation, the renderer already
   splits them onto separate `<g>` elements — a CSS transform silently replaces an SVG
   `transform` attribute on the same node, which is a genuinely annoying bug to find.

The hero scene in `components/pixel/campsite.tsx` composes small grids at offsets rather
than being one giant grid, so the tent, pines, fire and stump stay independently editable.

## Motion

`components/ui/reveal.tsx` handles scroll-in fades. It returns a plain element when
`prefers-reduced-motion` is set, and `app/globals.css` zeroes every animation and
transition under the same query. The page is fully legible with motion off.

`MotionProvider` mounts `LazyMotion` with only the DOM feature set, which keeps the
Framer Motion payload to roughly a third of the full package.

## Removed

The Writing (blog) and Uses sections were cut, along with the `/writing` routes, the MDX
content layer, and the RSS feed. If a blog comes back later it needs new routes and a
content layer — `gray-matter` + `next-mdx-remote/rsc` is the path that worked here.
Contentlayer, which the original spec called for, is archived and will not build against
Next 15.
