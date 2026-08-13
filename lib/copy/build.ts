/**
 * /build page copy — the delivery half of the services ladder
 * (/advisory = think with us; /build = we build it, you own it).
 * chat#1800 Phase 2. Pricing posture: published "from" floors, exact
 * quotes set in scoping.
 */

export const buildCopy = {
  title: "Custom AI Technology for Music Businesses",
  headline: "Built for you. Owned by you.",
  subheadline:
    "We design and build custom AI technology for labels, distributors, catalog owners, and production houses: agents, integrations, dashboards, and full applications. Working software in weeks, and you own every line of it.",
  description:
    "Recoupable builds custom, customer-owned AI technology for music businesses: agents, integrations, APIs, MCP servers, and full applications. You own the code.",

  whatWeBuild: [
    {
      title: "Agents & Automations",
      description:
        "Research, reporting, content, and outreach agents that run your recurring work on a schedule: weekly briefings, playlist research, campaign tracking, roster monitoring.",
    },
    {
      title: "Integrations",
      description:
        "Your DSP data, CRM, royalty statements, and internal tools connected into one system. Spotify, Attio, Stripe, Google Workspace, Telegram, and whatever else you run on.",
    },
    {
      title: "Dashboards & Reporting",
      description:
        "The Monday-morning numbers assembled automatically: catalog performance, campaign results, roster health, delivered where your team already looks.",
    },
    {
      title: "Full Applications",
      description:
        "Backends, APIs, MCP servers, databases, and complete apps. Production-grade software scoped to your business, not a template.",
    },
  ],

  proof: [
    {
      tag: "INDEPENDENT LABEL",
      name: "Rostrum Records",
      stat: "$5K/mo agency eliminated",
      detail:
        "Replaced a $5,000/month content creation agency. Same price, 10x the output.",
    },
    {
      tag: "HIP-HOP LABEL & DISTRIBUTOR",
      name: "Fat Beats",
      stat: "72 hrs vs 3 weeks",
      detail:
        "Replaced a $10,000/month creative director. Full campaign in 72 hours instead of 3 weeks.",
    },
    {
      tag: "WARNER MUSIC GROUP",
      name: "Parlophone",
      stat: "40+ hrs/mo automated",
      detail:
        "Automated 40+ hours of monthly reporting. Five employees' Monday morning work, done by 8 AM.",
    },
  ],

  ownership: {
    title: "You own it. Actually.",
    description:
      "Most agencies rent you their process. Most software rents you their platform. We build in the open, in your accounts, and hand you the keys.",
    points: [
      {
        title: "Your repo",
        description:
          "Every line of code lives in a repository you control from day one. Read it, fork it, hire anyone to extend it.",
      },
      {
        title: "Your infrastructure",
        description:
          "Deployed on your accounts: your cloud, your domains, your API keys. Nothing routes through us unless you want it to.",
      },
      {
        title: "No lock-in",
        description:
          "No proprietary runtime, no per-seat hostage pricing, no export fees. If we disappear tomorrow, your software keeps running.",
      },
      {
        title: "Handoff or care, your choice",
        description:
          "Take the keys and run it yourself, or keep us on a Care Plan for maintenance, monitoring, and improvements.",
      },
    ],
  },

  process: [
    {
      step: "01",
      title: "Scope it",
      description:
        "Start with a Strategy Session to define what to build, why, and what it should cost you. The session fee is credited toward your build.",
    },
    {
      step: "02",
      title: "Build in weekly slices",
      description:
        "You see working software every week, not a big reveal at the end. Course-correct early, ship what matters first.",
    },
    {
      step: "03",
      title: "Handoff and training",
      description:
        "Documentation, a walkthrough for your team, and 30 days of included care. Then keep us on a Care Plan or take it fully in-house.",
    },
  ],

  tiers: [
    {
      name: "Starter Build",
      price: "from $2,500",
      description: "A site, a skill, or a single agent",
      features: [
        "One well-defined build: a landing page, an agent skill, or one automation",
        "Scoped and shipped in about a week",
        "Your repo, your accounts, full handoff",
        "30 days of included care",
      ],
      ctaLabel: "Start a Build",
      ctaHref: "/build/start?package=starter-build",
      highlighted: false,
    },
    {
      name: "Custom Build",
      price: "from $10k",
      description: "Backends, MCP servers, APIs, full apps",
      badge: "Most Popular",
      features: [
        "Full custom application scoped to your business",
        "Backends, APIs, MCP servers, databases, dashboards",
        "Weekly build slices with working software each week",
        "Team training and full documentation",
        "30 days of included care",
      ],
      ctaLabel: "Scope My Build",
      ctaHref: "/build/start?package=custom-build",
      highlighted: true,
    },
    {
      name: "Care Plan",
      price: "from $750/mo",
      description: "Maintenance, monitoring, improvements",
      features: [
        "Ongoing maintenance for anything we built",
        "Monitoring and same-week fixes",
        "Monthly improvement budget",
        "Priority access for new build requests",
      ],
      ctaLabel: "Talk Care",
      ctaHref: "/build/start?package=care-plan",
      highlighted: false,
    },
  ],

  faq: [
    {
      q: "Who owns the code and IP?",
      a: "You do. The repository is created under your ownership at the start of the engagement, and everything we write lands there. We keep no rights to your business logic or data.",
    },
    {
      q: "Do I have to use the Recoupable platform?",
      a: "No. Builds are platform-agnostic. Some clients want their build to use Recoup agents under the hood, some want fully standalone software. Both are normal.",
    },
    {
      q: "How fast is a build?",
      a: "Starter Builds ship in about a week. Custom Builds run in weekly slices, with most landing in 3 to 8 weeks depending on scope. You see working software every week either way.",
    },
    {
      q: "Who does the work?",
      a: "Sidney's team, working with the same AI leverage we sell. That is the reason a build costs thousands, not hundreds of thousands: we use agents for the repetitive work and senior judgment for the decisions.",
    },
    {
      q: "What happens after handoff?",
      a: "Every build includes 30 days of care. After that, keep us on a Care Plan or run it yourself. Your team gets documentation and a training walkthrough either way.",
    },
    {
      q: "What if I am not sure what to build?",
      a: "Book a Strategy Session on the advisory side. You leave with a concrete roadmap, and the session fee is credited toward a build if you go ahead.",
    },
  ],

  crossLink: {
    label: "Not sure what to build yet?",
    text: "Start with a Strategy Session. You leave with a roadmap, and the fee is credited toward your build.",
    ctaLabel: "See Advisory",
    ctaHref: "/advisory",
  },

  closingCta: {
    headline: "Your business. Your software.",
    subheadline:
      "The music companies pulling ahead are not buying more tools. They are building systems they own. Tell us what you need and we will scope it this week.",
    ctaLabel: "Start Your Build",
    ctaHref: "/build/start",
  },
};
