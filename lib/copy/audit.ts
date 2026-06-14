/**
 * Free AI readiness audit — a lead-gen quiz that scores where AI agents
 * could help a music team, then routes into a Consulting conversation.
 */

export const auditCopy = {
  headline: "Where could AI actually help your music business?",
  subheadline:
    "Answer 7 questions. Get a readiness score and a short, specific read on where agents could save your team time — and where they couldn't.",
  description:
    "Free AI readiness audit for labels, distributors, catalogs, and managers. A specific read on where AI can help your operation — and where it can't.",

  socialProof: "Scored against the same workflows we run on our own label and with implementation clients.",

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
        "You're early in AI adoption — which means the biggest, easiest wins are still ahead of you. The first step is knowing which workflows are worth automating and which aren't.",
      recommendation:
        "Start in the open: install the skills and try the hosted workspace. When you're ready to put it to work inside your stack, talk to us.",
      ctaPrimary: { label: "Start in the open", href: "/skills" },
      ctaSecondary: {
        label: "Talk to us",
        href: "/consulting",
      },
    },
    mid: {
      score: "Ready to Scale",
      color: "#22c55e",
      summary:
        "You have the volume and the bottlenecks that agents handle well — research, content, and release ops. The opportunity is real; the question is implementation inside your stack.",
      recommendation:
        "This is what our implementation work is built for: scope the workflows, build agents you own, and measure results on your own roster.",
      ctaPrimary: {
        label: "Talk to us about implementation",
        href: "/consulting",
      },
      ctaSecondary: {
        label: "Try Recoup in Chat",
        href: "https://chat.recoupable.com",
      },
    },
    high: {
      score: "AI-Ready Leader",
      color: "#3b82f6",
      summary:
        "You already think in agents — now it's about operationalizing them with real music context and safe access to your systems. At your scale, that's a meaningful edge.",
      recommendation:
        "Let's talk about a custom build or partnership: organization-owned agents, dedicated support, and the API at scale.",
      ctaPrimary: {
        label: "Talk to us",
        href: "/consulting",
      },
      ctaSecondary: {
        label: "See pricing",
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
