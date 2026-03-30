/**
 * Platform page copy — single source for human UI and machine markdown.
 */
import { siteConfig } from "@/lib/config";

export const platformCopy = {
  title: "Platform",
  description:
    "One system that runs your music business. Agents execute — content, marketing, research, catalog. Not a chatbot. Not a feature bundle. Infrastructure.",
  sections: [
    {
      id: "deep-context",
      title: "Deep Artist Context",
      description:
        "Every agent knows your artist — songs, face guide, brand docs, audience data, catalog. This context layer is why output is artist-specific, not generic slop. General-purpose AI doesn't know your artist. Recoupable does.",
    },
    {
      id: "content-pipeline",
      title: "Content Pipeline",
      description:
        "Album visualizers, social posts, lyric videos, face-powered content. Agents create using real artist assets — your music, your face, your brand. 22 videos in one session, zero editing. Output that's good enough to post.",
    },
    {
      id: "agents",
      title: "Agents That Execute",
      description:
        "AI agents that do the work — not just recommend. Release strategy, marketing campaigns, audience research, catalog analysis. Task-focused. Built for music. Autonomous.",
    },
    {
      id: "workflows",
      title: "Workflows and Tasks",
      description:
        "Multi-step operations. Agents run in sequence or parallel. Schedule daily briefings, automated content runs, recurring reports. Set it once. It runs.",
    },
    {
      id: "integrations",
      title: "Every Entry Point",
      description:
        "Web, Slack, email, CLI — all entry points into the same system. Talk to your agent however you work. Connect socials, distribution, catalog. One pipe.",
    },
    {
      id: "data-layer",
      title: "Data Layer",
      description:
        "Catalog, social metrics, fan data, streaming stats. Agents use it all. You get one view of your music business instead of ten dashboards.",
    },
    {
      id: "api-cli",
      title: "API, CLI, and MCP",
      description:
        "Build on Recoupable. RESTful API for programmatic access. CLI published to npm as `recoup`. MCP server for agent-to-agent communication. Multi-model: Anthropic, OpenAI, Google Gemini.",
    },
  ],
  notSection: {
    title: "What this is not",
    items: [
      "Not a chatbot — agents execute, not just answer questions",
      "Not a social media scheduler — we create AND distribute",
      "Not a wrapper around ChatGPT — multi-model, Skills system, sandbox infrastructure",
      "Not a feature bundle — one system, agents run it",
    ],
  },
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
    `## ${c.notSection.title}`,
    "",
    ...c.notSection.items.map((item) => `- ${item}`),
    "",
    "---",
    "",
    `[${c.ctaLabel}](${c.ctaHref})`,
  ];
  return lines.join("\n");
}
