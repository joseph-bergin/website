import { PixelSheet } from "@/components/pixel/pixel-sheet";
import { sheets, type SheetName } from "@/components/pixel/sheets";
import { Sprite, type PixelSprite } from "@/components/pixel/sprite";
import { Reveal } from "./reveal";

/**
 * The section header shared by every block on the page: one sprite, one tiny
 * pixel label, one title. The wrapper is a `group` so the sprite's hover
 * animation fires when the visitor is anywhere near the heading.
 *
 * Takes either a hand-drawn sheet or, for sections whose sprite hasn't been
 * drawn yet, an inline-SVG grid — same fallback the project cards use.
 */
export function Section({
  id,
  label,
  title,
  intro,
  sheet,
  sprite,
  children,
  className,
}: {
  id: string;
  label: string;
  title: string;
  intro?: string;
  sheet?: SheetName;
  sprite?: PixelSprite;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 border-t border-line py-20 ${className ?? ""}`}>
      <Reveal>
        <header className="group mb-10">
          <div className="flex items-center gap-3">
            {sheet ? <PixelSheet {...sheets[sheet]} /> : sprite ? <Sprite sprite={sprite} size={48} /> : null}
            <span className="label-pixel pt-0.5">{label}</span>
          </div>
          <h2 className="mt-4 text-[1.75rem] font-medium tracking-[-0.02em] text-ink">{title}</h2>
          {intro ? (
            <p className="mt-3 max-w-[62ch] text-[0.975rem] leading-relaxed text-ink-muted">
              {intro}
            </p>
          ) : null}
        </header>
      </Reveal>
      {children}
    </section>
  );
}
