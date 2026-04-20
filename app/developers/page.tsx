import type { Metadata } from "next";
import Link from "next/link";
import { developersCopy } from "@/lib/copy/developers";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Developers | Recoup",
  description: developersCopy.description,
  path: "/developers",
});

/**
 * Developers page — copy from lib/copy/developers (single source for human + machine view).
 */
export default function DevelopersPage() {
  const c = developersCopy;

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
        {c.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-3">
              {section.title}
            </h2>
            <p className="text-[var(--muted-foreground)] mb-4">
              {section.description}
            </p>
            {"linkLabel" in section && section.linkLabel && section.linkHref && (
              <Link
                href={section.linkHref}
                className="text-sm text-[var(--brand)] hover:underline"
                target={section.id === "docs" ? "_blank" : undefined}
                rel={section.id === "docs" ? "noopener noreferrer" : undefined}
              >
                {section.linkLabel} →
              </Link>
            )}
          </section>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href={c.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[var(--foreground)] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[var(--foreground)]/90 transition-colors"
        >
          {c.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
