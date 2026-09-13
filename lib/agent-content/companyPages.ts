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
];
