/**
 * Pricing page copy — single source of truth for plans, features, and FAQ.
 */
import { siteConfig } from "@/lib/config";
import { homeCopy } from "@/lib/copy/home";
import { buildChatUrl } from "@/lib/buildChatUrl";
import { formatCreditsBullet } from "@/lib/pricing/formatCreditsBullet";
import {
  FREE_CREDITS_USD,
  MEDIAN_REPORT_RUN_USD,
  PRO_CREDITS_USD,
} from "@/lib/pricing/const";

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
  /** Rendered under the CTA: what happens after the click, before it happens. */
  ctaNote?: string;
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
        formatCreditsBullet(FREE_CREDITS_USD, MEDIAN_REPORT_RUN_USD),
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
        "Run your whole roster on agents. Thirty times the budget, daily monitoring, reports delivered to anyone you choose.",
      features: [
        "Everything in Free",
        formatCreditsBullet(PRO_CREDITS_USD, MEDIAN_REPORT_RUN_USD),
        "Daily social monitoring for every artist on your roster",
        "Scheduled reports emailed to your team and artists, not just you",
        "API keys for your own agents and scripts",
      ],
      cta: "Start 30-day trial",
      ctaNote:
        "$0 today. Card required, cancel anytime before day 30. You will sign in with your email first.",
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

  /** The one product proof on the page: a real report plus the homepage quote. */
  proof: {
    eyebrow: "What a scheduled report looks like",
    title: "Every Monday, in your inbox, without asking.",
    body:
      "Real Spotify play deltas per track, audience numbers, top posts, and one recommendation. This one ran on the Free plan.",
    image: "/images/pricing/weekly-report.png",
    imageWidth: 680,
    imageHeight: 700,
    alt: "A weekly report email for an artist: stream gains per track over eight days, total plays, follower counts across Spotify, Instagram, TikTok and YouTube",
    quote: homeCopy.proof.quote,
    // The homepage prefixes a dash; this page sets the quote off with a rule instead.
    attribution: homeCopy.proof.attribution.replace(/^\u2014\s*/, ""),
  },

  faq: [
    {
      q: "What are AI credits?",
      a: `Credits are a dollar budget for agent work. Free accounts get $${FREE_CREDITS_USD.toFixed(2)} a month, Pro accounts $${PRO_CREDITS_USD.toFixed(2)}. A scheduled report run costs about $${MEDIAN_REPORT_RUN_USD.toFixed(2)}; a chat turn costs a few cents.`,
    },
    {
      q: "Can I try before I buy?",
      a: "Yes. Sign up and use the platform free with monthly credits at no cost. Pro includes a 30-day free trial, and you enter a card when you start it so nothing interrupts your agents when the trial ends. You can cancel before day 30 and pay nothing.",
    },
    {
      q: "What happens if I run out of credits?",
      a: "Add a card and top up any amount, or start the Pro trial. Your artists, catalogs, and scheduled tasks stay where they are.",
    },
    {
      q: "Is my data safe?",
      a: "Your data is encrypted in transit and at rest. We never share your artist data, audience insights, or content with other users. Your competitive advantage stays yours.",
    },
    {
      q: "What integrations are included?",
      a: "Every account connects Spotify, Apple Music, social profiles, and email. Pro adds API keys for your own agents. Labels get custom integrations through a call.",
    },
    {
      q: "How is this different from ChatGPT?",
      a: "ChatGPT is a general chatbot. Recoupable agents are built for the music business: they understand artists, releases, audiences, and campaigns. They don't just answer questions, they execute strategy.",
    },
  ] as PricingFAQ[],

  /** Bottom CTA, in the homepage's voice. */
  closing: {
    title: homeCopy.closing.line2,
    body: "Start free. Agents run the ops; you make the music.",
    cta: "Get started free",
    href: buildChatUrl({ campaign: "free" }),
  },
} as const;
