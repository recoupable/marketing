/**
 * Site-wide configuration — the single source of truth for brand values,
 * URLs, and metadata defaults. Import from here, never hardcode.
 */
export const siteConfig = {
  name: "Recoup",
  legalName: "Recoupable LLC",
  tagline: "Research & implementation for the agentic music industry",
  description:
    "Recoup is a research lab and implementation partner for labels, catalogs, and platforms — from strategy to the custom agents that run in your stack.",
  url: "https://recoupable.com",
  appUrl: "https://chat.recoupable.com",
  apiUrl: "https://recoup-api.vercel.app/api",
  docsUrl: "https://developers.recoupable.com",
  /** Research/essays now live as a filter on the unified /blog hub. */
  researchUrl: "/blog?type=essay",
  skillsRepoUrl: "https://github.com/recoupable/skills",
  skillsInstallCommand: "npx skills add recoupable/skills",

  /** Contact emails */
  supportEmail: "support@recoupable.com",
  contactEmail: "hi@recoupable.com",

  /** Company address — used in legal pages */
  address: "720 Capitol Square Pl. SW, Washington, DC 20024",

  /** Social links */
  social: {
    twitter: "https://x.com/recoupable",
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
    titleTemplate: "%s | Recoup",
    defaultTitle: "Recoup — Research & AI Implementation for Music",
    defaultDescription:
      "A research lab and implementation partner for labels, catalogs, and platforms — from strategy to the custom agents that run in your stack.",
    locale: "en_US",
    type: "website",
  },
} as const;
