export const platformCopy = {
  title: "A ready-to-use AI workspace for music teams",
  description: "A hosted AI workspace for artists, catalogs, and releases. Chat with music-business tools for research, content, and recurring work. Open source, run by Recoup.",
  hero: {
    eyebrow: "RECOUP PLATFORM",
    title: ["A ready-to-use AI workspace", "for music teams."],
    description: "A chat-based agent workspace built for music business operations. Recoup hosts the app and connects the tools, so your team can start working without building its own setup.",
    action: "Open Recoup",
  },
  capabilitiesTitle: "Built-in tools for research, content, and recurring work.",
  capabilities: [
    { number: "02", title: "Research", description: "Get artist and audience insights to shape your next campaign." },
    { number: "03", title: "Create content", description: "Turn tracks and release plans into campaign ideas, visuals, and copy." },
    { number: "04", title: "Automate repeat work", description: "Schedule research, content prompts, and reports for your roster or catalog." },
  ],
  start: {
    eyebrow: "YOUR FIRST SESSION",
    title: "Work across your artists, catalogs, and releases through chat.",
    steps: [
      { title: "Add an artist or catalog.", description: "Start with a single release or a whole roster." },
      { title: "Bring the details.", description: "Add release plans, reference files, and notes." },
      { title: "Ask for what you need.", description: "Try a campaign brief, an artist report, or a content draft." },
    ],
  },
  hosted: {
    title: ["Hosted by Recoup.", "Open source."],
    description: "Use the cloud app while Recoup runs the infrastructure. The workspace is built on the Recoup API and MCP, and its code is open source.",
    sourceAction: "Explore the app source",
    toolsAction: "Explore the API and MCP",
  },
  alternatives: {
    title: ["Already have an AI workspace?", "Connect Recoup’s tools."],
    description: "Keep using the agent you prefer. Add music workflows with Recoup Skills, or connect it to Recoup’s tools through the API and MCP.",
    links: [
      { label: "Explore Skills", href: "/skills" },
      { label: "Connect the API or MCP", href: "/developers" },
    ],
  },
  faq: {
    title: "Before you open the workspace.",
    audience: { question: "Who is the platform for?", answer: "Artists, managers, labels, and catalog teams who want a ready-to-use music-business agent workspace. Recoup hosts the app and tools. If you already prefer another agent, you can use Recoup Skills, API, and MCP with that setup instead." },
    context: { question: "What should I bring to my first session?", answer: "An artist, catalog, or release you’re working on, plus any useful files and notes. Give Recoup a clear task, such as researching an audience or drafting a release campaign." },
    custom: { question: "Can Recoup build around our team?", answer: "Yes. We can connect your tools and data, create workflows around your company’s methods, and help your team use and maintain the system." },
  },
  closing: { title: "Need a custom system? We can build it with you.", description: "Work with our team on bespoke agents, integrations, and workflows built around your company.", action: "Discuss a custom system" },
  preview: {
    artist: "Mara Vale", release: "Blue Hour", format: "EP",
    prompt: "Plan the rollout for Blue Hour.",
    response: "Here’s a release plan that brings the new EP and back catalog into the same campaign.",
    document: "Blue Hour rollout", documentType: "Campaign plan", placeholder: "Ask about your music…",
  },
};
