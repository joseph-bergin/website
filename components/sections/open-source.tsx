import { server } from "@/components/pixel/sprites";
import { Card, Chip } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { contributions } from "@/lib/resume";

/**
 * Uses the inline-SVG server grid rather than a sheet — this section arrived
 * after the five hand-drawn section sprites, so it borrows the fallback path
 * until one is drawn for it.
 */
export function OpenSource() {
  return (
    <Section
      id="open-source"
      label="open source"
      title="Merged upstream"
      sprite={server}
      intro="Contributions to projects I think are cool."
    >
      <ul className="space-y-3">
        {contributions.map((c, i) => (
          <Reveal key={c.href} delay={i * 0.05}>
            <li>
              <Card className="p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link font-mono text-[0.82rem] text-ink-muted transition-colors duration-200 hover:text-ember"
                  >
                    {c.repo}
                    <span className="text-ink-faint group-hover/link:text-ember">
                      {" "}
                      #{c.number}
                    </span>
                  </a>
                  <p className="font-mono text-[0.72rem] text-ink-faint tabular-nums">
                    merged {c.merged} · {c.diff}
                  </p>
                </div>

                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-[0.975rem] font-medium text-ink transition-colors duration-200 hover:text-ember"
                >
                  {c.title}
                </a>

                <p className="mt-2 max-w-[68ch] text-[0.9rem] leading-relaxed text-ink-muted">
                  {c.summary}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.tech.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </Card>
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
