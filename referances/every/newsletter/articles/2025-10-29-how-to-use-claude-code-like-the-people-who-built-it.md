---
title: "🎧 How to Use Claude Code Like the People Who Built It"
subtitle: " Anthropic’s Cat Wu and Boris Cherny explain how they use Claude Code inside the company—and what they’ve learned about getting the most out of it"
author: "Rhea Purohit"
date: 2025-10-29
column: podcast
url: https://every.to/podcast/how-to-use-claude-code-like-the-people-who-built-it
paywalled: true
scraped_at: 2026-06-11T16:07:31.282Z
---

# 🎧 How to Use Claude Code Like the People Who Built It

* Anthropic’s Cat Wu and Boris Cherny explain how they use Claude Code inside the company—and what they’ve learned about getting the most out of it*

*TL;DR: Today we’re releasing a new episode of our podcast *[AI & I](https://every.to/podcast)*. ****[Dan Shipper](https://every.to/@danshipper)**** sits down with ****Cat Wu ****and**** Boris Cherny, ****the founding engineers of Claude Code. (Dan is also teaching a Claude Code for Beginners course next month—[learn more and register](https://claude101.every.to/).)****Watch [on X](https://x.com/danshipper/status/1983554470895108343) or [YouTube](https://youtu.be/IDSAMqip6ms), or listen on [Spotify](https://open.spotify.com/episode/7yJ1kUxwE750WIc1lyZcaT) or [Apple Podcasts](https://podcasts.apple.com/us/podcast/inside-claude-code-from-the-engineers-who-built-it/id1719789201?i=1000734060623). ****Here’s a link to the [episode transcript](https://every.to/podcast/transcript-how-to-use-claude-code-like-the-people-who-built-it).*

---

[Claude Code](https://every.to/vibe-check/vibe-check-claude-3-7-sonnet-and-claude-code) singlehandedly [turned Every into a different team](https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five): Each new feature now makes [the next one easier to build](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it), our CEO **Dan Shipper** ships to [codebases he doesn’t know well](https://x.com/danshipper/status/1965591067560214996), and non-technical people suddenly [find themselves inside a terminal](https://every.to/source-code/how-to-use-claude-code-for-everyday-tasks-no-programming-required).

That’s why Dan invited Claude Code’s creators—**[Cat Wu](https://x.com/_catwu?lang=en)** and **[Boris Cherny](https://x.com/bcherny)** from Anthropic—onto *AI & I *to talk about how they use it, and what they learned while building it.

They trace the origin of Claude Code from an internal experiment, walk through practical tips they’ve learned from watching Anthropic’s engineers in Claude Code—including how to use [subagents](https://every.to/vibe-check/vibe-check-claude-s-new-agents-are-confusing-as-hell) and their favorite slash commands—and talk about their philosophy for continuing to develop the agent. Wu and Cherny also look ahead to what’s next: the new form factors they’re experimenting with, and how Claude Code is expanding beyond traditional coding scenarios in the hands of non-technical users.

Here is a link to the episode transcript.

You can check out their full conversation here:

[![](https://img.youtube.com/vi/IDSAMqip6ms/maxresdefault.jpg)

![](https://d24ovhgu8s7341.cloudfront.net/static/emails/youtube-logo.png)](https://youtu.be/IDSAMqip6ms)

Here are some of the themes they touch on:

#### What the team has learned about getting the best out of Claude Code

The Claude Code team has an unfair advantage: They get to watch hundreds of smart engineers use their product every single day, and all it takes is a stroll around their office. This practice, called “antfooding” (Anthropic’s technical employees are affectionately known as “ants,” and this is their version of dogfooding), means the team gets to feel the product’s edges before anyone else does. (Wu says they get a message in their feedback channel every five minutes.) Here’s what they’ve learned about where it shines:

##### Don’t one-shot everything—use plan mode

People new to coding with AI agents often start with the assumption that Claude Code can [one-shot](https://en.wikipedia.org/wiki/One-shot_learning_(computer_vision)) anything, but Cherny says that’s not realistic, at least not yet. You can double or triple your chances of success on complex tasks by switching to “plan mode”—which has Claude map out what it’s going to do step-by-step—and aligning on an approach before any code gets written.

##### An easy way to standardize Claude Code settings

If your team is using Claude Code regularly, Cherny recommends creating a shared settings file—called settings.json—that lives in your codebase. This lets you pre-approve common commands (so Claude stops asking permission for routine tasks) and block risky ones (like files you never want touched). Instead of every engineer configuring these preferences individually, everyone inherits the same sensible defaults.

##### Make Claude finish the task before handing back control

Cherny’s seen power users get creative with “stop hooks,” automated actions that trigger when Claude finishes a task and is about to hand control back to you. For example, you can set up a stop hook that runs your test suite—checks that verify the code works correctly—and if any tests fail, it tells Claude to fix the problem and finish testing instead of stopping. “You can just make the model keep going until the thing is done,” he says.

##### Make your subagents fight with each other

Cherny uses subagents—separate instances of Claude working in parallel—to catch issues before code gets merged, and he’s discovered that making them challenge each other produces cleaner results. His code review command spawns several subagents at once: One checks style guidelines, another combs through the project’s history to understand what’s already been built, another flags obvious bugs. The first pass catches real problems but also false alarms, so he uses five more subagents specifically tasked with poking holes in the original findings. “In the end, the result is awesome,” he says, “it finds all the real issues without the false [ones].”

##### Let subagents handle the boring parts of a code migration

Some engineers at Anthropic are now spending over $1,000 a month on Claude Code credits on code migrations, the necessary-but-tedious work of updating codebases when the underlying tools change. Engineers get the main agent to create a to-do list, and then instruct it to spin up subagents that tackle items on the list in parallel. It’s particularly effective for tasks like switching from one testing framework to another, where it’s easy to verify the output.

##### Turn past code into leverage

[PAYWALL]
