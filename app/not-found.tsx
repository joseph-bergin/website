import Link from "next/link";

import { Nav } from "@/components/nav";
import { Sprite } from "@/components/pixel/sprite";
import { cat } from "@/components/pixel/sprites";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main
        id="main"
        className="mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-4xl flex-col items-start justify-center px-6"
      >
        <Sprite sprite={cat} size={56} label="A pixel-art cat, asleep." />
        <p className="label-pixel mt-6">404</p>
        <h1 className="mt-3 text-[2rem] font-medium tracking-[-0.03em] text-ink">
          Nothing here.
        </h1>
        <p className="mt-3 max-w-[46ch] text-[0.975rem] leading-relaxed text-ink-muted">
          June has no idea either. This page either moved or never existed.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-1.5 text-[0.875rem] text-ink transition-colors duration-200 hover:text-ember"
        >
          <span aria-hidden>←</span> Back home
        </Link>
      </main>
    </>
  );
}
