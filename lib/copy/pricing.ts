/**
 * Pricing page copy — single source of truth for plans, features, and FAQ.
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
  title: "Simple pricing. No surprises.",
  description:
    "Start free. Upgrade when your roster grows. Every plan includes AI agents that actually do the work — research, content, strategy, reporting.",

  plans: [
    {
      id: "plus",
      name: "Plus",
      audience: "For independent artists",
      price: "$19",
      period: "/mo",
      description:
        "Everything you need to run your own marketing with AI. Research your audience, generate content, plan releases.",
      features: [
        "1 artist profile",
        "100 AI credits / month",
        "Artist research & audience insights",
        "AI content generation",
        "Release planning tools",
        "Analytics dashboard",
        "Community support",
      ],
      cta: "Start free",
      ctaHref: siteConfig.appUrl,
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
        "Everything in Plus",
        "Train agents on your catalog data",
        "Multi-artist campaign planning",
        "Advanced audience segmentation",
        "Priority support",
        "API access",
      ],
      cta: "Start 30-day trial",
      ctaHref: siteConfig.appUrl,
      highlighted: true,
      badge: "Most popular",
    },
    {
      id: "partner",
      name: "Partner",
      audience: "For labels & enterprises",
      price: "Custom",
      period: "",
      description:
        "White-glove onboarding, dedicated support, and the full platform tailored to your operation.",
      features: [
        "Everything in Pro",
        "25,000+ chats / month",
        "Team seats & role management",
        "Custom agent training",
        "Dedicated account manager",
        "SLA & uptime guarantees",
        "Custom integrations",
        "Invoice billing",
      ],
      cta: "Talk to us",
      ctaHref: `mailto:${siteConfig.contactEmail}?subject=Recoupable%20Partner%20Plan`,
    },
  ] as PricingPlan[],

  faq: [
    {
      q: "What are AI credits?",
      a: "Each interaction with an AI agent uses credits — a research query, a content draft, an audience report. Most actions cost 1 credit. Heavy operations (deep research, long-form content) may cost 2-5.",
    },
    {
      q: "Can I try before I buy?",
      a: "Yes. Sign up and use the platform free with limited credits. Pro plans include a 30-day free trial — no credit card required.",
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
