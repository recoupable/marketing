/**
 * Results / case studies page copy — social proof for advisory and SaaS conversion.
 */

export const resultsCopy = {
  title: "Results | Recoup",
  description:
    "See how AI agents are transforming music marketing operations. Real numbers from real campaigns.",
  headline: "We don't pitch theory. We ship results.",
  subheadline:
    "Every number on this page comes from real campaigns, real rosters, and real revenue. Here's what happens when AI agents actually do the work.",

  caseStudies: [
    {
      id: "d2f-campaign",
      tag: "Direct-to-Fan",
      title: "$2.5M direct-to-fan campaign",
      description:
        "Sidney Swift designed and ran a direct-to-fan campaign that generated $2.5M in revenue — proving that artists don't need label marketing budgets to build sustainable businesses.",
      stats: [
        { value: "$2.5M", label: "Revenue generated" },
        { value: "0", label: "Label marketing spend" },
        { value: "D2F", label: "Direct-to-fan model" },
      ],
      insight:
        "This campaign became the blueprint for Recoup's AI agents — automating the playbook that generated millions manually.",
    },
    {
      id: "catalog-operations",
      tag: "Catalog Management",
      title: "10+ platinum records, managed by AI",
      description:
        "Recoup's agents now handle ongoing marketing, audience research, and content generation across a catalog of platinum and Grammy-winning records — work that used to require a full marketing team.",
      stats: [
        { value: "10+", label: "Platinum records" },
        { value: "90%", label: "Less manual marketing time" },
        { value: "24/7", label: "Agent uptime" },
      ],
      insight:
        "The same agents available on the platform. No custom build required.",
    },
    {
      id: "content-engine",
      tag: "Content Automation",
      title: "From 0 to 6 posts/week — fully automated",
      description:
        "Recoup's own content engine discovers trending topics, generates platform-native drafts, creates branded thumbnails, and schedules across LinkedIn and X — with human review as the only manual step.",
      stats: [
        { value: "6", label: "Posts per week" },
        { value: "< 5 min", label: "Human review time per post" },
        { value: "2x", label: "LinkedIn engagement vs. manual posts" },
      ],
      insight:
        "This is the same content pipeline available to Pro and Enterprise customers.",
    },
    {
      id: "advisory-roi",
      tag: "Advisory",
      title: "One strategy session → 6-figure operational savings",
      description:
        "A single 90-minute advisory session identifies $100K+ in annual savings by replacing manual workflows with AI agents. Labels typically see ROI within 30 days of implementation.",
      stats: [
        { value: "$100K+", label: "Annual savings identified" },
        { value: "90 min", label: "Time to roadmap" },
        { value: "30 days", label: "Time to ROI" },
      ],
      insight:
        "The advisory pays for itself before the follow-up call.",
    },
  ],

  credentialsBanner: {
    headline: "Built by someone who's done it",
    items: [
      "Grammy-winning producer",
      "10+ platinum records",
      "US patent holder in AI music tech",
      "Produced for Beyoncé, Nicki Minaj, Lil Wayne",
      "$2.5M D2F campaign",
    ],
  },

  bottomCta: {
    headline: "Ready to see what AI agents can do for your roster?",
    description:
      "Start with a free AI readiness audit, or book a strategy session with Sidney.",
    primaryCta: { label: "Take the Free Audit", href: "/audit" },
    secondaryCta: { label: "Book Advisory Session", href: "/advisory/book" },
  },
};
