/**
 * Learn page copy — single source for machine markdown.
 * Human view is just link list; copy here for consistent machine view.
 */
import { nav } from "@/lib/nav";

export const learnCopy = {
  title: "Learn",
  description:
    "Blog, use cases, playbooks, demos. Run your music business with agents.",
  links: nav.learn.items,
} as const;

export function learnToMarkdown(c: typeof learnCopy): string {
  return [
    `# ${c.title} — Recoupable`,
    "",
    c.description,
    "",
    "---",
    "",
    ...c.links.map((l) => `- [${l.label}](${l.href})`),
  ].join("\n");
}
