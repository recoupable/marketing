export const headerNavigation = [
  { label: "Services", href: "/services" },
  {
    label: "Products",
    links: [
      { label: "Platform", href: "/platform", description: "Your artists and work in one place." },
      { label: "Skills", href: "/skills", description: "Music playbooks for your AI." },
      { label: "Developers", href: "/developers", description: "API, MCP, and CLI." },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Work", href: "/case-studies" },
      { label: "About", href: "/about" },
      { label: "Docs", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "All resources", href: "/resources" },
      { label: "Lab", href: "/lab" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
] as const;
