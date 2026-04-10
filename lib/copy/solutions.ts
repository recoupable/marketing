/**
 * Solutions page copy — single source for human UI and machine markdown.
 */
import { siteConfig } from "@/lib/config";

export const solutionsCopy = {
  title: "Solutions",
  description:
    "Artists, labels, distributors, catalog owners. One system. Agents run your music operations.",
  segments: [
    {
      id: "artists",
      title: "For Artists",
      summary: "Run your career without a team.",
      description:
        "Agents replace managers, marketers, analysts. Release strategy, content, fan growth, ops. One system.",
    },
    {
      id: "labels",
      title: "For Labels",
      summary: "Scale without headcount.",
      description:
        "Same execution across the roster. Agents handle marketing, reporting, audience research. Your team focuses on A&R and strategy.",
    },
    {
      id: "distributors",
      title: "For Distributors",
      summary: "Standardize. Automate. Scale.",
      description:
        "Agent-powered music operations for clients or internal teams. Consistent execution. Less manual work. Better data.",
    },
    {
      id: "catalog-owners",
      title: "For Catalog Owners",
      summary: "Optimize and monetize with agents.",
      description:
        "Catalog automation. Revenue tracking. Marketing. Agents run ops. You run the business.",
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
    ]),
    "---",
    "",
    `[${c.ctaLabel}](${c.ctaHref})`,
  ];
  return lines.join("\n");
}
