/** Buying paths shared by the homepage and services overview. */
export const serviceOffers = [
  {
    id: "advisory", title: "AI advisory", benefit: "Know where to invest.", audience: "For leaders deciding where to start",
    copy: "Find the projects worth your time and budget. We assess your workflows, prioritize opportunities, and define a first build your team can move forward with.",
    includes: ["Workflow and data assessment", "Prioritized projects and a clear scope", "Success measures agreed before development"],
    href: "/advisory", link: "Explore AI advisory",
  },
  {
    id: "transformation", title: "AI transformation", benefit: "Put the plan into operation.", audience: "For companies ready to implement",
    copy: "Bring us in to lead the work with your team. We connect your company’s information, build systems you own, and train your people to use them. Together, we review results against agreed measures.",
    includes: ["Strategy, custom systems, and integrations", "Hands-on training and documented handoff", "Results reviewed and next steps agreed"],
    href: "/services#transformation", link: "Explore the transformation partnership",
  },
  {
    id: "build", title: "Custom builds", benefit: "Bring us the project.", audience: "For teams that know what they need",
    copy: "You don’t need a strategy engagement to get started. Bring us the workflow or product you need. We agree on scope, build and integrate the software, and hand over the code and documentation.",
    includes: ["A defined project, scope, and price", "Working software tested with your team", "Custom code in a repository you control"],
    href: "/build", link: "Explore custom builds",
  },
] as const;
