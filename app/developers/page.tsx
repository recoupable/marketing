import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { developersCopy } from "@/lib/copy/developers";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Developers — Open Skills, Music API & MCP",
  description: `Build on ${siteConfig.name}'s music layer for agents: open-source skills, a music-native API, MCP integrations, and a CLI — the same system Recoup Records runs on.`,
  path: "/developers",
});

/**
 * Developers page — copy from lib/copy/developers (single source for human + machine view).
 */
export default function DevelopersPage() {
  const c = developersCopy;

  return (
    <div className="bg-(--background) text-(--foreground)">
      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-12 sm:pb-16">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10 text-center">
          <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--foreground)/45 mb-6">
            {c.title}
          </p>
          <h1 className="font-pixel text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.03] tracking-tight mb-6">
            Build on the music layer.
          </h1>
          <p className="text-(--foreground)/60 text-[clamp(1.0625rem,1.5vw,1.25rem)] font-ui leading-[1.55] max-w-[620px] mx-auto">
            {c.description}
          </p>
        </div>
      </section>

      {/* Install callout */}
      <section className="pb-20">
        <div className="max-w-[640px] mx-auto px-6 sm:px-10">
          <div
            className="rounded-2xl p-6 bg-(--background)"
            style={{ boxShadow: "0 0 0 1px var(--border)" }}
          >
            <p className="font-pixel text-[10px] uppercase tracking-[0.18em] text-(--foreground)/40 mb-3">
              Install the open skills
            </p>
            <div
              className="rounded-lg px-4 py-3 font-mono text-[13px] text-(--foreground)/85 bg-(--foreground)/[0.04]"
              style={{ boxShadow: "0 0 0 1px var(--border)" }}
            >
              <span className="text-(--foreground)/40 select-none">$ </span>
              {c.installCommand}
            </div>
            <p className="font-ui text-[12px] text-(--foreground)/45 mt-3">
              {c.installNote}
            </p>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="pb-24">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-10 grid sm:grid-cols-2 gap-5">
          {c.sections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="scroll-mt-24 rounded-2xl p-7 bg-(--background) transition-all duration-300 hover:-translate-y-1"
              style={{ boxShadow: "0 0 0 1px var(--border)" }}
            >
              <h2 className="font-ui font-bold text-[18px] mb-2.5">
                {section.title}
              </h2>
              <p className="font-ui text-[14px] text-(--foreground)/60 leading-[1.55] mb-4">
                {section.description}
              </p>
              {"linkLabel" in section && section.linkLabel && section.linkHref && (
                <Link
                  href={section.linkHref}
                  className="font-ui text-[13px] font-medium text-(--foreground) inline-flex items-center gap-1 hover:opacity-70 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {section.linkLabel} <ArrowUpRight size={13} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-28 sm:py-36 overflow-hidden dark-section-cta">
        <div className="max-w-[760px] mx-auto px-6 text-center relative z-10">
          <h2 className="font-pixel text-[clamp(2rem,5vw,3.5rem)] tracking-tight leading-[1.02] text-white mb-9">
            Read the docs.
          </h2>
          <p className="text-white/45 text-[15px] max-w-md mx-auto mb-9 leading-relaxed font-ui">
            Full, LLM-readable documentation for the API, authentication, and
            real use cases.
          </p>
          <a
            href={c.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-pulse font-ui font-semibold bg-white text-[#0a0a0a] px-9 py-4 rounded-full text-[15px] hover:bg-white/90 transition-all duration-300 hover:-translate-y-0.5 inline-block"
          >
            {c.ctaLabel}
          </a>
        </div>
      </section>
    </div>
  );
}
