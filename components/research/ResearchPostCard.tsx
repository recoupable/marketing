import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ResearchEntry } from "@/lib/research";

/**
 * Index card for a research essay. Links to /research/[slug] regardless of
 * whether the body is Paragraph-synced or in-repo MDX.
 */
export function ResearchPostCard({ entry }: { entry: ResearchEntry }) {
  const formattedDate = new Date(entry.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/research/${entry.slug}`}
      className="group flex flex-col rounded-2xl p-6 transition-shadow duration-200 hover:shadow-[0_0_0_1px_var(--foreground)]"
      style={{ boxShadow: "0 0 0 1px var(--border)" }}
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="font-pixel text-[10px] uppercase tracking-[0.18em] text-(--foreground)/45">
          {formattedDate}
        </span>
        {entry.tags[0] ? (
          <>
            <span aria-hidden className="text-(--foreground)/25">
              ·
            </span>
            <span className="text-xs text-(--muted-foreground)">
              {entry.tags[0]}
            </span>
          </>
        ) : null}
      </div>

      <h2 className="font-ui text-xl font-semibold leading-snug tracking-tight text-(--foreground)">
        {entry.title}
      </h2>

      <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-(--foreground)/65">
        {entry.excerpt}
      </p>

      <div className="mt-6 flex items-center justify-between pt-4" style={{ boxShadow: "inset 0 1px 0 0 var(--border)" }}>
        <span className="text-xs text-(--muted-foreground)">{entry.author}</span>
        <span className="inline-flex items-center gap-1 font-ui text-xs font-medium text-(--foreground)">
          Read
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
