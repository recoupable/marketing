/**
 * Site navigation — simple direct links, no dropdowns.
 * Single source of truth for header and footer links.
 */
import { siteConfig } from "@/lib/config";

export const nav = [] as const;

// Unhide when pages are ready:
// { label: "Resources", href: "/resources" },
// { label: "Records", href: "/records" },
// { label: "Pricing", href: "/pricing" },

export const footerNav = {
  product: {
    label: "Product",
    items: [
      { label: "Platform", href: "/platform" },
      { label: "Pricing", href: "/pricing" },
      { label: "Docs", href: siteConfig.docsUrl, external: true },
    ],
  },
  resources: {
    label: "Resources",
    items: [
      { label: "Blog", href: "/resources" },
      { label: "Records", href: "/records" },
    ],
  },
  company: {
    label: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Vision", href: "/vision" },
    ],
  },
  legal: {
    label: "Legal",
    items: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Use", href: "/terms-of-use" },
    ],
  },
} as const;
