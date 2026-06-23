/**
 * Recoup API base. Preview/dev builds talk to the test API so a Privy bearer
 * (minted by the preview Privy app) verifies against the matching app; only
 * production talks to the production API. Mirrors chat's IS_PROD split
 * (chat/lib/consts.ts). NEXT_PUBLIC_VERCEL_ENV is inlined from VERCEL_ENV in
 * next.config.ts so this resolves correctly in the client bundle too.
 */
const apiUrl =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://recoup-api.vercel.app/api"
    : "https://test-recoup-api.vercel.app/api";

/**
 * Site-wide configuration — the single source of truth for brand values,
 * URLs, and metadata defaults. Import from here, never hardcode.
 */
export const siteConfig = {
  name: "Recoup",
  legalName: "Recoupable LLC",
  tagline: "AI agents for music",
  description:
    "Your label. Run by agents. You create. They run strategy, content, revenue.",
  url: "https://recoupable.com",
  appUrl: "https://chat.recoupable.com",
  apiUrl,
  docsUrl: "https://developers.recoupable.com",

  /** Suggestion pills shown under the artist search once an artist is selected. */
  searchSuggestions: [
    "Audit releases",
    "Research report",
    "Similar artists",
    "Campaign plan",
  ],

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

  /** Brand styling — used by the Privy auth modal on the valuation gate */
  brand: {
    accentColor: "#003199",
    privyLogo: "/brand/wordmark-lightmode.svg",
  },

  /** Plausible analytics — privacy-friendly, no cookie banner needed */
  plausible: {
    domain: "recoupable.com",
    src: "https://plausible.io/js/script.js",
  },

  /** Default OG / metadata values (overridden per-page via generateMetadata) */
  metadata: {
    titleTemplate: "%s | Recoup",
    defaultTitle: "Recoup — Your Label, Run by AI Agents for Music Ops",
    defaultDescription:
      "You create. AI agents run strategy, content, fans, and revenue. One system for artists, labels, distributors, and catalog owners.",
    locale: "en_US",
    type: "website",
  },
} as const;
