/**
 * Company pages copy — vision, about, recoup-records.
 * Single source for human UI and machine markdown.
 */
import { siteConfig } from "@/lib/config";

export const companyVisionCopy = {
  title: "Vision",
  anchor:
    "The music industry is going agentic. We're building the layer it runs on.",
  paragraphs: [
    `${siteConfig.name} is a research lab and implementation partner for the agentic music industry. We work with labels, catalogs, and platforms — researching what AI can actually do for music, building the open tools to do it, and implementing them inside real teams' stacks.`,
    "The winners won't be the teams with the flashiest chatbot. They'll be the ones whose agents have real music context, safe access to their systems, and workflows built for how the business actually runs. That's what we build — in the open, and alongside you.",
    `We run our own label on the same tools we sell. If a workflow can't carry weight on a real roster, we don't publish it — and we don't recommend it to yours. You own what we build, and we never train on your data.`,
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
  description: "A research lab and implementation partner for the agentic music industry.",
  body: `${siteConfig.name} builds the music layer for AI agents — open-source skills, an API, and MCP integrations — and works hands-on with labels, catalogs, and platforms to put them to work inside their own stacks. We run our own label on the same tools. You own what we build, and we never train on your data.`,
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
