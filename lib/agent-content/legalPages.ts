import type { PageSummary } from "./types.ts";

// Navigation summaries of the legal pages; the linked page is the complete text.
export const legalPages: PageSummary[] = [
  {
    path: "/privacy",
    title: "Recoup Privacy Policy",
    description:
      "Read the full policy covering information collection, use, disclosure, security, rights, and contact details.",
    keywords:
      "privacy data personal information security rights policy cookies third party consent",
    paragraphs: [
      "The Privacy Policy describes information collection, usage, sharing, third-party services, security, individual rights and choices, children's privacy, international transfers, and policy changes.",
      "This is a navigation summary, not the complete policy. Consult the linked policy for its full text and stated update date.",
    ],
    links: [["Read the complete Privacy Policy", "/privacy"]],
  },
  {
    path: "/terms",
    title: "Recoup Terms of Use",
    description:
      "Read the complete terms for Recoup's website, APIs, AI platform, and services.",
    keywords:
      "terms legal contract use purchase subscription license ownership liability arbitration",
    paragraphs: [
      "The Terms of Use cover service access, registration, content responsibility, ownership, conduct, third-party services, purchases, subscriptions, warranties, liability, arbitration, and other provisions.",
      "This is a navigation summary, not the complete agreement. Read the full terms and any applicable supplemental terms before using the service.",
    ],
    links: [["Read the complete Terms of Use", "/terms"]],
  },
];
