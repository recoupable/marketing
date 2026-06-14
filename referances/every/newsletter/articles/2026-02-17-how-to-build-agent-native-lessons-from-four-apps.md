---
title: "How to Build Agent-native: Lessons From Four Apps "
subtitle: "Start with three simple tools, and let the AI figure out the rest"
author: "Katie Parrott"
date: 2026-02-17
column: source-code
url: https://every.to/source-code/how-to-build-agent-native-lessons-from-four-apps
paywalled: true
scraped_at: 2026-06-11T16:07:22.985Z
---

# How to Build Agent-native: Lessons From Four Apps 

*Start with three simple tools, and let the AI figure out the rest*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

**[Dan Shipper](https://every.to/@danshipper)** scanned a page from **Erik Larson**’s **Winston Churchill** biography, *The Splendid and the Vile,* and pressed save. The app he was demo-ing identified the book, generated a summary, and produced character breakdowns calibrated to exactly where he was in the story—no spoilers past page 203.

Nobody programmed it to do any of this.

Instead, Dan’s app has a handful of basic tools—“read file,” “write file,” and “search the web”—and an AI agent smart enough to combine them in a way that matches the user’s request. When it generates a summary, for example, that’s the agent deciding on its own to search the web, pull in relevant information, and write a file that the app displays.

This is what we call [agent-native architecture](https://every.to/chain-of-thought/agent-native-architectures-how-to-build-apps-after-the-end-of-code)—or, in Dan’s shorthand, “[Claude Code in a trench coat](https://every.to/context-window/claude-code-in-a-trenchcoat).” On the surface, it looks like regular software, but instead of pre-written code dictating every move the software makes, each interaction routes to an underlying agent that figures out what to do. There’s still code involved—it makes up the interface and defines the tools that are available to the agent. But the agent decides which tools to use and when, combining them in ways the developer never explicitly programmed.

At our first Agent Native Camp, Dan and the general managers of our software products **[Cora](https://cora.computer/)**, **[Sparkle](https://makeitsparkle.co/)**, and **[Monologue](https://monologue.to/)** shared how they’re each building in light of this fundamental shift. They’re working at different scales and with different constraints, so they’re drawing the lines in different places. Here’s what they shared about how the architecture works, what it looks like in production, and what goes wrong when you get it right.

##### Key takeaways

1.
**The AI is the app.** Instead of coding every feature, you define a few simple tools the AI is allowed to use—for instance, read a file, write a file, and search the web. When you ask it to do something, it decides on its own which tools to reach for and how to combine them.

2.
**Simpler tools get smarter results.** The smaller and more basic you make each tool, the more creatively the AI combines them. Claude Code is powerful because its core tool—running terminal commands—can do almost anything.

3.
**Rules belong in the tools, not the instructions.** You can ask an AI to be careful, but it might ignore you. If an action is irreversible—like deleting files—the safeguard has to be built into the tool itself.

4.
**You don’t have to start over to start learning.** Give the AI a safe space to interact with your existing app and experiment outside the live product. You’ll learn what the agent needs without risking what already works. Just don’t get attached to the code—as models improve, expect to throw things out and rebuild every few months.

## How agent-native works

Traditional software can only do what it’s explicitly programmed to do by its code. Click “sort by date,” and it sorts by date. Click “export,” and you get a CSV. It will never spontaneously summarize your inbox or reorganize your files by topic—unless someone wrote the code for that exact feature.

Instead of coded features, an agent-native app has tools (small, discrete actions like “read file” or “delete item”) and skills (instructions written in plain English that describe how to combine those tools). An agent uses those tools and skills to produce an outcome that you specify, such as identifying what book you are reading from one page.

Three principles make this work:

1.
**Parity:** Whatever the user can do, the agent can do. Every click, form submission, and interaction is available to both.

2.
**Granularity:** Tools should be atomic—small and single-purpose—and features, such as a personalized book summary or a Monday morning email brief, should live at the skill level where they can be written and modified in plain text.

3.
**Composability:** When tools are atomic and skills can combine them freely, the app develops the ability to do things nobody explicitly designed for.

But there are trade-offs. Agent-native apps are slower because the agent has to reason through each request instead of running deterministic code—pre-written instructions that always produce the same result. They’re more expensive because every interaction burns tokens, the unit AI companies use to measure and charge for usage. And they’re less predictable—the same request won’t always produce the same result, which makes security harder to guarantee.

Dan’s bet is that inference costs—the price of having the AI think—drop roughly 80 percent every few months, making this architecture cheaper over time. But today, it’s still expensive.[Cora](https://cora.computer/) general manager **[Kieran Klaassen](https://every.to/@kieran_1355)** has seen days where those costs hit $1,500 with thousands of users. Risks like this are important to keep in mind when you’re getting started with building in an agent-native way.

## Three tools and a filesystem

**[Naveen Naidu](https://every.to/@naveen_6804)**, general manager of [Monologue](https://monologue.to/), took the architecture to its most minimal extreme. He’d been building a read-later app as a side project—something like Pocket or [Instapaper](https://www.instapaper.com/), where you save articles from the web and read them later. But instead of a traditional database, the entire backend is a set of folders, and an AI agent helps you interact with everything you’ve saved.

[PAYWALL]
