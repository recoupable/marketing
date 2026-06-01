import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";
import { InstallTabs } from "./InstallTabs";

export const metadata: Metadata = buildPageMetadata({
  title: `Plugin Marketplace — Music Agent Plugins | ${siteConfig.name}`,
  description:
    "Install music industry superpowers into your AI agent. Works with Claude Code, Cowork, Cursor, and Codex.",
  path: "/marketplace",
});

const plugins = [
  {
    name: "recoup-research-plugin",
    title: "recoup-research-plugin",
    description:
      "Music industry research for AI agents. Artist analytics, audience insights, playlist intelligence, competitive analysis, trend detection, and outreach.",
    stats: "7 skills",
    github: "https://github.com/recoupable/recoup-research-plugin",
    demo: { label: "Try Demo →", href: "/learn/demos/artist-intelligence" },
  },
  {
    name: "recoup-content-plugin",
    title: "recoup-content-plugin",
    description:
      "End-to-end content creation. Short-form music videos, captions, images — from artist name to finished social post.",
    stats: "2 skills",
    github: "https://github.com/recoupable/recoup-content-plugin",
  },
  {
    name: "recoup-platform-plugin",
    title: "recoup-platform-plugin",
    description:
      "Platform essentials. Account setup, artist workspace, API access, sandbox environments.",
    stats: "5 skills",
    github: "https://github.com/recoupable/recoup-platform-plugin",
  },
  {
    name: "music-catalog-diligence",
    title: "music-catalog-diligence",
    description:
      "Catalog acquisition intelligence. Royalty normalization, rights diligence, valuation workpapers, IC memos, seller prep.",
    stats: "9 skills · 6 commands",
    github: "https://github.com/recoupable/music-catalog-diligence",
  },
] as const;

export default function MarketplacePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4">
          Plugin Marketplace
        </h1>
        <p className="text-xl text-[var(--muted-foreground)]">
          Install music industry superpowers into your AI agent. Works with
          Claude Code, Cowork, Cursor, and Codex.
        </p>
      </header>

      <div className="space-y-8">
        {plugins.map((plugin) => (
          <section
            key={plugin.name}
            className="rounded-lg p-6 shadow-[0_0_0_1px_var(--border)] hover:shadow-[0_0_0_1px_var(--brand)] transition-shadow"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <h2 className="text-xl font-semibold text-[var(--foreground)] font-mono">
                {plugin.title}
              </h2>
              <span className="shrink-0 text-xs text-[var(--muted-foreground)] bg-[var(--foreground)]/5 px-2 py-1 rounded">
                {plugin.stats}
              </span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-3">
              {plugin.description}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link
                href={plugin.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--brand)] hover:underline"
              >
                GitHub →
              </Link>
              {"demo" in plugin && plugin.demo && (
                <Link
                  href={plugin.demo.href}
                  className="text-[var(--brand)] hover:underline"
                >
                  {plugin.demo.label}
                </Link>
              )}
            </div>
            <InstallTabs name={plugin.name} />
          </section>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/developers"
          className="inline-block bg-[var(--foreground)] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[var(--foreground)]/90 transition-colors"
        >
          Build Your Own Plugin
        </Link>
      </div>
    </div>
  );
}
