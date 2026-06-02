import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllResearchEntries } from "@/lib/research";
import { buildPageMetadata } from "@/lib/seo";
import { ResearchPostCard } from "@/components/research/ResearchPostCard";

export const metadata: Metadata = buildPageMetadata({
  title: "Research — AI Agents, Open Labels & the Agentic Music Industry",
  description:
    "Long-form research from Recoup on AI agents, agent harnesses, open labels, and where the agentic music industry is headed.",
  path: "/research",
});

/** ISR — Paragraph-synced essays revalidate hourly. */
export const revalidate = 3600;

/**
 * Research index — lists every essay (Paragraph-synced + in-repo MDX),
 * newest first.
 */
export default function ResearchIndexPage() {
  const entries = getAllResearchEntries();

  return (
    <div className="max-w-5xl mx-auto px-4 pt-36 sm:pt-44 pb-16">
      <header className="mb-12 max-w-2xl">
        <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--foreground)/45 mb-5">
          Research
        </p>
        <h1 className="font-pixel text-[clamp(2.25rem,5vw,3.5rem)] tracking-tight leading-[1.05] text-(--foreground) mb-4">
          The agentic music industry, in the open.
        </h1>
        <p className="text-lg text-(--muted-foreground)">
          Where the work is going — AI agents, agent harnesses, open labels, and
          what we learn building infrastructure for music.
        </p>
        <Link
          href="/blog"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-(--foreground) transition-colors hover:text-(--brand)"
        >
          Looking for tactical guides? Read the blog
          <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      {entries.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {entries.map((entry) => (
            <ResearchPostCard key={entry.slug} entry={entry} />
          ))}
        </div>
      ) : (
        <p className="text-(--muted-foreground)">No research published yet.</p>
      )}
    </div>
  );
}
