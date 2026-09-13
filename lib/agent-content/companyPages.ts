import { siteConfig } from "../config.ts";
import type { PageSummary } from "./types.ts";

// Summaries of the company, contact, tool, and legal pages; same representation rules as servicePages.
export const companyPages: PageSummary[] = [
  {
    path: "/about",
    title: "About Recoup",
    description:
      "An AI transformation partner combining music-business knowledge, software engineering, and team training.",
    keywords:
      "about company founder Sidney Swift team music expertise consulting partner",
    paragraphs: [
      "Recoup was founded by Sidney Swift. It builds tools for artists and teams and custom AI systems for the work inside music companies.",
      "The approach is to understand the task before choosing technology, build with the people doing the work, document the system, and help the team take responsibility for it.",
    ],
    links: [
      ["Services", "/services"],
      ["Platform", "/platform"],
      ["Contact", "/contact"],
    ],
  },
  {
    path: "/contact",
    title: "Talk to Recoup about your company",
    description:
      "Discuss AI strategy, a custom system, or team training. Bring a company priority or recurring workflow.",
    keywords:
      "contact book call consultation email sales inquiry scope proposal company",
    paragraphs: [
      "Bring your company's priorities, an existing process, or a part of the business you want to improve. Recoup can discuss where AI may help and a useful starting point.",
      "The contact form asks for a name, work email, company, area of interest, and project brief. Use the form or email the address below. Reading this website does not submit an inquiry or book a meeting.",
    ],
    links: [
      ["Project inquiry form", "/contact"],
      ["Share a fuller project brief", "/start-project"],
      ["Email Recoup", `mailto:${siteConfig.contactEmail}`],
    ],
  },
  {
    path: "/start-project",
    title: "Get a free AI audit or discuss a Recoup project",
    description:
      "Request a free review of one music-business workflow, where AI could help, and a practical first step. Selected paid plans retain their project inquiry and pricing.",
    keywords:
      "lead project brief inquiry company fund budget cost price timeline start custom systems consultation qualification",
    paragraphs: [
      "Without a selected plan, this page requests a free AI audit of one workflow. Recoup follows up to arrange the review. Any implementation is scoped and priced separately. An allowlisted plan selection keeps the paid project inquiry and its billing context.",
      "The project inquiry asks for a name, work email, company, company type, area of interest, the work to improve, an initial project budget in USD, and a preferred starting timeframe. Role, phone, company website, and current tools or providers are optional.",
      "Budget ranges are planning context, not a rate card. Not decided yet and Just exploring are valid starting points. Recoup agrees scope and price before work begins.",
      "The visitor reviews and submits the brief. When direct submission is unavailable, the page prepares an unsent email brief with selectable and copyable text. Reading the page or preparing a brief through an agent does not save a lead or contact Recoup.",
    ],
    links: [
      ["Request a free AI audit", "/start-project"],
      ["Shorter contact form", "/contact"],
      ["Custom builds", "/build"],
    ],
  },
  {
    path: "/audit",
    title: "AI readiness check for music companies",
    description:
      "Seven questions about a recurring workflow, information, and team ownership produce a practical suggested next step.",
    keywords:
      "audit readiness assessment questionnaire where start information permissions repeatable process owner",
    paragraphs: [
      "The free readiness check asks about one recurring workflow, frequency, information, access, process documentation, ownership, and current AI use. No email is required.",
      "Recommendations focus on arranging information and access, making the job specific, identifying a workflow owner, or scoping a first build. It is a practical starting point, not a certification or predictive score.",
    ],
    links: [
      ["Take the readiness check", "/audit"],
      ["AI advisory", "/advisory"],
    ],
  },
  {
    path: "/roi",
    title: "AI workflow ROI planner",
    description:
      "Estimate capacity value and costs from your own assumptions about a recurring task, setup effort, and ongoing system costs.",
    keywords:
      "ROI return investment calculator planner hours time savings capacity cost payback assumptions",
    paragraphs: [
      "Inputs include monthly task hours, hourly cost, expected time reduction, ongoing monthly system cost, and one-time setup cost. The planner calculates hours saved, capacity value, monthly net value, first-year value, and payback when applicable.",
      "Freed time is capacity, not automatically cash saved. Include preparation, review, correction, and maintenance; test conservative assumptions on real tasks before projecting results.",
    ],
    links: [
      ["Use the workflow planner", "/roi"],
      ["Discuss the assumptions", "/contact"],
    ],
  },
  {
    path: "/acquisitions",
    title: "AI for music catalog acquisitions",
    description:
      "Custom systems organize deal materials, draft diligence reviews, and connect open questions to source records.",
    keywords:
      "catalog acquisition due diligence investment review music fund rights deal documents seller financial model source assumptions",
    paragraphs: [
      "Recoup can build a workflow that gathers deal documents, financial models, and analyst notes into one review; traces findings to their sources; keeps missing information visible; and prepares questions for the seller.",
      "The result is a draft review for the investment team. The service supports preparation and review rather than promising an investment decision or guaranteed outcome.",
    ],
    links: [
      ["Acquisition workflow example", "/acquisitions#workflow"],
      ["Discuss acquisition review", "/acquisitions/contact"],
    ],
  },
  {
    path: "/operations",
    title: "AI royalty reporting and catalog operations",
    description:
      "Custom royalty intake, reconciliation, and recurring reporting systems keep matches, exceptions, and source records visible.",
    keywords:
      "royalty royalties statement receipts reconcile reconciliation monthly reporting catalog operations payment source differences exceptions",
    paragraphs: [
      "Recoup can connect royalty statements, receipts, and catalog records; identify differences by payment source; and prepare a report with the underlying records and a focused review list.",
      "The example demonstrates why an overall matching total does not prove each source reconciles: offsetting differences can cancel out. Reviewers can inspect records behind individual differences.",
      "A project starts with the team's actual files, tools, and recurring reporting process. The scope defines the useful first build and review responsibilities.",
    ],
    links: [
      ["Royalty reporting example", "/operations#workflow"],
      ["Discuss catalog operations", "/operations/contact"],
    ],
  },
  {
    path: "/agents",
    title: "Read Recoup with your AI agent",
    description:
      "Search and read Recoup's public pages, documentation, articles, and playbooks through public agent interfaces.",
    keywords:
      "agent public website search read MCP WebMCP machine readable discovery content tools",
    paragraphs: [
      "The public agent interface searches and reads the website's published content. Documentation, articles, and playbook chapters are returned as readable Markdown; marketing-page overviews are explicitly labeled as summaries with links to the complete pages.",
      "These tools do not access private account or client information, run platform tasks, submit inquiries, or book meetings. Platform actions use the separate authenticated Recoup API and MCP server.",
    ],
    links: [
      ["Agent access and setup", "/agents"],
      ["Public documentation", "/docs"],
      ["Authenticated platform tools", "/developers"],
    ],
  },
  {
    path: "/privacy",
    title: "Recoup Privacy Policy",
    description:
      "Read the full policy covering information collection, use, disclosure, security, rights, and contact details.",
    keywords:
      "privacy data personal information security rights policy cookies third party consent",
    paragraphs: [
      "The Privacy Policy describes information collection, usage, sharing, third-party services, security, individual rights and choices, children's privacy, international transfers, and policy changes.",
      "This is a navigation summary, not the complete policy. Consult the linked policy for its full text and stated update date.",
    ],
    links: [["Read the complete Privacy Policy", "/privacy"]],
  },
  {
    path: "/terms",
    title: "Recoup Terms of Use",
    description:
      "Read the complete terms for Recoup's website, APIs, AI platform, and services.",
    keywords:
      "terms legal contract use purchase subscription license ownership liability arbitration",
    paragraphs: [
      "The Terms of Use cover service access, registration, content responsibility, ownership, conduct, third-party services, purchases, subscriptions, warranties, liability, arbitration, and other provisions.",
      "This is a navigation summary, not the complete agreement. Read the full terms and any applicable supplemental terms before using the service.",
    ],
    links: [["Read the complete Terms of Use", "/terms"]],
  },
];
