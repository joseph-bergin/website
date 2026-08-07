import { Card, Chip } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { skillGroups } from "@/lib/resume";

export function Skills() {
  return (
    <Section
      id="skills"
      label="skills"
      title="What I work with"
      sheet="gear"
      intro="Grouped by what they're for."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.05}>
            <Card className="h-full p-5">
              <p className="label-mono">{group.label}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
