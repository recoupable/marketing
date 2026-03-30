/**
 * Site navigation structure — per content/brand/website-structure-report.md.
 * Single source of truth for header and footer links.
 */

type NavItem = { readonly label: string; readonly href: string };

type NavSection = {
  readonly label: string;
  readonly href: string;
  readonly items: readonly NavItem[];
};

export const nav: {
  platform: NavSection;
  solutions: NavSection;
  developers: NavSection;
  learn: NavSection;
  company: NavSection;
} = {
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
    label: "Blog",
    href: "/blog",
    items: [],
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
};

export const navOrder = ["platform", "solutions", "developers", "learn", "company"] as const;
