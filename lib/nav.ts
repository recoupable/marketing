/**
 * Header navigation — single source of truth for the top nav.
 *
 * Positioning (2026-06): research + consulting first. The header stays minimal
 * (B+ nav) — Research and Consulting only. Everything else lives in the footer
 * (see components/layout/Footer.tsx). See marketing/plan.md §3A.
 */
import { siteConfig } from "@/lib/config";

export const nav: readonly { label: string; href: string; external?: boolean }[] = [
  { label: "Research", href: siteConfig.researchUrl, external: true },
  { label: "Consulting", href: "/consulting" },
];
