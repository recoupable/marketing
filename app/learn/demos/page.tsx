import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Demos | Learn | Recoupable",
  description:
    "See Recoupable in action. Demos and walkthroughs of agents running music operations.",
  path: "/learn/demos",
});

/**
 * Learn: Demos — links to try the product. Placeholder for future video/content.
 */
export default function DemosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-12">
        <Link
          href="/learn"
          className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-4 inline-block"
        >
          ← Learn
        </Link>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4">
          Demos
        </h1>
        <p className="text-xl text-[var(--muted-foreground)]">
          See Recoupable in action. Agents running music operations.
        </p>
      </header>
      <div className="border border-[var(--border)] rounded-lg p-6">
        <p className="text-[var(--muted-foreground)] mb-4">
          The best demo is the product itself. Try it with your own music data.
        </p>
        <Link
          href={siteConfig.appUrl}
          className="inline-block bg-[var(--foreground)] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[var(--foreground)]/90 transition-colors"
        >
          Try Recoupable
        </Link>
      </div>
    </div>
  );
}
