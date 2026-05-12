import type { Metadata } from "next";
import Link from "next/link";
import { solutionsCopy } from "@/lib/copy/solutions";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Solutions — For Artists, Labels & Distributors | ${siteConfig.name}`,
  description:
    "AI-powered solutions for artists, labels, distributors, and catalog owners. One system. Agents run your music operations — strategy, content, and fans.",
  path: "/solutions",
});

/**
 * Solutions page — copy from lib/copy/solutions (single source for human + machine view).
 */
export default function SolutionsPage() {
  const c = solutionsCopy;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4">
          {c.title}
        </h1>
        <p className="text-xl text-[var(--muted-foreground)]">
          {c.description}
        </p>
      </header>

      <div className="space-y-12">
        {c.segments.map((segment) => (
          <section
            key={segment.id}
            id={segment.id}
            className="scroll-mt-24 border border-[var(--border)] rounded-lg p-6 hover:border-[var(--brand)] transition-colors"
          >
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
              {segment.title}
            </h2>
            <p className="font-medium text-[var(--muted-foreground)] mb-3">
              {segment.summary}
            </p>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              {segment.description}
            </p>
          </section>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href={c.ctaHref}
          className="inline-block bg-[var(--foreground)] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[var(--foreground)]/90 transition-colors"
        >
          {c.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
