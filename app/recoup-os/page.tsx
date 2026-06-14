import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { recoupOsCopy } from "@/lib/copy/recoupOs";
import { buildFaqJsonLd } from "@/lib/faqJsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { MantraClose } from "@/components/marketing/MantraClose";

export const metadata: Metadata = buildPageMetadata({
  title: "Recoup OS — Every Music Skill in One Plugin",
  description:
    "Recoup OS bundles every Recoup skill — research, catalog diligence, content, release ops, and growth — into one installable plugin for Claude Code, Cursor, Cowork, and Codex.",
  path: "/recoup-os",
});

/** Recoup OS — flagship product page (copy from lib/copy/recoupOs). */
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

      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-14 sm:pb-16">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10 text-center">
          <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--accent) mb-6">
            {c.eyebrow}
          </p>
          <h1 className="font-pixel text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.03] tracking-tight mb-6">
            {c.title}
          </h1>
          <p className="text-(--foreground)/60 text-[clamp(1.0625rem,1.5vw,1.25rem)] font-ui leading-[1.55] max-w-[620px] mx-auto mb-8">
            {c.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={c.primaryCta.href}
              className="cta-pulse font-ui font-semibold bg-(--accent) text-(--accent-foreground) px-9 py-4 rounded-full text-[15px] hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5"
            >
              {c.primaryCta.label}
            </Link>
            <Link
              href={c.secondaryCta.href}
              className="font-ui font-medium text-[15px] text-(--foreground)/55 hover:text-(--foreground) transition-colors flex items-center gap-1.5"
            >
              {c.secondaryCta.label} <ArrowRight size={15} />
            </Link>
          </div>
          <p className="font-ui text-[13px] text-(--foreground)/45 mt-6">
            <span className="font-pixel text-(--foreground)/70">{c.price}</span>{" "}
            {c.priceUnit} · {c.priceNote}
          </p>
        </div>
      </section>

      {/* What's inside */}
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

      {/* Why the bundle */}
      <section className="py-14 sm:py-20 bg-(--muted)/40">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10">
          <h2 className="font-pixel text-[clamp(1.5rem,3.5vw,2.5rem)] tracking-tight leading-[1.08] mb-8">
            Why buy the whole OS.
          </h2>
          <ul className="space-y-4 max-w-[640px]">
            {c.whyBundle.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <Check size={18} className="mt-0.5 shrink-0 text-(--accent)" />
                <span className="text-[15px] sm:text-[16px] text-(--foreground)/70 leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="font-ui text-[11px] font-semibold text-(--foreground)/35 uppercase tracking-[0.14em] mr-1">
              Runs in
            </span>
            {c.hosts.map((host) => (
              <span
                key={host}
                className="text-[11px] font-pixel text-(--foreground)/45 uppercase tracking-[0.12em] px-3 py-1.5 rounded-full"
                style={{ boxShadow: "0 0 0 1px var(--border)" }}
              >
                {host}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[760px] mx-auto px-6 sm:px-10">
          <h2 className="font-pixel text-[clamp(1.5rem,3.5vw,2.5rem)] tracking-tight leading-[1.08] mb-10">
            Questions, answered.
          </h2>
          <div className="space-y-0">
            {c.faq.map((item) => (
              <div
                key={item.q}
                className="py-6 border-b border-(--border) first:border-t"
              >
                <h3 className="font-ui font-bold text-[16px] text-(--foreground) mb-2">
                  {item.q}
                </h3>
                <p className="text-[15px] text-(--foreground)/60 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="relative py-28 sm:py-36 overflow-hidden dark-section-cta">
        <div className="max-w-[760px] mx-auto px-6 text-center relative z-10">
          <MantraClose tone="dark" />
          <h2 className="font-pixel text-[clamp(2rem,5vw,3.5rem)] tracking-tight leading-[1.02] text-white mb-9">
            Run the whole stack.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={c.primaryCta.href}
              className="cta-pulse font-ui font-semibold bg-white text-[#0a0a0a] px-9 py-4 rounded-full text-[15px] hover:bg-white/90 transition-all duration-300 hover:-translate-y-0.5"
            >
              {c.primaryCta.label}
            </Link>
            <a
              href={c.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui font-medium text-sm text-white/45 hover:text-white/80 transition-colors flex items-center gap-1.5"
            >
              Browse the marketplace <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
