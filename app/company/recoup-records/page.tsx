import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { companyRecoupRecordsCopy } from "@/lib/copy/company";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `${siteConfig.name} Records — Our AI-Run Music Label | ${siteConfig.name}`,
  description: `${siteConfig.name} Records runs on our own platform. Every release, marketing push, and piece of content executed by AI agents — the proof the system works.`,
  path: "/company/recoup-records",
});

const SKILLS_REPO = "https://github.com/recoupable/skills";

/**
 * Company: Recoup Records — the dogfooding proof page. Copy from lib/copy/company
 * (single source for human + machine view). Each "runs on" card links to the real
 * open skill on GitHub so the claim is verifiable.
 */
export default function RecoupRecordsPage() {
  const c = companyRecoupRecordsCopy;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-12">
        <Link
          href="/company"
          className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-4 inline-block"
        >
          ← Company
        </Link>
        <p className="font-pixel text-[10px] uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-4">
          The proof
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4">
          {c.title}
        </h1>
        <p className="text-xl text-[var(--muted-foreground)] leading-relaxed">
          {c.subtitle}
        </p>
      </header>

      <p className="text-[16px] leading-relaxed text-[var(--foreground)] mb-12">
        {c.intro}
      </p>

      <h2 className="font-pixel text-[11px] uppercase tracking-[0.18em] text-[var(--muted-foreground)] mb-5">
        What runs on it
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {c.runsOn.map((item) => (
          <a
            key={item.skill}
            href={`${SKILLS_REPO}/tree/main/skills/${item.skill}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl p-5 transition-colors hover:bg-[var(--muted)]/40"
            style={{ boxShadow: "0 0 0 1px var(--border)" }}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="font-semibold text-[15px] text-[var(--foreground)]">
                {item.title}
              </h3>
              <ArrowUpRight
                size={14}
                className="shrink-0 text-[var(--muted-foreground)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
            <p className="text-[13px] leading-relaxed text-[var(--muted-foreground)]">
              {item.body}
            </p>
            <p className="font-mono text-[11px] text-[var(--muted-foreground)]/70 mt-3">
              {item.skill}
            </p>
          </a>
        ))}
      </div>

      <p className="font-display italic text-[18px] leading-relaxed text-[var(--foreground)] mb-12">
        {c.footer}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-[var(--border)]">
        <Link
          href="/consulting"
          className="inline-flex items-center justify-center bg-[var(--foreground)] text-[var(--background)] px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Run this on your roster
        </Link>
        <a
          href={SKILLS_REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-6 py-3 text-sm font-semibold text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors"
        >
          Browse the open skills <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
}
