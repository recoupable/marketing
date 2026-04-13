/**
 * Platform page copy — single source for human UI and machine markdown.
 */
import { siteConfig } from "@/lib/config";

export const platformCopy = {
  title: "Platform",
  description:
    "Agents, workflows, integrations, data, API. One system that runs your music business. Not a chatbot. Not a feature bundle.",
  sections: [
    {
      id: "agents",
      title: "Agents",
      description:
        "AI agents that execute music operations. Release strategy, marketing, audience research, catalog. Task-focused. Built for music.",
    },
    {
      id: "workflows",
      title: "Workflows",
      description:
        "Multi-step operations. Agents run in sequence or parallel. You define goals. They execute and report.",
    },
    {
      id: "integrations",
      title: "Integrations",
      description:
        "Slack, email, socials, catalog, distribution. Connect what you use. One system. One context.",
    },
    {
      id: "data-layer",
      title: "Data Layer",
      description:
        "Catalog, social, fan data. Agents use it. You get one view of your music business.",
    },
    {
      id: "api-cli",
      title: "API & CLI",
      description:
        "Build on Recoupable. API and CLI for developers and automation. Same system. Your interface.",
    },
  ],
  ctaLabel: "Get started",
  ctaHref: siteConfig.appUrl,
} as const;

export type PlatformCopy = typeof platformCopy;

export function platformToMarkdown(c: PlatformCopy): string {
  const lines: string[] = [
    `# ${c.title} — Recoupable`,
    "",
    c.description,
    "",
    "---",
    "",
    ...c.sections.flatMap((s) => [`## ${s.title}`, "", s.description, ""]),
    "---",
    "",
    `[${c.ctaLabel}](${c.ctaHref})`,
  ];
  return lines.join("\n");
}
