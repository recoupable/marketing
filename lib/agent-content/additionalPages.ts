import { docsUrl } from "../docsUrl.ts";
import { siteConfig } from "../config.ts";
import type { PageSummary } from "./types.ts";

// Public page overviews. Interactive account state never belongs in this registry.
export const additionalPages: PageSummary[] = [
  {
    path: "/company",
    title: "Company: About Recoup",
    description:
      "Meet Recoup, explore our approach to AI in music, and learn about our platform and services.",
    keywords: "company music experience technology",
    paragraphs: [
      "Recoup builds AI systems for the business of music and helps the people behind it put those systems to work. Explore the company, its vision, and Recoup Records, the in-house label that uses the platform.",
    ],
    links: [
      ["About Recoup", "/about"],
      ["Our vision", "/company/vision"],
      ["Recoup Records", "/records"],
    ],
  },
  {
    path: "/company/vision",
    title: "Recoup’s vision for AI in music",
    description:
      "More attention for the music: connected information, repeatable work, and practical results for music teams.",
    keywords: "vision research coordination agents human review",
    paragraphs: [
      "Research, coordination, and repetitive preparation take time from music teams. Recoup builds toward useful results: prepared reports, supported research briefs, release plans, and recurring workflows.",
      "People set the direction, define good work, and review decisions. Platform, Skills, API, advisory, custom systems, and training offer different ways to put those methods to work.",
    ],
    links: [
      ["Platform", "/platform"],
      ["Skills", "/skills"],
      ["Services", "/services"],
    ],
  },
  {
    path: "/records",
    title: "Recoup Records: Our in-house music label",
    description:
      "Recoup Records uses the Recoup platform for research, planning, and creative work around music.",
    keywords: "records label artist context releases",
    paragraphs: [
      "The in-house label puts Recoup’s own workflows into practice: understand the artist, audience, voice, and goals; develop campaigns and release plans; use the results to improve the methods and tools.",
    ],
    links: [
      ["Platform", "/platform"],
      ["Skills", "/skills"],
    ],
  },
  {
    path: "/solutions",
    title:
      "AI for music funds, catalog owners, labels, distributors, and artists",
    description: "Explore Recoup workflows for the business around music.",
    keywords: "solutions music funds labels distributors managers",
    paragraphs: [
      "Funds and catalog owners can organize acquisition documents, compare royalty statements and receipts, search permissioned catalogs, and prepare management briefs.",
      "Labels and rightsholders can build repeatable artist research, creative preparation, reporting, and release planning. Distributors can connect roster onboarding, cross-roster reporting, embedded tools, and artist services.",
      "Artists and managers can bring artist context into audience research, campaigns, release plans, and scheduled tasks.",
    ],
    links: [
      ["Acquisition review", "/acquisitions"],
      ["Platform", "/platform"],
      ["Custom systems", "/build"],
      ["Pricing", "/pricing"],
    ],
  },
  {
    path: "/lab",
    title: "Recoup Lab: Exploring AI in the business of music",
    description:
      "Research directions for coordinating releases, checking royalty statements, and matching music briefs.",
    keywords: "lab research experiments release royalties brief",
    paragraphs: [
      "Each research direction starts with a real job and a specific test: coordinate a release with clear deliverables and human input; reconcile a known royalty statement without inventing matches; compare permissioned catalog selections against expert review of a creative brief.",
      "These are research directions, not claims that the experiments have met their targets.",
    ],
    links: [
      ["Open source", siteConfig.githubUrl],
      ["Skills", "/skills"],
      ["Contact", "/contact"],
    ],
  },
  {
    path: "/resources",
    title: "Recoup resources: Guides, demos, tools, and documentation",
    description: "Explore practical ways to learn, try, and build with Recoup.",
    keywords: "resources guides tools demos playbook blog",
    paragraphs: [
      "Try interactive royalty and diligence examples, develop a workflow plan, check readiness, model time and cost assumptions, or explore catalog valuation. Read the playbook and blog, install Skills, and use the API documentation to build.",
    ],
    links: [
      ["Demos", "/learn/demos"],
      ["Workflow plan", "/workflow-plan"],
      ["Readiness", "/audit"],
      ["ROI planner", "/roi"],
      ["Valuation", "/valuation"],
      ["Playbook", "/playbook"],
      ["Blog", "/blog"],
      ["Docs", docsUrl()],
      ["Skills", "/skills"],
      ["Compare", "/compare"],
    ],
  },
  {
    path: "/learn/demos",
    title: "Recoup demos: See AI in the work",
    description:
      "Explore royalty reporting and acquisition review with the records behind each finding.",
    keywords: "demos interactive royalty diligence examples",
    paragraphs: [
      "The royalty walkthrough compares statements with receipts and keeps unresolved differences visible by payment source. The acquisition walkthrough connects missing information, conflicting identifiers, and seller questions to supporting records. Open the platform to work with your own artist context.",
    ],
    links: [
      ["Royalty reporting example", "/operations#royalty-example"],
      ["Acquisition example", "/acquisitions#acquisition-example"],
      ["Platform", "/platform"],
    ],
  },
  {
    path: "/valuation",
    title: "Catalog valuation with Recoup",
    description:
      "Explore a directional recorded-catalog estimate using measured Spotify streaming activity.",
    keywords: "valuation catalog Spotify estimate",
    paragraphs: [
      "Search for an artist and sign in to run the valuation with your Recoup account. Running the tool uses agent credits. The directional estimate does not account for every right, contract term, income source, or expense in a purchase. Reading this document does not run a valuation.",
    ],
    links: [
      ["Run the valuation", "/valuation"],
      ["Discuss acquisition review", "/acquisitions/contact"],
    ],
  },
  {
    path: "/compare",
    title: "Choose how to work with Recoup",
    description:
      "Compare the hosted platform, open-source Skills, custom systems, and API.",
    keywords: "compare platform skills API custom systems",
    paragraphs: [
      "Use the platform for artist context, conversations, scheduled tasks, and reporting. Bring open-source Skills into compatible agents. Scope custom systems around company data, tools, and workflows. Use the authenticated API to build capabilities into your product.",
      "With self-service tools, your team owns context, integrations, methods, training, and maintenance. A Recoup engagement can include structuring information, building connections, testing a defined workflow, training, and documented handoff.",
    ],
    links: [
      ["Platform", "/platform"],
      ["Skills", "/skills"],
      ["Build", "/build"],
      ["API documentation", docsUrl()],
      ["Advisory", "/advisory"],
    ],
  },
  {
    path: "/playbook",
    title: "The AI Music Marketing Playbook",
    description:
      "Practical workflows and prompts for artist context, content, research, releases, and repeatable AI work.",
    keywords: "playbook guide music marketing prompts",
    paragraphs: [
      "Read seven chapters, choose a useful task, and adapt the workflow to your artist or team. Give the task context, review the output, and repeat what helps. The complete guide is available to read, print, or download as Markdown.",
    ],
    links: [
      ["Read the playbook", "/playbook/download"],
      ["Download Markdown", "/playbook/recoup-ai-music-playbook.md"],
      ["Custom systems", "/build"],
    ],
  },
  ...(["operations", "acquisitions"] as const).map(
    (direction): PageSummary => ({
      path: `/${direction}/contact`,
      title:
        direction === "operations"
          ? "Discuss your catalog workflow"
          : "Discuss your acquisition workflow",
      description:
        "Identify a useful first build, the information it needs, and a rough scope with Recoup.",
      keywords: `${direction} contact inquiry scope`,
      paragraphs: [
        "Use the inquiry form to describe your workflow and contact details, or email Recoup. The visitor reviews and submits the inquiry; reading this page does not send a message or book a meeting.",
      ],
      links: [
        ["Inquiry form", `/${direction}/contact`],
        ["Explore the workflow", `/${direction}`],
        ["Email Recoup", `mailto:${siteConfig.contactEmail}`],
      ],
    }),
  ),
  {
    path: "/label-in-a-box",
    title: "Recoup plugin for your music business",
    description:
      "Music-business skills, connected Recoup tools, and ongoing updates with Recoup Starter.",
    keywords: "plugin starter skills subscription artist manager label",
    paragraphs: [
      "The plugin provides repeatable methods for artist research, releases, content, and catalog work, plus the Recoup MCP connection. Starter is $19 USD per month until canceled and includes $20 in monthly Recoup usage credits. Your AI subscription and third-party services are separate.",
      "Install using the official Codex, Claude Code, or Cursor instructions and sign in to Recoup. ChatGPT distribution remains subject to submission and review. Public Skills are also available separately. Check the source page for checkout availability.",
    ],
    links: [
      ["Plugin offer", "/label-in-a-box"],
      ["Get your download", "/label-in-a-box/setup"],
      ["Public skills", "/skills"],
    ],
  },
  {
    path: "/label-in-a-box/setup",
    title: "Set up your Recoup plugin",
    description:
      "Download and install the Recoup plugin using your verified subscription access.",
    keywords: "plugin setup download installation",
    paragraphs: [
      "Open your private purchase link or sign in to verify access and download the plugin. Follow the included installation guide and connect your Recoup account. This public overview contains no purchase links, account state, or private downloads.",
    ],
    links: [
      ["Plugin setup", "/label-in-a-box/setup"],
      ["Plugin details", "/label-in-a-box"],
    ],
  },
  ...(["/brand", "/brand/experiments", "/brand/carousels"] as const).map(
    (path): PageSummary => ({
      path,
      title:
        path === "/brand"
          ? "Recoup Brand Studio"
          : path === "/brand/experiments"
            ? "Recoup brand experiments"
            : "Recoup brand carousels",
      description: "Browse Recoup’s brand artwork and creative review tools.",
      keywords: "brand studio artwork creative review",
      paragraphs: [
        "The Brand Studio is a creative library with its own navigation. Finals, experiments, and carousel tools support reviewing brand assets. Browser review selections and unpublished source files are not part of this public document.",
      ],
      links: [
        ["Finals", "/brand"],
        ["Experiments", "/brand/experiments"],
        ["Carousels", "/brand/carousels"],
      ],
    }),
  ),
];
