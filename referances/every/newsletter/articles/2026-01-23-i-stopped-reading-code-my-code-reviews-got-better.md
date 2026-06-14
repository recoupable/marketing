---
title: "I Stopped Reading Code. My Code Reviews Got Better."
subtitle: "How 13 AI agents reviewing in parallel caught a critical bug I would have otherwise missed"
author: "Kieran Klaassen"
date: 2026-01-23
column: source-code
url: https://every.to/source-code/i-stopped-reading-code-my-code-reviews-got-better
paywalled: true
scraped_at: 2026-06-11T16:07:24.805Z
---

# I Stopped Reading Code. My Code Reviews Got Better.

*How 13 AI agents reviewing in parallel caught a critical bug I would have otherwise missed*

*Was this newsletter forwarded to you?[Sign up](https://every.to/account) to get it in your inbox.*

---

The bug report was deceptively simple: A user noticed that their email signature formatting was off in **[Cora](https://cora.computer)**, our AI-powered email assistant. I asked Claude Code to investigate and fix it. By morning, the fix had touched 27 files, and more than 1,000 lines of code had changed. I didn’t write any of them.

A year ago, I would have spent my afternoon reading that code. Line by line, file by file, squinting at the migration that moved `email_signature` from one database table to another, Ctrl+F-ing for every instance of our feature flags.

This time, I spent 15 minutes making decisions, and the code shipped without a single bug.

Before AI, code review meant reading every line a teammate wrote. You checked for typos, logic errors, and style inconsistencies, the way an editor reviews a manuscript. Now my code reviews no longer involve reading code. And I’ve gotten better at catching problems because of it.

This is code review done the [compound engineering](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it) way: Agents review in parallel, findings become decisions, and every correction teaches the system what to catch next time. The signature fix that touched 27 files? Thirteen specialized AI reviewers examined it simultaneously while I made dinner.

I’ll show you how I set it up, how it caught a critical bug I would have missed, and how you can start—even without custom tooling.

## The death of manual code review

Reading code, even briefly, gave me a sense of the shape of things. I could feel when the codebase was getting too complicated. By letting go of manual review, I worried that I’d lose that clarity, and the architecture would wander off without me.

But I realized, too, that manual code reviews were no longer sustainable. When a developer writes 200 lines, their manager might spend 20 to 40 minutes reading it. The ratio of time spent writing code to reviewing it holds at 5:1 or 10:1—I can sit down with a cup of coffee, and the coffee will still be warm by the time I finish. AI has broken that ratio. The time it takes to generate code has collapsed, but the time it takes for a human to review code hasn’t. Something had to give.

The shift from manual review happened slowly. When Claude Code enacted a set of fixes, I’d ask it questions, then read the diff (the line-by-line comparison showing what had changed). When I was satisfied, I’d hold my breath and merge the changes into the main codebase.

Nothing broke. The code was fine. It turned out that asking Claude to explain its reasoning—what it changed, why, and what might break—caught more than my tired eyes scrolling through diffs.

After a while, that close read turned into a quick skim. The skim turned into a glance. Eventually I found that by the time I had asked my questions, I’d already hit “merge.”

I still understood how good the code was—that clarity just came in a different way. Instead of feeling the shape of the code by reading it, I felt it by interrogating Claude Code:

1.
“Walk me through what you changed and why.”

2.
“What assumptions did you make?”

3.
“What would break this?”

4.
“Why did you ignore the feedback from `kieran-reviewer`?”

That last one needs explaining. `kieran-reviewer` is an AI agent I built—a specialized reviewer trained on my code preferences. It knows, for instance, that I prefer simple queries over complex queries and clear code over clever code. It’s one of 13 reviewers that examine every pull request before I see it.

Why so many agents? No single reviewer, human or AI, catches everything in a 27-file change. A security expert spots authentication gaps but misses database issues. A performance specialist catches slow queries but ignores style drift. I needed specialists working in parallel, each focused on what they’re good at. Together, they catch what I might miss from a manual review.

## Using the compound engineering plugin

My system for code review is rolled up into the[compound engineering plugin](https://github.com/EveryInc/compound-engineering-plugin). It’s a set of files in your codebase that extend what Claude Code can do. Here’s how it works.

**Slash commands** are shortcuts you type in the terminal—like /workflows:review or /workflows:plan—that trigger workflows. Each workflow is a markdown file with instructions for what Claude should do when you invoke it.

**Agents** are specialized AI workers, each defined in its own markdown file with a persona and focus area.

For the email signature fix, I ran a single command: `/workflows:review`, which spun up every agent on its list at once:

[PAYWALL]
