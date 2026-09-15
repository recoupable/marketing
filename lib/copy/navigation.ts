export const headerNavigation = [
  {
    label: "Services",
    links: [
      { label: "Advisory", href: "/advisory", description: "Know where AI fits and what to prioritize.", visual: "advisory" },
      { label: "Build", href: "/build", description: "Custom AI systems for your team.", visual: "build" },
      { label: "Training", href: "/training", description: "Put AI to work with your team.", visual: "training" },
    ],
  },
  {
    label: "Products",
    links: [
      { label: "Platform", href: "/platform", description: "Music AI, ready to use. No custom build.", visual: "platform" },
      { label: "Skills", href: "/skills", description: "Music playbooks for your AI.", visual: "skills" },
      { label: "Developers", href: "/developers", description: "Build with our API, MCP, and CLI.", visual: "developers" },
    ],
  },
  {
    label: "Resources",
    layout: "resources",
    links: [
      { label: "Docs", href: "/docs", description: "Get started and build with Recoup.", icon: "docs" },
      { label: "Blog", href: "/blog", description: "Ideas for AI in music.", icon: "blog" },
      { label: "Lab", href: "/lab", description: "Explore what’s next.", icon: "lab" },
      { label: "Podcast", href: "/podcast", description: "Music operators on how they use AI.", icon: "podcast" },
      { label: "Work", href: "/case-studies", description: "See the systems we’ve built.", icon: "work" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
] as const;
