import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CONTENT_CATEGORY_LABELS, type ContentEntry } from "@/lib/content-types";
import { beatForSlug } from "@/lib/beats";
import { postCoverForSlug } from "@/lib/postCovers";

/**
 * Unified index card for any content entry (blog post, research essay,
 * tutorial). One visual language across the whole /blog hub: shadow-as-border,
 * pixel date eyebrow, font-ui title. Cards carry their editorial beat (W-26) as
 * a colored top accent + kicker (W-28's lightweight art-direction system).
 */
export function ContentCard({
  entry,
  priority = false,
}: {
  entry: ContentEntry;
  /** Eager-load + prioritize this cover (use for above-the-fold cards). */
  priority?: boolean;
}) {
  const formattedDate = new Date(entry.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const beat = beatForSlug(entry.slug);
  // Prefer a bespoke per-post illustration; fall back to the shared beat cover.
  const cover = postCoverForSlug(entry.slug) ?? beat?.cover;

  return (
    <Link
      href={`/blog/${entry.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl transition-shadow duration-200 hover:shadow-[0_0_0_1px_var(--foreground)]"
      style={{ boxShadow: "0 0 0 1px var(--border)" }}
    >
      {cover ? (
        <div
          className="relative aspect-[3/2] w-full overflow-hidden bg-(--muted)"
          // Beat-colored placeholder so the card never flashes an empty white
          // box while the (lazy) cover decodes — it reads as an intentional
          // colored block that the illustration fades over.
          style={beat ? { backgroundColor: beat.color } : undefined}
        >
          <Image
            src={cover}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {beat ? (
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1"
              style={{ backgroundColor: beat.color }}
            />
          ) : null}
        </div>
      ) : null}
      <div className={`flex flex-col flex-1 p-6 ${cover ? "pt-5" : "pt-7"}`}>
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
        className="mt-auto flex items-center justify-between pt-4"
        style={{ boxShadow: "inset 0 1px 0 0 var(--border)" }}
      >
        <span className="text-xs text-(--muted-foreground)">{entry.author}</span>
        <span className="inline-flex items-center gap-1 font-ui text-xs font-medium text-(--foreground)">
          Read
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
      </div>
    </Link>
  );
}
