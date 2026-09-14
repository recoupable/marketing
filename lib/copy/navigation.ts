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
    groups: ["Learn", "Company"],
    links: [
      { label: "Docs", href: "/docs", description: "Guides to getting started and building.", group: "Learn" },
      { label: "Blog", href: "/blog", description: "Ideas for AI in the music business.", group: "Learn" },
      { label: "Lab", href: "/lab", description: "Explore what we’re testing next.", group: "Learn" },
      { label: "Work", href: "/case-studies", description: "See the systems we’ve built.", group: "Company" },
      { label: "About", href: "/about", description: "Meet the people behind Recoup.", group: "Company" },
      { label: "All resources", href: "/resources", description: "Explore the library", group: "footer" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
] as const;
