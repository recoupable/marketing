---
title: "What the Team Behind Cursor Knows About the Future of Code"
subtitle: "Cursor team members share their thoughts on building software with AI and why model selection beats prompting tricks"
author: "Katie Parrott"
date: 2026-01-22
column: source-code
url: https://every.to/source-code/what-the-team-behind-cursor-knows-about-the-future-of-code
paywalled: true
scraped_at: 2026-06-11T16:07:24.988Z
---

# What the Team Behind Cursor Knows About the Future of Code

*Cursor team members share their thoughts on building software with AI and why model selection beats prompting tricks*

*Happening now: We’re hosting [Vibe Code Camp](https://www.youtube.com/live/5YBjll9XJlw?si=vATHLLN-SiegYzh-) with the world’s best experts pushing the limits of what’s possible. Watch live now until 6 p.m. ET, and [catch the recordings](https://www.youtube.com/live/5YBjll9XJlw?si=vATHLLN-SiegYzh-). Also: This article is based on a sponsored event. Cursor provided $100 in credits to attendees and made this camp possible.—[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief) *

---

A few minutes into Every’s first Cursor Camp, Cursor developer education lead **[Lee Robinson](https://x.com/leerob)** made a bold declaration: “The IDE is kind of dead.”

IIDE stands for “integrated development environment”—basically Microsoft Word, but for code. It’s where programmers type, organize files, and run programs, and for decades, it has been the center of a programmer’s world.

Now, that model is breaking down. The center of gravity has shifted from typing code by hand in an IDE such as [Visual Studio Code](https://code.visualstudio.com/) to managing AI agents that write it for you with a tool such as Cursor.

In this session, Lee and **[Samantha Whitmore](https://x.com/sjwhitmore)**, a software engineer at Cursor, walked us through how they work in a post-IDE world. What follows are the workflows, model-selection strategies, and honest limitations they shared—plus where this leaves you if you’re trying to figure out what the future of code looks like.

## Key takeaways

1.
**The agent is becoming the core.** Writing and editing code by hand is shrinking as a percentage of the work. Developers are now spending more time telling AI agents what to build and reviewing their output.

2.
**Cloud and local agents are merging.** You’ll soon be able to start an agent on your computer, hand it off to remote servers when you close your laptop, and pick it back up later—no context lost.

3.
**Model choice matters more than prompting tricks.** Prompting gimmicks like, “I’ll pay you $1,000,” which some AI users swore could make AI provide a better output, don’t work anymore. You need to choose the right model for the job—say, one for brainstorming, another for deep bug-hunting.

4.
**Agents can run for weeks.** Cursor’s research team built a working web browser from scratch using AI agents that ran for days, producing 3 million lines of code. It cost $80,000 in tokens (the units AI companies use to measure and charge for usage). It’s a research project that’s not available for public use—for now. But it shows where things are heading.

## What ‘the death of the IDE’ means

Cursor looks like a traditional coding tool on the surface. There are files on the left, code in the middle, and now an AI chat panel on the side, where you can ask the agent to do things.

[![What Cursor looks like when I open a project. (Image courtesy of Katie Parrott.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3907/optimized_3f38c76f-d1a8-4fa4-bcaa-72e8761552ef.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3907/optimized_3f38c76f-d1a8-4fa4-bcaa-72e8761552ef.png)
*What Cursor looks like when I open a project. (Image courtesy of Katie Parrott.)*

For many Cursor users, that chat panel has become the main event. Some don’t even look at the code output much—they work entirely in conversation with the AI, only reviewing the final result.

According to Lee, developers used to interact with Cursor primarily by writing code by hand and using an autocomplete function, where the AI suggests the next line of code as you type, similar to predictive text on your phone. But Lee says recent Cursor’s usage data tells a different story: More and more developers are working inside the agent interface. He said that writing code by hand may comprise as little as 10 percent of the time for some developers.

This is why he believes that easier text editing—for which Cursor and tools like it were originally built—is less important than the coding agent—which writes and edits code—and the ability to review the agent’s output and track changes.

And with new tools and integrations being built every day (like Every’s [compound engineering plugin](https://github.com/EveryInc/compound-engineering-plugin)), it seems likely the old ways of AI-enabled coding will slip farther down the ranking.

## A browser built from scratch by AI (for $80,000)

When you use an AI coding tool, you’re really using two things: the model (the AI brain that generates code) and the scaffolding known as the harness around it (the infrastructure that lets that brain do things—run commands, edit files, handle errors, and manage context). The model comes from OpenAI or Anthropic. The harness is what Cursor builds.

The same model can perform very differently depending on its harness. A [well-tuned harness](https://every.to/vibe-check/vibe-check-i-canceled-two-ai-max-plans-for-factory-s-coding-agent-droid) knows how to feed the model the right context, when to truncate long outputs, how to recover from errors, and how to keep the AI on track during long tasks.

To stress-test what a well-tuned harness could do, Cursor’s team built a custom research harness around [GPT 5.2](https://every.to/vibe-check/vibe-check-gpt-5-2-is-an-incremental-upgrade) and set it loose on an absurd task: building a fully functional web browser from scratch. AI produced 3 million lines of code across thousands of files, generated over weeks of continuous running, at a cost of around $80,000 in tokens. The browser that resulted could render web pages, handle Flexbox (a layout system for web design), display images, and run scripts.

At $80,000, this is a hefty research project, not something your average solo developer could try on a Tuesday afternoon. But a year ago, the same task would have been impossible at any price. If costs continue to come down, “Let the agent run for a week on something ambitious” might feel less like a stunt in time.

## How a Cursor coder uses Cursor

Cursor’s team uses Cursor to build Cursor. Their workflows are both a window into power-user techniques and a preview of where the tool is headed because the features they find themselves wanting tend to become the features they build.

Sam showed how she’s building features for Cursor’s cloud agents product, including the ability to move an agent from your local computer to the cloud—in other words, a remote server—and back.

[PAYWALL]
