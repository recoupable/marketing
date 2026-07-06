/**
 * Plugins page copy — single source of truth for the plugin showcase.
 */

export interface Plugin {
  id: string;
  name: string;
  description: string;
  skillCount: number;
  capabilities: string[];
  installCommand: string;
  repo: string;
  /** Which tier of customer this targets */
  audience: string;
}

export const pluginsCopy = {
  title: "Agent Plugins for Music",
  subtitle:
    "Install a plugin. Your AI agent gets music industry superpowers. Works with Claude Code, Cowork, Codex, and Cursor.",

  plugins: [
    {
      id: "research",
      name: "Research",
      description:
        "Artist analytics, audience insights, competitive analysis, playlist intelligence, and trend detection. The foundation for any music business decision.",
      skillCount: 7,
      capabilities: [
        "Artist research & briefs",
        "Audience demographics & cities",
        "Competitive landscape",
        "Playlist intelligence",
        "Trend detection",
        "Web intelligence",
        "People outreach",
      ],
      installCommand:
        "claude plugin install https://github.com/recoupable/recoup-research-plugin",
      repo: "https://github.com/recoupable/recoup-research-plugin",
      audience: "Labels, managers, distributors",
    },
    {
      id: "content",
      name: "Content",
      description:
        "Generate release strategy content, social posts, and short-form video scripts. Your agent becomes your marketing team.",
      skillCount: 3,
      capabilities: [
        "Content creation workflows",
        "Social post generation",
        "Short-form video scripts",
      ],
      installCommand:
        "claude plugin install https://github.com/recoupable/recoup-content-plugin",
      repo: "https://github.com/recoupable/recoup-content-plugin",
      audience: "Labels, managers, artists",
    },
    {
      id: "catalogs",
      name: "Catalog Deals",
      description:
        "Turn a messy seller data room into a source-cited deal package. Royalty normalization, rights review, valuation analysis, financing underwriting, and IC memos — all agent-driven.",
      skillCount: 17,
      capabilities: [
        "Data room ingestion & normalization",
        "Catalog valuation & analysis",
        "Rights & ownership review",
        "Royalty audit",
        "Seller prep & cleanup",
        "Financing underwriting",
        "IC memo generation",
        "Deal dashboard (HTML)",
      ],
      installCommand:
        "claude plugin install https://github.com/recoupable/recoup-catalogs-plugin",
      repo: "https://github.com/recoupable/recoup-catalogs-plugin",
      audience: "Catalog acquirers, investors, lenders",
    },
    {
      id: "platform",
      name: "Platform",
      description:
        "Onboarding and diagnostics. Your agent's starting point — validates credentials, discovers capabilities, and runs health checks.",
      skillCount: 2,
      capabilities: [
        "Guided onboarding flow",
        "API key validation",
        "Plugin discovery & recommendations",
        "Health check & diagnostics",
      ],
      installCommand:
        "claude plugin install https://github.com/recoupable/recoup-platform-plugin",
      repo: "https://github.com/recoupable/recoup-platform-plugin",
      audience: "Everyone — start here",
    },
  ] satisfies Plugin[],

  compatibleWith: [
    "Claude Code",
    "Claude Cowork",
    "Codex",
    "Cursor",
  ],

  steps: [
    {
      number: "1",
      title: "Install",
      description: "One command. Plugin loads into your AI tool of choice.",
    },
    {
      number: "2",
      title: "Connect",
      description:
        "Set your Recoup API key. Get one free at developers.recoupable.com.",
    },
    {
      number: "3",
      title: "Go",
      description:
        "Ask your agent anything about music. It now has the data and workflows to deliver.",
    },
  ],
} as const;
