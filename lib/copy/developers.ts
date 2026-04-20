/**
 * Developers page copy — single source for human UI and machine markdown.
 */
import { siteConfig } from "@/lib/config";

export const developersCopy = {
  title: "Developers",
  description:
    "Music-specific agent infrastructure. API, CLI, integrations.",
  sections: [
    {
      id: "api",
      title: "API",
      description: `Agents, workflows, data. Programmatic access. Integrate ${siteConfig.name} into your tools and pipelines.`,
      linkLabel: "API reference",
      linkHref: siteConfig.docsUrl,
    },
    {
      id: "cli",
      title: "CLI",
      description:
        "Automation, scripting, CI. Same capabilities as the app. From your terminal.",
    },
    {
      id: "docs",
      title: "Docs",
      description:
        "API, authentication, use cases. Full documentation.",
      linkLabel: "developers.recoupable.com",
      linkHref: siteConfig.docsUrl,
    },
    {
      id: "use-cases",
      title: "Use Cases",
      description:
        "Trigger agents from your app. Sync catalog. Build dashboards. More in Learn.",
    },
  ],
  ctaLabel: "View docs",
  ctaHref: siteConfig.docsUrl,
} as const;

export type DevelopersCopy = typeof developersCopy;

export function developersToMarkdown(c: DevelopersCopy): string {
  const lines: string[] = [
    `# ${c.title} — ${siteConfig.name}`,
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
