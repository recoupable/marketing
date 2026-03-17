/**
 * Site-wide configuration — the single source of truth for brand values,
 * URLs, and metadata defaults. Import from here, never hardcode.
 */
export const siteConfig = {
  name: "Recoupable",
  legalName: "Recoupable LLC",
  tagline: "AI agents for music",
  description:
    "Your label. Run by agents. You create. They run strategy, content, revenue.",
  url: "https://recoupable.com",
  appUrl: "https://chat.recoupable.com",
  apiUrl: "https://recoup-api.vercel.app/api",
  docsUrl: "https://developers.recoupable.com",

  /** Contact emails */
  supportEmail: "support@recoupable.com",
  contactEmail: "hi@recoupable.com",

  /** Company address — used in legal pages */
  address: "720 Capitol Square Pl. SW, Washington, DC 20024",

  /** Social links */
  social: {
    twitter: "https://x.com/recaboreal",
    instagram: "https://www.instagram.com/recoupable",
    linkedin: "https://www.linkedin.com/company/recoupable",
    youtube: "https://www.youtube.com/@recoupable",
  },

  /** Plausible analytics — privacy-friendly, no cookie banner needed */
  plausible: {
    domain: "recoupable.com",
    src: "https://plausible.io/js/script.js",
  },

  /** Default OG / metadata values (overridden per-page via generateMetadata) */
  metadata: {
    titleTemplate: "%s | Recoupable",
    defaultTitle: "Recoupable — Your label. Run by agents.",
    defaultDescription:
      "You create. Agents run strategy, content, fans, revenue. One system for artists, labels, distributors.",
    locale: "en_US",
    type: "website",
  },
} as const;
