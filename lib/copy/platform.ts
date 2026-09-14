export const platformCopy = {
  title: "Recoup Cloud: a ready-to-use AI workspace for music teams",
  description: "Music-specific AI for teams without a custom build. Work across artists, catalogs, and releases, and give clients a branded portal for your agents.",
  hero: {
    eyebrow: "RECOUP CLOUD",
    title: ["A ready-to-use AI workspace", "for music teams."],
    description: "A chat-based agent workspace built for music business operations. Recoup hosts the app and connects the tools, so your team can start working without building its own setup.",
    action: "Open Recoup Cloud",
  },
  capabilitiesTitle: "Built-in tools for research, content, and recurring work.",
  capabilities: [
    {
      id: "research", title: "Research", description: "Get artist and audience insights to shape your next campaign.",
      prompt: "Help me research the audience for Blue Hour.",
      output: { label: "RESEARCH BRIEF", title: "Find your next listeners.", rows: [
        { title: "The audience", detail: "Explore who listens and what else they love." },
        { title: "The conversation", detail: "Look at how fans talk about the music." },
        { title: "The opportunity", detail: "Turn the findings into a campaign direction." },
      ] },
    },
    {
      id: "content", title: "Create content", description: "Turn tracks and release plans into campaign ideas, visuals, and copy.",
      prompt: "Give Blue Hour a creative direction.",
      output: { label: "CAMPAIGN CONCEPT", title: "Blue Hour", rows: [
        { title: "A soundtrack for the in-between.", detail: "Mara Vale / EP" },
      ] },
    },
    {
      id: "recurring", title: "Automate repeat work", description: "Schedule research, content prompts, and reports for your roster or catalog.",
      prompt: "Keep me up to date on our catalog.",
      output: { label: "RECURRING WORK", title: "Set the rhythm.", rows: [
        { title: "Audience research", detail: "Every Monday" },
        { title: "Release check-in", detail: "Every Friday" },
        { title: "Catalog report", detail: "Every month" },
      ] },
    },
  ],
  start: {
    title: "Work across your artists, catalogs, and releases through chat.",
  },
  audience: {
    eyebrow: "WHO IS RECOUP CLOUD FOR?",
    title: ["For music teams that want AI", "without a custom build."],
    reasons: [
      { title: "No development team required.", description: "Start with a hosted workspace. Skip the cost of building and maintaining your own AI system." },
      { title: "AI built for music operations.", description: "Go beyond general chat with tools and context for your artists, catalogs, releases, and campaigns." },
      { title: "Your agents. Your branded portal.", description: "Give artists and clients a white-labeled portal to work with your agents under your brand." },
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
    audience: { question: "Who is Recoup Cloud for?", answer: "Artists, managers, labels, and catalog teams who want music-specific AI without building their own system, including teams that want a branded portal for their artists or clients. Recoup hosts the app and tools. If you already prefer another agent, you can use Recoup Skills, API, and MCP with that setup instead." },
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
