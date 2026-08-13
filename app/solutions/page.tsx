import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { solutionsCopy } from "@/lib/copy/solutions";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Solutions — For Labels, Artists, Distributors & Catalog Owners | ${siteConfig.name}`,
  description:
    "Purpose-built AI agents for the music business. Content creation, automated reporting, catalog valuation, deal ingestion, and more — for labels, artists, distributors, and catalog owners.",
  path: "/solutions",
});

/**
 * Solutions page — comprehensive segment-specific layout with real metrics,
 * capabilities, case studies, and segment-specific CTAs.
 *
 * Rebuilt Aug 3, 2026 from thin 4-card layout.
 */
export default function SolutionsPage() {
  const c = solutionsCopy;

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <header className="max-w-4xl mx-auto px-6 pt-24 sm:pt-32 pb-16 text-center">
        <h1
          className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] text-[var(--foreground)] mb-5"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          {c.headline}
        </h1>
        <p className="text-[clamp(1rem,1.5vw,1.2rem)] text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
          {c.description}
        </p>
      </header>

      {/* ── Aggregate Stats Strip ── */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {c.stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 rounded-lg"
              style={{
                boxShadow:
                  "0 0 0 1px color-mix(in srgb, var(--foreground) 10%, transparent)",
              }}
            >
              <div
                className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-1"
                style={{ fontFamily: "var(--font-bitmap), monospace" }}
              >
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-[var(--muted-foreground)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Segment Sections ── */}
      {c.segments.map((segment, idx) => (
        <section
          key={segment.id}
          id={segment.id}
          className={`scroll-mt-24 py-16 sm:py-20 ${
            idx % 2 === 1
              ? "bg-[color-mix(in_srgb,var(--foreground)_3%,transparent)]"
              : ""
          }`}
        >
          <div className="max-w-5xl mx-auto px-6">
            {/* Segment header */}
            <div className="max-w-2xl mb-12">
              <span className="inline-block text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
                {segment.title}
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] mb-3"
                style={{ fontFamily: "var(--font-bitmap), monospace" }}
              >
                {segment.subtitle}
              </h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                {segment.description}
              </p>
            </div>

            {/* Capability grid */}
            <div className="grid gap-4 sm:grid-cols-2 mb-10">
              {segment.capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="rounded-lg p-5 sm:p-6 transition-colors"
                  style={{
                    boxShadow:
                      "0 0 0 1px color-mix(in srgb, var(--foreground) 10%, transparent)",
                  }}
                >
                  <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-3">
                    {cap.description}
                  </p>
                  {cap.metric && (
                    <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)] text-[var(--foreground)]">
                      {cap.metric}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Social proof callout */}
            {segment.socialProof && (
              <div
                className="rounded-lg p-6 sm:p-8 mb-10"
                style={{
                  boxShadow:
                    "0 0 0 1px color-mix(in srgb, var(--foreground) 10%, transparent)",
                  background:
                    "color-mix(in srgb, var(--foreground) 3%, transparent)",
                }}
              >
                <Quote className="w-5 h-5 text-[var(--muted-foreground)] mb-3 opacity-40" />
                <blockquote className="text-[var(--foreground)] text-base sm:text-lg leading-relaxed mb-4 italic">
                  &ldquo;{segment.socialProof.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-medium text-[var(--foreground)]">
                    {segment.socialProof.source}
                  </span>
                  <span className="text-[var(--muted-foreground)]">·</span>
                  <span className="text-[var(--muted-foreground)]">
                    {segment.socialProof.metric}
                  </span>
                </div>
              </div>
            )}

            {/* Segment CTA */}
            <Link
              href={segment.cta.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)] hover:opacity-70 transition-opacity"
            >
              {segment.cta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      ))}

      {/* ── Cross-cutting: BYOA ── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] mb-3"
            style={{ fontFamily: "var(--font-bitmap), monospace" }}
          >
            {c.crossCutting.title}
          </h2>
          <p className="text-[var(--muted-foreground)] max-w-xl mx-auto mb-12">
            {c.crossCutting.description}
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {c.crossCutting.features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-lg text-left"
                style={{
                  boxShadow:
                    "0 0 0 1px color-mix(in srgb, var(--foreground) 10%, transparent)",
                }}
              >
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 sm:py-20 bg-[color-mix(in_srgb,var(--foreground)_3%,transparent)]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] mb-4"
            style={{ fontFamily: "var(--font-bitmap), monospace" }}
          >
            {c.finalCta.headline}
          </h2>
          <p className="text-[var(--muted-foreground)] mb-8 leading-relaxed">
            {c.finalCta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={c.finalCta.primary.href}
              className="inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] px-6 py-3 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {c.finalCta.primary.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={c.finalCta.secondary.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)] hover:opacity-70 transition-opacity"
            >
              {c.finalCta.secondary.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="mt-6 text-sm text-[var(--muted-foreground)]">
            Need something the platform doesn&apos;t do?{" "}
            <Link href="/build" className="underline underline-offset-4 hover:opacity-70">
              We build custom, customer-owned technology
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
