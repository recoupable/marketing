/**
 * Developers page copy — single source for human UI and machine markdown.
 */
import { siteConfig } from "@/lib/config";

export const developersCopy = {
  title: "Developers",
  description:
    "The music layer for your agents — open skills, a music-native API, and MCP. Build on the same system Recoup Records runs on.",
  installCommand: "npx skills add recoupable/skills",
  installNote: "Installs the open skills into Claude, Cursor, or your own stack.",
  sections: [
    {
      id: "skills",
      title: "Open skills",
      description:
        "Open-source skills our own agents run every day — music research, chart metrics, content creation, release management, streaming growth. Install the whole repo with one command.",
      linkLabel: "Browse the skills",
      linkHref: "https://github.com/recoupable/skills",
    },
    {
      id: "api",
      title: "API",
      description: `A music-native API for agents and automation. Trigger workflows, sync catalog and audience data, and build on the same system ${siteConfig.name} Records runs on.`,
      linkLabel: "API reference",
      linkHref: siteConfig.docsUrl,
    },
    {
      id: "mcp",
      title: "MCP",
      description:
        "Connect over the Model Context Protocol so any agent — yours, your team's, or your customers' — can securely call Recoup's music tools with no custom glue code.",
    },
    {
      id: "cli",
      title: "CLI",
      description:
        "Drive the same capabilities from your terminal — automation, scripting, and CI pipelines.",
    },
    {
      id: "docs",
      title: "Docs",
      description:
        "API reference, authentication, and use cases — the full, LLM-readable documentation.",
      linkLabel: "developers.recoupable.com",
      linkHref: siteConfig.docsUrl,
    },
  ],
  ctaLabel: "Read the docs",
  ctaHref: siteConfig.docsUrl,
} as const;

export type DevelopersCopy = typeof developersCopy;

export function developersToMarkdown(c: DevelopersCopy): string {
  const lines: string[] = [
    `# ${c.title} — ${siteConfig.name}`,
    "",
    c.description,
    "",
    "```",
    c.installCommand,
    "```",
    "",
    c.installNote,
    "",
    "---",
    "",
    ...c.sections.flatMap((s) => {
      const block = [`## ${s.title}`, "", s.description];
      if ("linkLabel" in s && s.linkLabel && s.linkHref) {
        block.push("", `[${s.linkLabel}](${s.linkHref})`);
      }
      block.push("");
      return block;
    }),
    "---",
    "",
    `[${c.ctaLabel}](${c.ctaHref})`,
  ];
  return lines.join("\n");
}
