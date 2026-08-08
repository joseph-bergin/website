import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import { Nav } from "@/components/nav";
import { ProjectMark } from "@/components/pixel/project-mark";
import { ProjectJsonLd } from "@/components/seo/json-ld";
import { ButtonLink, Card, Chip } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.tagline,
      url: `/projects/${project.slug}`,
    },
    twitter: { card: "summary_large_image", title: project.title, description: project.tagline },
  };
}

function Block({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section" className="border-t border-line py-12">
      <p className="label-pixel">{label}</p>
      <h2 className="mt-3 text-[1.4rem] font-medium tracking-[-0.02em] text-ink">{title}</h2>
      <div className="mt-6">{children}</div>
    </Reveal>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4 text-[0.975rem] leading-[1.75] text-ink-muted">
      {paragraphs.map((p) => (
        <p key={p.slice(0, 40)} className="max-w-[68ch]">
          {p}
        </p>
      ))}
    </div>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <MotionProvider>
      <ProjectJsonLd
        title={project.title}
        description={project.tagline}
        slug={project.slug}
        stack={project.stack}
      />
      <Nav />
      <main id="main" className="mx-auto max-w-4xl px-6">
        <div className="py-12">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-[0.82rem] text-ink-faint transition-colors duration-200 hover:text-ink"
          >
            <span aria-hidden>←</span> Projects
          </Link>
        </div>

        <Reveal as="section" className="pb-12">
          <div className="group flex items-start gap-4">
            <ProjectMark project={project} size={48} />
            <div>
              <h1 className="text-[2.1rem] font-medium leading-tight tracking-[-0.03em] text-ink">
                {project.title}
              </h1>
              <p className="mt-1 font-mono text-[0.78rem] text-ink-faint">{project.year}</p>
            </div>
          </div>

          <p className="mt-6 max-w-[52ch] text-[1.15rem] leading-[1.45] tracking-[-0.015em] text-ink">
            {project.tagline}
          </p>

          {project.draft ? (
            <Card className="mt-7 border-ember-dim/40 p-4">
              <p className="text-[0.85rem] leading-relaxed text-ink-muted">
                <span className="label-pixel mr-2">unfinished</span>
                This write-up is a scaffold. The structure is in place; the content is marked{" "}
                <code className="font-mono text-ink">TODO</code> and needs to be written before
                this page goes live.
              </p>
            </Card>
          ) : null}

          <div className="mt-7 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>

          {project.links.length > 0 ? (
            <div className="mt-7 flex flex-wrap gap-2.5">
              {project.links.map((link) => (
                <ButtonLink key={link.href} href={link.href} external>
                  {link.label}
                </ButtonLink>
              ))}
            </div>
          ) : null}
        </Reveal>

        <Block label="overview" title="Overview">
          <Prose paragraphs={project.overview} />
        </Block>

        <Block label="problem" title="The problem">
          <Prose paragraphs={project.problem} />
        </Block>

        <Block label="architecture" title="Architecture">
          <ol className="space-y-3">
            {project.architecture.map((step, i) => (
              <li key={step.step}>
                <Card className="p-5">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 font-mono text-[0.72rem] text-ink-faint tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[0.9rem] font-medium text-ink">{step.step}</p>
                      <p className="mt-1.5 max-w-[62ch] text-[0.9rem] leading-relaxed text-ink-muted">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
        </Block>

        <Block label="challenges" title="What was hard">
          <div className="space-y-6">
            {project.challenges.map((c) => (
              <div key={c.title}>
                <h3 className="text-[0.95rem] font-medium text-ink">{c.title}</h3>
                <p className="mt-1.5 max-w-[68ch] text-[0.925rem] leading-[1.7] text-ink-muted">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </Block>

        {project.results ? (
          <Block label="results" title="Results">
            <figure>
              {/* Narrow screens scroll the table rather than the page. */}
              <div className="overflow-x-auto rounded-[12px] border border-line">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-line bg-surface">
                      {project.results.columns.map((col) => (
                        <th
                          key={col}
                          scope="col"
                          className="px-4 py-3 font-mono text-[0.7rem] tracking-[0.12em] text-ink-faint uppercase"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {project.results.rows.map((row, i) => {
                      const best = project.results?.highlight?.includes(i);
                      return (
                        <tr
                          key={row.join("|")}
                          className={`border-b border-line last:border-b-0 ${
                            best ? "bg-surface-raised" : ""
                          }`}
                        >
                          {row.map((cell, j) => (
                            <td
                              key={`${j}-${cell}`}
                              className={`px-4 py-2.5 text-[0.875rem] tabular-nums ${
                                j === 0 ? "text-ink" : "text-ink-muted"
                              } ${best && j > 1 ? "font-medium text-ink" : ""}`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <figcaption className="mt-2.5 max-w-[66ch] text-[0.82rem] leading-relaxed text-ink-faint">
                {project.results.caption} Highlighted rows are each model&apos;s best setup.
              </figcaption>
            </figure>
          </Block>
        ) : null}

        <Block label="lessons" title="What I took from it">
          <ul className="space-y-3">
            {project.lessons.map((lesson) => (
              <li key={lesson} className="flex gap-3">
                <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-ember-dim" />
                <p className="max-w-[66ch] text-[0.925rem] leading-[1.7] text-ink-muted">
                  {lesson}
                </p>
              </li>
            ))}
          </ul>
        </Block>

        <Block label="stack" title="Tech stack">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </Block>

        <Block label="next" title="Future work">
          <ul className="space-y-3">
            {project.futureWork.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-line-strong" />
                <p className="max-w-[66ch] text-[0.925rem] leading-[1.7] text-ink-muted">{item}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Footer />
      </main>
    </MotionProvider>
  );
}
