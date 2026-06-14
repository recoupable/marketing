/**
 * Recoup OS copy — the flagship product page.
 *
 * Section structure mirrors the pm-world / "AI PM OS" landing page (the product
 * Recoup OS is modeled on): hero with a highlighted number, trusted-by logos,
 * problem cards, the big product card (+ also-includes + standalone skills),
 * the maker, real testimonial, FAQ, and a "put it to work" closer. Copy is
 * music/label-native and uses only real proof (no fabricated ratings).
 *
 * Recoup OS is the paid mega-plugin: every Recoup skill (and the skills bundled
 * across our individual plugins) packaged into one install — the headline SKU,
 * above the free individual skills and beside the hosted Chat app.
 */
import { siteConfig } from "@/lib/config";

export const recoupOsCopy = {
  eyebrow: "Recoup OS",

  hero: {
    // Rendered as: "One label." / "The output of [10]."
    lead: "One label.",
    trail: "The output of",
    highlight: "10.",
    description:
      "Recoup OS is an AI workspace for Claude Code, Cursor, Cowork, and Codex — every Recoup skill, wired together and ready to run on your roster, your catalog, and your release calendar.",
    worksWith: "Works with Claude Code, Cursor, Cowork & Codex. Install in minutes.",
    proof: "The same operating system we run on our own label, Recoup Records.",
    primary: { label: "Get Recoup OS — $99/year", href: "/pricing" },
    secondary: { label: "See what's inside", href: "#inside" },
  },

  /** Pricing (kept in sync with lib/copy/pricing.ts). */
  price: "$99",
  priceUnit: "/year",
  priceNote: "Updates included · cancel anytime · open skills stay free individually",

  /** Pain points — the "you're losing time" cards. */
  problems: [
    {
      tag: "Every chat starts from zero",
      body: "A general chatbot has never seen your roster, your catalog, or your deal terms — so you re-explain everything, every single time.",
    },
    {
      tag: "Skills scattered everywhere",
      body: "A research prompt here, a content workflow there, a diligence checklist in some doc. None of it surfaces when you're actually working a release.",
    },
    {
      tag: "Generic advice, wrong scale",
      body: "AI that treats a three-artist indie like a major. The playbook for your roster isn't the playbook for Universal.",
    },
  ],
  problemsClose:
    "That's the work that quietly never gets done. Recoup OS is the system built around how labels actually run.",

  /** The big product card. */
  product: {
    eyebrow: "The product",
    title: "A label team in a box.",
    description:
      "Every Recoup skill — research, catalog diligence, content, release ops, and growth — plus the workflows that connect them. It knows your roster, your catalog, and your calendar.",
    cta: { label: "Get Recoup OS", href: "/pricing" },
    hosts: ["Claude Code", "Cursor", "Cowork", "Codex"],
    features: [
      "Every Recoup skill, activated in context",
      "Cross-skill workflows: research → content → release",
      "Runs natively in Claude Code, Cursor, Cowork & Codex",
      "Context that remembers your roster & catalog",
      "Updated as one product, always current",
      "You own it — runs in your own environment",
    ],
    summary:
      "Every skill, every workflow — the operating system a modern label runs on.",
    alsoIncludes: {
      name: "Open skills",
      note: "Every individual skill, free to install on its own.",
      tag: "Included",
    },
    standalone: {
      name: "Open skills & plugins",
      note: "Free and à la carte — already included in Recoup OS.",
      price: "Free",
      cta: { label: "Browse skills only", href: "/skills" },
    },
  },

  /** Skill domains bundled into the OS. */
  inside: [
    {
      name: "Music Research",
      description:
        "Artist analytics, audience and people search, playlist intelligence, competitive analysis, and web research — the groundwork for catalog and deal work.",
    },
    {
      name: "Catalog & Diligence",
      description:
        "Data-room ingestion, royalty normalization, rights checks, IC memos, and valuation analysis for buy-side and seller-prep.",
    },
    {
      name: "Content Creation",
      description:
        "Draft, edit, and batch content for artists across every surface — built for how labels actually ship a release.",
    },
    {
      name: "Release Management",
      description:
        "Plan and run releases end to end: timelines, pitch prep, asset checklists, and post-release follow-through.",
    },
    {
      name: "Streaming Growth",
      description:
        "Audience growth playbooks, chart tracking, and the metrics that tell you what's actually working.",
    },
  ],

  /** The maker story. */
  maker: {
    eyebrow: "The maker",
    story:
      "I kept collecting skills and prompts I never had time to wire together — a research trick here, a content workflow there, scattered across docs and chats. So we built Recoup OS for our own label first: one install that knows the roster and the catalog, surfaces the right skill at the right moment, and actually runs the work. We use it every day — now you can too.",
  },

  testimonialsHeading: "What operators are saying",

  faq: [
    {
      q: "What exactly is Recoup OS, and what's included?",
      a: "Recoup OS is one installable plugin that bundles every Recoup skill — research, catalog diligence, content, release ops, and growth — plus the workflows that connect them. It's the whole operating system, not a single skill.",
    },
    {
      q: "Do I need to know how to code?",
      a: "No. You install it once into Claude Code, Cursor, Cowork, or Codex and then work in plain language. If you'd rather not install anything at all, the same skills run inside Chat, our hosted workspace.",
    },
    {
      q: "How is this different from just using ChatGPT or Claude?",
      a: "A general chatbot starts from zero every chat. Recoup OS loads music-native skills and your context — roster, catalog, calendar — so the answers are about your label, not the world in general.",
    },
    {
      q: "Do I need a paid plan for Claude Code, Cursor, or Codex?",
      a: "Recoup OS runs inside those tools, so you'll need whatever plan they require to run plugins. Recoup OS itself is the skills layer on top.",
    },
    {
      q: "What's your cancellation policy?",
      a: "It's $99/year with updates included, and you can cancel anytime. The open individual skills stay free either way.",
    },
    {
      q: "Why buy the bundle instead of the free skills?",
      a: "The individual skills are free one at a time. Recoup OS gives you all of them wired to work together — research feeds content, content feeds release ops — and kept current as one product.",
    },
  ],

  finalCta: {
    eyebrow: "Put it to work",
    title: "Run your next release on it.",
    description:
      "Get every Recoup skill in one install, then point your agent at your next release — research, content, and ops, all in one place.",
    cta: { label: "Get Recoup OS — $99/year", href: "/pricing" },
  },

  repoUrl: "https://github.com/recoupable/marketplace",
} as const;

export type RecoupOsCopy = typeof recoupOsCopy;

export function recoupOsToMarkdown(c: RecoupOsCopy): string {
  const lines: string[] = [
    `# ${c.eyebrow}: ${c.hero.lead} ${c.hero.trail} ${c.hero.highlight} — ${siteConfig.name}`,
    "",
    c.hero.description,
    "",
    `${c.hero.worksWith} ${c.hero.proof}`,
    `Price: ${c.price}${c.priceUnit}. ${c.priceNote}`,
    "",
    "## The problem",
    "",
    ...c.problems.map((p) => `- **${p.tag}** — ${p.body}`),
    "",
    c.problemsClose,
    "",
    `## ${c.product.title}`,
    "",
    c.product.description,
    "",
    `Runs in: ${c.product.hosts.join(", ")}`,
    "",
    ...c.product.features.map((f) => `- ${f}`),
    "",
    c.product.summary,
    "",
    "### What's inside",
    "",
    ...c.inside.map((i) => `- **${i.name}** — ${i.description}`),
    "",
    "## The maker",
    "",
    c.maker.story,
    "",
    "## FAQ",
    "",
    ...c.faq.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
    `## ${c.finalCta.title}`,
    "",
    c.finalCta.description,
  ];
  return lines.join("\n");
}
