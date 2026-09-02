import Image from "next/image";

import { Card, Chip } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { roles, type Role } from "@/lib/resume";

/**
 * Company logo, falling back to a two-letter monogram tile for any role without
 * one. Both share the same rounded, hairlined frame so rows stay consistent.
 */
function CompanyMark({ role }: { role: Role }) {
  const frame =
    "size-9 shrink-0 overflow-hidden rounded-[8px] border border-line bg-surface-raised";

  if (role.logo) {
    return (
      <div className={frame}>
        <Image
          src={role.logo}
          alt={`${role.company} logo`}
          width={144}
          height={144}
          className="size-full object-cover"
          sizes="36px"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={`${frame} grid place-items-center font-mono text-[0.7rem] tracking-tight text-ink-muted`}
    >
      {role.monogram}
    </div>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      label="experience"
      title="Where I've worked"
      sheet="floppy"
      intro="Four roles, two of them internships, one of them a company I helped start."
    >
      <ol className="relative space-y-4 border-l border-line pl-8">
        {roles.map((role, i) => (
          <Reveal as="li" key={`${role.company}-${role.start}`} delay={i * 0.06}>
            <div className="relative">
              {/* Node on the timeline rail, centred on the 1px border. */}
              <span
                aria-hidden
                className="absolute top-[30px] -left-[35px] size-[7px] rounded-full border border-line-strong bg-surface-raised"
              />
              <Card interactive className="p-6">
                <div className="flex items-start gap-4">
                  <CompanyMark role={role} />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-[1.05rem] font-medium tracking-[-0.01em] text-ink">
                        {role.title}
                      </h3>
                      <p className="font-mono text-[0.75rem] whitespace-nowrap text-ink-faint">
                        {role.period}
                      </p>
                    </div>

                    <p className="mt-1 text-[0.875rem] text-ink-muted">
                      {role.company}
                      {role.team ? (
                        <span className="text-ink-faint"> · {role.team}</span>
                      ) : null}
                      <span className="text-ink-faint"> · {role.location}</span>
                    </p>

                    <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-muted">
                      {role.summary}
                    </p>

                    <ul className="mt-5 space-y-3.5">
                      {role.highlights.map((h) => (
                        <li key={h.title}>
                          <p className="text-[0.85rem] font-medium text-ink">{h.title}</p>
                          <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-muted">
                            {h.body}
                          </p>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {role.tech.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
