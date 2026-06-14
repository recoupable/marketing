---
title: "Vibe Check: I Canceled Two AI Max Plans for Factory’s Coding Agent Droid"
subtitle: "The one that keeps me in flow across Anthropic and OpenAI’s models—without switching tools"
author: "Danny Aziz"
date: 2025-10-30
column: vibe-check
url: https://every.to/vibe-check/vibe-check-i-canceled-two-ai-max-plans-for-factory-s-coding-agent-droid
paywalled: true
scraped_at: 2026-06-11T16:07:31.003Z
---

# Vibe Check: I Canceled Two AI Max Plans for Factory’s Coding Agent Droid

*The one that keeps me in flow across Anthropic and OpenAI’s models—without switching tools*

*Get up to 60 million free tokens to spend on any model—GPT-5, Sonnet 4.5, Opus, etc.—by attending our ****Droid Camp**** for paid subscribers tomorrow, October 31, at 12 p.m. ET. Factory AI’s head of developer relations ****[Ben Tossell](https://uk.linkedin.com/in/ben-tossell-70453537) ****and Every's ****[Dan Shipper](https://every.to/@danshipper)****, ****[Danny Aziz](https://every.to/@dannyaziz97)****, and ****[Kieran Klaassen](https://every.to/@kieran_1355)**** will walk you through how they use the tool. [RSVP](https://every.to/courses/droid-camp/purchase) if you're a paid subscriber, or [upgrade your subscription](https://every.to/courses/droid-camp/purchase) to attend.—[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief)*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

Picture reorganizing your filing system while people are still thumbing through the folders. That’s what it’s like to move or restructure data in your production database—the live system storing all the user data that powers your product.

Now imagine that you’re trying to reorganize the system that runs your entire product while you’re balancing your laptop on your lap in the back of a moving car. That’s what it felt like when a production database migration I was working on for **[Spiral](https://writewithspiral.com/)**, the AI writing tool I’m building at Every, started failing on repeat while I was in the back of a car headed to IKEA. Not where you want to be debugging, but when things break, they don’t wait for you to be at your desk.

I’d started this migration, which involved restructuring how conversations, drafts, and messages are stored inside Spiral’s database, with [Claude Code](https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five). The problem was that it kept circling the same dead ends of edge cases in production data that Claude Code couldn’t anticipate. So I opened Droid, set to the same Anthropic model, [Opus](https://every.to/vibe-check/vibe-check-claude-4-sonnet) 4.1, and asked for a fresh migration. It wrote one, applied it in a single shot, and explained each step as it went.

The thing about coding with AI in 2025 is that no single model is best at everything. [Sonnet](https://every.to/vibe-check/vibe-check-claude-sonnet-4-5) excels at complex code cleanup (i.e., refactors). [GPT-5](https://every.to/vibe-check/gpt-5) is fast at prototyping. [Haiku](https://every.to/vibe-check/vibe-check-claude-haiku-4-5-anthropic-cooked) is great for quick fixes. But switching between tools to access different models involves losing your context, relearning commands, and breaking flow every time you need a different brain.

Droid lets you switch between models made by different labs without switching tools—and somehow makes each model work better in the process. It’s the first agent wrapper—the software layer that packages an AI model into a usable tool—I’ve tried that feels like it was built for how senior engineers work: [running parallel sessions](https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five), composing workflows across models, and staying in flow when the work demands it.

It’s been a few months since I started tinkering with Droid, and I’ve canceled my Max plans for both Claude and ChatGPT. Droid has replaced them both. Let me tell you why.

## What is Droid?

From the AI coding startup [Factory](https://factory.ai/), Droid is a command-line coding agent that runs Anthropic and OpenAI models in one place. The pitch is agents that work everywhere you do, from your code editor through to deployment, so you can delegate full tasks—refactors, incident response (fixing things that break in production), and migrations—without changing tools, models, or workflow.

Droid is part of a fast-emerging category of agentic coding tools: AI systems built to handle development work end-to-end, not just autocomplete your next line of code.

These tools split into two camps based on where they run. [Cursor](https://every.to/vibe-check/vibe-check-cursor-2-0-and-composer-1-alpha), [GitHub Copilot](https://every.to/chain-of-thought/i-spent-24-hours-with-github-copilot-workspaces), Windsurf’s Cascade, and Google’s Jules live inside specific code editors (integrated development environments, or IDEs). They’re powerful, but you have to work in their environment, on their terms, instead of yours. If you use multiple editors or jump between projects with different setups, you can’t bring your AI with you.

Command line agents like Claude Code and Codex take a different approach—they run in your terminal, which means they work across any project, collection of programming languages, or code editor you’re using. While they provide more flexibility, they create a different limitation: They only work with one AI company’s models. Claude Code gives you only Anthropic’s models. [Codex](https://every.to/vibe-check/gpt-5-codex-knows-when-to-think-hard-and-when-not-to) gives you only OpenAI’s. Want to switch models? You’re switching tools.

Droid splits the difference. Like Claude Code and Codex, it’s a terminal-based agent with the same core features: [model context protocol (MCP)](https://every.to/context-window/you-down-with-mcp) support for connecting to external tools, [subagents](https://every.to/vibe-check/vibe-check-claude-s-new-agents-are-confusing-as-hell) for specialized tasks, shortcuts known as slash commands to keep you moving fast. But unlike Claude Code and Codex, one Factory subscription gives you access to both Anthropic and OpenAI models, so you don’t have to switch platforms when you need a different model’s strengths.

[![Droid lets you select models from different labs. I’m currently set to Sonnet 4.5 and Haiku here, but could easily switch to GPT-5 or Droid’s core model, GLM-4.6. (All screenshots courtesy of Danny Aziz.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3808/optimized_2b745f8d-d301-4e0a-94b8-9c8421fb481e.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3808/optimized_2b745f8d-d301-4e0a-94b8-9c8421fb481e.png)
*Droid lets you select models from different labs. I’m currently set to Sonnet 4.5 and Haiku here, but could easily switch to GPT-5 or Droid’s core model, GLM-4.6. (All screenshots courtesy of Danny Aziz.)*

[PAYWALL]
