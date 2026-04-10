import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { nav } from "@/lib/nav";

export const metadata: Metadata = buildPageMetadata({
  title: "Learn | Recoupable",
  description:
    "Blog, use cases, playbooks, and demos. How to run your music business with agents.",
  path: "/learn",
});

/**
 * Learn index — entry point to Blog, Use Cases, Playbooks, Demos.
 */
export default function LearnPage() {
  const links = nav.learn.items;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4">
          Learn
        </h1>
        <p className="text-xl text-[var(--muted-foreground)]">
          Blog, use cases, playbooks, and demos. How to run your music
          business with agents.
        </p>
      </header>

      <div className="grid gap-4">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block border border-[var(--border)] rounded-lg p-6 hover:border-[var(--brand)] transition-colors"
          >
            <span className="font-medium text-[var(--foreground)]">
              {item.label}
            </span>
            <span className="ml-2 text-[var(--muted-foreground)]">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
