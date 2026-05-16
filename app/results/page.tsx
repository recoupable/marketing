"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { resultsCopy } from "@/lib/copy/results";

/* ── reveal-on-scroll helper ── */
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
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
        {value}
      </div>
      <div className="text-sm text-neutral-400 mt-1">{label}</div>
    </div>
  );
}

/* ── case study card ── */
function CaseStudy({
  study,
  index,
}: {
  study: (typeof resultsCopy.caseStudies)[number];
  index: number;
}) {
  const { ref, cls } = useReveal();
  return (
    <div
      ref={ref}
      className={cls}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 sm:p-10 hover:border-white/[0.12] transition-colors">
        {/* tag */}
        <span className="inline-block text-xs font-medium tracking-wider uppercase text-neutral-500 mb-4">
          {study.tag}
        </span>

        {/* title */}
        <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3 tracking-tight">
          {study.title}
        </h3>

        {/* description */}
        <p className="text-neutral-400 leading-relaxed mb-8 max-w-2xl">
          {study.description}
        </p>

        {/* stats row */}
        <div className="grid grid-cols-3 gap-6 mb-8 py-6 border-t border-b border-white/[0.06]">
          {study.stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>

        {/* insight */}
        <p className="text-sm text-neutral-500 italic">💡 {study.insight}</p>
      </div>
    </div>
  );
}

/* ── page ── */
export default function ResultsPage() {
  const heroReveal = useReveal();
  const bannerReveal = useReveal();
  const ctaReveal = useReveal();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div
          ref={heroReveal.ref}
          className={`max-w-3xl mx-auto text-center ${heroReveal.cls}`}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {resultsCopy.headline}
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto">
            {resultsCopy.subheadline}
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="pb-20 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          {resultsCopy.caseStudies.map((study, i) => (
            <CaseStudy key={study.id} study={study} index={i} />
          ))}
        </div>
      </section>

      {/* Credentials Banner */}
      <section className="py-16 px-6 border-t border-white/[0.06]">
        <div
          ref={bannerReveal.ref}
          className={`max-w-3xl mx-auto text-center ${bannerReveal.cls}`}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 tracking-tight">
            {resultsCopy.credentialsBanner.headline}
          </h2>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {resultsCopy.credentialsBanner.items.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-sm text-neutral-400"
              >
                <Check className="w-4 h-4 text-white/60" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 border-t border-white/[0.06]">
        <div
          ref={ctaReveal.ref}
          className={`max-w-2xl mx-auto text-center ${ctaReveal.cls}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {resultsCopy.bottomCta.headline}
          </h2>
          <p className="text-neutral-400 mb-8">
            {resultsCopy.bottomCta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={resultsCopy.bottomCta.primaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-8 py-3.5 text-sm font-medium hover:bg-neutral-200 transition-colors"
            >
              {resultsCopy.bottomCta.primaryCta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={resultsCopy.bottomCta.secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-medium hover:bg-white/[0.05] transition-colors"
            >
              {resultsCopy.bottomCta.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
