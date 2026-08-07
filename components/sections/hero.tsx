import { PixelSheet } from "@/components/pixel/pixel-sheet";
import { catFloorOffset, sheets } from "@/components/pixel/sheets";
import { ButtonLink } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

/**
 * Both cats sit bottom-right of the hero, sharing one ground line — June asleep,
 * Eevee upright with her tail going. Each sprite has a different amount of dead
 * space under its feet inside the frame, so each is pushed down by its own
 * padding (negative margin) to land them on the same floor. Purely decorative:
 * pointer-events off and hidden from assistive tech.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-3.5rem)] items-center py-16">
      <div className="relative w-full">
        <Reveal>
          <p className="label-pixel">hello, i&apos;m</p>
        </Reveal>

        <Reveal>
          <h1 className="mt-3 text-[2.6rem] font-medium leading-[1.05] tracking-[-0.035em] text-ink sm:text-[3.1rem]">
            {site.name}
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-5 max-w-[34ch] text-[1.35rem] leading-[1.35] font-normal tracking-[-0.02em] text-ink sm:text-[1.5rem]">
            {site.headline}
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-6 max-w-[56ch] text-[0.975rem] leading-relaxed text-ink-muted">
            I work on retrieval infrastructure and the agents that sit on top of it — vector
            stores, RAG pipelines, and the unglamorous API layers that make them usable by more
            than one team. Before that I co-founded a company and sold it.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-7 flex items-center gap-2.5">
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-ember shadow-[0_0_0_3px_rgba(217,138,61,0.12)]"
            />
            <p className="font-mono text-[0.8rem] text-ink-muted">{site.current}</p>
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="mt-9 flex flex-wrap gap-2.5">
            <ButtonLink href={site.resume} variant="primary" external>
              Resume
            </ButtonLink>
            <ButtonLink href={site.github} external>
              GitHub
            </ButtonLink>
            <ButtonLink href={site.linkedin} external>
              LinkedIn
            </ButtonLink>
            <ButtonLink href={`mailto:${site.email}`}>Email</ButtonLink>
          </div>
        </Reveal>

        {/*
          The pair, bottom-right. Two things make this read as a scene rather
          than a row of stickers: the negative margin pulls them close enough to
          overlap slightly, and June sits a few pixels lower than Eevee so she
          reads as lying nearer the viewer. She also paints on top (z-10).
        */}
        <Reveal delay={0.34}>
          {/* -bottom-8 drops them into the section's padding so June clears the
              last line of the intro paragraph now that she's at 6x */}
          <div className="pointer-events-none absolute -right-5 -bottom-8 hidden items-end lg:flex">
            <PixelSheet
              {...sheets.junecat}
              className="relative z-10 -mr-[86px]"
              style={{ marginBottom: -(catFloorOffset("junecat") + 12) }}
            />
            {/* translate rather than margin: nudges her right without
                reflowing June or the group's right anchor */}
            <PixelSheet
              {...sheets.eeveecat}
              className="translate-x-[22px]"
              style={{ marginBottom: -catFloorOffset("eeveecat") }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
