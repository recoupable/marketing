/**
 * Solutions page copy — single source for human UI and machine markdown.
 */
import { siteConfig } from "@/lib/config";

export const solutionsCopy = {
  title: "Solutions",
  description:
    "Artists, labels, distributors, catalog owners. One system. Agents run your music operations so you can focus on what matters.",
  segments: [
    {
      id: "artists",
      title: "For Artists",
      summary: "Run your career without a full team.",
      description:
        "Agents replace manager, marketer, analyst. Release strategy, content creation, fan growth, daily ops — one system handles it. The agent reads your brand docs, knows your music, understands your fans.",
      pain: "You got into music. You're stuck in ops. The algorithm punishes silence but creating content takes forever.",
      objection: "Will it sound like me?",
      answer:
        "Context files per artist. The agent reads your voice, brand docs, and face guide before creating anything. Gatsby Grace: industry A&R couldn't tell it was AI.",
    },
    {
      id: "labels",
      title: "For Labels",
      summary: "Scale without headcount.",
      description:
        "Same execution across the entire roster. Agents handle marketing, content, reporting, audience research. Your team focuses on A&R and relationships. $5-10k/month for agents instead of $15-25k per hire.",
      pain: "Can't scale without hiring. Operations are fragmented across spreadsheets, dashboards, and Google Docs. Content doesn't scale — 120,000 tracks hit DSPs every day.",
      objection: "We need control over brand voice for each artist.",
      answer:
        "Context files per artist — voice guides, brand docs, face guides. Every piece of content is artist-specific. Same infrastructure, unique output per artist.",
    },
    {
      id: "distributors",
      title: "For Distributors",
      summary: "Standardize. Automate. Scale.",
      description:
        "Agent-powered music operations for your clients and internal teams. Consistent execution across thousands of releases. Less manual work. Better data. One system that every team runs on.",
      pain: "Growth means more staff doing the same manual work. No standardization across the roster.",
      objection: "Our artists and clients have different needs.",
      answer:
        "One platform, per-artist context. Each artist gets their own context files, their own agent behavior. Same infrastructure, different output.",
    },
    {
      id: "catalog-owners",
      title: "For Catalog Owners",
      summary: "Optimize and monetize with agents.",
      description:
        "Deal ingestion, catalog analysis, revenue tracking, marketing automation. Agents normalize incoming data rooms, extract key terms from contracts, and flag anomalies in partner statements. Reduce deal book creation from days to hours.",
      pain: "Deal flow is too slow. Manual due diligence. Revenue reporting scattered across partner statements.",
      objection: "Our deals are complex and unique.",
      answer:
        "Human-in-the-loop: analysts keep their process while the system learns alongside. Agents handle the heavy lifting, humans make the decisions.",
    },
  ],
  ctaLabel: "Get started",
  ctaHref: siteConfig.appUrl,
} as const;

export type SolutionsCopy = typeof solutionsCopy;

export function solutionsToMarkdown(c: SolutionsCopy): string {
  const lines: string[] = [
    `# ${c.title} — Recoupable`,
    "",
    c.description,
    "",
    "---",
    "",
    ...c.segments.flatMap((s) => [
      `## ${s.title}`,
      "",
      `**${s.summary}**`,
      "",
      s.description,
      "",
      `**The pain:** ${s.pain}`,
      "",
      `**"${s.objection}"** — ${s.answer}`,
      "",
    ]),
    "---",
    "",
    `[${c.ctaLabel}](${c.ctaHref})`,
  ];
  return lines.join("\n");
}
