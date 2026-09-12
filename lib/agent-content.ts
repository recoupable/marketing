import { musicVideosCopy, musicVideosToMarkdown } from "./copy/music-videos.ts";
import docsSource from "../content/docs/manifest.json" with { type: "json" };
import postsSource from "../content/blog/posts.json" with { type: "json" };
import chaptersSource from "../content/playbook/chapters.json" with { type: "json" };
import type { DocPage } from "./docs";
import type { BlogPost } from "./blog";
import { blogDescription } from "./editorial-seo.ts";
import { documentationAgentMarkdown, readableAgentMarkdown } from "./agent-markdown.ts";
import { siteConfig } from "./config.ts";
import { annualDiscountPercent, planPrice, pricingInquiryHref, pricingSummary } from "./pricing.ts";
import { caseStudies } from "./case-studies.ts";
import { resolveDescriptionLinks } from "./resolve-description-links.ts";

export type AgentContentType = "page" | "docs" | "blog" | "playbook";
export type AgentContentMetadata = {
  id: string; type: AgentContentType; title: string; description: string; url: string;
  representation: "summary" | "full"; publishedAt?: string; updatedAt?: string;
  api?: { method: string; path: string; specificationUrl: string };
};
export type AgentContentErrorCode = "INVALID_QUERY" | "INVALID_TYPE" | "INVALID_LIMIT" | "INVALID_CURSOR" | "INVALID_ID" | "NOT_FOUND" | "INVALID_OFFSET" | "INVALID_MAX_LENGTH";
export class AgentContentError extends Error {
  readonly status: 400 | 404;
  readonly code: AgentContentErrorCode;
  constructor(code: AgentContentErrorCode, message: string) {
    super(message); this.name = "AgentContentError"; this.code = code;
    this.status = code === "NOT_FOUND" ? 404 : 400;
  }
}

type Entry = { metadata: AgentContentMetadata; searchable: string; keywords: string; markdown: () => Promise<string> };
type PageSummary = { path: string; title: string; description: string; keywords: string; paragraphs: string[]; links: [string, string][] };
const absolute = (path: string) => new URL(path, siteConfig.url).href;

// Deliberate summaries of the public pages, not a second copy of their complete
// content. Keep the representation label and source link when consuming them.
const pages: PageSummary[] = [
  {
    path: "/", title: "Recoup: AI transformation for music funds and rightsholders",
    description: "AI strategy, custom systems, and team training for the business of music.",
    keywords: "music funds rightsholders catalog owners consulting transformation strategy systems training",
    paragraphs: ["Recoup provides AI strategy, custom systems and integrations, and team training for music funds and rightsholders. Engagements cover choosing priorities, implementing a first system, training its users, and reviewing results to decide what comes next. Custom code is delivered in a repository the client controls, with documentation and team training. Ownership, licenses, dependencies, and ongoing costs are agreed in the project scope. A free audit reviews one workflow and identifies a practical first step; implementation is a separate engagement.", "Work includes catalog acquisition review, royalty reporting, artist research, content preparation, and company-specific integrations. Recoup also offers a hosted platform, an API, MCP access, a CLI, and open-source Skills."],
    links: [["Services", "/services"], ["Plans and pricing", "/pricing"], ["Our software", "/platform"], ["Get a Free Audit", "/start-project"]],
  },
  {
    path: "/services", title: "AI strategy, custom systems, and team training",
    description: "Consulting and implementation services for music funds and rightsholders, from a roadmap to working software and team adoption.",
    keywords: "consulting services implementation transformation training ownership code handoff ongoing support",
    paragraphs: ["AI strategy: review workflows, data, and tools; agree on priorities, a practical roadmap, project scope, and success measures.", "Custom systems: build agents, applications, and connections to existing tools, with documented code and a working handoff. Examples include royalty reporting and investment review.", "Team training: practice on real workflows, capture reusable methods and review practices, and prepare internal owners to keep improving the system.", "Scope, deliverables, and price are agreed before work begins. Custom code is delivered in a repository the client controls; the agreement defines ownership and third-party component terms. Ongoing support and maintenance can be scoped separately."],
    links: [["AI advisory", "/advisory"], ["Custom builds", "/build"], ["Compare plans", "/pricing#plans"], ["Discuss a project", "/contact"]],
  },
  {
    path: "/advisory", title: "AI advisory for music companies",
    description: "Find where AI fits, review recurring work, and choose a useful first project with a way to measure improvement.",
    keywords: "consulting advisory strategy roadmap assessment prioritize AI adoption business case workflow audit",
    paragraphs: ["Recoup reviews recurring work in reporting, research, release planning, and catalog operations. The assessment considers the task, its current cost, the available information, access, and the places where judgment matters.", "The engagement identifies priorities, dependencies, a focused first project, and success measures. It can cover one question, a department, or a company-wide plan.", "Advisory can use Recoup, other tools, or custom software. It does not require moving the team onto the Recoup platform. The people doing the work participate in shaping the plan."],
    links: [["Advisory plan", "/pricing#advisory"], ["Discuss AI strategy", pricingInquiryHref("advisory")], ["Custom systems", "/build"]],
  },
  {
    path: "/build", title: "Custom AI systems for music businesses",
    description: "Agents, integrations, reporting dashboards, and full applications built around a music company's tools, data, and team.",
    keywords: "custom build integration CRM connect automation application software dashboard API MCP handoff ownership maintenance",
    paragraphs: ["Recoup builds agents for research, reports, campaign briefs, and recurring tasks; integrations connecting catalog data, royalty statements, CRMs, and internal tools; dashboards with source records and review queues; and full applications with interfaces and backends.", "Delivery starts with an agreed task, inputs, people, and acceptance standard. Useful pieces are reviewed with the team, tested on real work, documented, and handed over with training.", "Custom code is delivered in a repository the client controls. Agreements define ownership, component terms, price, maintenance, and responsibilities. Builds may use Recoup or run as standalone software."],
    links: [["Build + Partner plan", "/pricing#partner"], ["Discuss a custom system", pricingInquiryHref("partner")], ["Royalty reporting", "/operations"], ["Acquisition review", "/acquisitions"]],
  },
  {
    path: "/platform", title: "The Recoup AI platform for artists and music teams",
    description: "A hosted workspace for artist context, research, campaign drafts, and recurring prompts and reports.",
    keywords: "platform app artist workspace hosted research content campaigns reports recurring tasks",
    paragraphs: ["The platform brings artist profiles, notes, music, and reference files into a hosted workspace for artists, managers, and music teams.", "Use the context for artist and opportunity research, campaign ideas, captions, graphics, video drafts, recurring prompts, and reports. Start with an artist profile, relevant material, and a clear task.", `The self-serve Platform plan includes platform access and the music skill pack at ${planPrice("platform", "monthly").monthly}/month. Annual billing saves at least ${annualDiscountPercent}%. API and MCP usage is billed separately by usage. Company-specific workflows and integrations can be scoped with the consulting team.`],
    links: [["Open Recoup", siteConfig.appUrl], ["Platform plan", "/pricing#platform"], ["Custom systems", "/build"]],
  },
  {
    path: "/pricing", title: "Recoup pricing: platform, advisory, and custom builds",
    description: "Compare self-serve Platform, Advisory, Build + Partner, and custom Enterprise engagements. API and MCP are billed by usage.",
    keywords: "pricing price cost platform advisory consulting build partner enterprise monthly annual subscription API MCP usage",
    paragraphs: [...pricingSummary(), `Annual billing applies a ${annualDiscountPercent}% discount, then rounds the monthly equivalent down to a whole dollar. The annual charge is twelve times that rounded amount. The page shows both amounts.`, "Enterprise has a custom scope and price; contact Recoup to discuss the engagement. For advisory and builds, scope, deliverables, and delivery schedule are agreed together.", "API and MCP are billed separately by usage. Consult the credits documentation for billable operations and usage accounting. The annual subscription discount does not discount usage charges.", "Recoup Skills remains open source. The Platform plan bundles a hosted workspace and the music skill pack; an AI client or third-party services may have their own costs."],
    links: [["Compare plans", "/pricing#plans"], ["Open the platform", siteConfig.appUrl], ["Discuss advisory", pricingInquiryHref("advisory")], ["Discuss a build", pricingInquiryHref("partner")], ["Discuss Enterprise", pricingInquiryHref("enterprise")], ["API and MCP usage", "/docs/credits"]],
  },
  {
    path: "/skills", title: "Recoup Skills: music playbooks for your AI",
    description: "Open-source methods for artist research, release planning, content preparation, and catalog work in compatible AI agents.",
    keywords: "skills plugins playbooks record label in a box install Claude marketplace open source agent methods",
    paragraphs: ["Recoup Skills brings music-business instructions, tools, and templates into compatible AI agents. The collection covers artist research, release planning, content, catalog work, and opportunity research.", "A skill is a reusable method for a job. It complements the tools an agent can access; some skills call the Recoup API or other services.", "The hosted Recoup app provides a workspace. Skills bring methods into an agent you already use. Installation and available integrations depend on the chosen AI client."],
    links: [["Recoup Skills repository", siteConfig.githubUrl], ["Install in Claude", "/docs/claude"], ["API authentication", "/docs/authentication"]],
  },
  {
    path: "/developers", title: "Recoup REST API, MCP, CLI, and agent tools",
    description: "Connect artist context, research, content creation, and music-business workflows to applications and agents.",
    keywords: "developer API endpoint integration MCP CLI SDK agent connect authentication docs keys REST",
    paragraphs: ["Recoup exposes a REST API, an authenticated platform MCP server, a CLI, and open-source Skills. The public documentation describes request parameters, responses, and credits.", "API and MCP are billed by usage, separately from subscriptions. The credits guide explains which operations incur charges and how usage is measured.", "The documented platform MCP endpoint is https://api.recoupable.dev/mcp. It requires an API key as a Bearer token and provides sandbox tools; it is separate from public website reading and search.", "The CLI is installed as @recoupable/cli and uses RECOUP_API_KEY. Available commands and current beta limitations are documented. Keep API keys on the server and consult the individual endpoint's authentication requirements."],
    links: [["API reference", "/docs/api-reference"], ["Platform MCP setup", "/docs/mcp"], ["API and MCP pricing", "/pricing#usage"], ["Usage credits", "/docs/credits"], ["CLI guide", "/docs/cli"], ["API key setup", "/docs/authentication"]],
  },
  {
    path: "/about", title: "About Recoup",
    description: "An AI transformation partner combining music-business knowledge, software engineering, and team training.",
    keywords: "about company founder Sidney Swift team music expertise consulting partner",
    paragraphs: ["Recoup was founded by Sidney Swift. It builds tools for artists and teams and custom AI systems for the work inside music companies.", "The approach is to understand the task before choosing technology, build with the people doing the work, document the system, and help the team take responsibility for it."],
    links: [["Services", "/services"], ["Platform", "/platform"], ["Contact", "/contact"]],
  },
  {
    path: "/contact", title: "Talk to Recoup about your company",
    description: "Discuss AI strategy, a custom system, or team training. Bring a company priority or recurring workflow.",
    keywords: "contact book call consultation email sales inquiry scope proposal company",
    paragraphs: ["Bring your company's priorities, an existing process, or a part of the business you want to improve. Recoup can discuss where AI may help and a useful starting point.", "The contact form asks for a name, work email, company, area of interest, and project brief. Use the form or email the address below. Reading this website does not submit an inquiry or book a meeting."],
    links: [["Project inquiry form", "/contact"], ["Share a fuller project brief", "/start-project"], ["Email Recoup", `mailto:${siteConfig.contactEmail}`]],
  },
  {
    path: "/start-project", title: "Get a free AI audit or discuss a Recoup project",
    description: "Request a free review of one music-business workflow, where AI could help, and a practical first step. Selected paid plans retain their project inquiry and pricing.",
    keywords: "lead project brief inquiry company fund budget cost price timeline start custom systems consultation qualification",
    paragraphs: ["Without a selected plan, this page requests a free AI audit of one workflow. Recoup follows up to arrange the review. Any implementation is scoped and priced separately. An allowlisted plan selection keeps the paid project inquiry and its billing context.", "The project inquiry asks for a name, work email, company, company type, area of interest, the work to improve, an initial project budget in USD, and a preferred starting timeframe. Role, phone, company website, and current tools or providers are optional.", "Budget ranges are planning context, not a rate card. Not decided yet and Just exploring are valid starting points. Recoup agrees scope and price before work begins.", "The visitor reviews and submits the brief. When direct submission is unavailable, the page prepares an unsent email brief with selectable and copyable text. Reading the page or preparing a brief through an agent does not save a lead or contact Recoup."],
    links: [["Request a free AI audit", "/start-project"], ["Shorter contact form", "/contact"], ["Custom builds", "/build"]],
  },
  {
    path: "/audit", title: "AI readiness check for music companies",
    description: "Seven questions about a recurring workflow, information, and team ownership produce a practical suggested next step.",
    keywords: "audit readiness assessment questionnaire where start information permissions repeatable process owner",
    paragraphs: ["The free readiness check asks about one recurring workflow, frequency, information, access, process documentation, ownership, and current AI use. No email is required.", "Recommendations focus on arranging information and access, making the job specific, identifying a workflow owner, or scoping a first build. It is a practical starting point, not a certification or predictive score."],
    links: [["Take the readiness check", "/audit"], ["AI advisory", "/advisory"]],
  },
  {
    path: "/roi", title: "AI workflow ROI planner",
    description: "Estimate capacity value and costs from your own assumptions about a recurring task, setup effort, and ongoing system costs.",
    keywords: "ROI return investment calculator planner hours time savings capacity cost payback assumptions",
    paragraphs: ["Inputs include monthly task hours, hourly cost, expected time reduction, ongoing monthly system cost, and one-time setup cost. The planner calculates hours saved, capacity value, monthly net value, first-year value, and payback when applicable.", "Freed time is capacity, not automatically cash saved. Include preparation, review, correction, and maintenance; test conservative assumptions on real tasks before projecting results."],
    links: [["Use the workflow planner", "/roi"], ["Discuss the assumptions", "/contact"]],
  },
  {
    path: "/acquisitions", title: "AI for music catalog acquisitions",
    description: "Custom systems organize deal materials, draft diligence reviews, and connect open questions to source records.",
    keywords: "catalog acquisition due diligence investment review music fund rights deal documents seller financial model source assumptions",
    paragraphs: ["Recoup can build a workflow that gathers deal documents, financial models, and analyst notes into one review; traces findings to their sources; keeps missing information visible; and prepares questions for the seller.", "The result is a draft review for the investment team. The service supports preparation and review rather than promising an investment decision or guaranteed outcome."],
    links: [["Acquisition workflow example", "/acquisitions#workflow"], ["Discuss acquisition review", "/acquisitions/contact"]],
  },
  {
    path: "/operations", title: "AI royalty reporting and catalog operations",
    description: "Custom royalty intake, reconciliation, and recurring reporting systems keep matches, exceptions, and source records visible.",
    keywords: "royalty royalties statement receipts reconcile reconciliation monthly reporting catalog operations payment source differences exceptions",
    paragraphs: ["Recoup can connect royalty statements, receipts, and catalog records; identify differences by payment source; and prepare a report with the underlying records and a focused review list.", "The example demonstrates why an overall matching total does not prove each source reconciles: offsetting differences can cancel out. Reviewers can inspect records behind individual differences.", "A project starts with the team's actual files, tools, and recurring reporting process. The scope defines the useful first build and review responsibilities."],
    links: [["Royalty reporting example", "/operations#workflow"], ["Discuss catalog operations", "/operations/contact"]],
  },
  {
    path: "/agents", title: "Read Recoup with your AI agent",
    description: "Search and read Recoup's public pages, documentation, articles, and playbooks through public agent interfaces.",
    keywords: "agent public website search read MCP WebMCP machine readable discovery content tools",
    paragraphs: ["The public agent interface searches and reads the website's published content. Documentation, articles, and playbook chapters are returned as readable Markdown; marketing-page overviews are explicitly labeled as summaries with links to the complete pages.", "These tools do not access private account or client information, run platform tasks, submit inquiries, or book meetings. Platform actions use the separate authenticated Recoup API and MCP server."],
    links: [["Agent access and setup", "/agents"], ["Public documentation", "/docs"], ["Authenticated platform tools", "/developers"]],
  },
  {
    path: "/privacy", title: "Recoup Privacy Policy",
    description: "Read the full policy covering information collection, use, disclosure, security, rights, and contact details.",
    keywords: "privacy data personal information security rights policy cookies third party consent",
    paragraphs: ["The Privacy Policy describes information collection, usage, sharing, third-party services, security, individual rights and choices, children's privacy, international transfers, and policy changes.", "This is a navigation summary, not the complete policy. Consult the linked policy for its full text and stated update date."],
    links: [["Read the complete Privacy Policy", "/privacy"]],
  },
  {
    path: "/terms", title: "Recoup Terms of Use",
    description: "Read the complete terms for Recoup's website, APIs, AI platform, and services.",
    keywords: "terms legal contract use purchase subscription license ownership liability arbitration",
    paragraphs: ["The Terms of Use cover service access, registration, content responsibility, ownership, conduct, third-party services, purchases, subscriptions, warranties, liability, arbitration, and other provisions.", "This is a navigation summary, not the complete agreement. Read the full terms and any applicable supplemental terms before using the service."],
    links: [["Read the complete Terms of Use", "/terms"]],
  },
];

pages.push({
  path: "/case-studies", title: "Recoup project stories",
  description: "Anonymized accounts of royalty reporting, investment preparation, and catalog intelligence work.",
  keywords: "case studies project stories implementation royalties investment catalog",
  paragraphs: ["These stories describe documented work with music teams. Illustrations show the methods, not client financial data. They do not claim measured revenue gains or ROI."],
  links: caseStudies.map(study => [study.title, `/case-studies/${study.slug}`]),
});
pages.push(...caseStudies.map((study): PageSummary => ({
  path: `/case-studies/${study.slug}`, title: study.title, description: study.summary,
  keywords: `case study project story ${study.category} ${study.audience} ${study.deliverable}`,
  paragraphs: [study.change, ...study.problem.paragraphs, ...study.outcome.paragraphs, study.scope],
  links: [[study.nextLabel, study.nextHref], ["Discuss a similar project", "/contact"], ["All project stories", "/case-studies"]],
})));

const entries: Entry[] = pages.map(page => {
  const url = absolute(page.path);
  return {
    metadata: { id: `page:${page.path}`, type: "page", title: page.title, description: page.description, url, representation: "summary" },
    keywords: page.keywords,
    searchable: `${page.title} ${page.description} ${page.paragraphs.join(" ")} ${page.keywords}`,
    markdown: async () => [`# ${page.title}`, `Source: ${url}`, "Representation: Summary of the public page. Follow the source for the complete page.", ...page.paragraphs, "## Next steps", ...page.links.map(([label, href]) => `- [${label}](${absolute(href)})`)].join("\n\n") + "\n",
  };
});

entries.push({
  metadata: { id: "page:/music-videos", type: "page", title: musicVideosCopy.title, description: musicVideosCopy.description, url: absolute("/music-videos"), representation: "full" },
  keywords: "music video film generation skill download quote released recording artist",
  searchable: musicVideosToMarkdown(),
  markdown: async () => musicVideosToMarkdown(),
});

for (const page of docsSource as DocPage[]) {
  const url = absolute(page.slug ? `/docs/${page.slug}` : "/docs");
  entries.push({
    metadata: { id: `docs:${page.slug || "index"}`, type: "docs", title: page.title, description: resolveDescriptionLinks(page.description), url, representation: "full", ...(page.api?.spec ? { api: { method: page.api.method, path: page.api.path, specificationUrl: absolute(`/docs/spec/${page.api.spec}`) } } : {}) },
    searchable: page.searchText, keywords: `${page.category} ${page.group}`,
    markdown: () => documentationAgentMarkdown(page),
  });
}

for (const post of postsSource as BlogPost[]) {
  const url = absolute(`/blog/${post.slug}`);
  entries.push({
    metadata: { id: `blog:${post.slug}`, type: "blog", title: post.title, description: blogDescription(post), url, representation: "full", publishedAt: post.date, ...(post.updatedAt ? { updatedAt: post.updatedAt } : {}) },
    searchable: `${post.title} ${blogDescription(post)} ${post.body}`, keywords: post.category,
    markdown: async () => [`# ${post.title}`, `Source: ${url}`, `Author: ${post.author}\n\nPublished: ${post.date}${post.updatedAt ? `\n\nUpdated: ${post.updatedAt}` : ""}`, readableAgentMarkdown(post.body, url)].join("\n\n") + "\n",
  });
}

type Chapter = { slug: string; title: string; description: string; sections: { heading: string; paragraphs?: string[]; items?: string[]; steps?: string[]; prompts?: { label: string; text: string }[] }[] };
for (const chapter of chaptersSource as Chapter[]) {
  const markdown = [`# ${chapter.title}`, `Source: ${absolute(`/playbook/download#${chapter.slug}`)}`, chapter.description, ...chapter.sections.flatMap(section => [`## ${section.heading}`, ...(section.paragraphs || []), ...(section.items || []).map(item => `- ${item}`), ...(section.steps || []).map((step, i) => `${i + 1}. ${step}`), ...(section.prompts || []).flatMap(prompt => [`### ${prompt.label}`, prompt.text])])].join("\n\n") + "\n";
  entries.push({ metadata: { id: `playbook:${chapter.slug}`, type: "playbook", title: chapter.title, description: chapter.description, url: absolute(`/playbook/download#${chapter.slug}`), representation: "full" }, searchable: markdown, keywords: "playbook guide workflow prompts", markdown: async () => markdown });
}

const registry = new Map(entries.map(entry => [entry.metadata.id, entry]));
export function getAgentContentIndex(): AgentContentMetadata[] { return entries.map(entry => structuredClone(entry.metadata)); }

const stopWords = new Set(["a", "an", "the", "and", "or", "for", "to", "of", "in", "on", "at", "with", "from", "is", "are", "be", "do", "does", "can", "could", "would", "should", "i", "we", "you", "my", "our", "your", "how", "what", "where", "which", "me", "about", "help", "get"]);
const equivalents: Record<string, string> = { royalties: "royalty", catalogue: "catalog", catalogs: "catalog", catalogues: "catalog", reconciliation: "reconcile", reconciling: "reconcile", integrate: "integration", integrations: "integration", integrated: "integration", consulting: "consult", consultation: "consult", consultancy: "consult", diligence: "acquisition", acquisitions: "acquisition", funds: "fund", plans: "plan", pricing: "price", costs: "cost", statements: "statement", endpoints: "endpoint", agents: "agent", artists: "artist", reports: "report", reporting: "report", building: "build", tools: "tool", skills: "skill" };
function tokens(text: string): string[] {
  return [...new Set((text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().match(/[a-z0-9]+/g) || []).filter(word => !stopWords.has(word)).map(word => equivalents[word] || word))];
}
const searchEntries = entries.map(entry => ({ entry, title: new Set(tokens(entry.metadata.title)), description: new Set(tokens(entry.metadata.description)), keywords: new Set(tokens(entry.keywords)), body: new Set(tokens(entry.searchable)) }));

function validateFields(input: unknown, fields: string[], code: AgentContentErrorCode): void {
  if (!input || typeof input !== "object" || Array.isArray(input) || ![Object.prototype, null].includes(Object.getPrototypeOf(input))) throw new AgentContentError(code, "Provide an object containing the documented fields.");
  if (Reflect.ownKeys(input).some(key => typeof key !== "string" || !fields.includes(key))) throw new AgentContentError(code, "Use only the documented fields.");
}

export type AgentSearchInput = { query: string; type?: AgentContentType | "all"; limit?: number; cursor?: string };
export async function searchAgentContent(input: AgentSearchInput) {
  validateFields(input, ["query", "type", "limit", "cursor"], "INVALID_QUERY");
  if (!input || typeof input.query !== "string" || !input.query.trim() || input.query.length > 240 || /[\u0000-\u001f\u007f]/.test(input.query)) throw new AgentContentError("INVALID_QUERY", "Provide a search query between 1 and 240 characters.");
  if (input.type !== undefined && !["all", "page", "docs", "blog", "playbook"].includes(input.type)) throw new AgentContentError("INVALID_TYPE", "Choose all, page, docs, blog, or playbook.");
  const limit = input.limit === undefined ? 5 : input.limit;
  if (!Number.isInteger(limit) || limit < 1 || limit > 10) throw new AgentContentError("INVALID_LIMIT", "Limit must be an integer from 1 to 10.");
  if (input.cursor !== undefined && (typeof input.cursor !== "string" || !/^(0|[1-9]\d{0,4})$/.test(input.cursor))) throw new AgentContentError("INVALID_CURSOR", "Use the nextCursor returned by a previous search.");
  const offset = Number(input.cursor || 0);
  const query = input.query.trim();
  const words = tokens(query).filter(word => word !== "recoup" || tokens(query).length === 1);
  const apiQuery = query.match(/^(?:(GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)\s+)?(\/api\/[^\s?]+)$/i);
  const ranked = searchEntries.filter(({ entry }) => !input.type || input.type === "all" || entry.metadata.type === input.type).map(item => {
    const { entry, title, description, keywords, body } = item;
    let score = 0;
    let matched = 0;
    for (const word of words) {
      const hit = title.has(word) || description.has(word) || keywords.has(word) || body.has(word);
      if (hit) matched++;
      score += Number(title.has(word)) * 12 + Number(description.has(word)) * 6 + Number(keywords.has(word)) * 8 + Number(body.has(word));
    }
    if (entry.metadata.title.toLowerCase() === query.toLowerCase()) score += 100;
    if (apiQuery && entry.metadata.api?.path.toLowerCase() === apiQuery[2].toLowerCase()) score += 300 + (apiQuery[1]?.toUpperCase() === entry.metadata.api.method ? 100 : 0);
    if (!matched || (words.length > 2 && matched / words.length < 0.5)) return { entry, score: 0 };
    score += (matched / Math.max(words.length, 1)) * 20;
    return { entry, score };
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score || a.entry.metadata.id.localeCompare(b.entry.metadata.id, "en"));
  if (offset > ranked.length) throw new AgentContentError("INVALID_CURSOR", "The cursor is beyond this search's results. Restart without a cursor.");
  const results = ranked.slice(offset, offset + limit).map(({ entry }) => {
    const text = entry.metadata.description || entry.searchable.replace(/<[^>]+>/g, "").replace(/\s+/g, " ");
    const excerpt = text.length > 320 ? `${text.slice(0, text.lastIndexOf(" ", 317) > 0 ? text.lastIndexOf(" ", 317) : 317)}…` : text;
    return { ...structuredClone(entry.metadata), excerpt };
  });
  return { query, results, total: ranked.length, nextCursor: offset + results.length < ranked.length ? String(offset + results.length) : null };
}

export type AgentReadInput = { id: string; offset?: number; maxLength?: number };
export async function readAgentContent(input: AgentReadInput) {
  validateFields(input, ["id", "offset", "maxLength"], "INVALID_ID");
  if (!input || typeof input.id !== "string" || input.id.length > 300 || !/^(?:page:\/[a-z0-9/-]*|(?:docs|blog|playbook):[a-z0-9][a-z0-9/-]*)$/.test(input.id)) throw new AgentContentError("INVALID_ID", "Use an exact content ID returned by search or the content index.");
  const entry = registry.get(input.id);
  if (!entry) throw new AgentContentError("NOT_FOUND", "Public content was not found for this ID.");
  const offset = input.offset === undefined ? 0 : input.offset;
  const maxLength = input.maxLength === undefined ? 6000 : input.maxLength;
  if (!Number.isSafeInteger(offset) || offset < 0) throw new AgentContentError("INVALID_OFFSET", "Offset must be a nonnegative integer from the previous response.");
  if (!Number.isInteger(maxLength) || maxLength < 1 || maxLength > 12000) throw new AgentContentError("INVALID_MAX_LENGTH", "maxLength must be an integer from 1 to 12000.");
  // Offsets count Unicode characters, so chunks never split an emoji or
  // non-BMP character and every nonempty chunk makes progress.
  const characters = Array.from(await entry.markdown());
  if (offset > characters.length) throw new AgentContentError("INVALID_OFFSET", "Offset is beyond the end of this document.");
  const end = Math.min(offset + maxLength, characters.length);
  return { ...structuredClone(entry.metadata), markdown: characters.slice(offset, end).join(""), offset, nextOffset: end < characters.length ? end : null, totalLength: characters.length };
}
