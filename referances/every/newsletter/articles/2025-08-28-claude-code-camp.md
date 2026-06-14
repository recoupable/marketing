---
title: "Claude Code Camp: The Workflows Turning One Engineer Into Ten"
subtitle: "Demos and tips from our second expert workshop, on subagents"
author: "Katie Parrott"
date: 2025-08-28
column: source-code
url: https://every.to/source-code/claude-code-camp
paywalled: true
scraped_at: 2026-06-11T16:07:36.146Z
---

# Claude Code Camp: The Workflows Turning One Engineer Into Ten

*Demos and tips from our second expert workshop, on subagents*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

“What do a jet ski and Claude Code have in common?”

That’s how **[Sparkle](https://makeitsparkle.co)** general manager **[Yash Poojary](https://every.to/@yashpoojary)** opened his presentation at the latest [Claude Code Camp](https://every.to/source-code/claude-code-q-a-what-works-what-doesn-t-and-what-will-save-you-hours), our live event series where Every’s engineers share how they use Claude Code in production and answer subscriber questions.

The chat filled with answers: They’re both fast, extra fun with friends, and reckless if you don’t know what you’re doing. It was a joke—but also a sharp metaphor for Claude’s new subagents.

Anthropic only [released subagents a month ago](https://every.to/vibe-check/vibe-check-claude-s-new-agents-are-confusing-as-hell), but Every’s engineers are already weaving them into their daily workflows for **[Spiral](https://spiral.computer/)**, **[Cora](https://cora.computer/)**, and Sparkle. (The latter is launching a new feature tomorrow built with techniques we discuss here.)

The lessons are adding up quickly, and not only for the humans. When you’re following the principles of [compounding engineering](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it)—building development systems that learn from your feedback—every workflow improvement makes the next one easier. Subagents fit perfectly into this philosophy, because each one can learn to apply your standards consistently and get better with every task.

Here are the biggest takeaways from this session of Claude Code Camp, plus demos from our engineers and highlights from the live Q&A.

## Key takeaways

-
**Create subagents (more about them below) when the work repeats.** They shine once you spot a task you don’t want to do again.

-
**Work in parallel, not sequence.** Running up to 10 agents at once turns long, linear work into something more like a team tackling tasks in unison.

-
**Each subagent keeps its own notes.** Subagents hold their own memory, so they can carry logs, specs, or architecture notes without cluttering your main session.

-
**Treat them like teammates.** Codify your standards once and the subagents will apply them every time, like a junior engineer who’s already onboarded.

## What are subagents, and what are they for?

A subagent is a lightweight AI program you can spin up for a specific role. Think of them as separate conversation windows with specialized instructions. Each one has its own system prompt, its own memory, and access to the same tools as Claude Code in general. They can run in sequence or in parallel—up to 10 at once. “Claude started as an individual contributor for you,” explained **Dan Shipper**, CEO of Every. “With subagents, it’s becoming a team lead. It can now manage a team of its own agents to get work done.”

### When to create a subagent

The temptation when you first learn about subagents is to build out a library of 20 or 30 all at once. Dan cautioned against it: “If you do that, you just won’t use them. A better approach is to notice when you’re repeating a task, and create an agent in that moment.”

**[Kieran Klaassen](https://every.to/@kieran_1355)**, general manager of our AI email management tool Cora, shared an example. He needed to add metricsI tracking with Ahoy, something he’d set up before and knew he’d need again. “Normally I’d have to refresh myself on how I did it last time. Instead, I created an Ahoy tracking expert agent. Now Claude knows how to do it every time.” For Kieran, the key is to think of subagents the way a tech lead would think about onboarding: Codify the steps once, so you don’t have to repeat yourself later.

### Why subagents are powerful

The strength of subagents is structure. They break work into roles, encode judgment into loops, and carry context forward in ways a single coding session cannot.

-
**They compound learning.** A subagent set up with your standards will improve with each run, like a junior teammate who learns quickly.

-
**They create feedback loops.** An executor subagent writes code; an evaluator subagent reviews it. An argument between two agents surfaces better answers.

-
**They unlock context.** Each subagent holds its own memory, so your main thread stays clear.

-
**They enforce taste.** By applying feedback to future cases, , subagents maintain consistency across projects and reflect your preferences over time.

## Patterns emerging in real workflows

Once subagents move from [idea](https://every.to/napkin-math/what-are-ai-agents-and-who-profits-from-them) to daily use, certain patterns show up again and again. These are the practical shortcuts our engineers have discovered. Each one shows a different way to turn lightweight agents into reliable teammates.

### Executor/evaluator loop: ​​One subagent does the work, another reviews it

When you generate code or text with an AI, it tends to be overconfident about its own output. A good trick is to split the workflow into two roles: one “executor” that does the work, and one “evaluator” that reviews it. This creates a natural feedback loop that improves quality.

**[Danny Aziz](https://every.to/@dannyaziz97)**, general manager of** **our writing tool Spiral**,** showed how he uses this pattern for Spiral’s onboarding screens. His UI engineer subagent takes mockups from Figma and translates them into working React components (a programming framework for building web apps). A second subagent, the implementation reviewer, compares the code against the design and requests revisions. Because each has its own context window, the reviewer isn’t biased by the executor’s memory, and they iterate back and forth until the implementation matches the design.

### Opponent processors: Two subagents argue to reach better decisions

Sometimes the best way to reach a good decision is to generate two opposing perspectives and let them argue it out. Subagents are perfect for this because they can each hold a different role or agenda.

Dan** **showed how he used two subagents to audit his expenses. One agent played “Dan,” trying to justify as many expenses as possible. The other played “the company,” pushing to minimize costs. Claude mediated between them and delivered a balanced report.

### Feedback codifier: Learns from your code review comments

[PAYWALL]
