/**
 * Site navigation — simple direct links, no dropdowns.
 * Single source of truth for the header nav (consumed by Header.tsx).
 * The footer is driven by its own FOOTER_NAV in components/layout/Footer.tsx.
 */
import { siteConfig } from "@/lib/config";

export const nav: readonly { label: string; href: string; external?: boolean }[] = [
  { label: "Valuation", href: "/valuation" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: siteConfig.docsUrl, external: true },
  { label: "Blog", href: "/blog" },
];
