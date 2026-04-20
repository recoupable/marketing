/**
 * Company pages copy — vision, about, recoup-records.
 * Single source for human UI and machine markdown.
 */
import { siteConfig } from "@/lib/config";

export const companyVisionCopy = {
  title: "Vision",
  anchor: `Music businesses are going autonomous. ${siteConfig.name} is how they run.`,
  paragraphs: [
    "Not a chatbot. Not a tool. The system that runs music businesses through agents. Artists, labels, distributors, catalog owners — too much time on ops that AI can run: release strategy, marketing, audience research, catalog. One platform: define goals, connect data, agents do the work.",
    `When someone hears ${siteConfig.name}: the company building the future of music operations. Where AI actually does the work. The system serious teams use.`,
    `The future of music runs itself. ${siteConfig.name} makes it possible.`,
  ],
} as const;

export function companyVisionToMarkdown(c: typeof companyVisionCopy): string {
  const lines: string[] = [
    `# ${c.title} — ${siteConfig.name}`,
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
  body: `${siteConfig.name} is the platform for autonomous music businesses. The system that runs music operations through agents — for artists, labels, distributors, developers.`,
  contactEmail: siteConfig.contactEmail,
  supportEmail: siteConfig.supportEmail,
  legal: `${siteConfig.legalName} · ${siteConfig.address}`,
} as const;

export function companyAboutToMarkdown(c: typeof companyAboutCopy): string {
  return [
    `# ${c.title} — ${siteConfig.name}`,
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

export const companyRecoupRecordsCopy = {
  title: `${siteConfig.name} Records`,
  subtitle: "Our label runs on this system.",
  body: `${siteConfig.name} Records is the label — run entirely on ${siteConfig.name}. Every release, marketing push, content run: agents execute. Same platform we sell. That's how we know it works.`,
  footer: "Real outputs. Real growth loops. Real proof.",
} as const;

export function companyRecoupRecordsToMarkdown(
  c: typeof companyRecoupRecordsCopy
): string {
  return [
    `# ${c.title} — ${siteConfig.name}`,
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
  description: `Vision, ${siteConfig.name} Records, who we are.`,
  links: [
    { label: "Vision", href: "/company/vision" },
    { label: `${siteConfig.name} Records`, href: "/company/recoup-records" },
    { label: "About", href: "/company/about" },
  ],
} as const;

export function companyIndexToMarkdown(c: typeof companyIndexCopy): string {
  return [
    `# ${c.title} — ${siteConfig.name}`,
    "",
    c.description,
    "",
    "---",
    "",
    ...c.links.map((l) => `- [${l.label}](${l.href})`),
  ].join("\n");
}
