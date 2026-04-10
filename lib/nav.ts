/**
 * Site navigation structure — per content/brand/website-structure-report.md.
 * Single source of truth for header and footer links.
 */

export const nav = {
  platform: {
    label: "Platform",
    href: "/platform",
    items: [
      { label: "Agents", href: "/platform#agents" },
      { label: "Workflows", href: "/platform#workflows" },
      { label: "Integrations", href: "/platform#integrations" },
      { label: "Data Layer", href: "/platform#data-layer" },
      { label: "API & CLI", href: "/platform#api-cli" },
    ],
  },
  solutions: {
    label: "Solutions",
    href: "/solutions",
    items: [
      { label: "Artists", href: "/solutions#artists" },
      { label: "Labels", href: "/solutions#labels" },
      { label: "Distributors", href: "/solutions#distributors" },
      { label: "Catalog Owners", href: "/solutions#catalog-owners" },
    ],
  },
  developers: {
    label: "Developers",
    href: "/developers",
    items: [
      { label: "API", href: "/developers#api" },
      { label: "CLI", href: "/developers#cli" },
      { label: "Docs", href: "/developers#docs" },
      { label: "Use Cases", href: "/developers#use-cases" },
    ],
  },
  learn: {
    label: "Learn",
    href: "/learn",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Use Cases", href: "/learn/use-cases" },
      { label: "Playbooks", href: "/learn/playbooks" },
      { label: "Demos", href: "/learn/demos" },
    ],
  },
  company: {
    label: "Company",
    href: "/company",
    items: [
      { label: "Vision", href: "/company/vision" },
      { label: "Recoupable Records", href: "/company/recoupable-records" },
      { label: "About", href: "/company/about" },
    ],
  },
} as const;
