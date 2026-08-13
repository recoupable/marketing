import type { Metadata } from "next";
import { buildCopy } from "@/lib/copy/build";
import { buildPageMetadata } from "@/lib/seo";
import { BuildTierCard } from "@/components/build/BuildTierCard";

export const metadata: Metadata = buildPageMetadata({
  title: "Custom AI Technology for Music Businesses | Recoupable",
  description: buildCopy.description,
  path: "/build",
});

/**
 * /build — the delivery half of the services ladder (chat#1800 Phase 2).
 * /advisory = think with us; /build = we build it, you own it.
 */
export default function BuildPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      {/* Hero */}
      <section className="text-center mb-20">
        <p
          className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-4"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          Custom Builds
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          {buildCopy.headline}
        </h1>
        <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
          {buildCopy.subheadline}
        </p>
      </section>

      {/* What We Build */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-center mb-12">What We Build</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {buildCopy.whatWeBuild.map((item) => (
            <div key={item.title} className="border border-[var(--border)] rounded-xl p-6">
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Proof */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-center mb-12">Built on Real Results</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {buildCopy.proof.map((p) => (
            <div key={p.name} className="border border-[var(--border)] rounded-xl p-6">
              <p className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-2">
                {p.tag}
              </p>
              <h3 className="font-bold mb-1">{p.name}</h3>
              <p
                className="text-lg font-bold mb-2"
                style={{ fontFamily: "var(--font-bitmap), monospace" }}
              >
                {p.stat}
              </p>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ownership */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-center mb-4">{buildCopy.ownership.title}</h2>
        <p className="text-center text-[var(--muted-foreground)] max-w-2xl mx-auto mb-12">
          {buildCopy.ownership.description}
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {buildCopy.ownership.points.map((point) => (
            <div key={point.title} className="flex gap-4">
              <div className="shrink-0 w-1 bg-[var(--foreground)] rounded-full" />
              <div>
                <h3 className="font-bold mb-1">{point.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)]">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {buildCopy.process.map((s) => (
            <div key={s.step}>
              <div
                className="text-3xl font-bold text-[var(--muted-foreground)] mb-3"
                style={{ fontFamily: "var(--font-bitmap), monospace" }}
              >
                {s.step}
              </div>
              <h3 className="font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-12">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {buildCopy.tiers.map((tier) => (
            <BuildTierCard key={tier.name} tier={tier} />
          ))}
        </div>
      </section>

      {/* Advisory cross-link */}
      <section className="mb-24 text-center border border-[var(--border)] rounded-2xl py-8 px-6">
        <p className="font-bold mb-1">{buildCopy.crossLink.label}</p>
        <p className="text-sm text-[var(--muted-foreground)] mb-4">{buildCopy.crossLink.text}</p>
        <a href={buildCopy.crossLink.ctaHref} className="text-sm font-medium underline underline-offset-4">
          {buildCopy.crossLink.ctaLabel} →
        </a>
      </section>

      {/* FAQ */}
      <section className="mb-24 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {buildCopy.faq.map((item) => (
            <details key={item.q} className="group border-b border-[var(--border)] pb-4">
              <summary className="cursor-pointer font-medium text-sm flex items-center justify-between">
                {item.q}
                <span className="ml-4 text-[var(--muted-foreground)] group-open:rotate-45 transition-transform text-lg">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-[var(--muted-foreground)] leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="text-center py-16 border-t border-[var(--border)]">
        <h2 className="text-3xl font-bold mb-4">{buildCopy.closingCta.headline}</h2>
        <p className="text-[var(--muted-foreground)] max-w-xl mx-auto mb-8 leading-relaxed">
          {buildCopy.closingCta.subheadline}
        </p>
        <a
          href={buildCopy.closingCta.ctaHref}
          className="inline-block bg-[var(--foreground)] text-[var(--background)] px-8 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {buildCopy.closingCta.ctaLabel}
        </a>
      </section>
    </main>
  );
}
