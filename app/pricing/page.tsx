import type { Metadata } from "next";
import { pricingCopy } from "@/lib/copy/pricing";
import { buildPageMetadata } from "@/lib/seo";
import { PlanCard } from "@/components/pricing/PlanCard";
import { CurrentPlanBanner } from "@/components/pricing/CurrentPlanBanner";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { PricingCtaLink } from "@/components/pricing/PricingCtaLink";
import { ProofBlock } from "@/components/pricing/ProofBlock";

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing | Recoupable",
  description:
    "Free to start. Starter is $19/mo, Pro is $99/mo with a 30-day trial. AI agents for artists, managers, and labels, built for autonomous music operations.",
  path: "/pricing",
});

/* ── Main page ─────────────────────────────────────────────────────── */
export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      {/* Hero */}
      <section className="text-center mb-16">
        <p
          className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mb-4"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          Pricing
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          {pricingCopy.title}
        </h1>
        <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
          {pricingCopy.description}
        </p>
      </section>

      {/* Signed-in state (renders nothing while signed out) */}
      <CurrentPlanBanner />

      {/* Plan cards */}
      <section className="grid md:grid-cols-3 gap-6 items-start max-w-5xl mx-auto mb-8">
        {pricingCopy.plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} surface="pricing" />
        ))}
      </section>

      {/* Labels: book a call */}
      <section className="max-w-3xl mx-auto mb-16 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl px-6 py-4 text-sm shadow-[0_0_0_1px_var(--border)]">
        <p className="text-[var(--muted-foreground)] text-center sm:text-left">
          {pricingCopy.partnerLine.text}
        </p>
        <a
          href={pricingCopy.partnerLine.href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 font-medium underline underline-offset-4 hover:opacity-80"
        >
          {pricingCopy.partnerLine.cta}
        </a>
      </section>

      {/* Comparison */}
      <ComparisonTable />

      {/* Proof */}
      <ProofBlock />

      {/* FAQ */}
      <section className="max-w-2xl mx-auto mb-24">
        <h2 className="text-2xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {pricingCopy.faq.map((item) => (
            <details
              key={item.q}
              className="group border-b border-[var(--border)] pb-4"
            >
              <summary className="cursor-pointer font-medium text-sm flex items-center justify-between">
                {item.q}
                <span className="ml-4 text-[var(--muted-foreground)] group-open:rotate-45 transition-transform text-lg">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-[var(--muted-foreground)] leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="text-center py-16 border-t border-[var(--border)]">
        <h2 className="text-3xl font-bold mb-4">{pricingCopy.closing.title}</h2>
        <p className="text-[var(--muted-foreground)] max-w-xl mx-auto mb-8 leading-relaxed">
          {pricingCopy.closing.body}
        </p>
        <PricingCtaLink
          plan="free"
          surface="pricing"
          href={pricingCopy.closing.href}
          className="inline-block bg-[var(--foreground)] text-[var(--background)] px-8 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {pricingCopy.closing.cta}
        </PricingCtaLink>
      </section>
    </main>
  );
}
