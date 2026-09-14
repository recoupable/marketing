import { freeAuditAnswer, homeCopy } from "../copy/home.ts";
import { pricingInquiryHref } from "../pricing.ts";
import type { PageSummary } from "./types.ts";

// Summaries of the offer pages; deliberate summaries, not a second copy of the page. Keep the representation label and source link when consuming them.
export const offerPages: PageSummary[] = [
  {
    path: "/",
    title: "Recoup: AI transformation for music funds and rightsholders",
    description:
      "AI strategy, custom systems, and team training for the business of music.",
    keywords:
      "music funds rightsholders catalog owners consulting transformation strategy systems training",
    paragraphs: [
      homeCopy.statement.join(" "),
      `Advisory: ${homeCopy.engagements.advisory} Build + Partner: ${homeCopy.engagements.partner}`,
      homeCopy.ownership.deliverables.map((item) => item.description).join(" "),
      homeCopy.ownership.terms,
      freeAuditAnswer,
      `${homeCopy.tools.introduction} ${homeCopy.tools.platform} ${homeCopy.tools.skills} ${homeCopy.tools.developers}`,
      "Work includes royalty reporting, investment review, catalog intelligence, and workflow automation. Read the case studies for the full examples.",
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
];
