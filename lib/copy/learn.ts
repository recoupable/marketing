/**
 * Learn/Resources page copy — single source for machine markdown.
 */

const RESOURCE_LINKS = [
  { label: "Blog", href: "/resources" },
  { label: "Records", href: "/records" },
];

export const learnCopy = {
  title: "Resources",
  description:
    "Blog, use cases, playbooks, demos. Run your music business with agents.",
  links: RESOURCE_LINKS,
} as const;

export function learnToMarkdown(c: typeof learnCopy): string {
  return [
    `# ${c.title} — Recoup`,
    "",
    c.description,
    "",
    "---",
    "",
    ...c.links.map((l) => `- [${l.label}](${l.href})`),
  ].join("\n");
}
