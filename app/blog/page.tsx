import type { Metadata } from "next";
import { getAllContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { ContentList } from "@/components/content/ContentList";
import { BlogCTA } from "@/components/blog/BlogCTA";

/**
 * SEO metadata for the unified content hub.
 */
export const metadata: Metadata = buildPageMetadata({
  title: "Blog — Research, Guides & Tutorials on AI for Music",
  description:
    "Essays, guides, and tutorials on AI agents for music — research from working with labels and catalogs, open tools, and what we learn running our own label.",
  path: "/blog",
});

/**
 * Unified content hub — one source of truth for every essay, guide, tutorial,
 * and update across all three pipelines (blog MDX, research MDX, and
 * Paragraph-synced essays). Readers filter by type; the nav can deep-link a
 * category via ?type= (e.g. "Research" → ?type=essay).
 */
export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const entries = getAllContent();

  return (
    <div className="max-w-4xl mx-auto px-4 pt-36 sm:pt-44 pb-16">
      {/* Page header */}
      <header className="mb-12">
        <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/45 mb-5">
          Research &amp; Field Notes
        </p>
        <h1 className="font-pixel text-[clamp(2.25rem,5vw,3.5rem)] tracking-tight leading-[1.05] text-[var(--foreground)] mb-5">
          The agentic music industry, in the open.
        </h1>
        <p className="text-lg leading-relaxed text-[var(--muted-foreground)] max-w-2xl">
          Essays on where music and AI are heading — plus guides and tutorials
          you can ship today. Straight from the team building the agent
          infrastructure and running our own label.
        </p>
        <p className="mt-6 font-pixel text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/35">
          {entries.length} pieces · research, guides &amp; tutorials
        </p>
      </header>

      {entries.length > 0 ? (
        <ContentList entries={entries} initialType={type} />
      ) : (
        <p className="text-[var(--muted-foreground)]">
          Nothing published yet. Check back soon.
        </p>
      )}

      {/* Email capture */}
      <BlogCTA />
    </div>
  );
}
