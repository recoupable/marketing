/**
 * Site navigation — simple direct links, no dropdowns.
 * Single source of truth for the header nav (consumed by Header.tsx).
 * The footer is driven by its own FOOTER_NAV in components/layout/Footer.tsx.
 *
 * The header lists ONLY the top conversion funnels (chat#1800, 2026-08-13):
 * Advisory and Build (the two service offers, in ladder order: think with
 * us, then we build it), Pricing (buy the platform), Docs (developers).
 * Everything else — Solutions, Valuation, Case Studies, Compare, ROI,
 * Audit — is reachable from the homepage, footer and in-page CTAs; a
 * crowded header buries the paths that convert.
 */
import { siteConfig } from "@/lib/config";

export const nav: readonly { label: string; href: string; external?: boolean }[] = [
  { label: "Advisory", href: "/advisory" },
  { label: "Build", href: "/build" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: siteConfig.docsUrl, external: true },
];
