---
title: "🎧 How Two Engineers Ship Like a Team of 15 With AI Agents"
subtitle: "Engineers Kieran Klaassen and Nityesh Agarwal on a new breed of software development"
author: "Rhea Purohit"
date: 2025-11-19
column: podcast
url: https://every.to/podcast/how-two-engineers-ship-like-a-team-of-15-with-ai-agents-7bc186bd-b5ea-40cd-9690-963845203f80
paywalled: true
scraped_at: 2026-06-11T16:07:29.271Z
---

# 🎧 How Two Engineers Ship Like a Team of 15 With AI Agents

*Engineers Kieran Klaassen and Nityesh Agarwal on a new breed of software development*

*Tl;dr: Today ****[Dan Shipper](https://every.to/@danshipper)**** and the Every team are hosting more than 200 subscribers for [Claude Code for Beginners](https://claude101.every.to/), so we’re republishing [one of our favorite episodes](https://every.to/podcast/how-two-engineers-ship-like-a-team-of-15-with-ai-agents) from our podcast [AI & I](https://every.to/podcast). Dan goes in depth with ****[Kieran Klaassen](https://every.to/@kieran_1355)****, general manager of ****[Cora](https://cora.computer/)****, Every’s AI-powered email assistant, and engineer ****[Nityesh Agarwal](https://every.to/@nityesh)****, about how AI-assisted coding tools like Claude Code have transformed how they build products. Watch on ****[X](https://x.com/every/status/1991178961842254269?s=20)**** or [YouTube](https://youtu.be/hQA6mdiLZsY), or listen on [Spotify](https://open.spotify.com/episode/7mcxn8J3PQtjI44I0St0u0?si=lcGvKXuURC6DzE4Iu0F_mg) or [Apple Podcasts](https://podcasts.apple.com/us/podcast/best-of-the-pod-claude-code-how-two-engineers-ship/id1719789201?i=1000737431291). Here’s a link to the [episode transcript](https://every.to/podcast/transcript-how-two-engineers-ship-like-a-team-of-15-with-ai-agents).*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

If you’re using AI to just write code, you’re missing out.

Two engineers at Every shipped six features, five bug fixes, and three infrastructure updates in one week—and they did it by designing workflows with AI agents, where each task makes the next one easier, faster, and more reliable.

In this episode of *AI & I*, **[Dan Shipper](https://every.to/@danshipper)** interviewed the pair—**[Kieran Klaassen](https://every.to/@kieran_1355)**, general manager of [Cora](https://cora.computer/), our inbox management tool, and engineer **[Nityesh Agarwal](https://every.to/@nityesh)**—about how they’re compounding their engineering with AI. They walk Dan through their workflow in Anthropic’s agentic coding tool, [Claude Code](https://every.to/context-window/vibe-check-claude-3-7-sonnet-and-claude-code), and the mental models they’ve developed for making AI agents truly useful. Kieran, our resident [AI-agent aficionado](https://every.to/source-code/the-three-ways-i-work-with-llms), also ranked *all *the AI coding assistants he’s used. You can check out their full conversation here:

[![](https://img.youtube.com/vi/hQA6mdiLZsY/maxresdefault.jpg)

![](https://d24ovhgu8s7341.cloudfront.net/static/emails/youtube-logo.png)](https://youtu.be/hQA6mdiLZsY)

If you want a quick summary, here are some of the themes they touch on:

### The workflow you can use to 10x your engineering capabilities

At the heart of Kieran and Nityesh’s workflow with AI is a meta move: They built a prompt that writes prompts. With help from [Anthropic’s Prompt Improver](https://www.anthropic.com/news/prompt-improver), they created a custom command in Claude Code that transforms a rough feature idea into a fleshed-out [GitHub issue](https://github.com/features/issues). Each issue includes a clear explanation of the problem, a proposed solution, the technical details needed to make it happen, and a step-by-step implementation plan. The agent pulls in relevant parts of the existing code and best practices from the web to help guide the approach.

Once the GitHub issue is created, they review it themselves and queue it up to be implemented. By planning the work, writing out the issue, and then reviewing it, they create space to think clearly about the problem before any code is written. Unlike [AI code editor Cursor](https://www.cursor.com/), which is “made to code,” Kieran says Claude Code reduces the friction to think things through before jumping into execution.

[PAYWALL]
