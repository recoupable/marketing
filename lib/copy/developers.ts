/**
 * Developers page copy — comprehensive BYOA quick-start guide + plugin catalog.
 * Single source of truth for human UI and machine markdown.
 *
 * Rebuilt Aug 5, 2026 from thin 4-section layout to full developer
 * experience page with plugin catalog, installation guides, code examples,
 * and architecture overview.
 */
import { siteConfig } from "@/lib/config";

/* ── Types ─────────────────────────────────────────────────────────── */

export interface Plugin {
  id: string;
  name: string;
  repo: string;
  description: string;
  tagline: string;
  skills: number;
  commands: number;
  highlight: string;
  useCases: string[];
}

export interface Environment {
  id: string;
  name: string;
  icon: string;
  installCommand?: string;
  steps?: string[];
}

export interface QuickStartStep {
  step: number;
  title: string;
  description: string;
  code?: string;
  language?: string;
}

export interface ArchFeature {
  title: string;
  description: string;
}

export interface AggStat {
  value: string;
  label: string;
}

/* ── Data ──────────────────────────────────────────────────────────── */

export const developersCopy = {
  title: "Developers",
  headline: "Music intelligence for your agent.",
  description:
    "Install Recoup plugins in Claude, Cursor, Codex, or any agent platform. Your AI agents become music-native — research, content, catalog analysis, and platform operations in one install.",

  stats: [
    { value: "4", label: "Plugins available" },
    { value: "30+", label: "Agent skills" },
    { value: "50+", label: "API endpoints" },
    { value: "<60s", label: "Setup time" },
  ] satisfies AggStat[],

  quickStart: {
    title: "Get started in 3 steps",
    description:
      "From zero to music-native agent in under a minute. No dashboard, no web app — just your agent and our API.",
    steps: [
      {
        step: 1,
        title: "Get an API key",
        description:
          "Create an account instantly from the command line. No sign-up form, no email confirmation. Agent-first.",
        code: `curl -s -X POST "https://api.recoupable.com/api/agents/signup" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "you@yourlabel.com"}' | jq -r .api_key`,
        language: "bash",
      },
      {
        step: 2,
        title: "Install the platform plugin",
        description:
          "The platform plugin is the starting point. It handles auth, artist creation, and workspace setup. Add domain plugins after.",
        code: `claude plugin install https://github.com/recoupable/recoup-platform-plugin`,
        language: "bash",
      },
      {
        step: 3,
        title: "Ask your agent anything",
        description:
          'Set your API key and start working. Your agent now has access to music industry data, content creation, and catalog analysis.',
        code: `export RECOUP_API_KEY="recoup_sk_..."

# Then in Claude, Cursor, or Codex:
> "Research Joy Crookes — streaming, audience, playlists, competitive position"
> "Make a TikTok for Mari Vega"
> "Analyze this catalog deal" (drag in a data room)`,
        language: "bash",
      },
    ] satisfies QuickStartStep[],
  },

  plugins: {
    title: "Plugin Catalog",
    description:
      "Each plugin is a self-contained package of skills, commands, and domain knowledge. Install what you need.",
    items: [
      {
        id: "platform",
        name: "recoup-platform-plugin",
        repo: "https://github.com/recoupable/recoup-platform-plugin",
        tagline: "The foundation. Install this first.",
        description:
          "Cross-cutting skills for working with the Recoup API. Account setup, artist creation, workspace management, and API access. This is the starting point — install it first, then add domain plugins.",
        skills: 5,
        commands: 0,
        highlight: "8-step artist creation chain",
        useCases: [
          "Set up a Recoup account from inside your agent",
          "Create and manage artist knowledge bases",
          "Access the full Recoup API surface",
          "Scaffold and navigate artist workspaces",
        ],
      },
      {
        id: "research",
        name: "recoup-research-plugin",
        repo: "https://github.com/recoupable/recoup-research-plugin",
        tagline: "Music industry intelligence on demand.",
        description:
          "Artist analytics, audience insights, playlist intelligence, competitive analysis, trend detection, and outreach. Wraps the full Recoup research API — 50+ endpoints across 14 streaming and social platforms.",
        skills: 10,
        commands: 4,
        highlight: "14-platform analytics",
        useCases: [
          "Full artist research sweeps with cross-platform data",
          "Playlist pitch targets — find playlists your peers are on that you aren't",
          "Audience demographics, geographic strategy, and tour routing",
          "A&R discovery — find emerging artists before they blow up",
          "Weekly artist briefs with delta tracking",
        ],
      },
      {
        id: "content",
        name: "recoup-content-plugin",
        repo: "https://github.com/recoupable/recoup-content-plugin",
        tagline: "From artist name to finished video.",
        description:
          "Content creation workflows for music artists. Generate short-form videos, captions, and images — all on-brand using the artist's context, songs, and style guide. One command from artist name to post-ready clip.",
        skills: 1,
        commands: 1,
        highlight: "End-to-end video pipeline",
        useCases: [
          "Generate TikTok/Reels-ready short-form video from a song",
          "Create on-brand social content using artist context",
          "Batch content generation across a roster",
          "Editorial template-driven content (not generic AI slop)",
        ],
      },
      {
        id: "catalogs",
        name: "recoup-catalogs-plugin",
        repo: "https://github.com/recoupable/recoup-catalogs-plugin",
        tagline: "Turn messy data rooms into deal packages.",
        description:
          "Music catalog acquisition, seller preparation, financing underwriting, royalty normalization, rights checks, and valuation analysis. Drop a data room and get a source-cited deal package with an agent-authored HTML dashboard.",
        skills: 9,
        commands: 6,
        highlight: "Full deal lifecycle",
        useCases: [
          "Normalize royalty statements from any format (PDF, CSV, XLSX)",
          "Rights diligence — chain of title, splits, restrictions",
          "Valuation workpapers with growth/decay curves",
          "Agent-authored interactive deal dashboards",
          "IC memos, seller cleanup reports, lender packages",
        ],
      },
    ] satisfies Plugin[],
  },

  environments: {
    title: "Works everywhere you work",
    description:
      "Recoup plugins install in any agent environment that supports the plugin standard. Same plugins, same skills — your choice of interface.",
    items: [
      {
        id: "claude-code",
        name: "Claude Code",
        icon: "terminal",
        installCommand: `claude plugin install https://github.com/recoupable/recoup-platform-plugin`,
      },
      {
        id: "cowork",
        name: "Claude Cowork",
        icon: "layout",
        steps: [
          "Open the plugin marketplace (puzzle-piece icon)",
          'Click "Add custom plugin"',
          "Paste the GitHub URL",
          "Approve tool permissions",
          "Restart the session",
        ],
      },
      {
        id: "codex",
        name: "Codex",
        icon: "cpu",
        installCommand: `codex plugin install https://github.com/recoupable/recoup-platform-plugin`,
      },
      {
        id: "cursor",
        name: "Cursor",
        icon: "mouse-pointer",
        steps: [
          'Cursor → Settings → Plugins → "Add custom plugin"',
          "Paste the GitHub URL",
          "Restart Cursor so manifests load",
        ],
      },
    ] satisfies Environment[],
  },

  codeExamples: {
    title: "Real commands, real output",
    description:
      "These aren't hypothetical. Every command below runs against live data and produces actionable output.",
    examples: [
      {
        command: '/recoup-research "Joy Crookes"',
        description:
          "Full artist research sweep — streaming snapshot, geographic hotspots, audience demographics, playlist position, competitive landscape, and recommendations.",
      },
      {
        command: '/recoup-pitch "Joy Crookes"',
        description:
          "Ranked list of playlists that similar artists are on but Joy Crookes isn't — sorted by curator warmth and reach.",
      },
      {
        command: '/recoup-scout R&B --country US --listeners 50000-200000',
        description:
          "Emerging R&B artists in the US with 50K-200K monthly listeners, ranked by growth velocity with cross-platform validation.",
      },
      {
        command: '/recoup-compare "Joy Crookes" vs "Jorja Smith"',
        description:
          "Side-by-side comparison across streaming, playlists, audience, geography, and career stage.",
      },
      {
        command: "Make a TikTok for Mari Vega",
        description:
          "End-to-end async pipeline: resolves artist, picks template, renders video, generates caption, returns post-ready clip.",
      },
      {
        command: "Let's analyze a catalog with /recoup-catalog-deal",
        description:
          "Interactive workflow: classifies deal type, scaffolds workspace, normalizes royalties, flags rights issues, builds dashboard, drafts IC memo.",
      },
    ],
  },

  architecture: {
    title: "The BYOA architecture",
    description:
      "Bring Your Own Agent. We don't make you use our app. We make your agent music-smart.",
    features: [
      {
        title: "Plugins, not platforms",
        description:
          "Recoup distributes as plugins that install into your existing agent environment. No new app to learn, no new login to manage. Your team keeps using Claude, Cursor, or Codex — Recoup adds the music industry knowledge layer.",
      },
      {
        title: "Skills over endpoints",
        description:
          "Each plugin bundles domain-specific skills — multi-step workflows that agents execute autonomously. A skill isn't a single API call; it's a complete workflow: research an artist, generate content, analyze a catalog deal. The agent handles the orchestration.",
      },
      {
        title: "Context engineering",
        description:
          "Recoup's real value is structured context. Artist knowledge bases, catalog data, industry benchmarks — all organized so agents produce music-industry-grade output, not generic responses. Context makes the difference between 'AI slop' and work you'd actually ship.",
      },
      {
        title: "Marketplace distribution",
        description:
          "All plugins are available through the Recoup marketplace. Install one plugin or all four. Each is independently versioned and maintained. Updates ship through the same plugin install mechanism — no migration, no downtime.",
      },
    ] satisfies ArchFeature[],
  },

  apiSurface: {
    title: "Full API access",
    description:
      "Everything the plugins do, the API supports directly. Build custom integrations, automate workflows, or extend the plugins for your specific use case.",
    categories: [
      {
        name: "Artist Data",
        endpoints: "Profile, metrics (14 platforms), audience, cities, similar artists, playlists, tracks, career, insights, milestones, URLs, social posts, venues, rank",
      },
      {
        name: "Research & Discovery",
        endpoints: "Search, discover (with filters), charts, genres, festivals, radio, web search, deep research, people search, entity enrichment",
      },
      {
        name: "Content",
        endpoints: "Template browsing, async content generation, render status, social post scheduling, connector management",
      },
      {
        name: "Platform",
        endpoints: "Account management, artist CRUD, org management, workspace scaffolding, external integrations (Google, social connectors)",
      },
    ],
  },

  finalCta: {
    headline: "Your agent is one install away from music-native.",
    description:
      "Install the platform plugin. Run the getting-started skill. Start researching artists, creating content, and analyzing deals — all from inside the agent you already use.",
    primary: { label: "View full docs", href: siteConfig.docsUrl },
    secondary: { label: "Browse plugins on GitHub", href: "https://github.com/recoupable" },
  },
} as const;

export type DevelopersCopy = typeof developersCopy;

/* ── Markdown export (for agents / machine readers) ───────────────── */

export function developersToMarkdown(c: DevelopersCopy): string {
  const lines: string[] = [
    `# ${c.headline}`,
    "",
    c.description,
    "",
    "---",
    "",
    `## ${c.quickStart.title}`,
    "",
    c.quickStart.description,
    "",
    ...c.quickStart.steps.flatMap((s) => [
      `### Step ${s.step}: ${s.title}`,
      "",
      s.description,
      "",
      ...(s.code ? ["```" + (s.language || "") + "\n" + s.code + "\n```", ""] : []),
    ]),
    "---",
    "",
    `## ${c.plugins.title}`,
    "",
    c.plugins.description,
    "",
    ...c.plugins.items.flatMap((p) => [
      `### ${p.name}`,
      "",
      `**${p.tagline}**`,
      "",
      p.description,
      "",
      `- Skills: ${p.skills} | Commands: ${p.commands}`,
      `- Highlight: ${p.highlight}`,
      `- Install: \`claude plugin install ${p.repo}\``,
      "",
      "Use cases:",
      ...p.useCases.map((u) => `- ${u}`),
      "",
    ]),
    "---",
    "",
    `## ${c.codeExamples.title}`,
    "",
    c.codeExamples.description,
    "",
    ...c.codeExamples.examples.flatMap((e) => [
      `**\`${e.command}\`**`,
      "",
      e.description,
      "",
    ]),
    "---",
    "",
    `## ${c.architecture.title}`,
    "",
    c.architecture.description,
    "",
    ...c.architecture.features.flatMap((f) => [
      `- **${f.title}:** ${f.description}`,
    ]),
    "",
    "---",
    "",
    `## ${c.apiSurface.title}`,
    "",
    c.apiSurface.description,
    "",
    ...c.apiSurface.categories.flatMap((cat) => [
      `- **${cat.name}:** ${cat.endpoints}`,
    ]),
    "",
    "---",
    "",
    `[${c.finalCta.primary.label}](${c.finalCta.primary.href}) | [${c.finalCta.secondary.label}](${c.finalCta.secondary.href})`,
  ];
  return lines.join("\n");
}
