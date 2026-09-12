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
 * Site-wide configuration, the single source of truth for brand values,
 * URLs, and metadata defaults. Import from here, never hardcode.
 * NEXT_PUBLIC_SITE_URL lets a preview build emit absolute URLs for itself.
 */
export const siteConfig = {
  name: "Recoup",
  legalName: "Recoupable LLC",
  tagline: "AI agents for music",
  description:
    "Your label. Run by agents. You create. They run strategy, content, revenue.",
  url: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://recoupable.dev")
    .origin,
  appUrl: "https://app.recoupable.dev",
  apiUrl,
  docsUrl: "https://docs.recoupable.dev",
  /** In-site documentation route. */
  docsPath: "/docs",
  githubUrl: "https://github.com/recoupable/skills",
  githubOrganizationUrl: "https://github.com/recoupable",

  /** Suggestion pills shown under the artist search once an artist is selected. */
  searchSuggestions: [
    "Audit releases",
    "Research report",
    "Similar artists",
    "Campaign plan",
  ],

  /** Contact emails */
  supportEmail: "support@recoupable.dev",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hi@recoupable.dev",

  /** Booking link shown on /contact only when set. */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",

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
