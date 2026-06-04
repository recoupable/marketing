import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { companyRecoupRecordsCopy } from "@/lib/copy/company";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `${siteConfig.name} Records — AI-Run Label Proof & Workflows`,
  description: `${siteConfig.name} Records runs on our own platform. Every release, marketing push, and piece of content executed by AI agents — the proof the system works.`,
  path: "/company/recoup-records",
});

/**
 * Company: Recoup Records — the dogfooding proof page. Copy from lib/copy/company
 * (single source for human + machine view). Each "runs on" card links to the real
 * open skill on GitHub so the claim is verifiable.
 */
export default function RecoupRecordsPage() {
  const c = companyRecoupRecordsCopy;

  return (
    <div className="bg-(--background) text-(--foreground)">
      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-20 sm:pb-24">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10">
          <Link
            href="/company"
            className="inline-flex items-center gap-1.5 font-ui text-[13px] text-(--foreground)/45 hover:text-(--foreground) transition-colors mb-10"
          >
            <ArrowLeft size={14} /> Company
          </Link>

          <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--foreground)/45 mb-6">
            The proof
          </p>
          <h1 className="font-pixel text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.03] tracking-tight mb-6">
            {c.title}
          </h1>
          <p className="text-(--foreground)/60 text-[clamp(1.0625rem,1.5vw,1.25rem)] font-ui leading-[1.55] max-w-[640px] mb-8">
            {c.subtitle}
          </p>
          <p className="text-[15px] text-(--foreground)/65 leading-relaxed max-w-[640px]">
            {c.intro}
          </p>
        </div>
      </section>

      {/* What runs on it */}
      <section className="py-20 sm:py-28 border-t border-(--border)">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <p className="font-ui text-[11px] font-semibold text-(--foreground)/30 uppercase tracking-[0.2em] mb-4">
            What runs on it
          </p>
          <h2 className="font-pixel text-[clamp(2rem,4.5vw,3.25rem)] tracking-tight leading-[1.05] mb-14 max-w-[640px]">
            Every workflow is a real skill.
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {c.runsOn.map((item) => (
              <a
                key={item.skill}
                href={`${siteConfig.skillsRepoUrl}/tree/main/skills/${item.skill}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl bg-(--background) p-7 transition-colors hover:bg-(--muted)/40"
                style={{ boxShadow: "0 0 0 1px var(--border)" }}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-ui font-bold text-[19px] text-(--foreground) leading-snug">
                    {item.title}
                  </h3>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-(--foreground)/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
                <p className="text-[14px] text-(--foreground)/55 leading-relaxed">
                  {item.body}
                </p>
                <p className="font-mono text-[11px] text-(--foreground)/40 mt-4">
                  {item.skill}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial pull-quote + CTA */}
      <section className="py-20 sm:py-28 bg-(--muted)/40">
        <div className="max-w-[720px] mx-auto px-6 sm:px-10 text-center">
          <p className="font-display italic text-[clamp(1.375rem,3vw,1.875rem)] leading-[1.35] text-(--foreground) mb-10">
            {c.footer}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/consulting"
              className="cta-pulse font-ui font-semibold bg-(--foreground) text-(--background) px-9 py-4 rounded-full text-[15px] hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              Run this on your roster <ArrowRight size={15} />
            </Link>
            <a
              href={siteConfig.skillsRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui font-medium text-[15px] text-(--foreground)/55 hover:text-(--foreground) transition-colors flex items-center gap-1.5"
            >
              Browse the open skills <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
