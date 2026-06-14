---
title: "How Every Is Harnessing the World-changing Shift of Opus 4.5 "
subtitle: "Five patterns from our Opus 4.5 Claude Code Camp you can apply today"
author: "Katie Parrott"
date: 2025-12-09
column: source-code
url: https://every.to/source-code/how-every-is-harnessing-the-world-changing-shift-of-opus-4-5
paywalled: true
scraped_at: 2026-06-11T16:07:27.988Z
---

# How Every Is Harnessing the World-changing Shift of Opus 4.5 

*Five patterns from our Opus 4.5 Claude Code Camp you can apply today*

*Our last coding camp of the year is [Codex Camp](https://0ab9ee3d.click.convertkit-mail2.com/lmulv69l7gimhnwokkkt6h8k52600bghd2pg2/z2hghnhewvk8m9ap/aHR0cHM6Ly9ldmVyeS50by9jb3Vyc2VzL2NvZGV4LWNhbXAvcHVyY2hhc2U=)—a live workshop about building with OpenAI’s coding agent, open to all Every subscribers on Friday, December 12 at 12 p.m. ET. [Learn more and reserve your spot](https://every.to/courses/codex-camp/purchase).—[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief)*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

Every’s take on Anthropic’s latest model, [Opus 4.5](https://every.to/vibe-check/vibe-check-opus-4-5-is-the-coding-model-we-ve-been-waiting-for), is that it’s a world-changing shift in AI-powered coding.

When Every CEO **[Dan Shipper](https://every.to/@danshipper) **started using [Opus 4.5](https://every.to/vibe-check/vibe-check-opus-4-5-is-the-coding-model-we-ve-been-waiting-for), his previous frustrations with AI coding—errors, hallucinations—disappeared. After the model was released in late November he built his dream reading app between meetings in one week, work that would have [taken him six months before](https://every.to/chain-of-thought/opus-4-5-collapsed-six-months-of-development-work-into-one-week).

Meanwhile, resident Claude Code wizard **[Kieran Klaassen](https://every.to/@kieran_1355)** was so enamored with the model, he started 10 projects at once and kept sneaking away from Thanksgiving dinner to prompt more. “This is by far the most exciting model, maybe ever,” he said.

We knew we needed to do more than write about what we were seeing. We needed to show it. Cue our latest Claude Code Camp.

Over the course of the hour, Dan and Kieran walked more than 400 Every subscribers through what they’ve discovered working with Opus 4.5. They demoed real workflows, shared emerging patterns in how to think about code, and answered questions about everything from how to take advantage of the model’s new-and-improved computer use capabilities to what this means for the [compound engineering](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it) playbook.

Here’s what we learned—and what you can apply immediately.

## Key takeaways

1.
**It finishes what it starts. **Previous models spiral into errors three to four steps in. Opus keeps going—from idea to working app.

2.
**It can fix problems in code you didn’t write. **Opus can modify the pre-written code your app uses (like calendar displays or payment systems—built by other developers so you don’t have to code them from scratch) and trace bugs through all the code, frameworks, and dependencies that make your app work.

3.
**It can test your app like a human would. **Opus can test features end-to-end, find bugs, and generate before/after screenshots on its own.

4.
**You can build apps by simply describing what you want. **Your app calls an AI and tells it what to do—no traditional feature code required.

5.
**Your brain is the bottleneck. **The question is no longer “Can the AI do this?” but “Which of these 10 things should I build?”

## What makes Opus 4.5 an infinite coding machine?

Dan calls Opus 4.5 the [infinite coding machine](https://every.to/chain-of-thought/opus-4-5-collapsed-six-months-of-development-work-into-one-week). Previous models were great for demos but would peter out when you tried to build something real—three steps in, they’d start hallucinating fixes and making the same errors over and over again. Opus doesn’t hit that wall.

The shift has implications on two fronts: how you think about software (coding philosophy) and how you structure that software (code architecture).

### Coding philosophy: Depth and delegation

Dan started building his reading app with other frontier models before Opus 4.5 arrived. He’d make progress, then hit the error wall. When he switched to Opus, the pattern changed. “It kept going,” he said during the camp. “I kept adding features and adding features.”

One of the reasons Opus 4.5 can do this is because it can fix problems in code you didn’t even write. Usually, if something breaks, you can only fix the issue in your own code. Anything else, you would have to become an expert in that tool to fix it. For example, if your app uses React, a framework for building web apps, you are also dependent on specific code that React uses to display content on screen, which in turn depends on the interface that lets code communicate with a browser like Chrome or Safari. Now, Opus 4.5 can trace a bug through all three layers and fix it.

Opus 4.5 also lets you work on multiple things in parallel, by delegating multiple tasks to the model at once. This increases the speed at which you can build.

### Code architecture: Agent-native apps

The second shift is architectural. Opus changes how apps can be structured.

Traditionally, you code each feature as a step-by-step recipe. Every action is precisely defined: if user clicks button → fetch data → format results → display.

With Opus, you can build what Dan calls “agent-native” apps. Instead of coding recipes, you build a general-purpose agent (an AI that can use tools and follow instructions, [similar to a chef](https://every.to/chain-of-thought/opus-4-5-collapsed-six-months-of-development-work-into-one-week) that can follow recipes and cook) with access to tools, then give it prompts describing outcomes. The agent figures out the steps.

Dan’s reading app includes a feature that determines your “reading profile” from books and articles you have screenshotted on your phone’s camera roll. To code this traditionally, you would have had to write an algorithm to efficiently scan through a gigantic photo library, identify photos that are likely to contain text, convert them from images to text, collect them, and summarize them into a coherent, interesting synthesis—a complex process. Now, when you use the reading profile feature, the app calls the agent with a prompt. The agent scans your camera roll, identifies books, analyzes your taste, and writes it up—no feature code required.

Features are faster to build because you’re writing prompts instead of code, and they’re faster to iterate because you edit the prompt instead of hunting down the exact line of code that broke.

The tradeoffs are significant. Agent-native apps are more expensive—every feature costs more money to run because they consume costly compute resources, instead of just executing pre-written code—and slower, because the agent has to think. But model costs are dropping, and you don’t have to go all in. Use agent-native architecture for exploration, then write common workflows into traditional code as patterns emerge.

## What a senior engineer can do with it

The philosophy and architecture shifts unlock workflows that weren’t possible before. Kieran demonstrated three patterns that show what Opus 4.5 looks like in daily use.

### Computer use for testing

Previous models could technically control browsers, but they’d get confused, click the wrong things, or lose track. Opus stays coherent through complex multi-step tasks, which makes computer use viable for tasks like regression testing (checking that new code doesn’t break existing features) and user interface validation that would previously require manually clicking through your entire app.

[PAYWALL]
