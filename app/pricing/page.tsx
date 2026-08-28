import type { Metadata } from "next";
import { Check } from "lucide-react";
import { pricingCopy, type PricingPlan } from "@/lib/copy/pricing";
import { buildPageMetadata } from "@/lib/seo";
import { ProCheckoutButton } from "@/components/pricing/ProCheckoutButton";
import { PricingCtaLink } from "@/components/pricing/PricingCtaLink";
import { ProofBlock } from "@/components/pricing/ProofBlock";

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing | Recoupable",
  description:
    "Free to start. Pro is $99/mo with a 30-day trial. AI agents for artists, managers, and labels.",
  path: "/pricing",
});

/* ── Plan card ─────────────────────────────────────────────────────── */
function PlanCard({ plan }: { plan: PricingPlan }) {
  const hl = plan.highlighted;
  const ctaClasses = `block w-full text-center py-3 rounded-lg text-sm font-medium transition-colors ${
    hl
      ? "bg-white text-black hover:bg-white/90"
      : "border border-[var(--border)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
  }`;

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
        hl
          ? "bg-[#080808] text-white md:-mt-4 md:mb-[-16px]"
          : "border border-[var(--border)] bg-[var(--background)]"
      }`}
      style={hl ? { boxShadow: "0 25px 60px -15px rgba(0,0,0,0.5)" } : undefined}
    >
      {plan.badge && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            className="text-[9px] uppercase tracking-wider bg-white text-black px-4 py-1.5 rounded-full shadow-lg"
            style={{ fontFamily: "var(--font-bitmap), monospace" }}
          >
            {plan.badge}
          </span>
        </div>
      )}

      <p
        className={`text-[10px] uppercase tracking-widest mb-1 ${
          hl ? "text-white/50" : "text-[var(--muted-foreground)]"
        }`}
        style={{ fontFamily: "var(--font-bitmap), monospace" }}
      >
        {plan.audience}
      </p>
      <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
      <p
        className={`text-sm mb-6 leading-relaxed ${
          hl ? "text-white/70" : "text-[var(--muted-foreground)]"
        }`}
      >
        {plan.description}
      </p>

      <div className="mb-6">
        <span className="text-4xl font-bold">{plan.price}</span>
        {plan.period && (
          <span className={`text-sm ${hl ? "text-white/50" : "text-[var(--muted-foreground)]"}`}>
            {plan.period}
          </span>
        )}
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check
              size={16}
              className={`mt-0.5 shrink-0 ${hl ? "text-white" : "text-[var(--foreground)]"}`}
            />
            <span className={hl ? "text-white/90" : "text-[var(--muted-foreground)]"}>{f}</span>
          </li>
        ))}
      </ul>

      {plan.id === "pro" ? (
        <ProCheckoutButton label={plan.cta} note={plan.ctaNote} className={ctaClasses} />
      ) : (
        <PricingCtaLink plan={plan.id} href={plan.ctaHref ?? "#"} className={ctaClasses}>
          {plan.cta}
        </PricingCtaLink>
      )}
    </div>
  );
}

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

      {/* Plan cards */}
      <section className="grid md:grid-cols-2 gap-6 items-start max-w-3xl mx-auto mb-8">
        {pricingCopy.plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </section>

      {/* Labels: book a call */}
      <section className="max-w-3xl mx-auto mb-24 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl px-6 py-4 text-sm shadow-[0_0_0_1px_var(--border)]">
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
          href={pricingCopy.closing.href}
          className="inline-block bg-[var(--foreground)] text-[var(--background)] px-8 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {pricingCopy.closing.cta}
        </PricingCtaLink>
      </section>
    </main>
  );
}
