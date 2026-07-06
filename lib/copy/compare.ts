/**
 * Compare page copy — BYOA vs Dashboard approach.
 * Single source of truth for the comparison page.
 */

export interface ComparisonRow {
  category: string;
  byoa: string;
  dashboard: string;
}

export const compareCopy = {
  title: "Dashboards vs. Agent Plugins",
  subtitle:
    "Every other music AI company built another dashboard. We built tools that work inside your agent — Claude, Cursor, Codex, or whatever comes next.",
  heroQuote:
    "The last thing your team needs is another tab to manage.",

  sections: [
    {
      id: "comparison",
      title: "Side by side",
      rows: [
        {
          category: "Where it runs",
          byoa: "Inside Claude, Cursor, Codex — tools your team already uses",
          dashboard: "Another web app with its own login, UI, and learning curve",
        },
        {
          category: "Workflow",
          byoa: "Ask your agent → it calls Recoup tools → results appear in your conversation",
          dashboard: "Open the app → navigate menus → copy data → paste into your workflow",
        },
        {
          category: "Integration",
          byoa: "One install command. Works with any agent that supports MCP or plugins.",
          dashboard: "Custom integrations, API wrappers, or manual import/export",
        },
        {
          category: "Content creation",
          byoa: "Agent generates, posts, and tracks — hands-free loop",
          dashboard: "Generate in one tool, download, upload to another, schedule manually",
        },
        {
          category: "Research",
          byoa: "Ask a question in natural language → structured report with sources",
          dashboard: "Navigate to analytics tab, filter, export CSV, analyze yourself",
        },
        {
          category: "Team adoption",
          byoa: "If they can talk to an AI, they can use Recoup",
          dashboard: "Training sessions, onboarding docs, feature walkthroughs",
        },
        {
          category: "Scales with AI",
          byoa: "Better agents = better results from the same plugins, automatically",
          dashboard: "Platform has to rebuild its own AI features from scratch",
        },
        {
          category: "Lock-in",
          byoa: "Switch agents anytime. Your tools travel with you.",
          dashboard: "Your workflows live inside their UI. Switching = starting over.",
        },
      ] as ComparisonRow[],
    },
  ],

  whyItMatters: {
    title: "Why this matters for music companies",
    points: [
      {
        heading: "Labels are already using AI agents",
        body: "Your A&R team uses Claude. Your marketing team uses Cursor. Your analysts use Codex. Recoup plugins meet them where they already work — no new app to learn.",
      },
      {
        heading: "One install replaces a content agency",
        body: "Labels paying $5,000/month for content creation agencies are replacing them with Recoup's content plugin. Same output, fraction of the cost, instant turnaround.",
      },
      {
        heading: "Agent-native means future-proof",
        body: "When Claude 5 ships, or when your team switches to a new agent, your Recoup plugins still work. Dashboard companies have to rebuild. You don't.",
      },
    ],
  },

  cta: {
    title: "See it in action",
    description:
      "Install a plugin in 30 seconds. No meetings, no demos, no contracts.",
    primary: { label: "Browse Plugins", href: "/plugins" },
    secondary: { label: "View Pricing", href: "/pricing" },
  },
} as const;
