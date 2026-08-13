/**
 * Site navigation — simple direct links, no dropdowns.
 * Single source of truth for the header nav (consumed by Header.tsx).
 * The footer is driven by its own FOOTER_NAV in components/layout/Footer.tsx.
 *
 * The header lists ONLY the top conversion funnels (chat#1800, 2026-08-13):
 * Advisory (the revenue engine), Solutions (what we do), Pricing (buy), Docs
 * (developers). Everything else — Valuation, Case Studies, Compare, ROI,
 * Audit — is reachable from the footer and in-page CTAs; a crowded header
 * buries the paths that convert.
 */
import { siteConfig } from "@/lib/config";

export const nav: readonly { label: string; href: string; external?: boolean }[] = [
  { label: "Advisory", href: "/advisory" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: siteConfig.docsUrl, external: true },
];
