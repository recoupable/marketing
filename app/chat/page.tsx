import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { chatCopy } from "@/lib/copy/chat";
import { buildPageMetadata } from "@/lib/seo";
import { ReceiptsTable } from "@/components/marketing/ReceiptsTable";

export const metadata: Metadata = buildPageMetadata({
  title: "Chat — The Hosted Workspace for Music Teams",
  description:
    "Recoup Chat is the hosted workspace where the same skills that run our own label work for your team — research, content, and catalog ops in the browser. No install, no setup.",
  path: "/chat",
});

/** Chat page — the hosted web app (copy from lib/copy/chat). */
export default function ChatPage() {
  const c = chatCopy;

  return (
    <div className="bg-(--background) text-(--foreground)">
      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-14 sm:pb-20">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10 text-center">
          <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--foreground)/45 mb-6">
            Products · Chat
          </p>
          <h1 className="font-pixel text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.03] tracking-tight mb-6">
            {c.title}
          </h1>
          <p className="text-(--foreground)/60 text-[clamp(1.0625rem,1.5vw,1.25rem)] font-ui leading-[1.55] max-w-[620px] mx-auto mb-8">
            {c.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={c.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-pulse font-ui font-semibold bg-(--foreground) text-(--background) px-9 py-4 rounded-full text-[15px] hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-1.5"
            >
              {c.primaryCta.label} <ArrowUpRight size={15} />
            </a>
            <Link
              href={c.secondaryCta.href}
              className="font-ui font-medium text-[15px] text-(--foreground)/55 hover:text-(--foreground) transition-colors flex items-center gap-1.5"
            >
              {c.secondaryCta.label} <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-14 sm:py-20">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <div className="max-w-[620px] mb-10">
            <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--foreground)/45 mb-4">
              What you can do
            </p>
            <h2 className="font-pixel text-[clamp(1.75rem,4vw,2.75rem)] tracking-tight leading-[1.05]">
              The work, without the setup.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {c.capabilities.map((cap) => (
              <div
                key={cap.title}
                className="flex flex-col rounded-2xl bg-(--background) p-6"
                style={{ boxShadow: "0 0 0 1px var(--border)" }}
              >
                <h3 className="font-ui font-bold text-[16px] text-(--foreground) mb-2 leading-snug">
                  {cap.title}
                </h3>
                <p className="text-[14px] text-(--foreground)/55 leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why hosted */}
      <section className="py-14 sm:py-20 bg-(--muted)/40">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10">
          <h2 className="font-pixel text-[clamp(1.5rem,3.5vw,2.5rem)] tracking-tight leading-[1.08] mb-8">
            Why the hosted version.
          </h2>
          <ul className="space-y-4 max-w-[640px]">
            {c.why.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <Check size={18} className="mt-0.5 shrink-0 text-(--accent)" />
                <span className="text-[15px] sm:text-[16px] text-(--foreground)/70 leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Receipts — generic chatbot vs Recoup */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <h2 className="font-pixel text-[clamp(1.75rem,4vw,2.75rem)] tracking-tight leading-[1.05] mb-3">
            Not just another chatbot.
          </h2>
          <p className="text-[15px] text-(--foreground)/55 leading-relaxed max-w-[560px] mb-10">
            The difference between a general chatbot and a workspace built for
            music work, line by line.
          </p>
          <ReceiptsTable />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative py-28 sm:py-36 overflow-hidden dark-section-cta">
        <div className="max-w-[760px] mx-auto px-6 text-center relative z-10">
          <h2 className="font-pixel text-[clamp(2rem,5vw,3.5rem)] tracking-tight leading-[1.02] text-white mb-9">
            Open it and start.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={c.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-pulse font-ui font-semibold bg-white text-[#0a0a0a] px-9 py-4 rounded-full text-[15px] hover:bg-white/90 transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-1.5"
            >
              {c.ctaLabel} <ArrowUpRight size={15} />
            </a>
            <Link
              href="/pricing"
              className="font-ui font-medium text-sm text-white/45 hover:text-white/80 transition-colors flex items-center gap-1.5"
            >
              See pricing <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
