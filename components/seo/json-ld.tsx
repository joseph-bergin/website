import { roles, education } from "@/lib/resume";
import { site } from "@/lib/site";

/**
 * Structured data. Rendered as a plain <script type="application/ld+json">;
 * the content is generated from our own data files, never user input, so
 * JSON.stringify is the only escaping needed.
 */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function PersonJsonLd() {
  const current = roles[0];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: site.name,
        url: site.url,
        email: `mailto:${site.email}`,
        jobTitle: current.title,
        description: site.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: "McKinney",
          addressRegion: "TX",
          addressCountry: "US",
        },
        worksFor: { "@type": "Organization", name: current.company },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: education.school,
        },
        knowsAbout: [
          "Retrieval-Augmented Generation",
          "Vector Search",
          "OpenSearch",
          "Large Language Models",
          "Distributed Systems",
          "AWS",
          "Terraform",
        ],
        sameAs: [site.github, site.linkedin],
      }}
    />
  );
}

export function ProjectJsonLd({
  title,
  description,
  slug,
  stack,
}: {
  title: string;
  description: string;
  slug: string;
  stack: string[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: title,
        description,
        url: `${site.url}/projects/${slug}`,
        programmingLanguage: stack,
        author: { "@type": "Person", name: site.name, url: site.url },
      }}
    />
  );
}
