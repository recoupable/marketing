import type { Metadata } from "next";
import Link from "next/link";
import { companyAboutCopy } from "@/lib/copy/company";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `About | Company | ${siteConfig.name}`,
  description: companyAboutCopy.description,
  path: "/company/about",
});

/**
 * Company: About — copy from lib/copy/company (single source for human + machine view).
 */
export default function AboutPage() {
  const c = companyAboutCopy;

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
        <p className="text-xl text-[var(--muted-foreground)]">
          {c.description}
        </p>
      </header>
      <div className="prose prose-lg max-w-none text-[var(--foreground)] space-y-6">
        <p className="leading-relaxed">{c.body}</p>
        <p className="leading-relaxed">
          <a
            href={`mailto:${c.contactEmail}`}
            className="text-[var(--brand)] hover:underline"
          >
            {c.contactEmail}
          </a>{" "}
          ·{" "}
          <a
            href={`mailto:${c.supportEmail}`}
            className="text-[var(--brand)] hover:underline"
          >
            {c.supportEmail}
          </a>
        </p>
        <p className="text-sm text-[var(--muted-foreground)]">
          {c.legal}
        </p>
      </div>
    </div>
  );
}
