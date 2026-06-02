import { ContentCard } from "./ContentCard";
import type { ContentEntry } from "@/lib/content-types";

/**
 * Grid of related entries shown at the foot of a content detail page.
 * Pulls from getRelatedContent() (shared-tag overlap across the whole hub).
 */
export function RelatedContent({ entries }: { entries: ContentEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-[var(--border)]">
      <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--foreground)/45 mb-6">
        Related
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {entries.map((entry) => (
          <ContentCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </section>
  );
}
