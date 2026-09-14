export const homeOffersCopy = {
  services: {
    eyebrow: "HOW WE HELP",
    title: "Choose the help your team needs.",
    auditLabel: "Get a free audit",
    offers: [
      {
        id: "advisory",
        title: "AI advisory",
        summary: "We assess your workflows and define a first AI project your team can implement.",
        href: "/advisory",
        link: "Explore AI advisory",
      },
      {
        id: "transformation",
        title: "AI transformation",
        summary: "We lead implementation with your team, from connected data and custom systems to training and results review.",
        href: "/services#transformation",
        link: "Explore AI transformation",
      },
      {
        id: "build",
        title: "Custom builds",
        summary: "Have a project in mind? We build and integrate it, with documented custom code your company controls.",
        href: "/build",
        link: "Explore custom builds",
      },
    ],
    examplesLabel: "WHAT WE CAN BUILD",
    examplesNavLabel: "Examples of custom systems",
    examples: [
      { label: "Workflow automation", href: "/operations" },
      { label: "Royalty reporting", href: "/operations#royalty-example" },
      { label: "Catalog intelligence", href: "/case-studies/catalog-intelligence" },
      { label: "Investment review", href: "/acquisitions" },
    ],
  },
  process: {
    eyebrow: "HOW IT WORKS",
    title: "From first conversation to launch.",
    stepLabel: "Step",
    steps: [
      { title: "Discovery & audit", copy: "Review your workflows, tools, data, and recurring tasks." },
      { title: "Strategy & roadmap", copy: "Agree on priorities, scope, price, responsibilities, and success measures." },
      { title: "Build & integration", copy: "Build, connect, and test the system with your team." },
      { title: "Launch & adoption", copy: "Train your team, hand over documentation, and review results together." },
    ],
    scope: "Have a defined project? Start with the build. Ongoing support is scoped and priced separately.",
  },
} as const;
