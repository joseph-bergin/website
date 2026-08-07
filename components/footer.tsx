import { Sprite } from "@/components/pixel/sprite";
import { cat } from "@/components/pixel/sprites";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-14">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
        {/* <div className="flex items-end gap-4"> */}
          {/* <Sprite sprite={cat} size={40} label="A pixel-art cat, asleep." /> */}
          {/* <div> */}
            {/* <p className="text-[0.9rem] text-ink">Thanks for visiting.</p> */}
            {/* <p className="mt-1 text-[0.85rem] text-ink-muted">Let's connnect and continue to build cool things.</p> */}
          {/* </div> */}
        {/* </div> */}

        <div className="flex flex-col gap-1 sm:items-end">
          <div className="flex items-center gap-4">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[0.8rem] text-ink-faint transition-colors duration-200 hover:text-ink"
            >
              GitHub
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[0.8rem] text-ink-faint transition-colors duration-200 hover:text-ink"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-[0.8rem] text-ink-faint transition-colors duration-200 hover:text-ink"
            >
              Email
            </a>
          </div>
          <p className="label-pixel mt-2">
            © {new Date().getFullYear()} {site.name.toLowerCase()}
          </p>
        </div>
      </div>
    </footer>
  );
}
