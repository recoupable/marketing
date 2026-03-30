/**
 * Company pages copy — vision, about, recoupable-records.
 * Single source for human UI and machine markdown.
 */
import { siteConfig } from "@/lib/config";

export const companyVisionCopy = {
  title: "Vision",
  anchor: "Imagine if a major record label was run by code instead of humans. That's what we're building.",
  paragraphs: [
    "The music industry runs on hustle — every artist, label, and distributor drowning in operational work that AI can handle. Release strategy, marketing, content, analytics, catalog management. Too much time on ops. Not enough on music.",
    "Recoupable is the infrastructure layer for autonomous music businesses. Not a chatbot. Not a tool. The system that runs music operations through agents. Define goals, connect data, agents do the work.",
    "The same loop that works for code — idea, agent, review, ship — works for music. Brief, agent, review, post. One system. Every entry point: web, Slack, email, CLI. Same agents. Same context. Same outcomes.",
    "We use enterprise customers to learn the music business deeply. We use our own label to dogfood the product. Eventually, the infrastructure becomes the product that everyone — artists, labels, distributors — runs on.",
    "Music businesses are going autonomous. Recoupable is how they run.",
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
  description: "The company building the infrastructure for autonomous music businesses.",
  body: "Recoupable builds AI infrastructure for the music industry — agents and tools that run music businesses. Content creation, analytics, marketing, catalog management. One system for artists, labels, distributors, and developers.",
  founder: {
    name: "Sidney Swift",
    role: "Founder & CEO",
    bio: "Sidney builds Recoupable and runs the label on it. Before this, he was in the studio — writing, producing, and releasing music. He started Recoupable because he lived the problem: too much time on marketing and ops, not enough on creating. The product exists because he needed it first.",
  },
  mission: "Build the infrastructure layer for autonomous music businesses. Use enterprise customers to learn the industry deeply. Use the label to dogfood the product. Make it the system everyone runs on.",
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
    `## ${c.founder.name}`,
    "",
    `**${c.founder.role}**`,
    "",
    c.founder.bio,
    "",
    "---",
    "",
    c.mission,
    "",
    `- Contact: ${c.contactEmail}`,
    `- Support: ${c.supportEmail}`,
    `- ${c.legal}`,
  ].join("\n");
}

export const companyRecoupableRecordsCopy = {
  title: "Recoupable Records",
  subtitle: "We don't just build tools for labels. We are a label.",
  body: "Recoupable Records runs entirely on the platform we sell. Every release, marketing push, content run — agents execute. The infrastructure we build is the infrastructure we use. That's how we know it works.",
  proof: {
    headline: "Gatsby Grace",
    description:
      "AI artist co-owned 50/50 with Rostrum Records. 22 videos produced in one session, zero manual editing. Rostrum's A&R team didn't realize Gatsby was AI until told — validation that the output quality is real.",
  },
  vision:
    "The goal: 5-10 human artists plus unlimited AI artists. 50/50 JV deals with existing labels. Use AI to 10x output with fewer than 20 people. Compete in the arena with major labels.",
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
    `## ${c.proof.headline}`,
    "",
    c.proof.description,
    "",
    "---",
    "",
    c.vision,
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
