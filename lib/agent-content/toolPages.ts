import { aiScorecardCopy } from "../copy/ai-scorecard.ts";
import type { PageSummary } from "./types.ts";

// Summaries of the free tools and the agent entry page; same representation rules as offerPages.
export const toolPages: PageSummary[] = [
  {
    path: "/workflow-plan",
    title: aiScorecardCopy.title,
    description: aiScorecardCopy.description,
    keywords:
      "music company AI scorecard audit assessment capability adoption reliability results peer examples plan",
    paragraphs: [...aiScorecardCopy.paragraphs],
    links: [
      ["Get my AI Scorecard", "/workflow-plan"],
      ["Custom systems", "/build"],
    ],
  },
  {
    path: "/ask",
    title: "Ask Recoup",
    description:
      "Ask Recoup's website assistant about our tools, services and approach.",
    keywords: "FAQ questions Recoup assistant services tools",
    paragraphs: [
      "Ask questions in a conversation grounded in Recoup's public website content. The same assistant can help develop a workflow plan without requiring a separate conversation. It has no access to private customer records or authenticated platform tools.",
    ],
    links: [
      ["Ask Recoup", "/ask"],
      ["Contact us", "/contact"],
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
];
