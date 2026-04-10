import type { Metadata } from "next";
import Link from "next/link";
import { companyRecoupableRecordsCopy } from "@/lib/copy/company";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Recoupable Records | Company | Recoupable",
  description: companyRecoupableRecordsCopy.subtitle,
  path: "/company/recoupable-records",
});

/**
 * Company: Recoupable Records — copy from lib/copy/company (single source for human + machine view).
 */
export default function RecoupableRecordsPage() {
  const c = companyRecoupableRecordsCopy;

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
          {c.subtitle}
        </p>
      </header>
      <div className="prose prose-lg max-w-none text-[var(--foreground)]">
        <p className="leading-relaxed mb-6">{c.body}</p>
        <p className="leading-relaxed text-[var(--muted-foreground)]">
          {c.footer}
        </p>
      </div>
    </div>
  );
}
