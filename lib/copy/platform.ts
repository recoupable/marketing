/**
 * Platform page copy — single source for human UI and machine markdown.
 * Positioning (2026-06): the open "music layer for agents" — skills, API, MCP,
 * integrations, and a hosted workspace. Not a self-serve SaaS feature bundle.
 */
import { siteConfig } from "@/lib/config";

export const platformCopy = {
  title: "The music layer for agents.",
  description:
    "Open skills, an API, and MCP integrations that put music intelligence into Claude, Cursor, Chat, and your own stack. One harness, many workflows — bring your own agent, Recoup plugs in.",
  /** The surfaces an agent can run through. */
  surfaces: ["Claude", "Cursor", "API", "MCP", "Chat"],
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
    {
      id: "chat",
      title: "Chat",
      description:
        "Not technical? Chat is a hosted workspace where the same skills run for your team — no setup, no terminal. The on-ramp for everyone who isn't building agents themselves.",
    },
  ],
  ctaLabel: "Read the API docs",
  ctaHref: siteConfig.docsUrl,
} as const;

export type PlatformCopy = typeof platformCopy;

export function platformToMarkdown(c: PlatformCopy): string {
  const lines: string[] = [
    `# ${c.title} — ${siteConfig.name}`,
    "",
    c.description,
    "",
    `Surfaces: ${c.surfaces.join(", ")}`,
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
