import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CONTENT_CATEGORY_LABELS, type ContentEntry } from "@/lib/content-types";
import { beatForSlug } from "@/lib/beats";

/**
 * Unified index card for any content entry (blog post, research essay,
 * tutorial). One visual language across the whole /blog hub: shadow-as-border,
 * pixel date eyebrow, font-ui title. Cards carry their editorial beat (W-26) as
 * a colored top accent + kicker (W-28's lightweight art-direction system).
 */
export function ContentCard({ entry }: { entry: ContentEntry }) {
  const formattedDate = new Date(entry.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const beat = beatForSlug(entry.slug);

  return (
    <Link
      href={`/blog/${entry.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl p-6 pt-7 transition-shadow duration-200 hover:shadow-[0_0_0_1px_var(--foreground)]"
      style={{ boxShadow: "0 0 0 1px var(--border)" }}
    >
      {beat ? (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-1"
          style={{ backgroundColor: beat.color }}
        />
      ) : null}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {beat ? (
          <span
            className="font-pixel text-[10px] uppercase tracking-[0.16em]"
            style={{ color: beat.color }}
          >
            {beat.name}
          </span>
        ) : null}
        {beat ? <span aria-hidden className="text-(--foreground)/25">·</span> : null}
        <span className="font-pixel text-[10px] uppercase tracking-[0.18em] text-(--foreground)/45">
          {formattedDate}
        </span>
        <span aria-hidden className="text-(--foreground)/25">
          ·
        </span>
        <span className="text-xs uppercase tracking-wide text-(--muted-foreground)">
          {CONTENT_CATEGORY_LABELS[entry.category]}
        </span>
      </div>

      <h2 className="font-ui text-xl font-semibold leading-snug tracking-tight text-(--foreground)">
        {entry.title}
      </h2>

      <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-(--foreground)/65">
        {entry.excerpt}
      </p>

      <div
        className="mt-6 flex items-center justify-between pt-4"
        style={{ boxShadow: "inset 0 1px 0 0 var(--border)" }}
      >
        <span className="text-xs text-(--muted-foreground)">{entry.author}</span>
        <span className="inline-flex items-center gap-1 font-ui text-xs font-medium text-(--foreground)">
          Read
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
