export const headerNavigation = [
  { label: "Services", href: "/services" },
  {
    label: "Products",
    links: [
      { label: "Platform", href: "/platform", description: "Your artists and catalog in one place.", visual: "platform" },
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
      { label: "About", href: "/about", description: "Meet the people behind Recoup.", icon: "about" },
      { label: "Work", href: "/case-studies", description: "See the systems we’ve built.", icon: "work" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
] as const;
