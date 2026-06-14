/**
 * Pricing page copy — single source of truth for engagement tiers + FAQ.
 * Positioning (2026-06): the value ladder across the Products offering —
 * Open (free skills), Recoup OS (paid bundle), Chat (hosted), and
 * Implementation (consulting). Mirrors the Resources/Products/Consulting funnel.
 */
import { siteConfig } from "@/lib/config";

export interface PricingPlan {
  id: string;
  name: string;
  audience: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlighted?: boolean;
  badge?: string;
}

export interface PricingFAQ {
  q: string;
  a: string;
}

export const pricingCopy = {
  title: "Start in the open. Scale with us.",
  description:
    "Recoup is a research lab and implementation partner. The tools are open, Recoup OS bundles them, the hosted workspace is simple, and bigger builds are scoped to you.",

  plans: [
    {
      id: "open",
      name: "Open",
      audience: "For builders & developers",
      price: "Free",
      period: "",
      description:
        "Install the open-source skills our own agents run on, and build on the API and MCP in your own stack.",
      features: [
        "Open-source skills — one-command install",
        "Music-native API & full docs",
        "MCP integrations for any agent",
        "Use in Claude, Cursor, or your own tools",
        "Community support",
      ],
      cta: "Browse the skills",
      ctaHref: siteConfig.skillsRepoUrl,
    },
    {
      id: "recoup-os",
      name: "Recoup OS",
      audience: "For power users & small labels",
      // Price kept in sync with lib/copy/recoupOs.ts.
      price: "$99",
      period: "/year",
      description:
        "Every Recoup skill in one installable plugin — the whole operating system for the modern label, wired to work together.",
      features: [
        "All skills bundled — one install",
        "Research, diligence, content, release ops & growth",
        "Runs in Claude Code, Cursor, Cowork & Codex",
        "Cross-skill workflows, updated as one product",
        "Updates included, cancel anytime",
        "You run it in your own environment",
      ],
      cta: "Get Recoup OS",
      ctaHref: "/recoup-os",
    },
    {
      id: "chat",
      name: "Chat",
      audience: "For artists, managers & teams",
      price: "From $19",
      period: "/mo",
      description:
        "A hosted workspace where the same skills run for your team — research, content, and release planning, no setup or terminal required. Free tier to start; paid plans from $19/mo.",
      features: [
        "Free tier — use the agents before upgrading",
        "Artist profiles & audience research",
        "AI content generation",
        "Release planning tools",
        "Analytics dashboard",
        "Pro plans add roster management & API access",
        "Priority support",
      ],
      cta: "Start in Chat",
      ctaHref: siteConfig.appUrl,
      highlighted: true,
      badge: "Most popular",
    },
    {
      id: "implementation",
      name: "Implementation",
      audience: "For labels, catalogs & platforms",
      price: "From $500",
      period: "/ session",
      description:
        "Consulting, custom agents, and embed / partner deals — sessions start at $500; sprints and partner deals are scoped to your roster, catalog, and volume.",
      features: [
        "AI strategy & implementation sprints",
        "Custom, organization-owned skills",
        "Embed / OEM & API at scale",
        "You own what we build",
        "Scoped data boundaries",
        "Dedicated partner & SLA options",
      ],
      cta: "Talk to us",
      ctaHref: "/consulting",
    },
  ] as PricingPlan[],

  faq: [
    {
      q: "Can I try it before I buy anything?",
      a: "Yes. The open skills, API, and docs are free — install them and build today. The hosted Chat workspace also has a free tier so you can use the agents before upgrading.",
    },
    {
      q: "How is this different from ChatGPT?",
      a: "ChatGPT is a general chatbot. Recoup is the music layer — skills, an API, and MCP integrations built specifically for music work like research, release ops, and catalog analysis. Point your own agent at it, or use the hosted workspace.",
    },
    {
      q: "Who owns what we build — and how is our data handled?",
      a: "You do. In any implementation engagement, the agents, skills, and workflows live in your stack or a repo your organization controls. We scope data access and reuse terms before work starts.",
    },
    {
      q: "What if I'm a label, distributor, or platform?",
      a: "That's the Implementation tier. We scope strategy, custom agents, and embed / partner deals to your volume — nothing here is a fixed public price. Start a conversation and we'll come back with the simplest way to do it.",
    },
    {
      q: "Is my data safe?",
      a: "Your data is encrypted in transit and at rest, and agents only touch the systems you explicitly connect — which you can revoke at any time.",
    },
  ] as PricingFAQ[],
} as const;
