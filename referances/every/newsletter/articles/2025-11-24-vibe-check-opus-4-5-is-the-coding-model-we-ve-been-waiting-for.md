---
title: "Vibe Check: Opus 4.5 Is the Coding Model We've Been Waiting For"
subtitle: "But it’s not perfect—it failed our editing test"
author: "Katie Parrott, Dan Shipper, Kieran Klaassen"
date: 2025-11-24
column: vibe-check
url: https://every.to/vibe-check/vibe-check-opus-4-5-is-the-coding-model-we-ve-been-waiting-for
paywalled: true
scraped_at: 2026-06-11T16:07:29.128Z
---

# Vibe Check: Opus 4.5 Is the Coding Model We've Been Waiting For

*But it’s not perfect—it failed our editing test*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

It’s appropriate that this week is Thanksgiving, because Anthropic just dropped the best coding model we’ve ever used: Claude Opus 4.5.

We’ve been testing Opus 4.5 over the last few days on everything from vibe coded iOS apps to production codebases. It manages to be *both* great at planning—producing readable, intuitive, and user-focused plans—and coding. It’s highly technical and also human. We haven’t been this enthusiastic about a coding model since Anthropic’s [Sonnet 3.5](https://every.to/vibe-check/vibe-check-claude-sonnet-4-5) dropped in June 2024**. **

The most significant thing about Opus 4.5 is that it extends the horizon of what you can realistically vibe code. The current generation of new models—Anthropic’s Sonnet 4.5, Google’s [Gemini 3](https://every.to/vibe-check/vibe-check-gemini-3-pro-a-reliable-workhorse-with-surprising-flair), or OpenAI’s [Codex](https://every.to/vibe-check/vibe-check-codex-openai-s-new-coding-agent) Max 5.1—can all competently build a minimum viable product in one shot, or fix a highly technical bug autonomously. But eventually, if you kept pushing them to vibe code more, they’d start to trip over their own feet: The code would be convoluted and contradictory, and you’d get stuck in endless bugs. We have not found that limit yet with Opus 4.5—it seems to be able to vibe code forever.

It’s not perfect, however. It still has a classic Claude-ism to watch out for: When it’s missing a tool it needs or can’t connect to an online service, it sometimes makes up its own replacement instead of telling you there’s a problem. On the writing front, it is excellent at writing compelling copy without AI-isms, but as an editor, it tends to be way too gentle, missing out on critiques that other models catch.

The dichotomy between strength at coding and weaker performance in editing is an interesting example of how the race to dominate coding is reshaping frontier models. Coding is economically valuable and has clearer success metrics than creative work. Labs are optimizing hard for it, and sometimes focusing less on improvements in other domains.

The overall story is clear, however: In a week of big model releases, the AI gods clearly saved the best for last. If you care about coding with AI, you *need* to try Opus 4.5.

Want to know more? Here’s your day-zero hands-on Vibe Check.

## What’s new?

In its own description of the model, Anthropic makes bold claims: best coding model in the world, best vision model, best tool-using model. According to Anthropic, Opus 4.5 outperforms both its own [Sonnet 4.5](https://every.to/vibe-check/vibe-check-claude-sonnet-4-5) and [Opus 4.1](https://every.to/vibe-check/vibe-check-genie-3-claude-4-1-gpt-oss-and-gpt-5) models at building code that’s reliable enough to ship to users. They say it transforms multi-day projects into hours, with cleaner code structure and organization, better bug-catching, and more independent execution.

Anthropic also updated Plan Mode, Claude Code’s feature for creating step-by-step plans for what it will build and how before writing any code, to build [more precise plans](https://every.to/source-code/stop-coding-and-start-planning) and execute more thoroughly, in addition to supporting multiple parallel sessions in Claude Code on desktop. We tested both and found them genuinely improved. A new feature lets you control how liberally the model uses tokens—optimizing for speed, cost, or maximum capability.

An important part of the story is pricing: [Opus 4.](https://platform.claude.com/docs/en/about-claude/models/overview)5 clocks in at $5/$25 per million tokens on an input/output basis (what you pay for the text you send versis the text the model returns), making it one-third the price of Opus 4 ($15/$75). It’s still more expensive than Sonnet 4.5 at $3/$15 per million tokens—about 1.7 times the per-token cost—but that’s a huge shift from the previous gap between Sonnet and Opus, which was closer to five times as big.

By comparison, [OpenAI’s GPT-5.1](https://openai.com/api/pricing/) comes in at $1.25/$10 and [Google’s Gemini 3 Pro](https://ai.google.dev/gemini-api/docs/pricing) at $2/$12 for standard-length prompts, so Opus 4.5 is still the premium option on sticker price. But Anthropic’s own testing suggests it often solves the same tasks with fewer tokens, which narrows the real-world cost gap more than the headline numbers suggest.

Here’s where Every’s team thinks Opus 4.5 shines and stumbles, across coding, writing, and our homegrown benchmarks.

## The Reach Test

#### Dan Shipper, the multi-threaded CEO 🥇

This is truly a paradigm-shifting model on the coding end. It’s the first model where I really feel like I can vibe code an app end-to-end without having to get into the details of the code. I don’t trust it as an editor, but it’s a *great* writer. It’s much less likely to use AI-isms, and creates genuinely quality prose. Absolutely a daily driver for me for both of those use cases.

#### Kieran Klaassen, general manager of Cora

##### The Rails-pilled master of Claude Code 🥇

Some AI releases you always remember—GPT-4, Claude 3.5 Sonnet—and you know immediately something major has shifted. Opus 4.5 feels like that. The step up from Gemini 3 or even Sonnet 4.5 is significant: [Opus 4.5] is less sloppy in execution, stronger visually, doesn’t spiral into overwrought solutions, holds the thread across complex flows, and course-corrects when needed. For the first time, vibe coding—building without sweating every implementation detail—feels genuinely viable. The model acts like an extremely capable colleague who understands what you’re trying to build and executes accordingly. If you’re not token-maxxing on Claude [using the Max plan, which gives you 20x more usage than Pro] and running parallel agent flows on this launch, you’re a loser :P

#### Katie Parrott, staff writer and AI editorial operations lead

##### AI-pilled writer by day, vibe coder by night 🟥

Opus 4.5 delivers clean, natural-sounding writing, but I’m sticking with Sonnet 4.5. It’s faster and more honest, and whatever differences there are in the writing quality on a word-by-word level are minor enough that I don’t feel compelled to switch. I’m still all-in on the Anthropic ecosystem for writing, but this release isn’t for me.

## Coding: ‘It just works’

The bottom line: Opus 4.5 is the best coding model we’ve used, and it’s not close.

### Planning: It thinks like a product builder

Anthropic is emphasizing improvements to Plan Mode—more precise plans, more thorough execution. When we tested [Opus 4](https://every.to/vibe-check/vibe-check-claude-4-sonnet) back in May, we were impressed by how it could work independently for long stretches, but the plans themselves still read like an engineer’s checklist, as shown in the first screenshot below. Opus 4.5’s plans feel different. They’re structured around what the user needs, not just what the code does.

[![Codex Max 5.1’s plan is cluttered and harder to parse. (Screenshot courtesy of Dan Shipper.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3850/optimized_4db07276-f148-4460-88a5-cac652b1f1e4.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3850/optimized_4db07276-f148-4460-88a5-cac652b1f1e4.png)
*Codex Max 5.1’s plan is cluttered and harder to parse. (Screenshot courtesy of Dan Shipper.)*

Dan tested this in a few ways. First, he tested on a power-reading iOS app he’s been building for himself. It allows him to take a picture of a page of a book and instantly get an analysis of the passage without typing or tapping. A big part of the app’s functionality is identifying *which* book you’re reading from just a picture of a page. He asked both Opus 4.5 and [Codex](https://every.to/vibe-check/gpt-5-codex-knows-when-to-think-hard-and-when-not-to) 5.1 to refactor the system to make it faster, more accurate, and more user-friendly. Same prompt, same codebase, two different results.

Opus 4.5’s plan was easier to read, more user-focused, and caught issues in the code that Codex missed. “Codex’s feels like a senior engineer that doesn’t understand users,” Dan said. Opus 4.5’s read like someone who builds products.

[![Opus 4.5 delivers a clean, easy-to-ready plan. (Screenshot courtesy of Dan.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3850/optimized_22f86ae5-9757-4ade-a91b-75c6704059ca.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3850/optimized_22f86ae5-9757-4ade-a91b-75c6704059ca.png)
*Opus 4.5 delivers a clean, easy-to-ready plan. (Screenshot courtesy of Dan.)*

He also tested it to fix a long-standing bug in the codebase for Every’s AI email assistant Cora. And though both models came to similar diagnoses, Claude’s plan was much easier to read, digest, and iterate on.

### Parallel workflows: Run multiple projects without losing the thread

Opus 4 could handle long autonomous coding sessions, but running multiple projects simultaneously was risky—context would bleed between tasks, or the model would lose track of important details as conversation history compressed. Opus 4.5 seems to have solved this.

[![Kieran has Opus 4.5 tackle five separate tasks at once. (Screenshot courtesy of Kieran Klaassen.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3850/optimized_84b1f6be-18e4-4997-88ae-57000891e3bf.jpg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3850/optimized_84b1f6be-18e4-4997-88ae-57000891e3bf.jpg)
*Kieran has Opus 4.5 tackle five separate tasks at once. (Screenshot courtesy of Kieran Klaassen.)*

Kieran stress-tested it by running 11 projects in roughly six hours. None of them derailed.

A few examples of what he was able to build:

**The abandoned feature:** Kieran had abandoned a Cora churn detection feature partway through building it. Cora was miscounting cancellations because payment processor Stripe made failed payments look like churns, plan switches appear as cancellations, and account pauses register as lost customers. As a result, dashboards showed phantom cancellation spikes.

Kieran had spent days trying to build this with previous models—they’d get stuck on the partial implementation or need endless clarifying rounds. Opus 4.5 finished it in 30 minutes by making decisions and pushing Kieran forward rather than waiting for him to specify every detail.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3850/optimized_7f092733-4553-45c1-bed5-496cb5e69d96.jpg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3850/optimized_7f092733-4553-45c1-bed5-496cb5e69d96.jpg)
*The churn feature Kieran was (finally) able to build with Opus 4.5. There are two questions added: "Why are you leaving?" and "Anything else?"(Screenshot courtesy of Kieran Klaassen.)*

**The automated code reviewer:** When developers push code changes, making the changes available to everyone using a product or service, automated systems run checks to see if the updated code follows the style rules. These are formatting conventions that keep code readable and consistent across a codebase.

[PAYWALL]
