import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { LogoBar } from "@/components/marketing/LogoBar";
import { StatsStrip } from "@/components/marketing/StatsStrip";
import { Testimonials } from "@/components/marketing/Testimonials";
import { ContactForm } from "@/components/marketing/ContactForm";
import { FounderCard } from "@/components/marketing/FounderCard";
import { MantraClose } from "@/components/marketing/MantraClose";
import { HOMEPAGE_STATS } from "@/lib/copy/stats";
import { consultingFaq } from "@/lib/copy/consultingFaq";
import { buildFaqJsonLd } from "@/lib/faqJsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "Consulting — Custom AI Implementation for Music Teams",
  description:
    "Plan, roll out, and ship custom AI agents in your stack for labels, catalogs, distributors, and platforms with the team behind Recoup.",
  path: "/consulting",
});

/* ── Data ──────────────────────────────────────────────────────────── */

/** What an engagement actually delivers. */
const engagements = [
  {
    k: "Strategy",
    title: "AI strategy session",
    body: "A working session that maps where AI fits your operation — A&R, catalog, marketing, ops — and what to build first. You leave with a prioritized plan, not a deck.",
  },
  {
    k: "Implementation",
    title: "Implementation sprint",
    body: "We build the workflows with your team: agents and skills wired into your data and tools, running in your stack. Scoped to your roster and catalog.",
  },
  {
    k: "Custom agents",
    title: "Custom agents & skills",
    body: "Private, organization-owned skills for the work generic tools can't do — diligence, royalty analysis, release ops. They live in a repo you control.",
  },
  {
    k: "Partnership",
    title: "Training & ongoing support",
    body: "Get your team fluent in the tools that matter, then keep us on retainer for monthly check-ins, async support, and priority access as the stack evolves.",
  },
] as const;

/** Who we work with — note: platforms added (homepage parity). */
const audiences = [
  { title: "Labels", body: "Modernize A&R, marketing, and catalog strategy — from indie imprints to majors." },
  { title: "Catalogs & rights owners", body: "Diligence, royalty intelligence, and audience development on top of the data you already hold." },
  { title: "Distributors & platforms", body: "Give your artists and clients music-aware agents without standing up a model team of your own." },
  { title: "Management companies", body: "Scale what your team does for artists — strategy, content, and revenue ops — without scaling headcount." },
] as const;

/** Why work with the people who build the tools (replaces the personal résumé). */
const why = [
  {
    title: "We build the tools we recommend",
    body: "Open-source skills, an API, and MCP integrations — not vendor-neutral slideware. You can read exactly what we ship before we ship it to you.",
  },
  {
    title: "We run our own label on it",
    body: "Recoup Records and our artist Gatsby Grace run on the same agents and skills. Every workflow earns its keep on a real roster before we recommend it.",
  },
  {
    title: "You own what we build",
    body: "Agents, skills, and workflows live in your stack or a repo your organization controls, with data boundaries scoped before we build.",
  },
] as const;

/* ── Page ───────────────────────────────────────────────────────────── */

export default function ConsultingPage() {
  return (
    <div className="bg-(--background) text-(--foreground)">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(consultingFaq)) }}
      />
      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-20 sm:pb-24">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10 text-center">
          <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--foreground)/45 mb-6">
            Consulting
          </p>
          <h1 className="font-pixel text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.03] tracking-tight mb-6">
            We implement AI inside<br className="hidden sm:block" /> your music business.
          </h1>
          <p className="text-(--foreground)/60 text-[clamp(1.0625rem,1.5vw,1.25rem)] font-ui leading-[1.55] max-w-[620px] mx-auto mb-9">
            Recoup is a research lab and implementation partner. Work directly
            with the team that builds the tools — on strategy, rollout, and
            custom agents that run in your stack. Not slide decks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="cta-pulse font-ui font-semibold bg-(--foreground) text-(--background) px-9 py-4 rounded-full text-[15px] hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5"
            >
              Talk to us
            </a>
            <Link
              href="/platform"
              className="font-ui font-medium text-[15px] text-(--foreground)/55 hover:text-(--foreground) transition-colors flex items-center gap-1.5"
            >
              See the open tools <ArrowRight size={15} />
            </Link>
          </div>
          <p className="font-ui text-[12px] text-(--foreground)/40 mt-7">
            You own what we build.{" "}
            <Link
              href="/trust"
              className="underline decoration-(--foreground)/25 underline-offset-2 hover:text-(--foreground) hover:decoration-(--foreground)/50 transition-colors"
            >
              See our data boundary
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Credibility block — logos + stats (W-17) */}
      <section className="pb-8">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <LogoBar />
          <div className="mt-12">
            <StatsStrip items={HOMEPAGE_STATS} />
          </div>
        </div>
      </section>

      {/* What working with us delivers */}
      <section className="py-20 sm:py-28 border-t border-(--border)">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">
            What you get
          </p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight leading-[1.05] mb-14 max-w-[640px]">
            Strategy, built into your stack.
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {engagements.map((e) => (
              <div
                key={e.title}
                className="flex flex-col rounded-2xl bg-(--background) p-7"
                style={{ boxShadow: "0 0 0 1px var(--border)" }}
              >
                <p className="font-pixel text-[10px] text-(--foreground)/35 uppercase tracking-[0.18em] mb-3">
                  {e.k}
                </p>
                <h3 className="font-ui font-bold text-[19px] text-(--foreground) mb-2 leading-snug">
                  {e.title}
                </h3>
                <p className="text-[14px] text-(--foreground)/55 leading-relaxed">
                  {e.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="py-20 sm:py-28 bg-(--muted)/40">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">
            Who we work with
          </p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight leading-[1.05] mb-14 max-w-[640px]">
            Built for the teams running music.
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {audiences.map((a) => (
              <div key={a.title} className="flex gap-4">
                <div className="shrink-0 w-1 rounded-full bg-(--foreground)/80" />
                <div>
                  <h3 className="font-ui font-bold text-[17px] mb-1.5">{a.title}</h3>
                  <p className="text-[14px] text-(--foreground)/55 leading-relaxed">{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why work with us */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">
            Why us
          </p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight leading-[1.05] mb-14 max-w-[640px]">
            Work with the people who build the tools.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {why.map((w) => (
              <div
                key={w.title}
                className="flex flex-col rounded-2xl bg-(--background) p-7"
                style={{ boxShadow: "0 0 0 1px var(--border)" }}
              >
                <h3 className="font-ui font-bold text-[18px] text-(--foreground) mb-2 leading-snug">
                  {w.title}
                </h3>
                <p className="text-[14px] text-(--foreground)/55 leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 max-w-[560px]">
            <FounderCard />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link
              href="/company/recoup-records"
              className="font-ui font-semibold text-[14px] text-(--foreground) inline-flex items-center gap-1.5 group"
            >
              See how we dogfood <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/trust"
              className="font-ui font-semibold text-[14px] text-(--foreground)/60 hover:text-(--foreground) transition-colors inline-flex items-center gap-1.5"
            >
              Read our trust &amp; governance
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[760px] mx-auto px-6 sm:px-10">
          <Testimonials />
        </div>
      </section>

      {/* Contact form (W-13 / W-14) */}
      <section id="contact" className="py-20 sm:py-28 bg-(--muted)/40 scroll-mt-24">
        <div className="max-w-[640px] mx-auto px-6 sm:px-10">
          <div className="text-center mb-8">
            <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">
              Start here
            </p>
            <h2 className="font-pixel text-[clamp(1.75rem,3.5vw,2.5rem)] tracking-tight leading-[1.08] mb-4">
              Start with a conversation.
            </h2>
            <p className="text-[15px] text-(--foreground)/60 leading-relaxed">
              Sessions start at{" "}
              <span className="font-semibold text-(--foreground)">$500</span>. Scope
              and pricing depend on what you need — one call, an implementation
              sprint, or ongoing support.
            </p>
          </div>
          <div
            className="rounded-2xl bg-(--background) p-7 sm:p-9"
            style={{ boxShadow: "0 0 0 1px var(--border)" }}
          >
            <ContactForm source="consulting" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28">
        <div className="max-w-[720px] mx-auto px-6 sm:px-10">
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4 text-center">
            FAQ
          </p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3rem)] tracking-tight leading-[1.05] mb-12 text-center">
            Questions, answered.
          </h2>
          <div className="space-y-2">
            {consultingFaq.map((item) => (
              <details key={item.q} className="group border-b border-(--border) py-4">
                <summary className="cursor-pointer font-ui font-semibold text-[15px] flex items-center justify-between gap-4 list-none">
                  {item.q}
                  <span className="shrink-0 text-(--foreground)/40 group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[14px] text-(--foreground)/55 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative py-28 sm:py-36 overflow-hidden dark-section-cta">
        <div className="max-w-[760px] mx-auto px-6 text-center relative z-10">
          <MantraClose tone="dark" />
          <h2 className="font-pixel text-[clamp(2.25rem,6vw,4rem)] tracking-tight leading-[0.98] text-white mb-9">
            Let&apos;s build it<br />in your stack.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="cta-pulse font-ui font-semibold bg-white text-[#0a0a0a] px-9 py-4 rounded-full text-[15px] hover:bg-white/90 transition-all duration-300 hover:-translate-y-0.5"
            >
              Talk to us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
