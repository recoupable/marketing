/**
 * Recoup OS copy — the flagship product page.
 *
 * Recoup OS is the paid mega-plugin: every Recoup skill (and the skills bundled
 * across our individual plugins) packaged into one install. It's the headline
 * SKU — the "buy the whole operating system" option, sitting above the free
 * individual skills and below the hosted Chat app in the value ladder.
 *
 * NOTE: `price` is a PLACEHOLDER pending a real number (IA-PLAN.md §6.4).
 */
import { siteConfig } from "@/lib/config";

export const recoupOsCopy = {
  eyebrow: "Recoup OS",
  title: "The operating system for the modern label.",
  description:
    "Every Recoup skill — research, catalog diligence, content, release ops, and growth — in one installable plugin. The whole stack your agents run on, in a single download.",
  /** Placeholder pricing — replace with the real number when set. */
  price: "$499",
  priceUnit: "one-time",
  priceNote: "Free updates for a year. Open skills stay free individually.",
  primaryCta: { label: "Get Recoup OS", href: "/pricing" },
  secondaryCta: { label: "See what's inside", href: "#inside" },

  /** Surfaces Recoup OS installs into. */
  hosts: ["Claude Code", "Cursor", "Cowork", "Codex"],

  /** The skill domains bundled into the OS (mirrors the homepage skill packs). */
  inside: [
    {
      name: "Music Research",
      description:
        "Artist analytics, audience and people search, playlist intelligence, competitive analysis, and web research — the groundwork for catalog and deal work.",
    },
    {
      name: "Catalog & Diligence",
      description:
        "Data-room ingestion, royalty normalization, rights checks, IC memos, and valuation analysis for buy-side and seller-prep.",
    },
    {
      name: "Content Creation",
      description:
        "Draft, edit, and batch content for artists across every surface — built for how labels actually ship a release.",
    },
    {
      name: "Release Management",
      description:
        "Plan and run releases end to end: timelines, pitch prep, asset checklists, and post-release follow-through.",
    },
    {
      name: "Streaming Growth",
      description:
        "Audience growth playbooks, chart tracking, and the metrics that tell you what's actually working.",
    },
  ],

  /** Why buy the bundle instead of cherry-picking skills. */
  whyBundle: [
    "One install — every skill, wired to work together, instead of assembling pieces.",
    "Cross-skill workflows: research feeds content, content feeds release ops.",
    "Updated as a unit, so your agents always run the current playbooks.",
    "The same system Recoup Records runs every day.",
  ],

  faq: [
    {
      q: "How is this different from the free skills?",
      a: "The individual skills are open and free to install one at a time. Recoup OS bundles all of them — plus the skills inside our plugins — into a single install, wired to work together and updated as one product.",
    },
    {
      q: "Where does it run?",
      a: "Recoup OS installs into Claude Code, Cursor, Cowork, and Codex. It's a plugin you own and run in your own environment — your private work stays yours.",
    },
    {
      q: "Do I still get the individual plugins?",
      a: "Yes. We still publish individual skills and plugins for teams that only want one piece. Recoup OS is for teams that want the whole operating system.",
    },
    {
      q: "Not technical?",
      a: `If you'd rather not install anything, the same skills run inside Chat — our hosted workspace. And if you want it built and run for you, that's what Consulting is for.`,
    },
  ],
  repoUrl: "https://github.com/recoupable/marketplace",
} as const;

export type RecoupOsCopy = typeof recoupOsCopy;

export function recoupOsToMarkdown(c: RecoupOsCopy): string {
  const lines: string[] = [
    `# ${c.eyebrow}: ${c.title} — ${siteConfig.name}`,
    "",
    c.description,
    "",
    `Price: ${c.price} ${c.priceUnit}. ${c.priceNote}`,
    `Runs in: ${c.hosts.join(", ")}`,
    "",
    "## What's inside",
    "",
    ...c.inside.map((i) => `- **${i.name}** — ${i.description}`),
    "",
    "## Why the bundle",
    "",
    ...c.whyBundle.map((w) => `- ${w}`),
    "",
    "## FAQ",
    "",
    ...c.faq.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
  ];
  return lines.join("\n");
}
