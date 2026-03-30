import type { Metadata } from "next";
import Link from "next/link";
import { companyAboutCopy } from "@/lib/copy/company";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About | Company | Recoupable",
  description: companyAboutCopy.description,
  path: "/company/about",
});

export default function AboutPage() {
  const c = companyAboutCopy;

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Header */}
      <header className="mb-16">
        <Link
          href="/company"
          className="text-sm text-(--muted-foreground) hover:text-(--foreground) mb-6 inline-block transition-colors"
        >
          ← Company
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-(--foreground) mb-5">
          {c.title}
        </h1>
        <p className="text-xl text-(--muted-foreground) leading-relaxed max-w-2xl">
          {c.description}
        </p>
      </header>

      {/* Body */}
      <p className="text-lg text-(--foreground) leading-relaxed mb-16">
        {c.body}
      </p>

      {/* Founder */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="shrink-0 w-[280px] h-[280px] rounded-2xl bg-[var(--muted)] border border-[var(--border)] flex items-center justify-center">
            <span className="text-[var(--muted-foreground)] text-xs font-mono">FOUNDER PHOTO</span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-(--foreground) mb-1">
              {c.founder.name}
            </h2>
            <p className="text-sm text-(--brand) font-medium mb-5">
              {c.founder.role}
            </p>
            <p className="text-(--muted-foreground) leading-relaxed text-base">
              {c.founder.bio}
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mb-16">
        <div className="border-l-4 border-(--brand) pl-6 py-4">
          <h2 className="text-2xl font-semibold text-(--foreground) mb-4">
            Mission
          </h2>
          <p className="text-(--muted-foreground) leading-relaxed text-base">
            {c.mission}
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-(--border) pt-10">
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-3">
          <a
            href={`mailto:${c.contactEmail}`}
            className="text-(--brand) hover:underline text-sm"
          >
            {c.contactEmail}
          </a>
          <a
            href={`mailto:${c.supportEmail}`}
            className="text-(--brand) hover:underline text-sm"
          >
            {c.supportEmail}
          </a>
        </div>
        <p className="text-xs text-(--muted-foreground)">{c.legal}</p>
      </section>
    </div>
  );
}
