/**
 * Developers page copy — single source for human UI and machine markdown.
 */
import { siteConfig } from "@/lib/config";

export const developersCopy = {
  title: "Developers",
  description:
    "Music-native agent infrastructure. Not a wrapper around ChatGPT — real architecture you can build on. API, CLI, MCP, multi-model AI.",
  sections: [
    {
      id: "api",
      title: "API",
      description:
        "RESTful API for agents, workflows, data, and content. Programmatic access to everything Recoupable does. Integrate into your tools, pipelines, and products.",
      linkLabel: "API reference",
      linkHref: siteConfig.docsUrl,
    },
    {
      id: "cli",
      title: "CLI",
      description:
        "Published to npm as `recoup`. Same capabilities as the web app, from your terminal. Automation, scripting, CI/CD integration. Research artists, generate content, manage catalogs.",
    },
    {
      id: "mcp",
      title: "MCP Server",
      description:
        "Model Context Protocol integration for agent-to-agent communication. Connect Recoupable as a tool provider for your own AI agents. Music-specific tools available as MCP resources.",
    },
    {
      id: "skills",
      title: "Skills System",
      description:
        "Modular, extensible agent capabilities. Each skill is a focused, composable unit — content creation, audience research, catalog analysis, distribution. Build custom skills or use the built-in set.",
    },
    {
      id: "multi-model",
      title: "Multi-Model AI",
      description:
        "Anthropic, OpenAI, Google Gemini. Pick the right model for the task. Not locked to one provider. The platform routes to the best model for each operation.",
    },
    {
      id: "sandboxes",
      title: "Sandbox Infrastructure",
      description:
        "Isolated execution environments for heavy tasks — content generation, data processing, file operations. Artist data stored in structured file systems. Agents spin up sandboxes as needed.",
    },
    {
      id: "docs",
      title: "Documentation",
      description:
        "Full API reference, authentication guides, use cases, and integration patterns. LLM-readable at developers.recoupable.com.",
      linkLabel: "developers.recoupable.com",
      linkHref: siteConfig.docsUrl,
    },
  ],
  ctaLabel: "View docs",
  ctaHref: siteConfig.docsUrl,
} as const;

export type DevelopersCopy = typeof developersCopy;

export function developersToMarkdown(c: DevelopersCopy): string {
  const lines: string[] = [
    `# ${c.title} — Recoupable`,
    "",
    c.description,
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
