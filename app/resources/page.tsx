import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `Resources — Tools, Blog & More | ${siteConfig.name}`,
  description:
    "Tools, blog posts, playbooks, and demos. Everything you need to run your music business with AI agents.",
  path: "/resources",
});

const resources = [
  {
    title: "ROI Calculator",
    description:
      "See how much time and money AI agents could save your team. Input your numbers, get your answer.",
    href: "/tools/roi",
    badge: "New",
  },
  {
    title: "Blog",
    description:
      "Insights on AI in music, agent architecture, and running a modern label.",
    href: "/blog",
  },
  {
    title: "The Playbook",
    description:
      "A tactical guide to running your music business with AI agents.",
    href: "/playbook",
  },
  {
    title: "Demos",
    description:
      "See Recoup in action. Walkthroughs of agents running real music operations.",
    href: "/learn/demos",
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <header className="text-center mb-16">
        <h1
          className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight leading-[1.1] mb-4"
          style={{ fontFamily: "var(--font-bitmap), monospace" }}
        >
          Resources
        </h1>
        <p className="text-[15px] text-[var(--muted-foreground)] max-w-md mx-auto">
          Tools, guides, and insights to help you run your music business with
          AI.
        </p>
      </header>

      <div className="grid gap-4">
        {resources.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="group flex items-start justify-between gap-4 rounded-xl border border-[var(--border)] p-6 transition-colors hover:bg-[var(--secondary)]"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-base font-semibold">{r.title}</h2>
                {r.badge && (
                  <span
                    className="text-[9px] uppercase tracking-wider bg-[var(--foreground)] text-[var(--background)] px-2 py-0.5 rounded-full"
                    style={{ fontFamily: "var(--font-bitmap), monospace" }}
                  >
                    {r.badge}
                  </span>
                )}
              </div>
              <p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed">
                {r.description}
              </p>
            </div>
            <span className="text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors mt-1 shrink-0">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
