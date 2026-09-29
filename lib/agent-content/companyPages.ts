import { siteConfig } from "../config.ts";
import type { PageSummary } from "./types.ts";

// Summaries of the company and contact pages; same representation rules as offerPages.
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
      ["Start a project", "/start-project"],
      ["Email Recoup", `mailto:${siteConfig.contactEmail}`],
    ],
  },
  {
    path: "/start-project",
    title: "Start your project with Recoup",
    description:
      "Request a consultation to identify a practical first project, how it fits your tools, and a starting scope, budget and timeline.",
    keywords:
      "lead project brief inquiry company fund budget cost price timeline start custom systems consultation qualification",
    paragraphs: [
      "Recoup emails you to arrange a consultation. For custom platforms, the conversation covers where software could save time, connections to existing tools, and a practical starting scope, budget and timeline. Submitting the form does not book a meeting or produce a quote. Scope and pricing are agreed before work begins. An allowlisted plan selection retains its billing context.",
      "The project inquiry requires a name, email, area of interest, initial project budget in USD, and preferred starting timeframe. Current tools are optional. An expandable section offers an optional company name and note. The email domain is saved as an unverified company research hint.",
      "Budget ranges are planning context, not a rate card. Not decided yet and Just exploring are valid starting points. Recoup agrees scope and price before work begins.",
      "The visitor reviews and submits the brief. When direct submission is unavailable, the page prepares an unsent email brief with selectable and copyable text. Reading the page or preparing a brief through an agent does not save a lead or contact Recoup.",
    ],
    links: [
      ["Start a project", "/start-project"],
      ["Contact form", "/contact"],
      ["Custom builds", "/build"],
    ],
  },
];
