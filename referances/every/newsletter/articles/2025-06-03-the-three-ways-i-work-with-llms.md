---
title: "How I 10x My Engineering With AI"
subtitle: "What used to take me a week of coding now happens in hours. The secret is knowing which AI workflow fits your problem."
author: "Kieran Klaassen"
date: 2025-06-03
column: source-code
url: https://every.to/source-code/the-three-ways-i-work-with-llms
paywalled: true
scraped_at: 2026-06-11T16:07:42.305Z
---

# How I 10x My Engineering With AI

*What used to take me a week of coding now happens in hours. The secret is knowing which AI workflow fits your problem.*

I spent three hours on X last week watching prompt gurus peddle their latest silver bullets:

"This one ChatGPT prompt will replace your entire engineering team."

"Claude with this secret system prompt outperforms every developer."

"My $497 prompt library will make you a 10x coder."

Meanwhile, I shipped five features for [Cora](https://cora.computer/), our AI-powered email assistant, using models from all three providers—Anthropic, Google, and OpenAI— and zero magic prompts. I didn't find one perfect prompt or tool to do all of my work. In fact, I stopped looking for one. Instead, I used different tools based on what I was trying to do.

This approach has changed how I ship ﻿[code](https://every.to/c/ai-guides)﻿. I set the goal and define the rules, and then 100 percent of my pull requests are opened by AI tools like Claude Code. Every research task runs through ChatGPT and Claude. AI handles 30 percent of my code reviews and debugs half of the bugs I encounter. What used to take me a full week of coding now happens in hours.

The contradiction isn't lost on me: I’m criticizing one-size-fits-all AI solutions while building an AI-powered product myself. But Cora doesn't promise to do all your email work—it helps you spend less time on the parts that don't matter. My work with AI follows the same principle: Clear away the mechanical coding tasks to focus on what requires actual thought.

After years of building with LLMs—most recently the systems that let Cora triage emails by importance and draft replies intelligently—I've distilled my coding approach to three core patterns, each optimized for a different kind of cognitive load. These three workflows got me from grumbling about AI gurus on X to shipping features before lunch.

## Everyday coding with Windsurf and Cursor: The flow state companion

When I'm in that programmer's groove—I’m clear on what needs building and ready to just code—I reach for Windsurf and Cursor paired with thinking models like Claude Sonnet 4 or [Gemini 2.5 Pro](https://every.to/context-window/vibe-check-gemini-2-5-pro-and-gemini-2-5-flash). This setup works for:

1.
Building incrementally on existing code

2.
Solving well-understood problems

3.
Maintaining focus and flow while coding

What makes this workflow special is its lightweight, responsive nature. I speak coding instructions in plain English—"add a function to validate email addresses"—and the AI translates them into code. The AI editor doesn't break my concentration; it reduces the friction between my intention and implementation. In this setup, I am the thinker, and the AI is purely the executor. I drive all the decisions, while the AI handles the mechanical aspects of coding. I maintain complete control of the architectural and design choices.

Here’s an example: I needed to add a new filter option to Cora, similar to the "all emails" view but to show just important messages. It’s trivial work—I could have done this manually in 20 minutes. But that’s 20 minutes that I wanted to spend shaping the next feature. Instead, I stayed in my editor, described what I wanted in natural language—show only the important emails, write the query efficiently, check for indexes, and make sure it plugged into the existing context cleanly—and watched the AI implement it across the codebase. Twenty minutes of coding, or two minutes of talking to my editor—the math is obvious.

[![Cursor builds an ‘Important’ inbox for me—proof it can handle routine coding chores. Source: The author.](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3598/optimized_1.jpg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3598/optimized_1.jpg)
*Cursor builds an ‘Important’ inbox for me—proof it can handle routine coding chores. Source: The author.*

This might sound like [vibe coding](https://every.to/source-code/i-rebuilt-sparkle-in-14-days-with-ai) on the surface, but there’s an important distinction in terms of intention. Vibe coding works from the outside in: You tell the AI what you want the software to do and let it figure out [how to get there](https://every.to/working-overtime/i-tried-ai-coding-tools-now-i-want-to-learn-to-code). My approach is inside-out: I already know both the destination and the route. I've decided on the architecture, the patterns, and the specific implementation details. I'm just delegating the mechanical act of translating those decisions into syntax. The AI is my hands, not my brain.

The key advantage is speed without sacrificing quality or accuracy. I speak, and the AI translates my intentions into code. It feels like pair programming with a skilled partner who never gets tired.

This mode works best when the stakes are low and the direction is clear. I'm not relying on the AI for big architectural decisions—I'm using it to implement solutions I could code myself but prefer to delegate.

##### I reach for this workflow when:

1.
I know exactly what “done” looks like.

2.
I'm working on a single, focused task.

3.
I need to build efficiently without breaking flow.

This is the mode I default to when I'm already mid-sprint or almost done and just need to keep moving.

## Big-picture thinking with search and reasoning models: The architect's approach

When facing a blank canvas—starting a project from scratch, designing a new system architecture, or untangling complex legacy code—I need a different approach. This is where my research-focused workflow for discovery and exploration comes in, using:

1.
ChatGPT with [o3](https://every.to/chain-of-thought/vibe-check-o3-is-out-and-it-s-great) and tools

2.
RepoPrompt or [Claude Code](https://every.to/context-window/vibe-check-claude-3-7-sonnet-and-claude-code) agentic search (a tool that gives AI the full picture of your codebase instead of working blindly)

3.
Multiple models in parallel ([Claude 4 Opus](https://every.to/chain-of-thought/vibe-check-claude-4-sonnet), Gemini 2.5 Pro, o3)

Unlike everyday coding where I direct every detail, here I embrace the AI as a true thought partner. I start with an open mind and deliberately avoid pushing too hard in any direction. The goal is to be surprised—to discover approaches and solutions I wouldn't have considered on my own.

[PAYWALL]
