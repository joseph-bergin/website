import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { certifications, education } from "@/lib/resume";

export function About() {
  return (
    <Section id="about" label="about" title="A little more detail" sheet="plant">
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <div className="space-y-4 text-[0.975rem] leading-[1.75] text-ink-muted">
            <p>
              I&apos;m a software engineer at JPMorgan Chase, where I build the retrieval
              infrastructure
              that Wealth Management&apos;s AI agents run on — a centralized OpenSearch vector store
              with a REST layer in front of it — along with the RAG agents that consume it. One of
              them answers investment questions for more than a thousand financial advisors.
            </p>
            <p>
              Most of my work lives at the intersection of <strong className="font-medium text-ink">
                LLMs
              </strong>{" "}
              and the systems underneath them:{" "}
              <strong className="font-medium text-ink">search</strong> and retrieval quality,{" "}
              <strong className="font-medium text-ink">distributed systems</strong> that stay
              predictable at hundreds of millions of documents, and the{" "}
              <strong className="font-medium text-ink">developer experience</strong> of the APIs
              other engineers have to build on.
            </p>
            <p>
              Before this I co-founded Akoe, an LLM-powered quality assurance platform for grading
              customer service calls. I built the grading engine, the reporting on top of it, and
              owned the AWS infrastructure it all ran on. We sold the company at the end of 2025.
            </p>
            <p>
              Away from work I draw, hike, play basketball, and play video games. June
              and Eevee — my two cats (the pair in the hero above) — mostly supervise.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-8">
            <div>
              <p className="label-mono mb-3">Education</p>
              <p className="text-[0.9rem] font-medium text-ink">{education.school}</p>
              <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-muted">
                {education.degree}
              </p>
              <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-faint">
                Minors in {education.minors.join(" and ")}
              </p>
              <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-faint">
                {education.honors} · {education.graduated}
              </p>
            </div>

            <div>
              <p className="label-mono mb-3">Certifications</p>
              {certifications.map((cert) => (
                <div key={cert.name}>
                  <p className="text-[0.9rem] font-medium text-ink">{cert.name}</p>
                  <p className="mt-1 text-[0.85rem] text-ink-faint">{cert.issuer}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="label-mono mb-3">Based in</p>
              <p className="text-[0.9rem] text-ink">Plano, Texas</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
