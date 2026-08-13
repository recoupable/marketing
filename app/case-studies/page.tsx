import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingDown, Clock, Users } from "lucide-react";
import { caseStudiesCopy } from "@/lib/copy/case-studies";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = buildPageMetadata({
  title: `Customer Stories — Real Results from Real Labels | ${siteConfig.name}`,
  description:
    "See how Rostrum Records, Fat Beats, and Parlophone use Recoup to replace agencies, automate reporting, and create content in minutes instead of weeks.",
  path: "/case-studies",
});

/* ── Highlight icon per case study ── */
const HIGHLIGHT_ICONS: Record<string, typeof TrendingDown> = {
  rostrum: TrendingDown,
  fatbeats: Clock,
  parlophone: Users,
};

export default function CaseStudiesPage() {
  const c = caseStudiesCopy;

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
      {/* ── Hero ── */}
      <header className="text-center mb-16 sm:mb-24">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)] mb-6">
          {c.title}
        </h1>
        <p className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
          {c.description}
        </p>
      </header>

      {/* ── Aggregate Stats Strip ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-24">
        {c.aggStats.map((stat) => (
          <div
            key={stat.label}
            className="text-center rounded-xl border border-[var(--border)] bg-[var(--muted)] p-6 sm:p-8"
          >
            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-[var(--muted-foreground)] font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Case Studies ── */}
      <div className="space-y-12 sm:space-y-16">
        {c.studies.map((study) => {
          const Icon = HIGHLIGHT_ICONS[study.id] ?? TrendingDown;

          return (
            <article
              key={study.id}
              className="rounded-2xl border border-[var(--border)] overflow-hidden hover:border-[var(--foreground)]/20 transition-colors"
            >
              {/* Header */}
              <div className="p-6 sm:p-10 pb-0 sm:pb-0">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
                      {study.segment}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
                      {study.company}
                    </h2>
                  </div>
                  {/* Highlight badge */}
                  <div className="shrink-0 flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2">
                    <Icon className="w-4 h-4 text-emerald-400" />
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-400 leading-tight">
                        {study.highlight.value}
                      </div>
                      <div className="text-[10px] text-emerald-400/70 leading-tight whitespace-nowrap">
                        {study.highlight.label}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-lg sm:text-xl font-medium text-[var(--foreground)]/80 mb-6">
                  {study.headline}
                </p>
              </div>

              {/* Challenge + Solution */}
              <div className="grid md:grid-cols-2 gap-6 px-6 sm:px-10 pb-6 sm:pb-8">
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
                    The Challenge
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {study.challenge}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
                    The Solution
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {study.solution}
                  </p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="border-t border-[var(--border)] bg-[var(--muted)]">
                <div className="grid grid-cols-2 md:grid-cols-4">
                  {study.metrics.map((metric, i) => (
                    <div
                      key={metric.label}
                      className={`p-5 sm:p-6 ${i > 0 ? "border-l border-[var(--border)]" : ""} ${i >= 2 ? "border-t md:border-t-0 border-[var(--border)]" : ""}`}
                    >
                      <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
                        {metric.label}
                      </div>
                      <div className="text-xs text-[var(--muted-foreground)]/60 line-through mb-1">
                        {metric.before}
                      </div>
                      <div className="text-sm font-semibold text-[var(--foreground)]">
                        {metric.after}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote */}
              {study.quote && (
                <div className="border-t border-[var(--border)] px-6 sm:px-10 py-6 sm:py-8">
                  <blockquote className="text-sm sm:text-base italic text-[var(--foreground)]/70 leading-relaxed">
                    &ldquo;{study.quote.text}&rdquo;
                  </blockquote>
                  <cite className="mt-3 block text-xs text-[var(--muted-foreground)] not-italic font-medium">
                    — {study.quote.attribution}
                  </cite>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* ── Logos ── */}
      <div className="mt-16 sm:mt-24 text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)] mb-6">
          Trusted by labels and distributors worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[var(--foreground)]/20 text-lg font-bold tracking-wide">
          {["Atlantic", "Rostrum", "300", "Warner", "Parlophone", "Fat Beats"].map(
            (name) => (
              <span key={name}>{name}</span>
            ),
          )}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="mt-16 sm:mt-24 text-center rounded-2xl border border-[var(--border)] bg-[var(--muted)] p-10 sm:p-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] mb-4">
          {c.cta.headline}
        </h2>
        <p className="text-[var(--muted-foreground)] mb-8 max-w-lg mx-auto">
          {c.cta.description}
        </p>
        <Link
          href={c.cta.buttonHref}
          className="inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {c.cta.buttonLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
