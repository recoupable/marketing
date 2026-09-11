export const site = {
  name: "Recoup",
  url: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://recoupable.dev").origin,
  app: "https://teams.recoupable.dev",
  docs: "/docs",
  github: "https://github.com/recoupable/skills",
  githubOrganization: "https://github.com/recoupable",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hi@recoupable.dev",
  booking: process.env.NEXT_PUBLIC_BOOKING_URL || "",
};

export const services = [
  {
    id: "strategy",
    number: "01",
    title: "Find your next advantage.",
    label: "AI strategy",
    description:
      "Turn a big AI ambition into a clear first move. We map the work, find the friction, and help you decide what is worth building.",
    items: [
      "Workflow and data review",
      "Prioritized opportunities",
      "A practical implementation plan",
    ],
  },
  {
    id: "build",
    number: "02",
    title: "Build it into your business.",
    label: "Custom systems",
    description:
      "Your catalog, your tools, your way of working. We build the agents, integrations, and applications that bring them together.",
    items: [
      "Custom agents and applications",
      "Connected tools and data",
      "Code in a repository you control",
    ],
  },
  {
    id: "enable",
    number: "03",
    title: "Make your whole team better.",
    label: "Team enablement",
    description:
      "Put useful AI in the hands of the people doing the work. Capture their expertise in shared skills and train them to take it further.",
    items: [
      "Shared skills and workflows",
      "Hands-on team training",
      "Ongoing support and improvement",
    ],
  },
];

export const workflows = [
  {
    name: "Labels & distributors",
    heading: "More momentum. Across your entire roster.",
    description:
      "Bring artist research, release planning, and campaign creation into a repeatable system your team can run.",
    before:
      "A release starts with scattered documents, repeated research, and a blank content calendar.",
    after:
      "A connected artist brief, a coordinated rollout, and a set of campaign assets ready for review.",
    tags: ["Artist intelligence", "Release planning", "Content workflows"],
  },
  {
    name: "Catalog & rights teams",
    heading: "Spend more time on the decision.",
    description:
      "Bring order to royalty files, catalog information, and deal materials so your people can focus on what they mean.",
    before:
      "Analysts spend hours gathering files and reconciling different versions of the same information.",
    after:
      "A consistent intake process, traceable source data, and review-ready reporting.",
    tags: ["Catalog intake", "Royalty reporting", "Deal workflows"],
  },
  {
    name: "Managers & artist teams",
    heading: "Keep the artist moving forward.",
    description:
      "Give a small team the tools to research, create, and stay on top of the work around every release.",
    before:
      "Every update means another search, another spreadsheet, and another request for content.",
    after:
      "Reusable artist context, recurring briefs, and creative workflows built around your artist.",
    tags: ["Artist context", "Weekly briefs", "Campaign assets"],
  },
];
