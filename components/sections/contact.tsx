import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { site } from "@/lib/site";

const links = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
  { label: "LinkedIn", value: "josephsbergin", href: site.linkedin, external: true },
  { label: "GitHub", value: "joseph-bergin", href: site.github, external: true },
  { label: "Resume", value: "PDF", href: site.resume, external: true },
];

export function Contact() {
  return (
    <Section
      id="contact"
      label="contact"
      title="Get in touch"
      sheet="mailbox"
      intro="The fastest way to reach me is email. I read everything."
    >
      <Reveal>
        <ul className="divide-y divide-line border-y border-line">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer noopener" : undefined}
                className="group flex items-baseline justify-between gap-6 py-4"
              >
                <span className="font-mono text-[0.75rem] tracking-[0.12em] text-ink-faint uppercase">
                  {link.label}
                </span>
                <span className="flex items-center gap-2 text-[0.925rem] text-ink transition-colors duration-200 group-hover:text-ember">
                  {link.value}
                  <span
                    aria-hidden
                    className="text-ink-faint transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
