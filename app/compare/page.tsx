import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, Minus, ArrowRight } from "lucide-react";
import { compareCopy, type SupportLevel } from "@/lib/copy/compare";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = buildPageMetadata({
  title: `Why Recoup? — Compare AI Music Agents vs Agencies & Generic AI | ${siteConfig.name}`,
  description:
    "See how Recoup's purpose-built music agents compare to hiring staff, creative agencies, and generic AI like ChatGPT. Cost comparisons drawn from real usage.",
  path: "/compare",
});

/* ── support-level icon ── */
function SupportIcon({ level }: { level: SupportLevel }) {
  if (level === "full")
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-400">
        <Check className="w-3.5 h-3.5" />
      </span>
    );
  if (level === "partial")
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/15 text-amber-400">
        <Minus className="w-3.5 h-3.5" />
      </span>
    );
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10 text-red-400/70">
      <X className="w-3.5 h-3.5" />
    </span>
  );
}

export default function ComparePage() {
  const c = compareCopy;

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
      {/* ── Hero ── */}
      <header className="text-center mb-20">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)] mb-6">
          {c.title}
        </h1>
        <p className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
          {c.description}
        </p>
      </header>

      {/* ── Comparison Grid ── */}
      <section className="mb-24">
        {/* column headers — desktop */}
        <div className="hidden md:grid grid-cols-5 gap-3 mb-4 text-xs font-medium uppercase tracking-wider text-neutral-500 px-4">
          <div>Capability</div>
          {c.columns.map((col) => (
            <div key={col} className="text-center">
              {col}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {c.rows.map((row) => (
            <div
              key={row.capability}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-colors"
            >
              {/* Desktop row */}
              <div className="hidden md:grid grid-cols-5 gap-3 items-center px-6 py-5">
                <div className="font-medium text-[var(--foreground)]">
                  {row.capability}
                </div>
                {(["recoup", "humans", "agency", "genericAI"] as const).map(
                  (key) => (
                    <div key={key} className="flex flex-col items-center gap-1.5 text-center">
                      <SupportIcon level={row[key].level} />
                      <span className="text-xs text-neutral-400 leading-tight max-w-[180px]">
                        {row[key].note}
                      </span>
                    </div>
                  )
                )}
              </div>

              {/* Mobile card */}
              <div className="md:hidden p-5">
                <h3 className="font-medium text-[var(--foreground)] mb-4">
                  {row.capability}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {(["recoup", "humans", "agency", "genericAI"] as const).map(
                    (key, i) => (
                      <div key={key} className="flex items-start gap-2">
                        <SupportIcon level={row[key].level} />
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-neutral-500 mb-0.5">
                            {c.columns[i]}
                          </div>
                          <div className="text-xs text-neutral-400 leading-tight">
                            {row[key].note}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Cost Comparison ── */}
      <section className="mb-24">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-3 text-center">
          {c.costTitle}
        </h2>
        <p className="text-[var(--muted-foreground)] text-center mb-12 max-w-xl mx-auto">
          {c.costDescription}
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          {c.costs.map((cost) => (
            <div
              key={cost.label}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 hover:border-white/[0.12] transition-colors"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                {cost.source}
              </span>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mt-3 mb-2">
                {cost.label}
              </h3>
              <div className="text-3xl font-bold text-red-400/80 line-through mb-1">
                {cost.traditional}
              </div>
              <div className="text-emerald-400 font-medium mb-4">
                {cost.recoup}
              </div>
              <p className="text-sm text-neutral-400">{cost.savings}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ChatGPT Objection ── */}
      <section className="mb-24">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] mb-4">
            {c.chatgptTitle}
          </h2>
          <p className="text-[var(--muted-foreground)] leading-relaxed mb-8 max-w-2xl">
            {c.chatgptDescription}
          </p>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
            {c.chatgptPoints.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <span className="mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500/10 text-red-400/70 flex-shrink-0">
                  <X className="w-3 h-3" />
                </span>
                <span className="text-sm text-neutral-300">{point}</span>
              </div>
            ))}
          </div>

          <p className="text-[var(--foreground)] font-medium text-lg">
            {c.chatgptPunchline}
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={c.ctaPrimary.href}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors"
          >
            {c.ctaPrimary.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={c.ctaSecondary.href}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/[0.12] text-[var(--foreground)] font-medium text-sm hover:border-white/[0.25] transition-colors"
          >
            {c.ctaSecondary.label}
          </Link>
        </div>
      </section>
    </div>
  );
}
