/**
 * Site navigation — simple direct links, no dropdowns.
 * Single source of truth for the header nav (consumed by Header.tsx).
 * The footer is driven by its own FOOTER_NAV in components/layout/Footer.tsx.
 */
import { siteConfig } from "@/lib/config";

export const nav: readonly { label: string; href: string; external?: boolean }[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Valuation", href: "/valuation" },
  { label: "Advisory", href: "/advisory" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Compare", href: "/compare" },
  { label: "ROI Calculator", href: "/roi" },
  { label: "Docs", href: siteConfig.docsUrl, external: true },
];
