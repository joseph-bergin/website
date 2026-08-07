import Link from "next/link";

import { navItems, site } from "@/lib/site";

/**
 * Anchors are absolute (`/#about`) rather than bare fragments so the nav keeps
 * working from project pages, not just the home page.
 */
export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6"
      >
        <Link
          href="/"
          className="font-mono text-[0.8rem] tracking-tight text-ink transition-colors hover:text-ink-muted"
        >
          {site.name.toLowerCase().replace(" ", "-")}
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={`/${item.href}`}
                className="text-[0.82rem] text-ink-faint transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={site.resume}
          target="_blank"
          rel="noreferrer noopener"
          className="text-[0.82rem] text-ink-muted transition-colors duration-200 hover:text-ink md:hidden"
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
