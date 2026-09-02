import Link from "next/link";

import { ProjectMark } from "@/components/pixel/project-mark";
import { Chip } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { projects, type Project } from "@/lib/projects";

const statusLabel: Record<Project["status"], string> = {
  completed: "completed",
  draft: "write-up pending",
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-[12px] border border-line bg-surface p-6 shadow-[var(--shadow-card)] transition-[border-color,background-color,box-shadow] duration-300 hover:border-line-strong hover:bg-surface-raised hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="flex items-start justify-between gap-4">
        <ProjectMark project={project} size={40} />
        <span className="label-pixel pt-1">{statusLabel[project.status]}</span>
      </div>

      <h3 className="mt-5 text-[1.1rem] font-medium tracking-[-0.015em] text-ink">
        {project.title}
      </h3>
      <p className="mt-1 font-mono text-[0.75rem] text-ink-faint">{project.year}</p>

      <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-muted">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 5).map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>

      <p className="mt-6 flex items-center gap-1.5 text-[0.82rem] text-ink-faint transition-colors duration-200 group-hover:text-ink">
        Read the write-up
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        >
          →
        </span>
      </p>
    </Link>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      label="projects"
      title="Things I've built"
      sheet="chest"
      intro="Each of these has its own write-up — the problem, the architecture, what went wrong, and what I'd do differently."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
