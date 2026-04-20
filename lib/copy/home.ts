/**
 * Homepage copy — single source for human UI and machine markdown.
 * Edit here only; both views stay in sync.
 */
import { siteConfig } from "@/lib/config";

export const homeCopy = {
  hero: {
    headline: "Your label. Run by agents.",
    subheader:
      "You create. Agents run strategy, content, fans, revenue. One system.",
    ctaPrimary: "Get started",
    ctaHref: siteConfig.appUrl,
  },
  pain: {
    title: "Hustle by default. Systems by design.",
    items: [
      "Every hat: creator, A&R, marketer, analyst",
      "Scaling with bodies, not systems",
      "Data in ten places. Decisions from gut feel.",
      "You got into music. You're stuck in ops.",
    ],
  },
  whatWeDo: {
    title: "Infrastructure. Outcomes.",
    subtitle:
      "Not a chatbot. Not a scheduler. One system. Agents run it.",
    outcomes: [
      {
        title: "Release execution",
        description:
          "Plan and ship. Agents handle strategy, timelines, execution.",
      },
      {
        title: "Audience research",
        description:
          "Know your fans. Where they are. Agents surface it. You decide.",
      },
      {
        title: "Marketing that runs",
        description:
          "Content, campaigns, growth. Agents run it. No spreadsheets.",
      },
      {
        title: "Catalog and revenue",
        description: "Agents work it. You see the picture.",
      },
    ],
  },
  useCases: {
    title: "For everyone who runs music",
    segments: [
      {
        title: "Artists",
        description:
          "Your operation. No full team. Agents replace manager, marketer, analyst.",
      },
      {
        title: "Labels and distributors",
        description:
          "Scale without headcount. One system. Same execution across the roster.",
      },
      {
        title: "Developers",
        description:
          "Music-native infrastructure. API, CLI, integrations. Build on the stack.",
      },
    ],
  },
  howItWorks: {
    title: "How it works",
    steps: [
      {
        title: "Connect your data",
        description:
          "Catalog, socials, distribution. One pipe. No chasing.",
      },
      {
        title: "Set the direction",
        description: "Releases, marketing, growth. You call shots. Agents get the brief.",
      },
      {
        title: "Agents run it",
        description: "They execute. You create.",
      },
    ],
    platformLink: "/platform",
    platformLinkLabel: "See the platform",
  },
  proof: {
    quote:
      "10pm: sit down to make content. Midnight: 22 finished videos. Captioned. Formatted. Queued. I didn't edit one.",
    attribution: "— Sidney Swift, Founder. We run our label on it.",
  },
  subscribe: {
    title: "Stay in the loop",
    description:
      "Music ops. Agent infrastructure. Run a label without burnout.",
  },
  closing: {
    line1: "Music's going autonomous. Recoup's the infrastructure.",
    line2: "Build your label. Run it with agents.",
    ctaLabel: "Get started",
    ctaHref: siteConfig.appUrl,
  },
  blog: {
    title: "Latest",
    viewAllLabel: "View all",
    viewAllHref: "/blog",
  },
} as const;

export type HomeCopy = typeof homeCopy;

export function homeToMarkdown(c: HomeCopy): string {
  const lines: string[] = [
    "# Recoup",
    "",
    `**${c.hero.headline}**`,
    "",
    c.hero.subheader,
    "",
    `[${c.hero.ctaPrimary}](${c.hero.ctaHref})`,
    "",
    "---",
    "",
    `## ${c.pain.title}`,
    "",
    ...c.pain.items.map((i) => `- ${i}`),
    "",
    "---",
    "",
    `## ${c.whatWeDo.title}`,
    "",
    c.whatWeDo.subtitle,
    "",
    ...c.whatWeDo.outcomes.map(
      (o) => `### ${o.title}\n${o.description}`
    ),
    "",
    "---",
    "",
    `## ${c.useCases.title}`,
    "",
    ...c.useCases.segments.map(
      (s) => `### ${s.title}\n${s.description}`
    ),
    "",
    "---",
    "",
    `## ${c.howItWorks.title}`,
    "",
    ...c.howItWorks.steps.map(
      (s, i) => `${i + 1}. **${s.title}** — ${s.description}`
    ),
    "",
    `[${c.howItWorks.platformLinkLabel}](${c.howItWorks.platformLink})`,
    "",
    "---",
    "",
    "## Proof",
    "",
    `"${c.proof.quote}"`,
    "",
    c.proof.attribution,
    "",
    "---",
    "",
    "## Closing",
    "",
    c.closing.line1,
    "",
    c.closing.line2,
    "",
    `[${c.closing.ctaLabel}](${c.closing.ctaHref})`,
  ];
  return lines.join("\n");
}
