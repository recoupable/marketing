/**
 * Site-wide configuration — the single source of truth for brand values,
 * URLs, and metadata defaults. Import from here, never hardcode.
 */
export const siteConfig = {
  name: "Recoupable",
  tagline: "AI-Powered Music Marketing",
  description:
    "Recoupable is the AI agent that handles your music marketing — content, distribution, and growth — so you can focus on making music.",
  url: "https://recoupable.com",
  appUrl: "https://chat.recoupable.com",
  apiUrl: "https://recoup-api.vercel.app/api",
  docsUrl: "https://developers.recoupable.com",
  supportEmail: "agent@recoupable.com",

  /** Social links */
  social: {
    twitter: "https://x.com/recaboreal",
    linkedin: "https://www.linkedin.com/company/recoupable",
  },

  /** Brand colors */
  colors: {
    primary: "#345A5D",
    primaryLight: "#4a7a7d",
    primaryDark: "#264344",
  },

  /** Plausible analytics — privacy-friendly, no cookie banner needed */
  plausible: {
    domain: "recoupable.com",
    src: "https://plausible.io/js/script.js",
  },

  /** Default OG / metadata values (overridden per-page via generateMetadata) */
  metadata: {
    titleTemplate: "%s | Recoupable",
    defaultTitle: "Recoupable — AI-Powered Music Marketing",
    defaultDescription:
      "Recoupable is the AI agent that handles your music marketing — content, distribution, and growth — so you can focus on making music.",
    locale: "en_US",
    type: "website",
  },
} as const;
