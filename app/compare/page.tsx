"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Monitor } from "lucide-react";
import { compareCopy } from "@/lib/copy/compare";

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
      { threshold: 0.08 },
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

export default function ComparePage() {
  const c = compareCopy;
  const hero = useReveal();
  const table = useReveal();
  const why = useReveal();
  const cta = useReveal();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* ── Hero ── */}
      <div ref={hero.ref} className={hero.cls}>
        <header className="mb-16 text-center">
          <p className="text-sm font-mono uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
            The BYOA Advantage
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] mb-6">
            {c.title}
          </h1>
          <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mb-6">
            {c.subtitle}
          </p>
          <p className="text-lg italic text-[var(--muted-foreground)]/70">
            &ldquo;{c.heroQuote}&rdquo;
          </p>
        </header>
      </div>

      {/* ── Comparison Table ── */}
      <div ref={table.ref} className={table.cls}>
        <section className="mb-20">
          <div className="rounded-lg border border-[var(--border)] overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[1fr_1fr_1fr] bg-[var(--foreground)]/5">
              <div className="p-4 text-sm font-mono uppercase tracking-wider text-[var(--muted-foreground)]">
                &nbsp;
              </div>
              <div className="p-4 text-sm font-mono uppercase tracking-wider text-[var(--foreground)] flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Agent Plugins
              </div>
              <div className="p-4 text-sm font-mono uppercase tracking-wider text-[var(--muted-foreground)] flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Dashboards
              </div>
            </div>

            {/* Rows */}
            {c.sections[0].rows.map((row, i) => (
              <div
                key={row.category}
                className={`grid grid-cols-[1fr_1fr_1fr] ${
                  i % 2 === 0 ? "" : "bg-[var(--foreground)]/[0.02]"
                } border-t border-[var(--border)]`}
              >
                <div className="p-4 text-sm font-medium text-[var(--foreground)]">
                  {row.category}
                </div>
                <div className="p-4 text-sm text-[var(--foreground)]/80">
                  {row.byoa}
                </div>
                <div className="p-4 text-sm text-[var(--muted-foreground)]">
                  {row.dashboard}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Why It Matters ── */}
      <div ref={why.ref} className={why.cls}>
        <section className="mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-10 text-center">
            {c.whyItMatters.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {c.whyItMatters.points.map((point) => (
              <div
                key={point.heading}
                className="rounded-lg border border-[var(--border)] p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.03)]"
              >
                <h3 className="text-base font-semibold text-[var(--foreground)] mb-3">
                  {point.heading}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── CTA ── */}
      <div ref={cta.ref} className={cta.cls}>
        <section className="text-center py-12 border-t border-[var(--border)]">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-3">
            {c.cta.title}
          </h2>
          <p className="text-[var(--muted-foreground)] mb-8 max-w-md mx-auto">
            {c.cta.description}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href={c.cta.primary.href}
              className="inline-flex items-center gap-2 bg-[var(--foreground)] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[var(--foreground)]/90 transition-colors"
            >
              {c.cta.primary.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={c.cta.secondary.href}
              className="inline-flex items-center gap-2 border border-[var(--border)] px-6 py-3 rounded-md text-sm font-medium text-[var(--foreground)] hover:bg-[var(--foreground)]/5 transition-colors"
            >
              {c.cta.secondary.label}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
