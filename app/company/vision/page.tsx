import type { Metadata } from "next";
import Link from "next/link";
import { companyVisionCopy } from "@/lib/copy/company";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Vision — Autonomous Music Businesses, Run by AI | ${siteConfig.name}`,
  description: `The platform for autonomous music operations. Our vision — artists and labels running release strategy, marketing, fans, and revenue with AI agents on ${siteConfig.name}.`,
  path: "/company/vision",
});

/**
 * Company: Vision — copy from lib/copy/company (single source for human + machine view).
 */
export default function VisionPage() {
  const c = companyVisionCopy;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-12">
        <Link
          href="/company"
          className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-4 inline-block"
        >
          ← Company
        </Link>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4">
          {c.title}
        </h1>
      </header>
      <div className="prose prose-lg max-w-none text-[var(--foreground)]">
        <p className="text-xl text-[var(--muted-foreground)] leading-relaxed mb-8">
          {c.anchor}
        </p>
        {c.paragraphs.map((p) => (
          <p key={p.slice(0, 40)} className="leading-relaxed mb-6">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
