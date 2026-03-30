import type { Metadata } from "next";
import Link from "next/link";
import { solutionsCopy } from "@/lib/copy/solutions";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Solutions | Recoupable",
  description: solutionsCopy.description,
  path: "/solutions",
});

const segmentAccents: Record<string, { border: string; bg: string; badge: string }> = {
  artists: {
    border: "border-l-[#345A5D]",
    bg: "bg-[#345A5D]/5",
    badge: "bg-[#345A5D]/10 text-[#345A5D]",
  },
  labels: {
    border: "border-l-[#6B4C9A]",
    bg: "bg-[#6B4C9A]/5",
    badge: "bg-[#6B4C9A]/10 text-[#6B4C9A]",
  },
  distributors: {
    border: "border-l-[#2D7D9A]",
    bg: "bg-[#2D7D9A]/5",
    badge: "bg-[#2D7D9A]/10 text-[#2D7D9A]",
  },
  "catalog-owners": {
    border: "border-l-[#8B6914]",
    bg: "bg-[#8B6914]/5",
    badge: "bg-[#8B6914]/10 text-[#8B6914]",
  },
};

export default function SolutionsPage() {
  const c = solutionsCopy;

  return (
    <div className="w-full">
      {/* ── Hero ── */}
      <header className="max-w-5xl mx-auto px-4 pt-20 pb-8 text-center">
        <p className="text-sm font-medium tracking-widest uppercase text-[var(--brand)] mb-4">
          Solutions
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)] mb-6 max-w-3xl mx-auto leading-[1.1]">
          Built for how music actually works
        </h1>
        <p className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
          {c.description}
        </p>
      </header>

      {/* ── Personas Image ── */}
      <div className="max-w-4xl mx-auto px-4 mb-20">
        <div className="relative rounded-xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[var(--muted)] aspect-[2/1] flex items-center justify-center">
          <span className="text-[var(--muted-foreground)] text-sm font-mono">ARTIST / LABEL / DEVELOPER</span>
        </div>
      </div>

      {/* ── Segment Cards ── */}
      <div className="max-w-4xl mx-auto px-4 space-y-8 mb-24">
        {c.segments.map((segment) => {
          const accent = segmentAccents[segment.id] ?? {
            border: "border-l-[var(--brand)]",
            bg: "bg-[var(--brand)]/5",
            badge: "bg-[var(--brand)]/10 text-[var(--brand)]",
          };

          return (
            <section
              key={segment.id}
              id={segment.id}
              className={`
                scroll-mt-24 rounded-xl border border-[var(--border)] border-l-4
                ${accent.border}
                p-6 sm:p-8
                transition-all duration-300
                hover:shadow-lg hover:shadow-[var(--foreground)]/5
                hover:-translate-y-0.5
              `}
            >
              {/* Header row */}
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-[var(--foreground)]">
                  {segment.title}
                </h2>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${accent.badge}`}>
                  {segment.summary}
                </span>
              </div>

              {/* Description */}
              <p className="text-[var(--muted-foreground)] leading-relaxed mb-5">
                {segment.description}
              </p>

              {/* Pain point */}
              <div className={`rounded-lg p-4 mb-5 ${accent.bg}`}>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  <span className="font-semibold text-[var(--foreground)]">The pain: </span>
                  {segment.pain}
                </p>
              </div>

              {/* Objection / Answer callout */}
              <div className="rounded-lg border border-[var(--border)] bg-[var(--muted)]/40 p-5">
                <p className="text-sm font-semibold text-[var(--foreground)] mb-2 flex items-start gap-2">
                  <span className="text-[var(--brand)] shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                      <text x="8" y="12" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">?</text>
                    </svg>
                  </span>
                  &ldquo;{segment.objection}&rdquo;
                </p>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed pl-6">
                  {segment.answer}
                </p>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── CTA ── */}
      <div className="py-20 text-center border-t border-[var(--border)]">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-4">
          One system. Every team.
        </h2>
        <p className="text-[var(--muted-foreground)] mb-8 text-lg max-w-lg mx-auto">
          Stop stitching together tools. Start running your music business with agents.
        </p>
        <Link
          href={c.ctaHref}
          className="inline-block bg-[var(--brand)] text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[var(--brand)]/20"
        >
          {c.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
