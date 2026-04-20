import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Use Cases | Learn | Recoup",
  description:
    "Real examples of running music operations with agents. Release automation, marketing, catalog management.",
  path: "/learn/use-cases",
});

/**
 * Learn: Use cases — examples and patterns. Placeholder for future content.
 */
export default function UseCasesPage() {
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
          Use Cases
        </h1>
        <p className="text-xl text-[var(--muted-foreground)]">
          Real examples of running music operations with agents. Release
          automation, marketing actions, catalog optimization.
        </p>
      </header>
      <p className="text-[var(--muted-foreground)]">
        Use case stories and playbooks will be published here. For now, see the{" "}
        <Link href="/blog" className="text-[var(--brand)] hover:underline">
          Blog
        </Link>{" "}
        for insights and updates.
      </p>
    </div>
  );
}
