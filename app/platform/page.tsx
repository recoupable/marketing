import type { Metadata } from "next";
import Link from "next/link";
import { platformCopy } from "@/lib/copy/platform";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Platform — Agents, Workflows & API for Music Ops | ${siteConfig.name}`,
  description:
    "Agents, workflows, integrations, data, and API — one system that runs your music business. Not a chatbot. Not a feature bundle. Music-first infrastructure.",
  path: "/platform",
});

/**
 * Platform page — copy from lib/copy/platform (single source for human + machine view).
 */
export default function PlatformPage() {
  const c = platformCopy;

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

      <div className="space-y-16">
        {c.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-24 border-b border-[var(--border)] pb-16 last:border-0"
          >
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-3">
              {section.title}
            </h2>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              {section.description}
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
