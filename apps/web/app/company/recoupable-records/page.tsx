import type { Metadata } from "next";
import Link from "next/link";
import { companyRecoupableRecordsCopy } from "@/lib/copy/company";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Recoupable Records | Company | Recoupable",
  description: companyRecoupableRecordsCopy.subtitle,
  path: "/company/recoupable-records",
});

export default function RecoupableRecordsPage() {
  const c = companyRecoupableRecordsCopy;

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Header */}
      <header className="mb-16">
        <Link
          href="/company"
          className="text-sm text-(--muted-foreground) hover:text-(--foreground) mb-6 inline-block transition-colors"
        >
          ← Company
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-(--foreground) mb-4">
          {c.title}
        </h1>
        <p className="text-xl md:text-2xl text-(--muted-foreground) leading-relaxed max-w-3xl">
          {c.subtitle}
        </p>
      </header>

      {/* Body */}
      <p className="text-lg text-(--foreground) leading-relaxed mb-20 max-w-3xl">
        {c.body}
      </p>

      {/* Proof — Gatsby Grace */}
      <section className="mb-20">
        <div className="rounded-2xl border border-(--border) bg-(--muted)/30 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image placeholder */}
            <div className="relative aspect-square lg:aspect-auto bg-[var(--muted)] flex items-center justify-center min-h-[300px]">
              <span className="text-[var(--muted-foreground)] text-sm font-mono">GATSBY GRACE</span>
            </div>
            {/* Text side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <p className="text-xs font-mono tracking-widest uppercase text-(--brand) mb-3">
                Case Study
              </p>
              <h2 className="text-3xl font-bold text-(--foreground) mb-4">
                {c.proof.headline}
              </h2>
              <p className="text-(--muted-foreground) leading-relaxed text-base">
                {c.proof.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content output — 22 videos */}
      <section className="mb-20">
        <div className="rounded-2xl border border-(--border) overflow-hidden">
          <div className="w-full aspect-[2/1] bg-[var(--muted)] flex items-center justify-center">
            <span className="text-[var(--muted-foreground)] text-sm font-mono">22 VIDEOS — CONTENT OUTPUT</span>
          </div>
          <div className="px-8 py-5 border-t border-(--border) bg-(--muted)/20">
            <p className="text-sm text-(--muted-foreground)">
              22 videos. One session. Zero manual editing.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="mb-16 max-w-3xl">
        <div className="border-l-4 border-(--brand) pl-6 py-2">
          <p className="text-(--muted-foreground) leading-relaxed text-base">
            {c.vision}
          </p>
        </div>
      </section>

      {/* Footer tagline */}
      <footer className="border-t border-(--border) pt-10">
        <p className="text-xl font-semibold text-(--foreground)">
          {c.footer}
        </p>
      </footer>
    </div>
  );
}
