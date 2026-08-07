export const site = {
  name: "Joseph Bergin",
  shortName: "Joseph Bergin",
  title: "Joseph Bergin — AI Engineer",
  role: "AI Engineer",
  company: "JPMorgan Chase",
  current: "AI Engineer @ JPMorgan Chase",
  location: "McKinney, TX",
  headline:
    "Building AI systems, backend infrastructure, and products people actually use.",
  description:
    "AI Engineer at JPMorgan Chase building production RAG systems, OpenSearch vector infrastructure, and retrieval APIs. Previously co-founded Akoe, an LLM-powered QA platform.",
  // Update NEXT_PUBLIC_SITE_URL in .env / Vercel to your real domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://josephbergin.com",
  email: "josephsbergin@gmail.com",
  github: "https://github.com/joseph-bergin",
  linkedin: "https://www.linkedin.com/in/josephsbergin/",
  resume: "/resume.pdf",
  locale: "en_US",
} as const;

export const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;
