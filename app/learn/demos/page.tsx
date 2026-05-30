import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Demos — See Music Agents in Action | Learn | ${siteConfig.name}`,
  description: `See ${siteConfig.name} in action. Demos and walkthroughs of AI agents running music operations — releases, marketing, fan growth, and catalog analysis.`,
  path: "/learn/demos",
});

const demos = [
  {
    title: "Artist Intelligence",
    description:
      "Search any artist and see live streaming analytics, audience intelligence, competitive positioning, and AI-powered insights — the same data your agents use.",
    href: "/learn/demos/artist-intelligence",
    badge: "Live",
  },
];

export default function DemosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-12">
        <Link
          href="/learn"
          className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-4 inline-block"
        >
          ← Learn
        </Link>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4">
          Demos
        </h1>
        <p className="text-xl text-[var(--muted-foreground)]">
          See {siteConfig.name} in action. Try our tools with real music data.
        </p>
      </header>

      <div className="space-y-4">
        {demos.map((demo) => (
          <Link
            key={demo.href}
            href={demo.href}
            className="block border border-[var(--border)] rounded-lg p-6 hover:border-[var(--foreground)] transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                {demo.title}
              </h2>
              {demo.badge && (
                <span className="text-[10px] font-medium uppercase tracking-wider bg-green-500/10 text-green-400 border border-green-500/20 rounded-full px-2 py-0.5">
                  {demo.badge}
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--muted-foreground)]">
              {demo.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 border border-[var(--border)] rounded-lg p-6">
        <p className="text-[var(--muted-foreground)] text-sm mb-4">
          Want to go deeper? The best demo is the product itself — install a
          Recoup plugin in your agent and try it with your own data.
        </p>
        <Link
          href="/developers"
          className="text-sm text-[var(--foreground)] hover:underline"
        >
          Developer docs →
        </Link>
      </div>
    </div>
  );
}
