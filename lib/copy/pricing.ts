/**
 * Pricing page copy — single source of truth for plans, features, and FAQ.
 */
import { siteConfig } from "@/lib/config";
import { buildChatUrl } from "@/lib/buildChatUrl";

export interface PricingPlan {
  id: string;
  name: string;
  audience: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  /** Absent on the Pro plan, whose CTA starts checkout instead of linking out. */
  ctaHref?: string;
  highlighted?: boolean;
  badge?: string;
}

export interface PricingFAQ {
  q: string;
  a: string;
}

export const pricingCopy = {
  title: "Simple pricing. No surprises.",
  description:
    "Start free. Upgrade when your roster grows. Every plan includes AI agents that actually do the work: research, content, strategy, reporting.",

  plans: [
    {
      id: "free",
      name: "Free",
      audience: "For independent artists",
      price: "$0",
      period: "",
      description:
        "Everything you need to try Recoupable for real. Value your catalog, put the agents to work, and upgrade only when you need more.",
      features: [
        "$3.33 in agent credits every month",
        "Artist profiles for your whole roster",
        "Catalog valuation",
        "Agent chat for research and content",
        "Scheduled reports to your own inbox",
        "No credit card required",
      ],
      cta: "Get started free",
      ctaHref: buildChatUrl({ campaign: "free" }),
    },
    {
      id: "pro",
      name: "Pro",
      audience: "For managers & small teams",
      price: "$99",
      period: "/mo",
      description:
        "Manage your entire roster with AI agents. Unlimited artists, deeper insights, priority everything.",
      features: [
        "Unlimited artist profiles",
        "1,000 AI credits / month",
        "Everything in Free",
        "Train agents on your catalog data",
        "Multi-artist campaign planning",
        "Advanced audience segmentation",
        "Priority support",
        "API access",
      ],
      cta: "Start 30-day trial",
      highlighted: true,
      badge: "Most popular",
    },
  ] as PricingPlan[],

  /** Labels and distributors skip self-serve and book a call. */
  partnerLine: {
    text: "Labels and distributors: team seats, custom agents, invoice billing.",
    cta: "Book a call",
    href: siteConfig.bookingUrl,
  },

  faq: [
    {
      q: "What are AI credits?",
      a: "Each interaction with an AI agent uses credits — a research query, a content draft, an audience report. Most actions cost 1 credit. Heavy operations (deep research, long-form content) may cost 2-5.",
    },
    {
      q: "Can I try before I buy?",
      a: "Yes. Sign up and use the platform free with monthly credits at no cost. Pro includes a 30-day free trial, and you enter a card when you start it so nothing interrupts your agents when the trial ends. You can cancel before day 30 and pay nothing.",
    },
    {
      q: "What happens if I run out of credits?",
      a: "You can upgrade your plan or purchase additional credit packs. We'll notify you when you're running low so there are no surprises.",
    },
    {
      q: "Can I switch plans anytime?",
      a: "Absolutely. Upgrade, downgrade, or cancel anytime. Changes take effect at the start of your next billing cycle.",
    },
    {
      q: "Is my data safe?",
      a: "Your data is encrypted in transit and at rest. We never share your artist data, audience insights, or content with other users. Your competitive advantage stays yours.",
    },
    {
      q: "Do you offer annual billing?",
      a: "Yes — annual plans save 20%. Contact us or toggle to annual billing in your account settings.",
    },
    {
      q: "What integrations are included?",
      a: "All plans include core integrations: Spotify, Apple Music, social platforms, and email. Pro and Partner plans add API access and custom integrations.",
    },
    {
      q: "How is this different from ChatGPT?",
      a: "ChatGPT is a general chatbot. Recoupable agents are built specifically for the music business — they understand artists, releases, audiences, and campaigns. They don't just answer questions, they execute strategy.",
    },
  ] as PricingFAQ[],

  annualDiscount: "Save 20% with annual billing",
} as const;
