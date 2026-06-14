import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { diligenceCopy } from "@/lib/copy/diligence";
import { StatsStrip } from "@/components/marketing/StatsStrip";

export const metadata: Metadata = buildPageMetadata({
  title: "Catalog Diligence — A Sample AI Report for Music Buyers",
  description:
    "See what Recoup's catalog-diligence workflow produces from a data room: income summary, top tracks, decay, risk flags, and an IC-memo draft. Redacted sample.",
  path: "/diligence",
});

/**
 * Diligence sample page (W-15) — the visible artifact for the catalog buyer.
 * Linked from the homepage §10 testimonial CTA, the shelf marketplace teaser,
 * and /partners catalog segment.
 */
export default function DiligencePage() {
  const c = diligenceCopy;

  return (
    <div className="bg-(--background) text-(--foreground)">
      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-12 sm:pb-16">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10 text-center">
          <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--foreground)/45 mb-6">
            Catalog diligence
          </p>
          <h1 className="font-pixel text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.04] tracking-tight mb-6">
            {c.title}
          </h1>
          <p className="text-(--foreground)/60 text-[clamp(1.0625rem,1.5vw,1.25rem)] font-ui leading-[1.55] max-w-[640px] mx-auto">
            {c.subtitle}
          </p>
        </div>
      </section>

      {/* Sample report */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-[920px] mx-auto px-6 sm:px-10">
          <div
            className="rounded-2xl bg-(--background) p-6 sm:p-10"
            style={{ boxShadow: "0 0 0 1px var(--border)" }}
          >
            {/* Sample banner */}
            <div className="flex items-center gap-2 mb-8">
              <span className="font-pixel text-[10px] uppercase tracking-[0.16em] text-(--foreground)/40 bg-(--muted)/60 px-2.5 py-1 rounded">
                Sample · redacted
              </span>
              <span className="font-mono text-[11px] text-(--foreground)/35">
                catalog-value-estimator
              </span>
            </div>

            {/* Income summary */}
            <p className="font-ui text-[11px] font-semibold text-(--foreground)/40 uppercase tracking-[0.18em] mb-4">
              Income summary
            </p>
            <StatsStrip items={c.summary} />

            {/* Top tracks */}
            <p className="font-ui text-[11px] font-semibold text-(--foreground)/40 uppercase tracking-[0.18em] mt-12 mb-4">
              Top tracks by TTM income
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-(--border)">
                    <th className="font-ui text-[11px] font-semibold text-(--foreground)/40 uppercase tracking-[0.14em] py-2 pr-4">Track</th>
                    <th className="font-ui text-[11px] font-semibold text-(--foreground)/40 uppercase tracking-[0.14em] py-2 pr-4">Year</th>
                    <th className="font-ui text-[11px] font-semibold text-(--foreground)/40 uppercase tracking-[0.14em] py-2 pr-4">TTM</th>
                    <th className="font-ui text-[11px] font-semibold text-(--foreground)/40 uppercase tracking-[0.14em] py-2">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {c.topTracks.map((t) => (
                    <tr key={t.track} className="border-b border-(--border)">
                      <td className="py-2.5 pr-4 text-[14px] text-(--foreground)/80">{t.track}</td>
                      <td className="py-2.5 pr-4 text-[14px] text-(--foreground)/55 font-mono">{t.year}</td>
                      <td className="py-2.5 pr-4 text-[14px] text-(--foreground)/80 font-mono">{t.ttm}</td>
                      <td className="py-2.5 text-[14px] text-(--foreground)/55 font-mono">{t.share}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Flags */}
            <p className="font-ui text-[11px] font-semibold text-(--foreground)/40 uppercase tracking-[0.18em] mt-12 mb-4">
              Auto-surfaced flags
            </p>
            <div className="space-y-3">
              {c.flags.map((f) => (
                <div key={f.body} className="flex gap-3 items-start">
                  <span
                    className={`shrink-0 mt-0.5 font-ui text-[10px] font-semibold uppercase tracking-[0.12em] px-2 py-0.5 rounded ${
                      f.level === "Positive"
                        ? "bg-green-500/15 text-green-700 dark:text-green-400"
                        : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                    }`}
                  >
                    {f.level}
                  </span>
                  <p className="text-[14px] text-(--foreground)/65 leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>

            {/* IC memo excerpt */}
            <p className="font-ui text-[11px] font-semibold text-(--foreground)/40 uppercase tracking-[0.18em] mt-12 mb-4">
              IC memo draft (excerpt)
            </p>
            <blockquote className="text-[15px] text-(--foreground)/75 leading-relaxed border-l-2 border-(--foreground)/20 pl-5 italic">
              {c.memoExcerpt}
            </blockquote>
          </div>

          <p className="text-center text-[12px] text-(--foreground)/40 mt-5">
            Generated by the catalog-deals workflow.{" "}
            <a
              href={c.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui font-semibold text-(--foreground)/70 hover:text-(--foreground) transition-colors inline-flex items-center gap-1"
            >
              See the skill <ArrowUpRight size={12} />
            </a>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 sm:py-36 overflow-hidden dark-section-cta">
        <div className="max-w-[760px] mx-auto px-6 text-center relative z-10">
          <h2 className="font-pixel text-[clamp(2rem,5vw,3.5rem)] tracking-tight leading-[1.02] text-white mb-9">
            Run it on a real catalog.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/consulting#contact"
              className="cta-pulse font-ui font-semibold bg-white text-[#0a0a0a] px-9 py-4 rounded-full text-[15px] hover:bg-white/90 transition-all duration-300 hover:-translate-y-0.5"
            >
              Talk to us
            </Link>
            <Link
              href="/skills#plugins"
              className="font-ui font-medium text-sm text-white/45 hover:text-white/80 transition-colors flex items-center gap-1.5"
            >
              See the catalog-deals plugin <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
