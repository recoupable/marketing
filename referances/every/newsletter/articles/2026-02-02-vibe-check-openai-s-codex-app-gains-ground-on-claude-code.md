---
title: "Vibe Check: OpenAI's Codex App Gains Ground on Claude Code"
subtitle: "OpenAI nailed the interface. But it's built for hardcore engineering."
author: "Dan Shipper, Katie Parrott"
date: 2026-02-02
column: vibe-check
url: https://every.to/vibe-check/vibe-check-openai-s-codex-app-gains-ground-on-claude-code
paywalled: true
scraped_at: 2026-06-11T16:07:24.200Z
---

# Vibe Check: OpenAI's Codex App Gains Ground on Claude Code

*OpenAI nailed the interface. But it's built for hardcore engineering.*

*TL;DR: You’re getting our full Vibe Check on the new Codex app because you’re a paid subscriber to Every—thank you for your support. If you want high-level takeaways from our testing, explore our [interactive site](https://every.to/p/codex-vibe-check) or read on for the complete analysis. We’re also hosting a livestream about the release on [YouTube](https://www.youtube.com/watch?v=LfPNaoYMaRY) at 1 p.m. ET.—[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief) *

*Was this newsletter forwarded to you?[Sign up](https://every.to/account) to get it in your inbox.*

---

Anthropic has been spending more time in the AI spotlight recently, as even “non-nerds” are psyched about [Claude Code](https://www.wsj.com/tech/ai/anthropic-claude-code-ai-7a46460e).

Two weeks ago, I (Dan) wrote that OpenAI has [some catching up to do](https://every.to/chain-of-thought/openai-has-some-catching-up-to-do) on the coding front. Today, they’re announcing a step in the right direction.

The company is shipping a Codex desktop app. The original Codex launched as a web app last May, three months after Claude Code. At the time, we deemed it [best for techies, not vibe coders](https://every.to/vibe-check/vibe-check-codex-openai-s-new-coding-agent).

The new release is a Mac app for programming with Codex, but it’s not an integrated development environment (IDE)—an all-in-one environment for writing code—like [Cursor](https://every.to/source-code/what-the-team-behind-cursor-knows-about-the-future-of-code). Instead, it’s what OpenAI is calling a “command center for agents,” designed to replace the terminal user interface most people (like me, Dan) use to interact with Codex and Claude Code today.

The interface is reminiscent of the popular agent orchestration tool [Conductor](https://www.conductor.build): It has a left sidebar that allows you to start and manage multiple parallel threads with agents in different workspaces. The middle of the screen shows a chat interface for you to manage each agent as it’s working, and the right sidebar optionally pops up to show you code diffs (like “Suggesting” mode in Google Docs but for code):

[![The UI of the new Codex app, with the left sidebar navigation and center chat interface for interacting with agents. (Image courtesy of Dan Shipper.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3920/optimized_ee973add-495b-4306-b4e5-871ecf90f83c.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3920/optimized_ee973add-495b-4306-b4e5-871ecf90f83c.png)
*The UI of the new Codex app, with the left sidebar navigation and center chat interface for interacting with agents. (Image courtesy of Dan Shipper.)*

We’ve been testing the app internally for a few weeks, and it’s very good. In fact, it’s the first app that’s made me switch out of my terminal for coding since [Claude Code](https://every.to/vibe-check/vibe-check-opus-4-5-is-the-coding-model-we-ve-been-waiting-for) launched. We’ve sped through the terminal era over the last six months, and a return to graphical user interfaces (GUIs) for coding is upon us.

Previously, I was using Claude Code 80 percent of the time and Codex 20 percent of the time. Over the last few weeks in the app, that percentage has become 50-50. For large production apps, Codex is slower but smarter and more reliable than Claude Code. [Opus 4.5](https://every.to/vibe-check/vibe-check-opus-4-5-is-the-coding-model-we-ve-been-waiting-for) is still my daily driver for the rest of my work, and for programming tasks that require taste, empathy, and speed (leaving complex bug fixes, new features in large codebases, and plan and code review for Codex), but the reversal is significant.

Where does that leave Every’s engineering team? Our lead engineer, **[Andrey Galko](https://every.to/@devtwo)**, and **[Naveen Naidu](https://every.to/@naveen_6804)**, general manager of **[Monologue](https://www.monologue.to/)**, are devoted Codex users already. Then there’s our die-hard Claude Code advocate, **[Cora](https://cora.computer/)** general manager **[Kieran Klaassen](https://every.to/@kieran_1355)**. Will they make room in their lives for the Codex app the way I have?

Here’s your full day-zero Vibe Check.

## A Codex app walkthrough: GUIs are so back!

The Codex app is a Mac application that provides a desktop interface for Codex, replacing the command line (in which developers build through text-based commands) with a visual interface.

[![OpenAI’s vision of the future of coding is just a download away. (Image courtesy of Dan.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3920/optimized_e0e95804-6f4b-41cf-b95e-6ca775159e79.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3920/optimized_e0e95804-6f4b-41cf-b95e-6ca775159e79.png)
*OpenAI’s vision of the future of coding is just a download away. (Image courtesy of Dan.)*

After Claude Code, many developers stopped bothering with visual interfaces. For people who know their way around a terminal, GUIs felt like a step backward—slower, more cluttered, and less powerful. A relic from an era of coding before agents.

The Codex app is the first GUI that doesn’t feel that way. It has a few features that make it powerful:

1.
**Local to cloud sync: **It’s easy to kick off a task in the Codex app and then move it to the cloud so you can keep working on the go.

2.
**Plan mode: **Plan mode has been a key piece of Claude Code’s workflow for months now, but now it’s becoming available in Codex. You can activate it by pressing Shift + Tab.

3.
**Skills: **The Codex app features a library that lets you download pre-built skills and create or import your own.

4.
**Automations: **The app allows you to easily schedule prompts to run at specific times—for example, asking Codex to compound learnings in each of your workspaces, work through customer service tickets, or update a dashboard with new data.

5.
**Easy access YOLO mode: **You can give Codex full access to your computer by clicking one button.

During testing, the app has been updating multiple times per day, suggesting OpenAI is iterating fast. Andrey summed up the competitive implications: “RIP 5,000 startups.” OpenAI is commoditizing an ecosystem of companies building visual interfaces, synchronous solutions, and workflow wrappers around coding agents.

Anthropic is still ahead overall. The combination of Claude Code, Cowork, and Opus 4.5 is faster, more versatile, and better for a wider range of use cases. But OpenAI is gaining ground.

## The Reach Test

---

##### Reach Test legend

🥇: Paradigm shift

🟩 : Psyched about this release

[PAYWALL]
