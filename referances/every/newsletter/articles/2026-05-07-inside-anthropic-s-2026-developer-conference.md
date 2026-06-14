---
title: "Inside Anthropic’s 2026 Developer Conference"
subtitle: "What it was like in the room, plus what the new Managed Agents features look like in production"
author: "Dan Shipper, Marcus Moretti, Katie Parrott"
date: 2026-05-07
column: chain-of-thought
url: https://every.to/chain-of-thought/inside-anthropic-s-2026-developer-conference
paywalled: true
scraped_at: 2026-06-11T16:07:16.275Z
---

# Inside Anthropic’s 2026 Developer Conference

*What it was like in the room, plus what the new Managed Agents features look like in production*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

To our surprise, the biggest launch from Anthropic’s [developer conference](https://claude.com/code-with-claude) in San Francisco yesterday wasn’t a model or a feature. Instead, it was the company’s announcement of [a deal with SpaceX](https://www.anthropic.com/news/higher-limits-spacex) to allocate all of the capacity in the latter’s Colossus supercluster to Claude.

Anthropic has been riding a historic demand surge over the last year as Claude Code opened up a new wave of agentic coding for engineers and non-engineers alike. But compute constraints have caused friction even amongst its most die-hard fans—we’ve written previously about [being frustrated](https://every.to/context-window/get-your-hands-dirty#signal) with its OpenClaw restrictions and the speed of its latest models like [Opus 4.7](https://every.to/vibe-check/opus-4-7).

The deal with SpaceX changes that equation. Anthropic has already doubled rate limits for subscription plans, removed peak-hour limits on Pro and Max accounts, and raised API rate limits by as much as almost 17 times for certain tiers.

Other than that, the big story is Claude Managed Agents, Anthropic’s hosted agent product. The company released [three new features](https://claude.com/blog/new-in-claude-managed-agents):

-
**Multi-agent orchestration:** a coordinator agent that spins up subagents in parallel baked into the platform

-
**Dreaming:** Anthropic’s general-purpose version of [compound engineering](https://every.to/guides/compound-engineering), a feature that allows agents to learn from past sessions to improve between runs

-
**Outcomes:** Anthropic’s answer to Codex’s /goals command, allowing developers to specify an outcome and run an agent in a loop until the outcome is achieved

By themselves, these features are nice but not groundbreaking. What’s more important is that *what an AI platform is* has changed. In the GPT-3 days, the platform was a text completion end-point: Send text in, get text out. Now, with Claude Managed Agents, the platform is an AI model with a harness and host computer—all provided with unlimited scaling by the model companies.

**[Cora](https://cora.computer) **general manager** [Kieran Klaassen](https://every.to/@kieran_1355)** and I reported live from conference with our biggest takeaways, including the xAI compute deal, doubled Claude usage limits, Claude Managed Agents, and why the battle lines between OpenAI and Anthropic are starting to become clearer. Watch now:

[![](https://img.youtube.com/vi/4YNHb0XNV1A/maxresdefault.jpg)

![](https://d24ovhgu8s7341.cloudfront.net/static/emails/youtube-logo.png)](https://www.youtube.com/watch?v=4YNHb0XNV1A)

We also recorded a conversation with **Angela Jiang**, head of product for the Claude platform, and **Katelyn Lesse**, head of platform engineering. The full episode drops tomorrow on *[AI & I](https://every.to/podcast)*—highlights below.—*[Dan Shipper](https://every.to/@danshipper)*

##

## Vibe Check: Claude Managed Agents

#### Spiral general manager Marcus Moretti uses the platform’s new features

Anthropic launched Claude Managed Agents in April, and since then, Every’s AI writing tool **[Spiral](https://writewithspiral.com/)** has used the platform to power its API and command line interface (CLI), which lets developers and other agents talk to Spiral outside the web app. Claude Managed Agents run on Anthropic’s servers, instead of us having to run them on our own.

We set up a new Managed Agent in an afternoon and [deployed it to power our API](https://every.to/context-window/the-missing-layer-in-ai-adoption#spiral-is-experimenting-with-agent-to-agent-workflows) the next day. We’ve incorporated two of the new features Anthropic announced yesterday (memory and multi-agent orchestration) and are deploying the third (outcomes) soon.

**Memory:** Every’s editorial and social expertise—how to write a good X post, for example—lives in an Anthropic-hosted global memory store. The memory store lets us avoid including every piece of editorial and social expertise in the agent system prompt—the standing instructions that tell the agent what to do every time it runs. When a user asks for a podcast description, the agent doesn’t need to also recall how to craft a great LinkedIn post. It only pulls the relevant expertise with each request, thereby making responses faster.

[PAYWALL]
