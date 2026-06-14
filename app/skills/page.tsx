import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { skillsCopy } from "@/lib/copy/skills";
import { recoupOsCopy } from "@/lib/copy/recoupOs";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Skills — Open Skills, Plugins, API & MCP for Music",
  description:
    "The open building blocks for music agents: free skills, a plugins marketplace, a music-native API, and MCP. Install into Claude, Cursor, or your own stack — or get them all in Recoup OS.",
  path: "/skills",
});

/** Skills page — the open building-block surface (copy from lib/copy/skills). */
export default function SkillsPage() {
  const c = skillsCopy;

  return (
    <div className="bg-(--background) text-(--foreground)">
      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-12 sm:pb-16">
        <div className="max-w-[860px] mx-auto px-6 sm:px-10 text-center">
          <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--foreground)/45 mb-6">
            Products · Skills
          </p>
          <h1 className="font-pixel text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.03] tracking-tight mb-6">
            {c.title}
          </h1>
          <p className="text-(--foreground)/60 text-[clamp(1.0625rem,1.5vw,1.25rem)] font-ui leading-[1.55] max-w-[640px] mx-auto mb-8">
            {c.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {c.surfaces.map((s) => (
              <span
                key={s}
                className="text-[10px] font-pixel text-(--foreground)/40 uppercase tracking-[0.15em] px-3 py-1.5 rounded-full"
                style={{ boxShadow: "0 0 0 1px var(--border)" }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Install callout */}
      <section className="pb-8">
        <div className="max-w-[560px] mx-auto px-6">
          <div
            className="rounded-xl bg-(--muted)/60 px-5 py-5 sm:px-6"
            style={{ boxShadow: "0 0 0 1px var(--border)" }}
          >
            <p className="font-ui text-[11px] font-semibold text-(--foreground)/40 uppercase tracking-[0.18em] mb-3">
              Install the open skills
            </p>
            <code
              className="block font-mono text-[12px] bg-(--background) px-3 py-2.5 rounded-md text-(--foreground)/80"
              style={{ boxShadow: "0 0 0 1px var(--border)" }}
            >
              <span className="text-(--foreground)/35">$</span> {c.install}
            </code>
            <p className="text-center text-[12px] text-(--foreground)/40 mt-3">
              One command installs the whole open repo.{" "}
              <a
                href={siteConfig.skillsRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui font-semibold text-(--foreground)/70 hover:text-(--foreground) transition-colors inline-flex items-center gap-1"
              >
                Browse all skills <ArrowUpRight size={12} />
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Recoup OS feature band */}
      <section className="pb-8">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <Link
            href="/recoup-os"
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-(--accent-soft) px-7 py-6 transition-shadow"
            style={{ boxShadow: "0 0 0 1px var(--accent)" }}
          >
            <div>
              <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--accent) mb-2">
                {recoupOsCopy.eyebrow}
              </p>
              <p className="font-ui font-bold text-[18px] text-(--foreground) leading-snug">
                Want every skill in one install?
              </p>
              <p className="text-[14px] text-(--foreground)/60 leading-relaxed mt-1 max-w-[560px]">
                Recoup OS bundles all of them — wired to work together, updated as
                one product. The whole operating system for the modern label.
              </p>
            </div>
            <span className="shrink-0 inline-flex items-center gap-1.5 font-ui font-semibold text-[14px] text-(--accent)">
              Explore Recoup OS
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </section>

      {/* Sections */}
      <section className="py-12 sm:py-20">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {c.sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="flex flex-col rounded-2xl bg-(--background) p-7 scroll-mt-24"
                style={{ boxShadow: "0 0 0 1px var(--border)" }}
              >
                <h2 className="font-ui font-bold text-[19px] text-(--foreground) mb-2 leading-snug">
                  {section.title}
                </h2>
                <p className="text-[14px] text-(--foreground)/55 leading-relaxed">
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plugins marketplace */}
      <section id="plugins" className="pb-16 sm:pb-24 scroll-mt-24">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <div className="max-w-[640px] mb-10">
            <p className="font-pixel text-[10px] uppercase tracking-[0.22em] text-(--foreground)/45 mb-4">
              {c.plugins.heading}
            </p>
            <p className="text-(--foreground)/60 text-[clamp(1rem,1.4vw,1.1875rem)] font-ui leading-[1.55]">
              {c.plugins.description}
            </p>
            <code
              className="mt-6 block font-mono text-[12px] bg-(--muted)/60 px-3.5 py-2.5 rounded-md text-(--foreground)/80"
              style={{ boxShadow: "0 0 0 1px var(--border)" }}
            >
              <span className="text-(--foreground)/35">$</span> {c.plugins.install}
            </code>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {c.plugins.items.map((plugin) => (
              <div
                key={plugin.name}
                className="flex flex-col rounded-2xl bg-(--background) p-7"
                style={{ boxShadow: "0 0 0 1px var(--border)" }}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="font-ui font-bold text-[17px] text-(--foreground) leading-snug">
                    {plugin.name}
                  </h3>
                  <code className="font-mono text-[11px] text-(--foreground)/55 bg-(--muted)/60 px-2 py-1 rounded">
                    {plugin.command}
                  </code>
                </div>
                <p className="text-[14px] text-(--foreground)/55 leading-relaxed">
                  {plugin.description}
                </p>
              </div>
            ))}
          </div>

          <p className="text-[13px] text-(--foreground)/40 mt-8">
            Works with Claude Code, Cowork, and Codex.{" "}
            <a
              href={c.plugins.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui font-semibold text-(--foreground)/70 hover:text-(--foreground) transition-colors inline-flex items-center gap-1"
            >
              Browse the marketplace <ArrowUpRight size={12} />
            </a>
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative py-28 sm:py-36 overflow-hidden dark-section-cta">
        <div className="max-w-[760px] mx-auto px-6 text-center relative z-10">
          <h2 className="font-pixel text-[clamp(2rem,5vw,3.5rem)] tracking-tight leading-[1.02] text-white mb-9">
            Build on the music layer.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/recoup-os"
              className="cta-pulse font-ui font-semibold bg-white text-[#0a0a0a] px-9 py-4 rounded-full text-[15px] hover:bg-white/90 transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-1.5"
            >
              Get Recoup OS
            </Link>
            <a
              href={c.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui font-medium text-sm text-white/45 hover:text-white/80 transition-colors flex items-center gap-1.5"
            >
              {c.ctaLabel} <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
