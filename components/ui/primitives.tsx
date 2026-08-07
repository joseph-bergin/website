import Link from "next/link";

/** A bordered surface. Every card on the site is one of these. */
export function Card({
  children,
  className,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-[12px] border border-line bg-surface shadow-[var(--shadow-card)]",
        interactive
          ? "transition-[border-color,background-color,box-shadow,transform] duration-300 hover:border-line-strong hover:bg-surface-raised hover:shadow-[var(--shadow-card-hover)]"
          : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

/** Categorized skill / stack tag. No progress bars anywhere on this site. */
export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-line bg-surface-raised px-2.5 py-1 font-mono text-[0.75rem] leading-none text-ink-muted">
      {children}
    </span>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
};

export function ButtonLink({ href, children, variant = "ghost", external }: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-[10px] border px-3.5 py-2 text-[0.85rem] font-medium transition-colors duration-200";
  const styles =
    variant === "primary"
      ? "border-line-strong bg-surface-raised text-ink hover:border-ember/60 hover:bg-surface-hover"
      : "border-line bg-transparent text-ink-muted hover:border-line-strong hover:text-ink";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={`${base} ${styles}`}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

/** Understated inline link with an ember underline on hover. */
export function TextLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "text-ink underline decoration-line-strong underline-offset-[3px] transition-colors duration-200 hover:decoration-ember";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
