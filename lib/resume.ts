/**
 * Everything here is drawn directly from the resume. Bullets have been rewritten
 * into readable prose, but no achievement, metric, date, or technology has been
 * added that isn't on it.
 */

export type Role = {
  company: string;
  team?: string;
  title: string;
  location: string;
  start: string;
  end: string;
  /** Short label rendered in the timeline rail. */
  period: string;
  /** Path under /public. Falls back to the monogram tile when absent. */
  logo?: string;
  /** Two-letter monogram, used when there is no logo. */
  monogram: string;
  summary: string;
  highlights: { title: string; body: string }[];
  tech: string[];
};

export const roles: Role[] = [
  {
    company: "JPMorgan Chase",
    team: "Wealth Management",
    title: "Software Engineer",
    location: "Plano, TX",
    start: "2025-02",
    end: "present",
    period: "Feb 2025 — Present",
    logo: "/logos/jpmc.png",
    monogram: "JP",
    summary:
      "Building the shared retrieval layer that Wealth Management's AI agents run on, and the agents themselves.",
    highlights: [
      {
        title: "Centralized retrieval infrastructure",
        body: "Designed and built a centralized OpenSearch vector store with a RESTful API layer in front of it, so Wealth Management's AI agents draw document context from one shared service instead of each standing up its own retrieval stack.",
      },
      {
        title: "A RAG agent serving 1,000+ advisors",
        body: "Independently designed, built, and deployed a RAG agent on Google's ADK framework that answers investment questions for over 1,000 financial advisors.",
      },
      {
        title: "Reindexing at nine figures",
        body: "Built a hybrid regex-plus-LLM batch scoring pipeline and fine-tuned the LLM classification prompts behind it to reindex hundreds of millions of OpenSearch documents — cutting cost, reducing latency, and improving retrieval precision.",
      },
      {
        title: "Technical leadership",
        body: "Provided technical leadership for a team of four engineers: reviewing designs, answering implementation questions, and unblocking the decisions that were holding work up.",
      },
      {
        title: "Ownership and handoff",
        body: "Owned all feature development and deployment decisions as SME for a second production RAG agent, and led the full knowledge transfer during a cross-team handoff.",
      },
    ],
    tech: [
      "Python",
      "OpenSearch",
      "Google ADK",
      "RAG",
      "Vector Search",
      "AWS",
      "REST APIs",
      "Prompt Engineering",
    ],
  },
  {
    company: "Akoe",
    title: "Co-Founder",
    location: "Remote",
    start: "2024-01",
    end: "2025-12",
    period: "Jan 2024 — Dec 2025",
    logo: "/logos/akoe.png",
    monogram: "AK",
    summary:
      "Co-founded an LLM-powered quality assurance platform for grading and reviewing customer service calls. Acquired.",
    highlights: [
      {
        title: "From zero to acquisition",
        body: "Co-founded Akoe, an LLM-powered quality assurance platform for grading and reviewing customer service calls, and grew it through to a company sale.",
      },
      {
        title: "The grading engine",
        body: "Built the core engine that scored agent performance against customizable, admin-defined benchmarks — replacing a manual call-review process with something that ran on every call.",
      },
      {
        title: "Insights, not just scores",
        body: "Designed automated summary and insights reporting that surfaced call-quality trends and turned them into actionable recommendations for both agents and their managers.",
      },
      {
        title: "Full-stack and the infrastructure under it",
        body: "Deployed the full-stack application across Next.js/TypeScript, Python, and AWS, and owned the AWS infrastructure powering the platform's LLM grading pipeline.",
      },
    ],
    tech: ["Next.js", "TypeScript", "Python", "AWS", "LLMs", "PostgreSQL"],
  },
  {
    company: "JPMorgan Chase",
    team: "Debit Tech",
    title: "Software Engineer",
    location: "Plano, TX",
    start: "2024-06",
    end: "2024-08",
    period: "Jun 2024 — Aug 2024",
    logo: "/logos/jpmc.png",
    monogram: "JP",
    summary:
      "Near-real-time event ingestion and the Terraform foundation the team deployed on.",
    highlights: [
      {
        title: "Near-real-time ingestion",
        body: "Designed and implemented a scalable pipeline for consuming near-real-time events using AWS Lambda and AWS Glue, giving downstream analytics low-latency access to data that had previously arrived in batches.",
      },
      {
        title: "Infrastructure as code",
        body: "Provisioned and managed the team's AWS infrastructure with Terraform, establishing repeatable, version-controlled deployments.",
      },
    ],
    tech: ["AWS Lambda", "AWS Glue", "Terraform", "Python", "AWS"],
  },
  {
    company: "JPMorgan Chase",
    team: "Consumer Banking",
    title: "Software Engineer",
    location: "Plano, TX",
    start: "2023-06",
    end: "2023-08",
    period: "Jun 2023 — Aug 2023",
    logo: "/logos/jpmc.png",
    monogram: "JP",
    summary: "Backend service work and zero-downtime schema migrations in production.",
    highlights: [
      {
        title: "Reconciling third-party data",
        body: "Implemented Spring Boot REST endpoints that transform and reconcile data from third-party APIs into consistent internal contracts.",
      },
      {
        title: "Zero-downtime migrations",
        body: "Authored Liquibase migration scripts to manage schema changes on production SQL databases without taking them offline.",
      },
    ],
    tech: ["Java", "Spring Boot", "Liquibase", "SQL", "REST APIs"],
  },
];

export const education = {
  school: "University of Arkansas",
  location: "Fayetteville, AR",
  degree: "B.S. in Honors Computer Science",
  minors: ["Data Analytics", "Mathematics"],
  honors: "Summa Cum Laude",
  graduated: "December 2024",
};

export const certifications = [
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services" },
];

export type SkillGroup = { label: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "JavaScript", "SQL", "Java", "Go", "C++"],
  },
  {
    label: "AI",
    items: [
      "RAG Pipelines",
      "Google ADK",
      "LangChain",
      "LangGraph",
      "Vector Search",
      "Prompt Engineering",
      "LLM Evaluation",
    ],
  },
  {
    label: "Backend",
    items: ["REST API Design", "Spring Boot", "Liquibase", "Batch Pipelines", "Flask"],
  },
  {
    label: "Cloud",
    items: ["AWS", "OpenSearch", "Fargate", "Terraform", "AWS Certified Cloud Practitioner"],
  },
  {
    label: "Frontend",
    items: ["Next.js", "React", "TypeScript", "CSS", "Tailwinds"],
  },
];
