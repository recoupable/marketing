import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { pricingCopy, type PricingPlan } from "@/lib/copy/pricing";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";
import { buildFaqJsonLd } from "@/lib/faqJsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing — Open Tools, Hosted Chat & Custom Builds",
  description:
    "Free open-source skills and API, hosted Chat workspace from $19/mo, and custom implementation for labels, catalogs, and platforms.",
  path: "/pricing",
});

/* ── Plan card ─────────────────────────────────────────────────────── */
function PlanCard({ plan }: { plan: PricingPlan }) {
  const hl = plan.highlighted;
  const isExternal = plan.ctaHref.startsWith("http");

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
        hl ? "dark-section text-white md:-mt-4 md:mb-[-16px]" : "bg-(--background)"
      }`}
      style={
        hl
          ? { boxShadow: "0 25px 60px -15px rgba(0,0,0,0.45)" }
          : { boxShadow: "0 0 0 1px var(--border)" }
      }
    >
      {plan.badge && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            className="text-[9px] uppercase tracking-wider bg-(--accent) text-(--accent-foreground) px-4 py-1.5 rounded-full shadow-lg font-pixel"
          >
            {plan.badge}
          </span>
        </div>
      )}

      <p
        className={`font-pixel text-[10px] uppercase tracking-[0.18em] mb-2 ${
          hl ? "text-white/55" : "text-(--foreground)/40"
        }`}
      >
        {plan.audience}
      </p>
      <h3 className="font-ui font-bold text-[20px] mb-1">{plan.name}</h3>
      <p
        className={`text-[13px] mb-6 leading-relaxed ${
          hl ? "text-white/70" : "text-(--foreground)/55"
        }`}
      >
        {plan.description}
      </p>

      <div className="mb-6">
        <span className={`font-pixel text-[2.25rem] leading-none ${hl ? "text-(--accent)" : ""}`}>{plan.price}</span>
        {plan.period && (
          <span className={`text-sm ${hl ? "text-white/50" : "text-(--foreground)/45"}`}>
            {plan.period}
          </span>
        )}
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13px]">
            <Check
              size={15}
              className={`mt-0.5 shrink-0 ${hl ? "text-(--accent)" : "text-(--foreground)"}`}
            />
            <span className={hl ? "text-white/90" : "text-(--foreground)/65"}>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={plan.ctaHref}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`block w-full text-center py-3 rounded-full text-sm font-ui font-semibold transition-all ${
          hl
            ? "bg-(--accent) text-(--accent-foreground) hover:bg-(--accent-hover)"
            : "text-(--foreground) hover:-translate-y-0.5"
        }`}
        style={hl ? undefined : { boxShadow: "0 0 0 1px var(--border)" }}
      >
        {plan.cta}
      </a>
    </div>
  );
}

/* ── Main page ─────────────────────────────────────────────────────── */
export default function PricingPage() {
  return (
    <div className="bg-(--background) text-(--foreground)">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(pricingCopy.faq)) }}
      />
      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-14 sm:pb-16">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10 text-center">
          <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--foreground)/45 mb-6">
            Pricing
          </p>
          <h1 className="font-pixel text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.03] tracking-tight mb-6">
            {pricingCopy.title}
          </h1>
          <p className="text-(--foreground)/60 text-[clamp(1.0625rem,1.5vw,1.25rem)] font-ui leading-[1.55] max-w-[620px] mx-auto">
            {pricingCopy.description}
          </p>
        </div>
      </section>

      {/* Plan cards */}
      <section className="pb-24">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 grid md:grid-cols-3 gap-6 items-start">
          {pricingCopy.plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24">
        <div className="max-w-[720px] mx-auto px-6 sm:px-10">
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4 text-center">
            FAQ
          </p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3rem)] tracking-tight leading-[1.05] mb-12 text-center">
            Questions, answered.
          </h2>
          <div className="space-y-2">
            {pricingCopy.faq.map((item) => (
              <details key={item.q} className="group border-b border-(--border) py-4">
                <summary className="cursor-pointer font-ui font-semibold text-[15px] flex items-center justify-between gap-4 list-none">
                  {item.q}
                  <span className="shrink-0 text-(--foreground)/40 group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[14px] text-(--foreground)/55 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-28 sm:py-36 overflow-hidden dark-section-cta">
        <div className="max-w-[760px] mx-auto px-6 text-center relative z-10">
          <h2 className="font-pixel text-[clamp(2rem,5vw,3.5rem)] tracking-tight leading-[1.02] text-white mb-9">
            Not sure which fits?
          </h2>
          <p className="text-white/45 text-[15px] max-w-md mx-auto mb-9 leading-relaxed font-ui">
            Tell us what you&apos;re running and we&apos;ll point you at the
            simplest way to start — open tools, Chat, or a custom build.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/consulting"
              className="cta-pulse font-ui font-semibold bg-white text-[#0a0a0a] px-9 py-4 rounded-full text-[15px] hover:bg-white/90 transition-all duration-300 hover:-translate-y-0.5"
            >
              Talk to us
            </Link>
            <a
              href={siteConfig.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui font-medium text-sm text-white/45 hover:text-white/80 transition-colors flex items-center gap-1.5"
            >
              Open the app <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
