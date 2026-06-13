import Link from "next/link";

/**
 * Stats plaques (W-07 / W-17) — borrowed from Every's consulting page
 * ("$175B+ AUM / 16K+ stars" thin-bordered boxes) and pm-world's inventory
 * card. Concrete, verifiable numbers only; each plaque can link to its proof.
 */

export interface StatItem {
  value: string;
  label: string;
  href?: string;
  external?: boolean;
}

export function StatsStrip({ items }: { items: readonly StatItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="stats-strip">
      {items.map((item) => {
        const body = (
          <>
            <p className="font-pixel text-[clamp(1.5rem,3vw,2.125rem)] tracking-tight text-(--accent) leading-none mb-2">
              {item.value}
            </p>
            <p className="font-ui text-[11px] text-(--foreground)/45 uppercase tracking-[0.14em] leading-snug">
              {item.label}
            </p>
          </>
        );
        const className =
          "flex flex-col items-start rounded-xl p-5 bg-(--background) transition-colors";
        const shadow = { boxShadow: "0 0 0 1px var(--border)" };

        if (item.href) {
          return item.external ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${className} hover:bg-(--muted)/40`}
              style={shadow}
            >
              {body}
            </a>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              className={`${className} hover:bg-(--muted)/40`}
              style={shadow}
            >
              {body}
            </Link>
          );
        }
        return (
          <div key={item.label} className={className} style={shadow}>
            {body}
          </div>
        );
      })}
    </div>
  );
}
