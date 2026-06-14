---
title: "You’re the Manager Now"
subtitle: "Plus: Why small models can't match Mythos, an AI workflow confidence check, Claude Code token tracking, our agent-muting plugin, the AI philosopher draft, and a mini-Vibe Check on Dia"
author: "Laura Entis"
date: 2026-04-16
column: context-window
url: https://every.to/context-window/you-re-the-manager-now
paywalled: true
scraped_at: 2026-06-11T16:07:18.440Z
---

# You’re the Manager Now

*Plus: Why small models can't match Mythos, an AI workflow confidence check, Claude Code token tracking, our agent-muting plugin, the AI philosopher draft, and a mini-Vibe Check on Dia*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

## Now, next, nixed

#### Developer UI

**Now:** Anthropic gave Claude Code’s desktop app a redesign, adding a sidebar for managing sessions, drag-and-drop panes, and an integrated terminal and file editor. Altogether, it makes it easier to work multiple projects in parallel. **[Cora](https://cora.computer)** general manager **[Kieran Klaassen](https://every.to/@kieran_1355)** was [thrilled](https://x.com/kieranklaassen/status/2044138588665982987)—this was already his preferred setup.

[![Kieran’s existing work setup in Cursor looks a lot like the new Claude Code. (Image courtesy of X/Kieran Klaassen.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4113/optimized_4f115f3a-f914-456c-912f-5f563e3cc5bc.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4113/optimized_4f115f3a-f914-456c-912f-5f563e3cc5bc.png)
*Kieran’s existing work setup in Cursor looks a lot like the new Claude Code. (Image courtesy of X/Kieran Klaassen.)*

**Next:** Claude Code’s refreshed look is not exactly original, says **[Monologue](https://monologue.to)** general manager **[Naveen Naidu](https://every.to/@naveen_6804)**. Cursor offers a similar experience, and both companies “just copied Codex’s design,” he says.

But it confirms where dev work is headed: [overseeing agents](https://every.to/source-code/the-folder-is-the-agent), not writing code.

**Nixed:** The idea that command-line interface (CLI) will eat user interface (UI). With a CLI-first workflow, you mostly supervise through text: commands, logs, git state, diffs, and terminal output. Now that agents are doing the coding, that’s not a good primary interface.

Instead, the future coding UI is centered on managing parallel work, staying aware of git/task context, and—most importantly, Kieran says—having access to a preview of what you’re building.

---

## Permission to skip

#### Smaller models can’t do what Claude Mythos does

A researcher at a cybersecurity company made waves online when he reported smaller models could find the [same security vulnerabilities](https://aisle.com/blog/ai-cybersecurity-after-mythos-the-jagged-frontier) as Mythos, Anthropic’s new model so powerful it [isn’t being made public](https://every.to/context-window/every-is-half-agent-now), when pointed to the relevant code.

You have permission to skip this discourse—or better yet, reframe it.

Because this is a framing issue, says **[Dan Shipper](https://every.to/@danshipper)**, Every’s CEO. Mythos and smaller models are operating within completely different ones. Yes, you can point a smaller model to a codebase and tell it to find a bug when you already know that capability is possible, but you cannot ask it to find serious vulnerabilities in critical software across every major operating system and browser, autonomously, the way Mythos did.

[![Older models finding the same security bugs as Mythos is not an apples-to-apples comparison. (Image courtesy of X/Dan Shipper.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4113/optimized_218aa577-c1cc-436a-9f26-16bdf6de8ad1.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4113/optimized_218aa577-c1cc-436a-9f26-16bdf6de8ad1.png)
*Older models finding the same security bugs as Mythos is not an apples-to-apples comparison. (Image courtesy of X/Dan Shipper.)*

As models get better, they automatically handle smaller, concrete problems, allowing you to demand more from them.

Say you have a bug in your code. A lower-level frame, which requires you to describe the problem in detail, would be to explain what’s going wrong and propose possible solutions. A higher-level frame allows you to get abstract: “There seems to be a problem, can you fix it?”

As you climb the frame hierarchy, your role is less about communicating the mechanics of a problem and more about defining what the most important problem even is. In the coding example, the higher frame is powerful because it allows for expansiveness. (“There seems to be a problem, can you fix it?” might surface the same bug as the lower-frame prompt, or it may find that bug *and* identify a far more significant architectural issue.)

The higher the frame, the more possible solutions unfold before you—and the more room to consider what constitutes a solution in the first place.

[PAYWALL]
