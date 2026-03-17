import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Playbooks | Learn | Recoupable",
  description:
    "Step-by-step playbooks for music operations with agents. Release strategy, content, growth.",
  path: "/learn/playbooks",
});

/**
 * Learn: Playbooks — step-by-step guides. Placeholder for future content.
 */
export default function PlaybooksPage() {
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
          Playbooks
        </h1>
        <p className="text-xl text-[var(--muted-foreground)]">
          Step-by-step guides for running music operations with agents.
        </p>
      </header>
      <p className="text-[var(--muted-foreground)]">
        Playbooks will be published here. See the{" "}
        <Link href="/blog" className="text-[var(--brand)] hover:underline">
          Blog
        </Link>{" "}
        for tutorials and how-tos in the meantime.
      </p>
    </div>
  );
}
