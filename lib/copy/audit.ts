/**
 * Free AI Audit landing page copy — lead gen funnel between
 * /playbook (free content) and /advisory ($2,500+ engagement).
 */
import { siteConfig } from "@/lib/config";

export const auditCopy = {
  headline: "Is Your Label Leaving Money on the Table?",
  subheadline:
    "Answer 7 questions. Get a personalized AI readiness score and a custom report showing exactly where AI agents could save your team 20+ hours per week.",
  description:
    "Free AI readiness audit for labels, distributors, and music managers. Find out where AI can cut costs and scale your operation.",

  socialProof: "500+ music companies are already using AI agents to run marketing, content, and catalog operations.",

  questions: [
    {
      id: "role",
      label: "What best describes your role?",
      type: "select" as const,
      options: [
        "Label owner / GM",
        "Artist manager",
        "Distributor",
        "Catalog owner",
        "Marketing director",
        "A&R",
        "Artist (independent)",
        "Other",
      ],
    },
    {
      id: "roster_size",
      label: "How many artists are in your roster?",
      type: "select" as const,
      options: ["1-5", "6-15", "16-50", "51-200", "200+"],
    },
    {
      id: "marketing_hours",
      label: "How many hours per week does your team spend on marketing ops?",
      type: "select" as const,
      options: [
        "Less than 10",
        "10-20",
        "20-40",
        "40-80",
        "80+ (multiple people)",
      ],
    },
    {
      id: "content_volume",
      label: "How much content does your team create per week?",
      type: "select" as const,
      options: [
        "Almost none",
        "1-5 posts",
        "5-15 posts",
        "15-30 posts",
        "30+ posts",
      ],
    },
    {
      id: "ai_usage",
      label: "How are you using AI today?",
      type: "select" as const,
      options: [
        "Not at all",
        "ChatGPT for copy sometimes",
        "A few AI tools here and there",
        "AI is part of our workflow",
        "We have a dedicated AI strategy",
      ],
    },
    {
      id: "biggest_bottleneck",
      label: "What's your biggest operational bottleneck?",
      type: "select" as const,
      options: [
        "Content creation & scheduling",
        "Fan engagement & community",
        "Analytics & reporting",
        "Release campaign planning",
        "Catalog marketing (back catalog)",
        "All of the above",
      ],
    },
    {
      id: "budget",
      label: "What's your monthly marketing ops budget?",
      type: "select" as const,
      options: [
        "Under $1,000",
        "$1,000-$5,000",
        "$5,000-$15,000",
        "$15,000-$50,000",
        "$50,000+",
      ],
    },
  ],

  results: {
    low: {
      score: "Early Stage",
      color: "#f59e0b",
      summary:
        "You're in the early stages of AI adoption. The good news: there's massive upside. Companies at your stage typically see 3-5x ROI within 90 days of deploying AI agents.",
      recommendation:
        "Start with our free playbook to understand the landscape, then book a strategy session to build your roadmap.",
      ctaPrimary: { label: "Get the Free Playbook", href: "/playbook" },
      ctaSecondary: {
        label: "Book a Strategy Session — $2,500",
        href: "/advisory",
      },
    },
    mid: {
      score: "Ready to Scale",
      color: "#22c55e",
      summary:
        "You have the volume and the pain points that AI agents solve best. You're leaving 20-40 hours per week on the table — and likely $5,000-$15,000/month in operational costs that AI can eliminate.",
      recommendation:
        "You're the perfect fit for an AI Transformation engagement. We'll audit your workflows, deploy agents, and measure results over 90 days.",
      ctaPrimary: {
        label: "Book AI Transformation — $10,000",
        href: "mailto:hi@recoupable.dev?subject=AI%20Transformation%20Inquiry",
      },
      ctaSecondary: {
        label: "Try Recoup Free",
        href: siteConfig.appUrl,
      },
    },
    high: {
      score: "AI-Ready Leader",
      color: "#3b82f6",
      summary:
        "You're already thinking about AI — now it's time to operationalize it. At your scale, the difference between 'using ChatGPT sometimes' and 'AI agents running your operation' is hundreds of thousands in annual savings.",
      recommendation:
        "Let's talk about a Partner engagement. Custom AI agents, dedicated support, and enterprise-grade infrastructure for your operation.",
      ctaPrimary: {
        label: "Talk to Us About Partnership",
        href: "mailto:hi@recoupable.dev?subject=Partner%20Inquiry",
      },
      ctaSecondary: {
        label: "See Pricing",
        href: "/pricing",
      },
    },
  },

  formFields: {
    name: "Your name",
    email: "Work email",
    company: "Company / label name",
  },
};
