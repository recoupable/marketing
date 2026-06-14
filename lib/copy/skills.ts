/**
 * Skills page copy — the "build it yourself" half of the old Platform page.
 *
 * This is the open building-block surface: free individual skills, the plugins
 * marketplace, a music-native API, and MCP. Recoup OS (the paid mega-plugin) is
 * featured from here; Chat (the hosted app) is its own page.
 */
import { siteConfig } from "@/lib/config";

export const skillsCopy = {
  title: "Open skills for music agents.",
  description:
    "The building blocks our own agents run every day — music research, chart metrics, content, release management, and growth. Free to install into Claude, Cursor, or your own stack. Want all of them, wired together? That's Recoup OS.",
  install: siteConfig.skillsInstallCommand,
  surfaces: ["Claude", "Cursor", "API", "MCP"],

  sections: [
    {
      id: "skills",
      title: "Open skills",
      description:
        "Open-source skills our own agents run every day — music research, chart metrics, content creation, release management, streaming growth. Install the whole repo into Claude, Cursor, or your stack with one command.",
    },
    {
      id: "api",
      title: "API",
      description: `A music-native API for agents and automation. Trigger workflows, sync catalog and audience data, and build on the same system ${siteConfig.name} Records runs on.`,
    },
    {
      id: "mcp",
      title: "MCP",
      description:
        "Connect over the Model Context Protocol so any agent — yours, your team's, or your customers' — can securely call Recoup's music tools with no custom glue code.",
    },
    {
      id: "integrations",
      title: "Integrations",
      description:
        "Slack, email, socials, catalog, distribution, Drive. Connect what you use; agents work across one context and only touch the systems you explicitly allow.",
    },
  ],

  plugins: {
    heading: "Plugins marketplace",
    description:
      "Native bundles for Claude Code, Cowork, and Codex — the open skills plus commands, subagents, and deeper API-backed research and catalog workflows. Add the marketplace once, then install any plugin.",
    repo: "https://github.com/recoupable/marketplace",
    install: "/plugin marketplace add recoupable/marketplace",
    items: [
      {
        name: "Research",
        command: "/workflow:research",
        description:
          "API-backed artist analytics, audience insights, playlist intelligence, competitive analysis, trend detection, and outreach — deeper than the open research skill.",
      },
      {
        name: "Catalog deals",
        command: "/workflow:diligence",
        description:
          "Buy-side and seller-prep diligence: data-room ingestion, royalty normalization, rights checks, IC memos, and valuation analysis.",
      },
      {
        name: "Content",
        command: "/workflow:content",
        description:
          "Draft, edit, and publish content for artists across every surface — built for the way labels actually ship.",
      },
      {
        name: "Platform",
        command: "/workflow:platform",
        description: `Cross-cutting skills and workflows for working with ${siteConfig.name}'s chat, API, and platform surface.`,
      },
    ],
  },

  ctaLabel: "Read the API docs",
  ctaHref: siteConfig.docsUrl,
} as const;

export type SkillsCopy = typeof skillsCopy;

export function skillsToMarkdown(c: SkillsCopy): string {
  const lines: string[] = [
    `# ${c.title} — ${siteConfig.name}`,
    "",
    c.description,
    "",
    `Surfaces: ${c.surfaces.join(", ")}`,
    `Install: \`${c.install}\``,
    "",
    "---",
    "",
    ...c.sections.flatMap((s) => [`## ${s.title}`, "", s.description, ""]),
    "---",
    "",
    `## ${c.plugins.heading}`,
    "",
    c.plugins.description,
    "",
    `Install: \`${c.plugins.install}\` — ${c.plugins.repo}`,
    "",
    ...c.plugins.items.map((p) => `- **${p.name}** (\`${p.command}\`) — ${p.description}`),
    "",
    "---",
    "",
    `[${c.ctaLabel}](${c.ctaHref})`,
  ];
  return lines.join("\n");
}
