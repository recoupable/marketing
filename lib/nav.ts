import { siteConfig } from "@/lib/config";

/**
 * Header navigation — single source of truth for the top nav.
 *
 * Positioning (2026-06): research + consulting first, but product/self-serve
 * visitors need an info scent without scrolling the whole homepage, so Platform
 * and Pricing are promoted into the header (userjourney P1.5). Everything else
 * lives in the footer (see components/layout/Footer.tsx). See plan.md §3A.
 */
export const nav: readonly { label: string; href: string; external?: boolean }[] = [
  { label: "Research", href: siteConfig.researchUrl },
  { label: "Platform", href: "/platform" },
  { label: "Pricing", href: "/pricing" },
  { label: "Trust", href: "/trust" },
  { label: "Consulting", href: "/consulting" },
];
