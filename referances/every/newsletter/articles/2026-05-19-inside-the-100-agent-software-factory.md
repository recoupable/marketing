---
title: "Inside the 100-agent Software Factory"
subtitle: "A mini-Vibe Check on Gas City, a Grok classifier that grades your X drafts, and why HTML is the new markdown"
author: "Katie Parrott"
date: 2026-05-19
column: context-window
url: https://every.to/context-window/inside-the-100-agent-software-factory
paywalled: true
scraped_at: 2026-06-11T16:07:15.640Z
---

# Inside the 100-agent Software Factory

*A mini-Vibe Check on Gas City, a Grok classifier that grades your X drafts, and why HTML is the new markdown*

Happy Tuesday! Today we have a mini Vibe Check on a tool for running more than 100 coding agents in parallel. Plus: how to write viral X posts using the secrets of Grok’s algorithm, why Every’s chief operating officer and head of marketing moved their agent work into public Slack channels, and what’s overtaking Markdown as the preferred format for agents.

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

## Mini-Vibe Check: Gas City

### A glimpse of the future that’s not (yet) ready for practical use

Earlier this year, prominent software engineer **[Steve Yegge](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04)** published a viral Medium post about [Gas Town](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04), an open-source tool that let developers coordinate 20 to 30 AI coding agents in parallel on the same codebase. Last week, Every’s head of tech consulting, **[Mike Taylor](https://every.to/@mike_2114)**, got a peek at the future of multi-agent engineering with Gas Town’s successor project, [Gas City](https://github.com/gastownhall/gascity). The project was [rebuilt as a toolkit](https://steve-yegge.medium.com/welcome-to-gas-city-57f564bb3607) with Yegge’s blessing by **Chris Sells, **a long-time developer-tools veteran who grew Google’s open-source app-building toolkit, Flutter, to 3 million developers, and former Block technical lead **Julian Knutsen**. Mike joined more than two dozen engineers and chief technology officers who played around with the project at a workshop in New York, with Sells and Knutsen dialing in.

**TL;DR:** Gas City has some sharp ideas that reflect the direction software development is headed, but it’s not yet ready for prime time.

**What is Gas City:** Running many coding agents in parallel is table stakes for developers at this point. Getting them to do anything useful requires coordination systems to hand work to each other, review each other’s output, and not step on each other’s branches—and nobody’s quite figured out how to get that right yet. “Software factories” like Gas City are one solution: an orchestration system that hands tasks to a small team of agents, routes their work, and decides what’s done.

Sells and Knutsen use Gas City to build Gas City: Knutsen’s Atlanta-based server runs roughly 100 agents that merge around 50 pull requests per day—the output of a small team—burning through roughly a billion tokens per day, or equal to roughly one-fifth of the English-language corpus on Wikipedia.

**What works:** There are three ideas from the world of software engineering that Gas City is built on and are worth internalizing, even if you never touch the toolkit.

-
*Dark factory versus light factory:* Parts of your work where humans and agents talk to each other (planning, design, review) stay visible can be thought of as light, and parts where agents grind through clearly defined work on their own stay in the background, in the dark. As you gain trust in the agents’ output, you can move more of your process into the dark.

-
*One pet, many cattle:* The future of multi-agent engineering is likely organized with one persistent, named supervisor you talk to directly (Gas City calls it the “mayor”), who hands tasks to anonymous, disposable workers (the “polecats”) that do one job and shut down, so they execute their job without getting lost in context or in each other’s way. Instead of managing one hundred agents individually, you manage one conversation while the mayor does the coordinating.

-
*Multiple opinions on every code review:* Give the same code to [Claude](https://every.to/vibe-check/opus-4-7), [Codex](https://every.to/vibe-check/vibe-check-codex-openai-s-new-coding-agent), and Kimi at the same time for review from multiple angles. Three different models catch different bugs than one model run three times.

**What could be better:** In Gas City, every task spins up a fresh agent session that doesn’t remember the earlier steps, so agents waste cycles re-reading context that other agents produced and miss connections a single session would have caught. Cost is also a challenge: A six-step job can cost six times the cost of one Claude session, which adds up fast. The toolkit still feels experimental––it took a room full of experienced engineers an entire day to get it running, even with support from the instructors.

Beads, the task tracker powering the system, is built for agents first. It runs on the command line rather than as a visual dashboard, which is fine for agents but harder for humans, who want to see everything at a glance. So teams using Gas City in production typically pair it with Jira or Linear—placing tasks in two places instead of one.

Additionally, Gas City was built on the assumption that AI models need hand-holding to stay on track, but models have gotten good enough that parts of Gas City built to keep models on track, such as review loops to catch mistakes and mid-task check-ins to prevent agents from drifting, are now mostly unnecessary. Finally, Gas City uses deliberately unfamiliar words to refer to different inputs, actors, and workflows—“beads” for tasks, “polecats” for workers, “refineries” for processing steps—so it can be confusing for a team new to the tech.

**Verdict:** 🟨 **Mike Taylor**, head of tech consulting: “Learn from the ideas. Skip the toolkit for now.”

If you’re already running more than 10 Claude Code sessions in parallel and reading source code, Gas City is worth a look because it’s one informed opinion on how to handle that level of orchestration. For everyone else, take the ideas and wait. [OpenAI’s Symphony](https://openai.com/index/open-source-codex-orchestration-symphony/), released a few weeks ago, is a more accessible, enterprise-ready version of a similar idea: a written set of rules that turns your existing Linear board into the dashboard the agents work from. This is more in line with the way software engineers work now and doesn’t require the behavior change that Gas City does.

---

[PAYWALL]
