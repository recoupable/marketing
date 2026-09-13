import {
  annualDiscountPercent,
  planPrice,
  pricingInquiryHref,
  pricingSummary,
} from "../pricing.ts";
import { siteConfig } from "../config.ts";
import type { PageSummary } from "./types.ts";

// Summaries of the software and pricing pages; same representation rules as offerPages.
export const productPages: PageSummary[] = [
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
