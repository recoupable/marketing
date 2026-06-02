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
  subtitle: "Our own label and artist run on the same tools we sell.",
  intro: `${siteConfig.name} Records is our in-house label, and Gatsby Grace is the artist we develop on it. Everything we ship to clients earns its keep here first — the open skills, the agents, and the platform all run a real roster before we ever recommend them to yours.`,
  /** How the label actually uses the system, each tied to a real open skill. */
  runsOn: [
    {
      title: "Release planning",
      body: "Agents draft and run release campaigns end to end — timelines, assets, and the checklist of who does what before drop day.",
      skill: "release-management",
    },
    {
      title: "Artist & catalog research",
      body: "Artist analytics, audience breakdowns, and competitive analysis pulled together into briefs we actually act on.",
      skill: "music-industry-research",
    },
    {
      title: "Content production",
      body: "Social videos, short-form clips, and visual content generated from the catalog — the same content engine our clients install.",
      skill: "content-creation",
    },
    {
      title: "Audience growth",
      body: "Tracking Gatsby Grace toward the streaming milestones that unlock playlisting and platform tools.",
      skill: "streaming-growth",
    },
  ],
  footer: `If a skill can't carry weight on our own roster, we don't publish it — and we don't sell it.`,
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
    c.intro,
    "",
    ...c.runsOn.flatMap((r) => [`## ${r.title}`, "", r.body, ""]),
    "---",
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
