/**
 * Header navigation — single source of truth for the top nav.
 *
 * IA (2026-06): the site is organized around three offerings in a funnel —
 * Resources (learn) → Products (build it yourself or use the hosted version)
 * → Consulting (have us do it). The "build vs. use" fork lives inside Products,
 * which splits into Recoup OS (flagship paid bundle), Skills (the open building
 * blocks), and Chat (the hosted web app). See IA-PLAN.md.
 *
 * Items are either a direct link or a labeled group with children. The Header
 * renders groups as labeled sections inside the (hamburger) menu panel.
 */

export type NavLink = { label: string; href: string; external?: boolean };
export type NavGroup = { label: string; children: readonly NavLink[] };
export type NavItem = NavLink | NavGroup;

export function isNavGroup(item: NavItem): item is NavGroup {
  return "children" in item;
}

export const nav: readonly NavItem[] = [
  { label: "Resources", href: "/blog" },
  {
    label: "Products",
    children: [
      { label: "Recoup OS", href: "/recoup-os" },
      { label: "Skills", href: "/skills" },
      { label: "Chat", href: "/chat" },
    ],
  },
  { label: "Consulting", href: "/consulting" },
  { label: "Pricing", href: "/pricing" },
  { label: "Trust", href: "/trust" },
];
