---
title: "Vibe Check: GPT-5.4—OpenAI Is Back"
subtitle: "GPT-5.4 is fast, opinionated, and good enough to tempt our Opus loyalist"
author: "Dan Shipper, Katie Parrott"
date: 2026-03-05
column: vibe-check
url: https://every.to/vibe-check/gpt-5-4-openai-is-back
paywalled: false
layout: special
scraped_at: 2026-06-11T16:07:21.731Z
---

# Vibe Check: GPT-5.4—OpenAI Is Back

*GPT-5.4 is fast, opinionated, and good enough to tempt our Opus loyalist*

Three months ago, OpenAI was losing the [agentic coding race](https://every.to/chain-of-thought/openai-has-some-catching-up-to-do). [Claude Code](https://every.to/vibe-check/vibe-check-claude-3-7-sonnet-and-claude-code) had captured developers' hearts, and [Opus 4.5](https://every.to/vibe-check/vibe-check-opus-4-5-is-the-coding-model-we-ve-been-waiting-for) was shipping at a level other models couldn't touch. Meanwhile, OpenAI's coding agent [Codex](https://every.to/vibe-check/vibe-check-codex-openai-s-new-coding-agent) felt like it was built for an older era of coding with AI. It was precise but rigid, powerful but personality-less, and not good with tools or able to run for long periods of time autonomously.

OpenAI's latest model release, GPT-5.4&mdash;along with their other recent releases [GPT-5.3 Codex](https://every.to/vibe-check/gpt-5-3-codex), GPT-5.3 Codex Spark, and the [Codex desktop app](https://every.to/vibe-check/codex-vibe-check) shifts the competitive balance back towards OpenAI on the coding front.

The new model produces plans that are thorough and technically precise, and have a user focus and &ldquo;human&rdquo; feel that has been missing from OpenAI's previous coding models. In our testing, GPT-5.4 reviews code with more depth than GPT-5.3 Codex, and has a noticeably more conversational voice. With a few tweaks, it became our preferred model to use in our [OpenClaws](https://every.to/guides/claw-school), especially given that it is half the price of [Opus 4.6](https://every.to/vibe-check/opus-4-6). Even [Kieran Klaassen](https://every.to/@kieranklaassen)**,** our die-hard Claude Code devotee, is now reaching for GPT-5.4 daily since we started testing it a week ago.

As ever, there are tradeoffs: GPT-5.4 has a tendency to expand the task well beyond what you asked for and to call tasks done before they're finished. It sometimes completed tasks in obviously wrong ways, then lied about it (more below&mdash;it was honestly kind of funny).

The bigger story here is OpenAI's trajectory. From the Codex desktop app to GPT-5.3 Codex and to GPT-5.4, the company is iterating fast, and many members of the team now use its tools and models daily for coding&mdash;a significant change from a few months ago.

[![](/assets/codex-vibecheck/openai-icon-7888f0bcce7003380c59eebd07bae41c238c872c771eab10f3d4d50bd240ffa1.svg)

Read with ChatGPT](#)
[![](/assets/codex-vibecheck/claude-icon-d20daa0318fe64ec4178ab9383c22fec6d0270576c58a111d363548d69792963.svg)

Read with Claude](#)

## What OpenAI told us

The OpenAI team highlighted improvements in reasoning, token efficiency (how many tokens it costs to execute a prompt), instruction following, and tool use.

The context window jumps to 1 million tokens&mdash;a 2.5-times increase from GPT-5.3 Codex's 400K, and on par with [Gemini](http://Gemini) 3.1 Pro and Opus 4.6. In practical terms, it's roughly the length of seven novels&mdash;enough to feed the model an entire codebase in a single conversation.

GPT-5.4 also supports OpenAI's computer use agent (CUA), which lets the model see a screen and interact with it using a virtual mouse and keyboard&mdash;navigating apps, clicking buttons, and filling out forms. This is the same technology behind [ChatGPT's agent](https://every.to/vibe-check/vibe-check-openai-enters-the-browser-wars-with-chatgpt-agent) mode.

API pricing is $2.50/$15.00 per million tokens (input/output). That's half the cost of Opus 4.6 ($5/$25), comparable to [Sonnet 4.6](https://every.to/vibe-check/vibe-check-anthropic-just-made-opus-cheaper-without-calling-it-that) ($3/$15), and slightly above Gemini 3.1 Pro ($2/$12). GPT-5.4 is available via API and in ChatGPT on desktop.

## The Reach Test

&ldquo;GPT-5.4 in the Codex app is my new daily driver for coding. It has a much more human thinking style than previous models, and seems to have the smarts of 5.3 Codex without the obsession with technical details. I've also been using it as the main model in my Claw, R2-C2, and it's definitely staying as my default. User beware though: I had several instances where this model did a task incorrectly and lied about it. It has a bit more of Opus's shoot-from-the hip attitude, which has pluses and minuses.&rdquo;

![](/assets/team/dan-0ff7cf951d07fc086d603ec0b20714678b5c542ef0617518fcb5b6f78af33e0c.png)

Dan Shipper
The multi-threaded CEO

&ldquo;I agree with the sentiment that OpenAI is back. It's not just this model. I think that with both GPT-5.3 Codex Spark and GPT-5.4, they're really going hard and catching up. I wouldn't say GPT-5.4 is the best model out there, but it's a model I use every day and I enjoy working with it.&rdquo;

![](/assets/team/kieran-bb3200155bbd5b326676eb4cc57fd55d69172efcca3d92ee214796ef7be77a6e.png)

Kieran Klaassen
The Rails-pilled master of Claude Code

&ldquo;I'm reaching for GPT-5.4 more than Codex 5.3&mdash;not because it's dramatically more intelligent on raw coding quality, but because it's much better to work with moment to moment. The thinking is readable enough that I can tell when it's drifting and steer it back.&rdquo;

![](/assets/team/naveen-f2b1cc71079ea28cbf69258a1dec652eceba248c38dd78d7538d533a34c675a0.png)

Naveen Naidu
Graduate of IIT Bombay (the MIT of India 💅)

Legend:

Paradigm shift

Psyched about this release

It's okay, but I wouldn't use it every day

Trash release

## The headline findings

Finding 01

### Finding 01: Best-in-class planning

[Dan Shipper](https://every.to/@danshipper) ran three head-to-head tests against GPT-5.3 Codex, all using his AI markdown editor [Proof](https://every.to/chain-of-thought/the-two-slice-team) as the testing ground: a quality assurance (QA) matrix (a checklist of every device, screen size, and software version combination to test before launch), a code review of the same pull request, and a release plan. GPT-5.4 won all three.

On the QA matrix, GPT-5.4 produced a more complete, more actionable plan. How do we know? Codex's own independent review said so: GPT-5.4 &ldquo;did better overall for this prompt because the final plan is more complete and more executable by a QA team."

On code review, GPT-5.4 found more bugs and framed them more clearly&mdash;how serious each one was and exactly what to do about it.

On release planning, it produced a six-phase rollout with checkpoints for testing on devices and a way to turn the feature off instantly if something goes wrong in production. Most impressive was that it automatically wove the bugs it flagged during code review into the plan as must-fix blockers. Nobody told it to connect those outputs.

Finding 02

### Finding 02: More reviewable code&mdash;with a trade-off

GPT-5.4 writes code that's easier for human developers to read and review than GPT-5.3 Codex.

[Naveen Naidu](https://every.to/@naveen_6804) ran a head-to-head test in [Proof](https://every.to/chain-of-thought/the-two-slice-team), giving both GPT-5.4 and GPT-5.3 Codex the same prompt: Build support for Mermaid diagrams, a tool that turns simple text commands into visual flowcharts. Each model submitted a pull request&mdash;a proposed set of code changes for review before they go live.

GPT-5.4 built the feature as a clean, self-contained module with its own test file. Codex 5.3 wove it directly into the editor's main file, which was functional, but heavier and harder to maintain. When a reviewer caught a bug in GPT-5.4's version&mdash;broken diagram syntax showed a misleading partial chart instead of flagging an error&mdash;it fixed the issue cleanly and added tests to make sure the same bug couldn't creep back in. That kind of response to feedback is exactly what you want before shipping code to real users.

![](/assets/darwin-vibecheck/image1-2c2b032661b1138a4a7276049ddbf23abb55fe87217d74a52c62cd5791f411f9.png)

*
GPT-5.4 clearly organizes Naveen's code, with the mermaid diagram easy to find. GPT-5.3 Codex hid all the logic in an existing file. (Image courtesy of Naveen Naidu.)
*

What we like

### Planning that chains context automatically

In the three-test arc above&mdash;from QA to code review to release plan&mdash;GPT-5.4 carried what it learned from the code review into the release plan without being told to, rather than planning each task in isolation. Earlier Codex versions treated every prompt as a blank slate, but GPT-5.4 anticipates what you might need next.

### Proactive research without being asked

Dan prompted GPT-5.4 to redesign the positioning on the landing page for Proof without providing competitive context. It independently researched competitors and rewrote the messaging on its own.

### Roughly twice as fast as Opus

It averaged 11 minutes per task in the LFG benchmark (Every's signature set of real-world engineering tasks, designed by Kieran) versus Opus 4.6's 23 minutes. On design tasks, the gap widened to four times faster (seven minutes versus 26).

### Clean execution on well-defined tasks

Naveen fed it a single prompt to migrate a website from the website design tool Framer to [Next.js](http://Next.js)&mdash;moving from a drag-and-drop website builder to production-grade code. It didn't finish perfectly and still needed iteration, but its frontend and design instincts were noticeably better than Naveen expected, which was a real improvement over earlier Codex runs on the same kind of work.

### More human voice than any Codex before it

Thinking text&mdash;the reasoning the model shows while it's creating an output&mdash;is more readable, and the tone is more natural. The model can also write in lowercase&mdash;a small detail, but previous models' robotic formatting was a constant reminder you were working with a machine.

![](/assets/darwin-vibecheck/image2-c8f5e9ad9959f2a42defa1b867cfa0d0ff49f925a6347b5700b21d8382b1222c.png)

*
GPT-5.4 shows its planned approach to a task in clear, easy-to-follow text. (Image courtesy of Dan Shipper.)
*

What we don't like

### Scope creep on multi-step conversations

GPT-5.4's initiative can work against it. In one multi-step iOS task, Naveen asked for a simple, tightly scoped change&mdash;bringing a data and privacy settings screen into parity across platforms&mdash;and the model treated it as permission to redesign the entire login experience, adding sign-up/sign-in mode switching, changing button labels, and rewriting copy. Each thing the model changed caused new things to break. Naveen flags this as a potential edge case rather than a defining pattern, but the dynamic is worth watching: The same initiative that fuels proactive research can also fuel unnecessary changes when left unchecked.

### Misleading completion reports in OpenClaw

We found that in the OpenClaw harness, GPT-5.4 sometimes gave misleading completion reports or completed work in obviously wrong ways. For example, once, when asked to build a &ldquo;pixel perfect&rdquo; landing page from a Figma file, it created an HTML page with a screenshot of the design instead of actually building the page from separate components.

This doesn't happen all of the time&mdash;and may be an artifact of the work we did to make GPT-5.4 more agentic in the OpenClaw harness&mdash;but it's worth looking out for as you use this new model.

### Over-engineering

GPT-5.4 wrote the most lines of code on most benchmarks&mdash;nearly three times as many lines of Swift as [Gemini Pro](https://every.to/vibe-check/vibe-check-gemini-3-pro-a-reliable-workhorse-with-surprising-flair) on the same task. Kieran calls it &ldquo;too eager, adding things that aren't wrong but aren't necessary.&rdquo;

OpenClaw setup

### GPT 5.4 has main model energy in OpenClaw

When you're using the AI assistant [OpenClaw, the model you choose to run it can have a big impact on your experience&mdash;but it's not something current AI benchmarks are designed to assess](https://every.to/guides/claw-school). A model that scores well on coding tasks can still fall flat when it needs to keep working autonomously inside a Claw without quitting early.

Our testing showed that 5.4 shines as the main model inside of an OpenClaw. It's both highly technical and quite human&mdash;it immediately used all lowercase sentences when communicating in Slack without being asked to do so.

It's also about half the price of Opus 4.6, the main model we previously used to run our Claws. However, this comes with tradeoffs: It didn't work well autonomously in the OpenClaw harness out of the box, and it sometimes went off the rails or lied.

### Making GPT-5.4 work in an OpenClaw setup

Dan's Claw, R2-C2, ran great on Opus 4.6. He could assign it a task in Slack and come back to a finished result. When he swapped in GPT-5.4, the agent started stalling: It would take one or two steps, send a message like &ldquo;on it,&rdquo; and stop.

Three changes gave him a better outcome. Dan gave each Slack conversation its own clean slate instead of letting them pile into one bloated log. He added explicit rules that forced the agent to keep working&mdash;because GPT-5.4 would treat &ldquo;I'm looking into it&rdquo; as a stopping point unless told otherwise. And he added a simple task tracker so the agent could see what was still unfinished, something Opus kept track of internally but GPT-5.4 couldn't.

After the changes, GPT-5.4 behaved more agentically in the same setup. Lesson learned: OpenClaw agency is partly a product of the environment you create around it. A setup that feels great with a strong model can still contain shortcuts that surface the moment you swap in a different one.

![](/assets/darwin-vibecheck/image2-c8f5e9ad9959f2a42defa1b867cfa0d0ff49f925a6347b5700b21d8382b1222c.png)

*
Dan's OpenClaw, R2-C2, running on GPT-5.4, helps Dan get ready to tackle a functionality issue in Proof. (Image courtesy of Dan Shipper.)
*

Quick verdict by use case

### Planning and code review 🟢

The best planning model we've tested. It automatically connects findings from one task to the next without needing to be prompted.

### Well-defined feature builds 🟢

The model is fast and reliable when the task is clear. One-shot Framer migration, clean builds, and speed advantage over Opus.

### Complex multi-page apps 🟡

It finished last among six models when asked to build a complex e-commerce website. Because it over-engineers and loses focus, Opus and Gemini Pro are safer bets for multi-page coordination.

### Long-running autonomous tasks 🟡

More autonomous than previous Codex models, but it needs more setup than Opus to keep going. The model stops after one or two loops without scaffolding.

### Design (single page) 🟢

It led the LFG benchmarks on single-page design tasks&mdash;the highest marks of any model tested. Kieran noted strong visual instinct, serif typography, and a premium feel. It even implemented a cookie consent flow that other models skipped.

### Complex iOS UI work 🟡

GPT-5.4 struggled with a complex Mac user interface redesign that GPT-5.3 Codex handled cleanly. More testing is needed to determine whether this is a pattern or an outlier, but proceed with caution on complex native app work.

## GPT-5.4 in the LFG benchmark

Kieran tested GPT-5.4 against five other models&mdash;[Opus 4.6](https://every.to/vibe-check/opus-4-6), [GPT-5.3 Codex](https://every.to/vibe-check/gpt-5-3-codex), GPT-Codex Spark, [Gemini](https://every.to/vibe-check/vibe-check-gemini-3-pro-a-reliable-workhorse-with-surprising-flair) 3.1 Pro, and Gemini Flash 3.0&mdash;across seven coding benchmarks of increasing difficulty:

### The tasks

1. Drift landing page

a polished marketing page for a fictional AI writing app, with a specific dark editorial aesthetic and explicit design constraints.

2. Cozy island 3D

an interactive, Studio Ghibli&ndash;inspired 3D island scene with 13 required features, including animated ocean waves, drifting clouds, and a slowly orbiting camera.

3. Cora design

a pixel-faithful implementation of a Figma design spec for Every's email product, testing whether a model can match exact colors, typography, and spacing.

4. Proof redesign

a landing page for Every's collaborative editor, where the model gets copy and brand context but has to make its own design decisions.

5. Earnings preview dashboard

an NVIDIA earnings dashboard with seven tabs, real financial calculations, and interactive charts built in Python.

6. Rubber duck e-commerce

a full e-commerce site with five pages, a visual product customizer, cart and checkout flow, and shared state across routes. This is the hardest benchmark.

7. Method Later gem

a Ruby gem using metaprogramming patterns, with ActiveJob integration and a full test suite.

8. Heartbeat camera

an iOS app that measures heart rate by detecting color changes in a fingertip pressed against the camera lens, requiring hardware integration and signal processing.

Each benchmark runs the `/lfg` command ("let's fucking go") from Every's [compound engineering](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents) plugin, which takes a single high-level prompt and handles the full development workflow autonomously&mdash;planning, coding, and reviewing its own work. No follow-up questions allowed.

![](/assets/darwin-vibecheck/image5-eaddae867c0d8d35988749cb93886f5e6d07519604b332fad4e01c391e62c31c.jpg)

*
A side-by-side comparison of how the six tested models performed on the cozy island 3D challenge, with GPT-5.4 in the top right. (Image courtesy of Kieran Klaassen.)
*

### Build reliability

GPT-5.4 completed all seven of the seven tasks and tied with Opus, GPT-5.3 Codex and Gemini 3.1 Pro for the best build rate; Codex Spark only four.

### Complex apps are the weakness

GPT-5.4 finished last among models that successfully built on the rubber duck e-commerce benchmark&mdash;the most demanding test. Gemini 3.1 Pro and Opus both outperformed it significantly. GPT-5.4 tried to do too much and lost track of how different pages needed to work together. The checkout flow was incomplete.

### Code quality sits below Opus and Gemini Pro

GPT-5.4's code reads more naturally than Codex's, but it still felt like it was written by someone who learned the language from documentation rather than years of shipping with it.

### Speed: The real trade-off

GPT-5.4 averages roughly half the runtime of Opus across all benchmarks, with a modest quality trade-off. It built the drift landing page in seven minutes versus 26. Gemini beat GPT-5.4 on speed, but not by much.

How it stacks up

### GPT-5.4 vs. Opus 4.6

Opus remains stronger for exploratory, loosely defined work&mdash;the kind where you describe a problem and let it figure out the solution, like the open-ended LFG benchmark prompts. It's more autonomous and persistent on long-running tasks, and produces higher-quality code on complex multi-page apps. But Opus is roughly twice as slow, and GPT-5.4's planning and code review are legitimately competitive.

### GPT-5.4 vs. GPT-5.3 Codex

GPT-5.4 is warmer, faster, more creative, and better at planning. It plans with product awareness (thinking in terms of user experience, not just engineering), reviews code more thoroughly, and chains context between tasks. The trade-off: GPT-5.3 Codex is more reliable on complex user interface tasks and doesn't scope-creep.

### GPT-5.4 vs. Gemini 3.1 Pro

Kieran found Gemini's designs more minimal and well-structured&mdash;GPT-5.4 tended to be "a little bit too much, over the top." Gemini significantly outperformed GPT-5.4 on the complex e-commerce benchmark and runs faster.

![](/assets/darwin-vibecheck/image3-a3d9f46cb203313fbb5de8d91fd90a82a579f020dd8dc01c0b8c036bccfb5a35.png)

![](/assets/darwin-vibecheck/image4-45df89c74d5b4f4285a2406562b4ba4ca5e41a41f13182ada3193d037ac03743.png)

GPT-5.4's landing page design (top) is busier and less streamlined than Gemini 3.1 Pro (bottom). (Image courtesy of Kieran.)

## Final thoughts

GPT-5.4 is the clearest evidence yet that OpenAI is competitive again in agentic coding. The planning is best-in-class, the speed is snappy, and the voice is finally human. But the model's ambition cuts both ways. Given its scope creep, misleading completions, and less autonomy than Opus, you'll need to manage it more closely.

For Every's workflows, the verdict splits by role. Dan is incorporating GPT-5.4 into his planning and code review workflow alongside Opus 4.6. Kieran reaches for it daily for fast iteration while keeping Claude as his primary for long-running autonomous work. Naveen says he would choose GPT-5.4 over Codex 5.3 for a full month of Monologue development&mdash;the usability gap is that significant.

A year ago, nobody at Every used an OpenAI model for daily coding work. Now Kieran and Dan both reach for one, and Naveen is ride-or-die for Codex. If the next release tightens scope discipline without losing the planning strengths, the gap between OpenAI and Anthropic on the coding front becomes uncomfortably small for Anthropic.
