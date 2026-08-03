/**
 * Solutions page copy — comprehensive segment-specific data.
 * Single source of truth for human UI and machine markdown.
 *
 * Rebuilt Aug 3, 2026 from thin 4-card layout to rich segment pages
 * with real metrics, capabilities, case studies, and segment-specific CTAs.
 */
import { siteConfig } from "@/lib/config";

/* ── Types ─────────────────────────────────────────────────────────── */

export interface Capability {
  title: string;
  description: string;
  metric?: string;
}

export interface SocialProof {
  quote: string;
  source: string;
  metric: string;
}

export interface Segment {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  capabilities: Capability[];
  socialProof?: SocialProof;
  cta: { label: string; href: string };
}

export interface AggStat {
  value: string;
  label: string;
}

/* ── Data ──────────────────────────────────────────────────────────── */

export const solutionsCopy = {
  title: "Solutions",
  headline: "One platform. Every role in the music business.",
  description:
    "Purpose-built AI agents that know your artists, your data, and your industry. Not generic chatbots — music-native intelligence for labels, artists, distributors, and catalog owners.",

  stats: [
    { value: "$15K+", label: "Monthly costs eliminated" },
    { value: "72 hrs", label: "Campaign turnaround" },
    { value: "40+", label: "Staff hours saved per month" },
    { value: "5", label: "Agent plugins shipped" },
  ] satisfies AggStat[],

  segments: [
    {
      id: "labels",
      title: "For Labels",
      subtitle: "Scale your roster without scaling your team.",
      description:
        "AI agents that handle content creation, reporting, artist research, and release strategy across your entire roster. Your team focuses on A&R and relationships — agents handle the operational grind.",
      capabilities: [
        {
          title: "Content Pipeline",
          description:
            "Generate 30 days of branded content in one session. Short-form video, captions, images — all on-brand, all automated. Editorial templates, not generic AI slop.",
          metric: "30 days of content per session",
        },
        {
          title: "Automated Reporting",
          description:
            "Weekly and monthly reports delivered automatically. Streaming data, social analytics, playlist tracking. Zero manual data pulls, zero staff hours.",
          metric: "40+ staff hours saved per month",
        },
        {
          title: "Artist Research",
          description:
            "Live data from Spotify, Apple Music, Chartmetric, and social platforms. Audience demographics, competitive analysis, playlist intelligence — all in one agent query.",
          metric: "Real-time streaming analytics",
        },
        {
          title: "Release Strategy",
          description:
            "Data-informed release plans generated per artist, per release. Timing, playlist targeting, content calendar, distribution strategy — automated and personalized.",
          metric: "Data-driven, not template-driven",
        },
        {
          title: "Plugin Ecosystem",
          description:
            "Install Recoup plugins in Claude, Cursor, Codex, or any agent platform. Research, content, catalog analysis, and platform management — your agents become music-native.",
          metric: "5 plugins and counting",
        },
      ],
      socialProof: {
        quote:
          "We were paying an agency the same amount to do a fraction of what Recoup handles for us.",
        source: "Rostrum Records",
        metric: "$5K/mo agency replaced",
      },
      cta: { label: "See how labels use Recoup", href: "/case-studies" },
    },
    {
      id: "artists",
      title: "For Artists",
      subtitle: "Run your career without a team.",
      description:
        "The same AI agents that power major labels — available to independent artists. Content creation, release strategy, audience intelligence, and career management. No manager, no agency, no five-figure retainers.",
      capabilities: [
        {
          title: "Content Creation",
          description:
            "Videos, captions, and images created from your music, your brand, and your audience data. Post-ready content without a creative director.",
          metric: "Post-ready in minutes",
        },
        {
          title: "Release Strategy",
          description:
            "Know when to release, where to promote, and how to position your music. Data-driven strategy that used to require a manager and a marketing team.",
          metric: "Same tools as the majors",
        },
        {
          title: "Audience Intelligence",
          description:
            "See who listens, where they are, what playlists feature you, how you compare to similar artists. Understand your audience without expensive analytics tools.",
          metric: "Cross-platform insights",
        },
        {
          title: "Career Operations",
          description:
            "Task scheduling, campaign tracking, email automation. Run your career operations the way a label runs a roster — but for a single artist, at a fraction of the cost.",
          metric: "Label-grade ops, artist budget",
        },
      ],
      cta: { label: "Value your catalog", href: "/valuation" },
    },
    {
      id: "distributors",
      title: "For Distributors",
      subtitle: "Agent-powered operations for your entire roster.",
      description:
        "Standardize and automate the services you provide to artists and labels. Onboarding, reporting, marketing — all running on agents that scale with your roster, not your headcount.",
      capabilities: [
        {
          title: "Onboarding Automation",
          description:
            "Give it a roster URL or CSV and it creates artist knowledge bases in parallel. Context engineering that used to take days, done in minutes.",
          metric: "40+ artists set up in parallel",
        },
        {
          title: "White-Label Agents",
          description:
            "Embed Recoup agents into your platform. Your brand, your interface, our music intelligence powering every interaction.",
          metric: "Your brand, our engine",
        },
        {
          title: "Cross-Roster Analytics",
          description:
            "Which artists are growing? Which releases need attention? Automated weekly digests across your entire catalog of distributed artists.",
          metric: "Roster-wide intelligence",
        },
        {
          title: "Client Value-Add",
          description:
            "Offer AI-powered marketing, analytics, and content as a service to your distributed artists. A new revenue stream, not a new hire.",
          metric: "Service tier, not headcount",
        },
      ],
      cta: { label: "See the platform", href: "/platform" },
    },
    {
      id: "catalog-owners",
      title: "For Catalog Owners",
      subtitle: "Intelligence for every catalog decision.",
      description:
        "From acquisition to optimization. AI agents that value catalogs from live streaming data, ingest deal rooms in hours instead of days, and find revenue opportunities in back-catalog that humans miss.",
      capabilities: [
        {
          title: "Live Catalog Valuation",
          description:
            "Measure your catalog's value from live Spotify play counts. One click, no uploads, no broker statements needed. Directional valuation bands in seconds.",
          metric: "Live data, not estimates",
        },
        {
          title: "Deal Ingestion",
          description:
            "Drop a data room — PDFs, CSVs, partner statements — and get a structured deal snapshot. Normalize any format into a consistent analysis in hours, not days.",
          metric: "Days compressed to hours",
        },
        {
          title: "Revenue Intelligence",
          description:
            "Track royalty streams across sources. Spot anomalies in partner statements, forecast growth curves, identify underperforming assets in your catalog.",
          metric: "Cross-source tracking",
        },
        {
          title: "Catalog Marketing",
          description:
            "Activate dormant catalog with automated content, playlist pitching, and audience targeting. Turn back-catalog into a growing revenue stream.",
          metric: "Revenue from dormant assets",
        },
      ],
      socialProof: {
        quote:
          "We had five people spending their Mondays pulling numbers. Now the reports are waiting for us when we get in.",
        source: "Parlophone (Warner Music Group)",
        metric: "40+ hours of reporting automated",
      },
      cta: { label: "Value your catalog", href: "/valuation" },
    },
  ] satisfies Segment[],

  crossCutting: {
    title: "Built for the AI-first music business",
    description:
      "Bring your own agent. Recoup works wherever your team already works.",
    features: [
      {
        title: "Bring Your Own Agent",
        description:
          "Use Recoup with Claude, Cursor, Codex, ChatGPT, or any agent that supports plugins. We meet your team where they already work.",
      },
      {
        title: "Music-Specific Plugins",
        description:
          "Research, content, catalog analysis, platform management. Purpose-built plugins that turn any AI agent into a music business operator.",
      },
      {
        title: "API & CLI",
        description:
          "Programmatic access to everything. Build custom workflows, integrate with your existing systems, automate at any scale.",
      },
    ],
  },

  finalCta: {
    headline: "Not sure where to start?",
    description:
      "Take the free AI readiness audit. Two minutes, no commitment. See where AI agents create the most leverage in your operations.",
    primary: { label: "Take the free audit", href: "/audit" },
    secondary: { label: "View pricing", href: "/pricing" },
  },
} as const;

export type SolutionsCopy = typeof solutionsCopy;

/* ── Markdown export (for agents / machine readers) ───────────────── */

export function solutionsToMarkdown(c: SolutionsCopy): string {
  const lines: string[] = [
    `# ${c.headline}`,
    "",
    c.description,
    "",
    "---",
    "",
    ...c.segments.flatMap((s) => [
      `## ${s.title}`,
      "",
      `**${s.subtitle}**`,
      "",
      s.description,
      "",
      "### Capabilities",
      "",
      ...s.capabilities.flatMap((cap) => [
        `- **${cap.title}:** ${cap.description}${cap.metric ? ` _${cap.metric}_` : ""}`,
      ]),
      "",
      ...(s.socialProof
        ? [
            `> "${s.socialProof.quote}" — ${s.socialProof.source} (${s.socialProof.metric})`,
            "",
          ]
        : []),
      `[${s.cta.label}](${s.cta.href})`,
      "",
    ]),
    "---",
    "",
    `## ${c.crossCutting.title}`,
    "",
    c.crossCutting.description,
    "",
    ...c.crossCutting.features.flatMap((f) => [
      `- **${f.title}:** ${f.description}`,
    ]),
    "",
    "---",
    "",
    `## ${c.finalCta.headline}`,
    "",
    c.finalCta.description,
    "",
    `[${c.finalCta.primary.label}](${c.finalCta.primary.href}) | [${c.finalCta.secondary.label}](${c.finalCta.secondary.href})`,
  ];
  return lines.join("\n");
}
