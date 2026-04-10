/**
 * Company pages copy — vision, about, recoupable-records.
 * Single source for human UI and machine markdown.
 */
import { siteConfig } from "@/lib/config";

export const companyVisionCopy = {
  title: "Vision",
  anchor: "Music businesses are going autonomous. Recoupable is how they run.",
  paragraphs: [
    "Not a chatbot. Not a tool. The system that runs music businesses through agents. Artists, labels, distributors, catalog owners — too much time on ops that AI can run: release strategy, marketing, audience research, catalog. One platform: define goals, connect data, agents do the work.",
    "When someone hears Recoupable: the company building the future of music operations. Where AI actually does the work. The system serious teams use.",
    "The future of music runs itself. Recoupable makes it possible.",
  ],
} as const;

export function companyVisionToMarkdown(c: typeof companyVisionCopy): string {
  const lines: string[] = [
    `# ${c.title} — Recoupable`,
    "",
    c.anchor,
    "",
    "---",
    "",
    ...c.paragraphs,
  ];
  return lines.join("\n\n");
}

export const companyAboutCopy = {
  title: "About",
  description: "The company building the future of music operations.",
  body: "Recoupable is the platform for autonomous music businesses. The system that runs music operations through agents — for artists, labels, distributors, developers.",
  contactEmail: siteConfig.contactEmail,
  supportEmail: siteConfig.supportEmail,
  legal: `${siteConfig.legalName} · ${siteConfig.address}`,
} as const;

export function companyAboutToMarkdown(c: typeof companyAboutCopy): string {
  return [
    `# ${c.title} — Recoupable`,
    "",
    c.description,
    "",
    "---",
    "",
    c.body,
    "",
    `- Contact: ${c.contactEmail}`,
    `- Support: ${c.supportEmail}`,
    `- ${c.legal}`,
  ].join("\n");
}

export const companyRecoupableRecordsCopy = {
  title: "Recoupable Records",
  subtitle: "Our label runs on this system.",
  body: "Recoupable Records is the label — run entirely on Recoupable. Every release, marketing push, content run: agents execute. Same platform we sell. That's how we know it works.",
  footer: "Real outputs. Real growth loops. Real proof.",
} as const;

export function companyRecoupableRecordsToMarkdown(
  c: typeof companyRecoupableRecordsCopy
): string {
  return [
    `# ${c.title} — Recoupable`,
    "",
    c.subtitle,
    "",
    "---",
    "",
    c.body,
    "",
    c.footer,
  ].join("\n");
}

/** Company index: links only; minimal copy for machine view */
export const companyIndexCopy = {
  title: "Company",
  description: "Vision, Recoupable Records, who we are.",
  links: [
    { label: "Vision", href: "/company/vision" },
    { label: "Recoupable Records", href: "/company/recoupable-records" },
    { label: "About", href: "/company/about" },
  ],
} as const;

export function companyIndexToMarkdown(c: typeof companyIndexCopy): string {
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
