---
title: "Google I/O: Agents, Agents, Agents"
subtitle: "Plus: Why Anthropic just acquired a startup that makes developer tools for a reported $300 million, and a mini-Vibe Check on Figma's agent"
author: "Jack Cheng"
date: 2026-05-20
column: context-window
url: https://every.to/context-window/google-i-o-agents-agents-agents
paywalled: true
scraped_at: 2026-06-11T16:07:15.835Z
---

# Google I/O: Agents, Agents, Agents

*Plus: Why Anthropic just acquired a startup that makes developer tools for a reported $300 million, and a mini-Vibe Check on Figma's agent*

Google I/O dominated the week, and the message from Mountain View was unsubtle: Agents are now the product, with Gemini 3.5 Flash powering a redesigned search and a new fleet of always-on assistants. One layer down, Anthropic paid a reported $300 million for Stainless—so we’re re-upping our *[AI & I](https://every.to/podcast)* episode with CEO **Alex Rattray**, who laid out the design principles for making software legible to agents months before the deal happened. Plus: We did a mini-[Vibe Check](https://every.to/vibe-check) of Figma’s new in-canvas agent to see whether it solves the blank-page problem.—*[Kate Lee](https://every.to/@kate_1767)*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

### Spotlight

#### Alex Rattray, Stainless CEO and MCP whisperer

Flashy frontier [model releases](https://every.to/vibe-check/gpt-5-5) suck up most of the oxygen in the AI ecosystem. But without reliable ways for AI agents to access these models, their capabilities are limited. This plumbing may be easy to overlook, but it’s an indispensable component of an agent-native internet.

You don’t have to take our word for it. On Monday, Anthropic announced it has [acquired Stainless](https://www.anthropic.com/news/anthropic-acquires-stainless), a software platform for high-quality APIs, to extend Claude’s ability to connect to data and tools. (While terms weren’t disclosed, The Information put the purchase price at north of [$300 million](https://www.theinformation.com/articles/anthropic-talks-buy-developer-tools-startup-used-openai-google?rc=ekymys).) Former Stainless customers include OpenAI and Google, meaning Anthropic has acquired a developer tooling company used by its top rivals.

In October, Stainless CEO and founder **[Alex Rattray](https://www.linkedin.com/in/alexrattray/)** joined **[Dan Shipper](https://every.to/@danshipper)** on *[AI & I](https://every.to/podcast) *to talk about why teaching models to use software is so tricky, and what [design principles](https://every.to/podcast/he-s-building-the-plumbing-for-ai-to-use-the-internet) make model context protocol (MCP) servers more intuitive for LLMs. (TL;DR: Keep the number of tools an agent can access small, give the tools precise names, and aim to generate tightly defined outputs.) In the episode, Alex goes deep on Stainless’s approach to making it easier for AI agents to use the internet—hard-won insights that, as it turns out, can lead to a big-sticker acquisition from a top model company. [Disclosure: Dan is a small investor in Stainless.]

Read Anthropic’s [announcement](https://www.anthropic.com/news/anthropic-acquires-stainless) about its decision to buy Stainless and then watch Rattray’s *AI & I* episode [on X](https://x.com/danshipper/status/2057122805657821240) or [YouTube](https://youtu.be/diXNk8ibJVk), or listen on [Spotify](https://open.spotify.com/episode/2xKWTcJkEzJLPxChgXmHvg?si=XXbLCfDURE6AJmJh60b86g) or [Apple Podcasts](https://podcasts.apple.com/us/podcast/inside-stainless-the-developer-tools-startup/id1719789201?i=1000768755708) (or read the episode [transcript](https://every.to/podcast/inside-stainless-the-developer-tools-startup-anthropic-just-bought-for-300-million)).—*[Laura Entis](https://every.to/@laura_27bbaf_1)*

[![](https://img.youtube.com/vi/diXNk8ibJVk/maxresdefault.jpg)

![](https://d24ovhgu8s7341.cloudfront.net/static/emails/youtube-logo.png)](https://youtu.be/diXNk8ibJVk)

---

## Signal

#### Google goes all-in on agents

We’re hurtling toward an AI landscape divided into [two categories](https://every.to/context-window/the-dawn-of-codex-native-apps) of agents: those you collaborate with, and those you delegate to. Google’s new releases from its flagship I/O developer conference, happening this week in San Francisco, break neatly along that line.

The headline announcement is Gemini 3.5 Flash, Google’s just-announced frontier model it says operates four times faster and at half the cost of comparable LLMs. It’s the engine powering most of the agentic features below.

##### In the ‘collaborate with’ bucket

**AI Mode and the new search box: **Google is giving search its biggest interface change in 25 years. In addition to expanding the search box to accommodate longer, more conversational questions and terms from users, AI Mode, which Google introduced at [last year’s I/O conference](https://every.to/context-window/google-s-ai-vision-make-tech-human-again), is becoming the default search mode. With the 2026 updates, you can now build custom mini-apps, such as a personalized fitness tracker, or interactive visualizations directly within search itself.

**Antigravity 2.0**: Google’s agentic development platform is becoming a desktop app for managing teams of agents, with a new command line interface tool and an SDK for custom workflows. You orchestrate, and the agents code, design, or do whatever else you want them to accomplish.

##### In the ‘delegate to’ bucket

**Gemini Spark**: Google is pitching Spark as a 24/7 personal agent that lives in the cloud, works when your devices are off, and can operate across Gmail, Docs, Workspace, Chrome, and eventually, third-party tools through MCP.** **“You can just throw tasks over your shoulder,” **Josh Woodward**, vice president of Google Labs, Gemini, and AI Studio said in the keynote. “Spark will catch them and then run with them.”

**Daily Brief**: An out-of-the-box agent in the updated Gemini app that works overnight, scanning your inbox, calendar, and tasks so it can hand you a prioritized digest when you wake up in the morning.

**Universal Cart:** Google’s new shopping cart works across merchants as part of the Universal Commerce Protocol, which it co-developed with Amazon, Meta, Microsoft, and others. Whenever you add something in your cart, it automatically monitors the internet for information on the product, including price drops, price history, and whether something is back in stock. It also analyzes the full contents of your cart to proactively flag potential issues, like if you’re building a PC and the processor and motherboard you’ve selected are incompatible.

---

[PAYWALL]
