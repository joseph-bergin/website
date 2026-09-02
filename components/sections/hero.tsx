import { PixelSheet } from "@/components/pixel/pixel-sheet";
import { catFloorOffset, heroCatLayout, sheets } from "@/components/pixel/sheets";
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
            than one team. Before that I co-founded a company.
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
          The pair, bottom-right. June overlaps Eevee slightly and sits a few
          pixels lower so she reads as lying nearer the viewer. She paints on
          top (z-10). Layout offsets live in `heroCatLayout` and scale with
          `HERO_CAT_SCALE`.
        */}
        <Reveal delay={0.34}>
          <div className="pointer-events-none absolute right-0 bottom-6 hidden items-end lg:flex">
            <PixelSheet
              {...sheets.junecat}
              className="relative z-10"
              style={{
                marginRight: -heroCatLayout.overlap,
                marginBottom: -(catFloorOffset("junecat") + heroCatLayout.juneDepth),
              }}
            />
            <PixelSheet
              {...sheets.eeveecat}
              style={{
                transform: `translateX(${heroCatLayout.eeveeNudge}px)`,
                marginBottom: -catFloorOffset("eeveecat"),
              }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
