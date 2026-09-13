import { siteConfig } from "../config.ts";
import {
  annualDiscountPercent,
  planPrice,
  pricingInquiryHref,
  pricingSummary,
} from "../pricing.ts";
import type { PageSummary } from "./types.ts";

// Deliberate summaries of the public offer pages, not a second copy of their complete
// content. Keep the representation label and source link when consuming them.
export const servicePages: PageSummary[] = [
  {
    path: "/",
    title: "Recoup: AI transformation for music funds and rightsholders",
    description:
      "AI strategy, custom systems, and team training for the business of music.",
    keywords:
      "music funds rightsholders catalog owners consulting transformation strategy systems training",
    paragraphs: [
      "Recoup provides AI strategy, custom systems and integrations, and team training for music funds and rightsholders. Engagements cover choosing priorities, implementing a first system, training its users, and reviewing results to decide what comes next. Custom code is delivered in a repository the client controls, with documentation and team training. Ownership, licenses, dependencies, and ongoing costs are agreed in the project scope. A free audit reviews one workflow and identifies a practical first step; implementation is a separate engagement.",
      "Work includes catalog acquisition review, royalty reporting, artist research, content preparation, and company-specific integrations. Recoup also offers a hosted platform, an API, MCP access, a CLI, and open-source Skills.",
    ],
    links: [
      ["Services", "/services"],
      ["Plans and pricing", "/pricing"],
      ["Our software", "/platform"],
      ["Get a Free Audit", "/start-project"],
    ],
  },
  {
    path: "/services",
    title: "AI strategy, custom systems, and team training",
    description:
      "Consulting and implementation services for music funds and rightsholders, from a roadmap to working software and team adoption.",
    keywords:
      "consulting services implementation transformation training ownership code handoff ongoing support",
    paragraphs: [
      "AI strategy: review workflows, data, and tools; agree on priorities, a practical roadmap, project scope, and success measures.",
      "Custom systems: build agents, applications, and connections to existing tools, with documented code and a working handoff. Examples include royalty reporting and investment review.",
      "Team training: practice on real workflows, capture reusable methods and review practices, and prepare internal owners to keep improving the system.",
      "Scope, deliverables, and price are agreed before work begins. Custom code is delivered in a repository the client controls; the agreement defines ownership and third-party component terms. Ongoing support and maintenance can be scoped separately.",
    ],
    links: [
      ["AI advisory", "/advisory"],
      ["Custom builds", "/build"],
      ["Compare plans", "/pricing#plans"],
      ["Discuss a project", "/contact"],
    ],
  },
  {
    path: "/advisory",
    title: "AI advisory for music companies",
    description:
      "Find where AI fits, review recurring work, and choose a useful first project with a way to measure improvement.",
    keywords:
      "consulting advisory strategy roadmap assessment prioritize AI adoption business case workflow audit",
    paragraphs: [
      "Recoup reviews recurring work in reporting, research, release planning, and catalog operations. The assessment considers the task, its current cost, the available information, access, and the places where judgment matters.",
      "The engagement identifies priorities, dependencies, a focused first project, and success measures. It can cover one question, a department, or a company-wide plan.",
      "Advisory can use Recoup, other tools, or custom software. It does not require moving the team onto the Recoup platform. The people doing the work participate in shaping the plan.",
    ],
    links: [
      ["Advisory plan", "/pricing#advisory"],
      ["Discuss AI strategy", pricingInquiryHref("advisory")],
      ["Custom systems", "/build"],
    ],
  },
  {
    path: "/build",
    title: "Custom AI systems for music businesses",
    description:
      "Agents, integrations, reporting dashboards, and full applications built around a music company's tools, data, and team.",
    keywords:
      "custom build integration CRM connect automation application software dashboard API MCP handoff ownership maintenance",
    paragraphs: [
      "Recoup builds agents for research, reports, campaign briefs, and recurring tasks; integrations connecting catalog data, royalty statements, CRMs, and internal tools; dashboards with source records and review queues; and full applications with interfaces and backends.",
      "Delivery starts with an agreed task, inputs, people, and acceptance standard. Useful pieces are reviewed with the team, tested on real work, documented, and handed over with training.",
      "Custom code is delivered in a repository the client controls. Agreements define ownership, component terms, price, maintenance, and responsibilities. Builds may use Recoup or run as standalone software.",
    ],
    links: [
      ["Build + Partner plan", "/pricing#partner"],
      ["Discuss a custom system", pricingInquiryHref("partner")],
      ["Royalty reporting", "/operations"],
      ["Acquisition review", "/acquisitions"],
    ],
  },
  {
    path: "/platform",
    title: "The Recoup AI platform for artists and music teams",
    description:
      "A hosted workspace for artist context, research, campaign drafts, and recurring prompts and reports.",
    keywords:
      "platform app artist workspace hosted research content campaigns reports recurring tasks",
    paragraphs: [
      "The platform brings artist profiles, notes, music, and reference files into a hosted workspace for artists, managers, and music teams.",
      "Use the context for artist and opportunity research, campaign ideas, captions, graphics, video drafts, recurring prompts, and reports. Start with an artist profile, relevant material, and a clear task.",
      `The self-serve Platform plan includes platform access and the music skill pack at ${planPrice("platform", "monthly").monthly}/month. Annual billing saves at least ${annualDiscountPercent}%. API and MCP usage is billed separately by usage. Company-specific workflows and integrations can be scoped with the consulting team.`,
    ],
    links: [
      ["Open Recoup", siteConfig.appUrl],
      ["Platform plan", "/pricing#platform"],
      ["Custom systems", "/build"],
    ],
  },
  {
    path: "/pricing",
    title: "Recoup pricing: platform, advisory, and custom builds",
    description:
      "Compare self-serve Platform, Advisory, Build + Partner, and custom Enterprise engagements. API and MCP are billed by usage.",
    keywords:
      "pricing price cost platform advisory consulting build partner enterprise monthly annual subscription API MCP usage",
    paragraphs: [
      ...pricingSummary(),
      `Annual billing applies a ${annualDiscountPercent}% discount, then rounds the monthly equivalent down to a whole dollar. The annual charge is twelve times that rounded amount. The page shows both amounts.`,
      "Enterprise has a custom scope and price; contact Recoup to discuss the engagement. For advisory and builds, scope, deliverables, and delivery schedule are agreed together.",
      "API and MCP are billed separately by usage. Consult the credits documentation for billable operations and usage accounting. The annual subscription discount does not discount usage charges.",
      "Recoup Skills remains open source. The Platform plan bundles a hosted workspace and the music skill pack; an AI client or third-party services may have their own costs.",
    ],
    links: [
      ["Compare plans", "/pricing#plans"],
      ["Open the platform", siteConfig.appUrl],
      ["Discuss advisory", pricingInquiryHref("advisory")],
      ["Discuss a build", pricingInquiryHref("partner")],
      ["Discuss Enterprise", pricingInquiryHref("enterprise")],
      ["API and MCP usage", "/docs/credits"],
    ],
  },
  {
    path: "/skills",
    title: "Recoup Skills: music playbooks for your AI",
    description:
      "Open-source methods for artist research, release planning, content preparation, and catalog work in compatible AI agents.",
    keywords:
      "skills plugins playbooks record label in a box install Claude marketplace open source agent methods",
    paragraphs: [
      "Recoup Skills brings music-business instructions, tools, and templates into compatible AI agents. The collection covers artist research, release planning, content, catalog work, and opportunity research.",
      "A skill is a reusable method for a job. It complements the tools an agent can access; some skills call the Recoup API or other services.",
      "The hosted Recoup app provides a workspace. Skills bring methods into an agent you already use. Installation and available integrations depend on the chosen AI client.",
    ],
    links: [
      ["Recoup Skills repository", siteConfig.githubUrl],
      ["Install in Claude", "/docs/claude"],
      ["API authentication", "/docs/authentication"],
    ],
  },
  {
    path: "/developers",
    title: "Recoup REST API, MCP, CLI, and agent tools",
    description:
      "Connect artist context, research, content creation, and music-business workflows to applications and agents.",
    keywords:
      "developer API endpoint integration MCP CLI SDK agent connect authentication docs keys REST",
    paragraphs: [
      "Recoup exposes a REST API, an authenticated platform MCP server, a CLI, and open-source Skills. The public documentation describes request parameters, responses, and credits.",
      "API and MCP are billed by usage, separately from subscriptions. The credits guide explains which operations incur charges and how usage is measured.",
      "The documented platform MCP endpoint is https://api.recoupable.dev/mcp. It requires an API key as a Bearer token and provides sandbox tools; it is separate from public website reading and search.",
      "The CLI is installed as @recoupable/cli and uses RECOUP_API_KEY. Available commands and current beta limitations are documented. Keep API keys on the server and consult the individual endpoint's authentication requirements.",
    ],
    links: [
      ["API reference", "/docs/api-reference"],
      ["Platform MCP setup", "/docs/mcp"],
      ["API and MCP pricing", "/pricing#usage"],
      ["Usage credits", "/docs/credits"],
      ["CLI guide", "/docs/cli"],
      ["API key setup", "/docs/authentication"],
    ],
  },
];
