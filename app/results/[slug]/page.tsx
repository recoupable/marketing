"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getCaseStudy, caseStudies } from "@/lib/copy/case-studies";

/* ── reveal-on-scroll ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          io.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return {
    ref,
    cls: `transition-all duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] ${
      v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`,
  };
}

/* ── stat card ── */
function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
        {value}
      </div>
      <div className="text-sm text-neutral-400 mt-1">{label}</div>
    </div>
  );
}

/* ── solution step ── */
function SolutionStep({
  step,
  index,
}: {
  step: { title: string; description: string };
  index: number;
}) {
  const { ref, cls } = useReveal();
  return (
    <div
      ref={ref}
      className={cls}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-sm font-medium text-neutral-400">
          {index + 1}
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-1">
            {step.title}
          </h4>
          <p className="text-neutral-400 leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── page ── */
export default function CaseStudyPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const study = getCaseStudy(slug);

  const heroReveal = useReveal();
  const challengeReveal = useReveal();
  const resultsReveal = useReveal();
  const quoteReveal = useReveal();
  const unlockReveal = useReveal();
  const ctaReveal = useReveal();

  if (!study) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case study not found</h1>
          <Link
            href="/results"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            ← Back to Results
          </Link>
        </div>
      </main>
    );
  }

  /* find next case study for navigation */
  const currentIdx = caseStudies.findIndex((cs) => cs.slug === slug);
  const nextStudy = caseStudies[(currentIdx + 1) % caseStudies.length];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Back link */}
      <div className="pt-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/results"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Results
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-8 pb-16 px-6">
        <div
          ref={heroReveal.ref}
          className={`max-w-3xl mx-auto ${heroReveal.cls}`}
        >
          <span className="inline-block text-xs font-medium tracking-wider uppercase text-neutral-500 mb-4">
            {study.tag}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {study.hero.headline}
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 mb-12 max-w-2xl">
            {study.hero.subheadline}
          </p>
          <div className="grid grid-cols-3 gap-6 py-8 border-t border-b border-white/[0.06]">
            {study.hero.stats.map((s) => (
              <HeroStat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="pb-20 px-6">
        <div
          ref={challengeReveal.ref}
          className={`max-w-3xl mx-auto ${challengeReveal.cls}`}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
            {study.challenge.headline}
          </h2>
          <div className="space-y-4">
            {study.challenge.paragraphs.map((p, i) => (
              <p key={i} className="text-neutral-400 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-8">
            {study.solution.headline}
          </h2>
          <div className="space-y-8">
            {study.solution.steps.map((step, i) => (
              <SolutionStep key={step.title} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Results table */}
      <section className="pb-20 px-6">
        <div
          ref={resultsReveal.ref}
          className={`max-w-3xl mx-auto ${resultsReveal.cls}`}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-8">
            {study.results.headline}
          </h2>
          <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
            {/* header */}
            <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-white/[0.02] text-xs font-medium tracking-wider uppercase text-neutral-500">
              <div>Metric</div>
              <div>Before Recoup</div>
              <div>After Recoup</div>
            </div>
            {/* rows */}
            {study.results.rows.map((row, i) => (
              <div
                key={row.metric}
                className={`grid grid-cols-3 gap-4 px-6 py-4 ${
                  i < study.results.rows.length - 1
                    ? "border-b border-white/[0.04]"
                    : ""
                }`}
              >
                <div className="text-sm text-white font-medium">
                  {row.metric}
                </div>
                <div className="text-sm text-neutral-500">{row.before}</div>
                <div className="text-sm text-white">{row.after}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      {study.quote && (
        <section className="pb-20 px-6">
          <div
            ref={quoteReveal.ref}
            className={`max-w-3xl mx-auto ${quoteReveal.cls}`}
          >
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 sm:p-10">
              <blockquote className="text-xl sm:text-2xl text-white leading-relaxed font-light italic mb-4">
                &ldquo;{study.quote.text}&rdquo;
              </blockquote>
              <p className="text-sm text-neutral-500">
                — {study.quote.attribution}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* What This Unlocked */}
      <section className="pb-20 px-6">
        <div
          ref={unlockReveal.ref}
          className={`max-w-3xl mx-auto ${unlockReveal.cls}`}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
            {study.unlock.headline}
          </h2>
          <div className="space-y-3">
            {study.unlock.items.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-white/60 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-400">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next case study + CTA */}
      <section className="py-20 px-6 border-t border-white/[0.06]">
        <div
          ref={ctaReveal.ref}
          className={`max-w-3xl mx-auto ${ctaReveal.cls}`}
        >
          {/* Next study link */}
          {nextStudy && nextStudy.slug !== slug && (
            <div className="mb-12 pb-12 border-b border-white/[0.06]">
              <p className="text-xs font-medium tracking-wider uppercase text-neutral-500 mb-3">
                Next Case Study
              </p>
              <Link
                href={`/results/${nextStudy.slug}`}
                className="group inline-flex items-center gap-3 text-xl sm:text-2xl font-semibold text-white hover:text-neutral-300 transition-colors"
              >
                {nextStudy.title}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Ready to see what AI agents can do for your roster?
            </h2>
            <p className="text-neutral-400 mb-8">
              Start with a free AI readiness audit, or book a strategy session
              with Sidney.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/audit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-8 py-3.5 text-sm font-medium hover:bg-neutral-200 transition-colors"
              >
                Take the Free Audit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/advisory/book"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-medium hover:bg-white/[0.05] transition-colors"
              >
                Book Advisory Session
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
