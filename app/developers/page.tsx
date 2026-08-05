import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Terminal,
  Layout,
  Cpu,
  MousePointer,
  Code,
  Plug,
  BookOpen,
  Zap,
  GitBranch,
  Search,
  Music,
  FileText,
  Briefcase,
  Copy,
} from "lucide-react";
import { developersCopy } from "@/lib/copy/developers";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Developers — BYOA Plugin Catalog, Quick Start & API | ${siteConfig.name}`,
  description: `Install music industry plugins in Claude, Cursor, Codex, or any agent platform. ${siteConfig.name}'s BYOA architecture: 4 plugins, 30+ skills, 50+ API endpoints. Setup in under 60 seconds.`,
  path: "/developers",
});

/* ── Icon map for environments ─────────────────────────────────────── */
const envIcons: Record<string, typeof Terminal> = {
  terminal: Terminal,
  layout: Layout,
  cpu: Cpu,
  "mouse-pointer": MousePointer,
};

/* ── Icon map for plugins ──────────────────────────────────────────── */
const pluginIcons: Record<string, typeof Terminal> = {
  platform: Plug,
  research: Search,
  content: Music,
  catalogs: Briefcase,
};

/**
 * Developers page — comprehensive BYOA quick-start guide + plugin catalog.
 *
 * Rebuilt Aug 5, 2026 from thin 4-section layout.
 */
export default function DevelopersPage() {
  const c = developersCopy;

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <header className="max-w-4xl mx-auto px-6 pt-24 sm:pt-32 pb-16 text-center">
        <div className="inline-block rounded-full border border-[var(--border)] px-4 py-1.5 text-xs font-medium tracking-wide uppercase mb-6">
          Bring Your Own Agent
        </div>
        <h1
          className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] text-[var(--foreground)] mb-5"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          {c.headline}
        </h1>
        <p className="text-[clamp(1rem,1.5vw,1.2rem)] text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
          {c.description}
        </p>
      </header>

      {/* ── Aggregate Stats Strip ── */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {c.stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 rounded-lg"
              style={{
                boxShadow:
                  "0 0 0 1px color-mix(in srgb, var(--foreground) 10%, transparent)",
              }}
            >
              <div
                className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-1"
                style={{ fontFamily: "var(--font-bitmap), monospace" }}
              >
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-[var(--muted-foreground)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quick Start ── */}
      <section
        id="quick-start"
        className="scroll-mt-24 py-16 sm:py-20 bg-[color-mix(in_srgb,var(--foreground)_3%,transparent)]"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
              Quick Start
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] mb-3"
              style={{ fontFamily: "var(--font-bitmap), monospace" }}
            >
              {c.quickStart.title}
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
              {c.quickStart.description}
            </p>
          </div>

          <div className="space-y-8">
            {c.quickStart.steps.map((step) => (
              <div
                key={step.step}
                className="rounded-lg p-6 sm:p-8"
                style={{
                  boxShadow:
                    "0 0 0 1px color-mix(in srgb, var(--foreground) 10%, transparent)",
                  background: "var(--background)",
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center text-sm font-bold"
                    style={{ fontFamily: "var(--font-bitmap), monospace" }}
                  >
                    {step.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
                      {step.description}
                    </p>
                    {step.code && (
                      <div className="relative group">
                        <pre className="bg-[#111] text-[#e0e0e0] rounded-md p-4 text-xs sm:text-sm overflow-x-auto leading-relaxed">
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plugin Catalog ── */}
      <section id="plugins" className="scroll-mt-24 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
              Plugins
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] mb-3"
              style={{ fontFamily: "var(--font-bitmap), monospace" }}
            >
              {c.plugins.title}
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
              {c.plugins.description}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {c.plugins.items.map((plugin) => {
              const Icon = pluginIcons[plugin.id] || Plug;
              return (
                <div
                  key={plugin.id}
                  className="rounded-lg p-6 sm:p-7 flex flex-col"
                  style={{
                    boxShadow:
                      "0 0 0 1px color-mix(in srgb, var(--foreground) 10%, transparent)",
                  }}
                >
                  {/* Plugin header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[var(--foreground)]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-[var(--foreground)] leading-tight">
                        {plugin.name}
                      </h3>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                        {plugin.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
                    {plugin.description}
                  </p>

                  {/* Stat badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)] text-[var(--foreground)]">
                      {plugin.skills} skills
                    </span>
                    {plugin.commands > 0 && (
                      <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)] text-[var(--foreground)]">
                        {plugin.commands} commands
                      </span>
                    )}
                    <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)] text-[var(--foreground)]">
                      {plugin.highlight}
                    </span>
                  </div>

                  {/* Use cases */}
                  <ul className="space-y-1.5 mb-5 flex-1">
                    {plugin.useCases.map((uc, i) => (
                      <li
                        key={i}
                        className="text-xs text-[var(--muted-foreground)] flex items-start gap-2"
                      >
                        <span className="text-[var(--foreground)] mt-0.5 flex-shrink-0">
                          ›
                        </span>
                        {uc}
                      </li>
                    ))}
                  </ul>

                  {/* Install command */}
                  <div className="mt-auto">
                    <pre className="bg-[#111] text-[#e0e0e0] rounded-md px-3 py-2 text-xs overflow-x-auto">
                      <code>claude plugin install {plugin.repo}</code>
                    </pre>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Environments ── */}
      <section
        id="environments"
        className="scroll-mt-24 py-16 sm:py-20 bg-[color-mix(in_srgb,var(--foreground)_3%,transparent)]"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
              Environments
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] mb-3"
              style={{ fontFamily: "var(--font-bitmap), monospace" }}
            >
              {c.environments.title}
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
              {c.environments.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {c.environments.items.map((env) => {
              const Icon = envIcons[env.icon] || Terminal;
              return (
                <div
                  key={env.id}
                  className="rounded-lg p-5 sm:p-6"
                  style={{
                    boxShadow:
                      "0 0 0 1px color-mix(in srgb, var(--foreground) 10%, transparent)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-5 h-5 text-[var(--foreground)]" />
                    <h3 className="text-sm font-semibold text-[var(--foreground)]">
                      {env.name}
                    </h3>
                  </div>
                  {env.installCommand ? (
                    <pre className="bg-[#111] text-[#e0e0e0] rounded-md px-3 py-2 text-xs overflow-x-auto">
                      <code>{env.installCommand}</code>
                    </pre>
                  ) : env.steps ? (
                    <ol className="space-y-1.5">
                      {env.steps.map((step, i) => (
                        <li
                          key={i}
                          className="text-xs text-[var(--muted-foreground)] flex items-start gap-2"
                        >
                          <span className="text-[var(--foreground)] font-medium flex-shrink-0 w-4 text-right">
                            {i + 1}.
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Code Examples ── */}
      <section id="examples" className="scroll-mt-24 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
              Examples
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] mb-3"
              style={{ fontFamily: "var(--font-bitmap), monospace" }}
            >
              {c.codeExamples.title}
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
              {c.codeExamples.description}
            </p>
          </div>

          <div className="space-y-4">
            {c.codeExamples.examples.map((example, i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden"
                style={{
                  boxShadow:
                    "0 0 0 1px color-mix(in srgb, var(--foreground) 10%, transparent)",
                }}
              >
                <div className="bg-[#111] px-4 py-3 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <code className="text-emerald-400 text-xs sm:text-sm font-mono">
                    {example.command}
                  </code>
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {example.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture ── */}
      <section
        id="architecture"
        className="scroll-mt-24 py-16 sm:py-20 bg-[color-mix(in_srgb,var(--foreground)_3%,transparent)]"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
              Architecture
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] mb-3"
              style={{ fontFamily: "var(--font-bitmap), monospace" }}
            >
              {c.architecture.title}
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
              {c.architecture.description}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {c.architecture.features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg p-6"
                style={{
                  boxShadow:
                    "0 0 0 1px color-mix(in srgb, var(--foreground) 10%, transparent)",
                }}
              >
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── API Surface ── */}
      <section id="api" className="scroll-mt-24 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
              API
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] mb-3"
              style={{ fontFamily: "var(--font-bitmap), monospace" }}
            >
              {c.apiSurface.title}
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto">
              {c.apiSurface.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {c.apiSurface.categories.map((cat) => (
              <div
                key={cat.name}
                className="rounded-lg p-5"
                style={{
                  boxShadow:
                    "0 0 0 1px color-mix(in srgb, var(--foreground) 10%, transparent)",
                }}
              >
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  {cat.endpoints}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href={siteConfig.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)] hover:opacity-70 transition-opacity"
            >
              <BookOpen className="w-4 h-4" />
              Full API documentation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 sm:py-20 bg-[color-mix(in_srgb,var(--foreground)_3%,transparent)]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] mb-4"
            style={{ fontFamily: "var(--font-bitmap), monospace" }}
          >
            {c.finalCta.headline}
          </h2>
          <p className="text-[var(--muted-foreground)] mb-8 leading-relaxed">
            {c.finalCta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={c.finalCta.primary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] px-6 py-3 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <BookOpen className="w-4 h-4" />
              {c.finalCta.primary.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={c.finalCta.secondary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)] hover:opacity-70 transition-opacity"
            >
              <GitBranch className="w-4 h-4" />
              {c.finalCta.secondary.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
