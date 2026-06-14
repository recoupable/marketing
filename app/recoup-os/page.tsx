import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { recoupOsCopy } from "@/lib/copy/recoupOs";
import { buildFaqJsonLd } from "@/lib/faqJsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { LogoBar } from "@/components/marketing/LogoBar";
import { FounderCard } from "@/components/marketing/FounderCard";
import { Testimonials } from "@/components/marketing/Testimonials";

export const metadata: Metadata = buildPageMetadata({
  title: "Recoup OS — Every Music Skill in One Plugin",
  description:
    "Recoup OS bundles every Recoup skill — research, catalog diligence, content, release ops, and growth — into one installable plugin for Claude Code, Cursor, Cowork, and Codex. $99/year.",
  path: "/recoup-os",
});

/**
 * Recoup OS — flagship product page. Section structure mirrors the pm-world
 * "AI PM OS" landing (copy lives in lib/copy/recoupOs).
 */
export default function RecoupOsPage() {
  const c = recoupOsCopy;

  return (
    <div className="bg-(--background) text-(--foreground)">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqJsonLd(c.faq)),
        }}
      />

      {/* 1. Hero */}
      <section className="pt-36 sm:pt-44 pb-14 sm:pb-16">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10 text-center">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-pixel text-[10px] uppercase tracking-[0.18em] text-(--foreground)/55 mb-7"
            style={{ boxShadow: "0 0 0 1px var(--border)" }}
          >
            <span className="text-(--accent)">♪</span> {c.eyebrow}
          </span>
          <h1 className="font-pixel text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[1.02] tracking-tight mb-6">
            {c.hero.lead}
            <br />
            {c.hero.trail}{" "}
            <span className="rounded-md bg-(--accent-soft) px-2 text-(--accent)">
              {c.hero.highlight}
            </span>
          </h1>
          <p className="text-(--foreground)/60 text-[clamp(1.0625rem,1.5vw,1.25rem)] font-ui leading-[1.55] max-w-[620px] mx-auto mb-5">
            {c.hero.description}
          </p>
          <p className="font-ui text-[13px] text-(--foreground)/45 mb-8">
            {c.hero.worksWith}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={c.hero.primary.href}
              className="cta-pulse font-ui font-semibold bg-(--accent) text-(--accent-foreground) px-9 py-4 rounded-full text-[15px] hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5"
            >
              {c.hero.primary.label}
            </Link>
            <Link
              href={c.hero.secondary.href}
              className="font-ui font-medium text-[15px] text-(--foreground)/55 hover:text-(--foreground) transition-colors flex items-center gap-1.5"
            >
              {c.hero.secondary.label} <ArrowRight size={15} />
            </Link>
          </div>
          <p className="font-ui text-[13px] text-(--foreground)/45 mt-7">
            {c.hero.proof}
          </p>
        </div>
      </section>

      {/* 2. Trusted-by logos */}
      <section className="py-10 border-y border-(--border)">
        <div className="max-w-[1200px] mx-auto px-6">
          <LogoBar />
        </div>
      </section>

      {/* 3. Problem cards */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <div className="grid sm:grid-cols-3 gap-5">
            {c.problems.map((problem) => (
              <div
                key={problem.tag}
                className="rounded-2xl bg-(--muted)/50 p-6"
                style={{ boxShadow: "0 0 0 1px var(--border)" }}
              >
                <span
                  className="inline-block rounded-md bg-(--background) px-2.5 py-1 font-ui text-[12px] font-semibold text-(--foreground) mb-4"
                  style={{ boxShadow: "0 0 0 1px var(--border)" }}
                >
                  {problem.tag}
                </span>
                <p className="text-[14px] text-(--foreground)/55 leading-relaxed">
                  {problem.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-[15px] sm:text-[16px] text-(--foreground)/70 leading-relaxed max-w-[640px]">
              {c.problemsClose}
            </p>
            <Link
              href="#inside"
              className="shrink-0 font-ui font-semibold text-[14px] text-(--foreground) inline-flex items-center gap-1.5"
            >
              See what&apos;s inside ↓
            </Link>
          </div>
        </div>
      </section>

      {/* 4. The product card */}
      <section className="pb-12 sm:pb-16">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--foreground)/45 mb-4">
            {c.product.eyebrow}
          </p>
          <div
            className="rounded-3xl bg-(--muted)/40 p-7 sm:p-10"
            style={{ boxShadow: "0 0 0 1px var(--border)" }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-(--foreground) text-(--background) px-2.5 py-1 font-pixel text-[10px] uppercase tracking-[0.14em]">
                  {c.eyebrow}
                </span>
                <span className="font-ui text-[12px] text-(--foreground)/45">
                  Works with
                </span>
                {c.product.hosts.map((host) => (
                  <span
                    key={host}
                    className="rounded-full px-2.5 py-1 font-pixel text-[10px] uppercase tracking-[0.1em] text-(--foreground)/55"
                    style={{ boxShadow: "0 0 0 1px var(--border)" }}
                  >
                    {host}
                  </span>
                ))}
              </div>
              <div className="shrink-0 sm:text-right">
                <span className="font-pixel text-[2.75rem] leading-none text-(--accent)">
                  {c.price}
                </span>
                <span className="font-pixel text-[1.25rem] text-(--accent)/70">
                  {c.priceUnit}
                </span>
                <p className="font-pixel text-[9px] uppercase tracking-[0.16em] text-(--foreground)/40 mt-1">
                  Updates included · cancel anytime
                </p>
              </div>
            </div>

            <h2 className="font-ui font-bold text-[clamp(1.5rem,3vw,2.25rem)] tracking-tight leading-[1.1] mb-3">
              {c.product.title}
            </h2>
            <p className="text-[15px] sm:text-[16px] text-(--foreground)/60 leading-relaxed max-w-[640px] mb-6">
              {c.product.description}
            </p>

            <Link
              href={c.product.cta.href}
              className="inline-flex items-center gap-1.5 font-ui font-semibold bg-(--accent) text-(--accent-foreground) px-7 py-3.5 rounded-full text-[15px] hover:bg-(--accent-hover) transition-colors mb-8"
            >
              {c.product.cta.label} <ArrowRight size={15} />
            </Link>

            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-7">
              {c.product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check size={16} className="mt-0.5 shrink-0 text-(--accent)" />
                  <span className="text-[14px] text-(--foreground)/70 leading-snug">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-[13px] text-(--foreground)/45 leading-relaxed mb-7 max-w-[680px]">
              {c.product.summary}
            </p>

            {/* Also includes */}
            <div
              className="rounded-xl bg-(--background)/60 px-5 py-4 flex items-center justify-between gap-4"
              style={{ boxShadow: "0 0 0 1px var(--border)" }}
            >
              <div>
                <p className="font-pixel text-[9px] uppercase tracking-[0.16em] text-(--foreground)/40 mb-1">
                  Also includes
                </p>
                <p className="font-ui font-bold text-[14px] text-(--foreground)">
                  {c.product.alsoIncludes.name}
                </p>
                <p className="text-[13px] text-(--foreground)/55">
                  {c.product.alsoIncludes.note}
                </p>
              </div>
              <span className="shrink-0 font-pixel text-[10px] uppercase tracking-[0.14em] text-(--accent)">
                {c.product.alsoIncludes.tag}
              </span>
            </div>
          </div>

          {/* Standalone skills card */}
          <Link
            href={c.product.standalone.cta.href}
            className="group mt-5 flex items-center justify-between gap-4 rounded-2xl bg-(--background) px-7 py-5 transition-colors hover:bg-(--muted)/40"
            style={{ boxShadow: "0 0 0 1px var(--border)" }}
          >
            <div>
              <p className="font-ui font-bold text-[15px] text-(--foreground)">
                {c.product.standalone.name}
              </p>
              <p className="text-[13px] text-(--foreground)/55">
                {c.product.standalone.note}
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="font-pixel text-[1.25rem] text-(--foreground)/70">
                {c.product.standalone.price}
              </span>
              <span className="inline-flex items-center gap-1 font-ui font-semibold text-[13px] text-(--foreground)">
                {c.product.standalone.cta.label}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 5. Everything inside */}
      <section id="inside" className="py-14 sm:py-20 scroll-mt-24">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <div className="max-w-[620px] mb-10">
            <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--foreground)/45 mb-4">
              What&apos;s inside
            </p>
            <h2 className="font-pixel text-[clamp(1.75rem,4vw,2.75rem)] tracking-tight leading-[1.05]">
              Every skill, in one install.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.inside.map((item) => (
              <div
                key={item.name}
                className="flex flex-col rounded-2xl bg-(--background) p-6"
                style={{ boxShadow: "0 0 0 1px var(--border)" }}
              >
                <h3 className="font-ui font-bold text-[16px] text-(--foreground) mb-2 leading-snug">
                  {item.name}
                </h3>
                <p className="text-[14px] text-(--foreground)/55 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. The maker */}
      <section className="py-14 sm:py-20 bg-(--muted)/40">
        <div className="max-w-[760px] mx-auto px-6 sm:px-10">
          <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--foreground)/45 mb-5">
            {c.maker.eyebrow}
          </p>
          <FounderCard blurb={c.maker.story} />
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10">
          <h2 className="font-pixel text-[clamp(1.5rem,3.5vw,2.25rem)] tracking-tight leading-[1.08] mb-10 text-center">
            {c.testimonialsHeading}
          </h2>
          <Testimonials />
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-[760px] mx-auto px-6 sm:px-10">
          <h2 className="font-pixel text-[clamp(1.5rem,3.5vw,2.5rem)] tracking-tight leading-[1.08] mb-10 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-2">
            {c.faq.map((item) => (
              <details
                key={item.q}
                className="group border-b border-(--border) py-4"
              >
                <summary className="cursor-pointer font-ui font-semibold text-[15px] flex items-center justify-between gap-4 list-none">
                  {item.q}
                  <span className="shrink-0 text-(--foreground)/40 group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[14px] text-(--foreground)/60 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final CTA — put it to work */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <div className="rounded-3xl bg-(--accent-soft) px-8 py-14 sm:px-14 sm:py-20 text-center sm:text-left">
            <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--accent) mb-4">
              {c.finalCta.eyebrow}
            </p>
            <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight leading-[1.04] mb-4 max-w-[560px] mx-auto sm:mx-0">
              {c.finalCta.title}
            </h2>
            <p className="text-[15px] sm:text-[16px] text-(--foreground)/65 leading-relaxed max-w-[520px] mx-auto sm:mx-0 mb-8">
              {c.finalCta.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
              <Link
                href={c.finalCta.cta.href}
                className="cta-pulse inline-flex items-center gap-1.5 font-ui font-semibold bg-(--accent) text-(--accent-foreground) px-9 py-4 rounded-full text-[15px] hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5"
              >
                {c.finalCta.cta.label} <ArrowRight size={15} />
              </Link>
              <a
                href={c.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui font-medium text-sm text-(--foreground)/50 hover:text-(--foreground) transition-colors flex items-center gap-1.5"
              >
                Browse the marketplace <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
