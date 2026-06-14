---
title: "Vibe Check: Gemini 3 Pro, A Reliable Workhorse With Surprising Flair"
subtitle: "After 24 hours of hands-on testing, we found a model that’s fast, reliable, and surprisingly funny—but still prone to overreaching and not yet a writing champ"
author: "Rhea Purohit"
date: 2025-11-19
column: vibe-check
url: https://every.to/vibe-check/vibe-check-gemini-3-pro-a-reliable-workhorse-with-surprising-flair
paywalled: true
scraped_at: 2026-06-11T16:07:29.194Z
---

# Vibe Check: Gemini 3 Pro, A Reliable Workhorse With Surprising Flair

*After 24 hours of hands-on testing, we found a model that’s fast, reliable, and surprisingly funny—but still prone to overreaching and not yet a writing champ*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

Every got early access to Gemini 3 Pro—the brand-new model Google released yesterday—but the preview build wouldn’t quite work for our team. So we waited for the public release and have been testing it for the last 24 hours to get you a real feel for the model that’s become a workhorse for developers.

## Our day-one verdict

Gemini 3 Pro is a solid, dependable upgrade with some genuinely impressive highs—especially in frontend user interface work and turning rough prompts into small, working apps. It’s also, somewhat unexpectedly, the funniest model we’ve tested and now sits at the top of our[AI Diplomacy](https://every.to/diplomacy) leaderboard, dethroning [OpenAI’s o3](https://every.to/vibe-check/vibe-check-o3-is-out-and-it-s-great) after a long run. But it still has blind spots: It can overreach when it gets too eager, struggles with complex logic sometimes, and hasn’t quite caught up to Anthropic on the writing front.

Let’s dive in.

## What’s new?

**Gemini 3 Pro:** Google’s most advanced model to date is a natively multimodal reasoning model—meaning it can understand different types of input, like text, images, audio, or code, all in the same place without extra tools. It has a 1 million-token context window, on par with its predecessor [Gemini 2.5 Pro](https://every.to/vibe-check/vibe-check-gemini-2-5-pro-and-gemini-2-5-flash). Back in the dark ages of May 2025, when Every’s engineering team was completely [Cursor](https://every.to/vibe-check/vibe-check-cursor-2-0-and-composer-1-alpha)-pilled, Gemini 2.5 Pro was our model of choice inside the AI code editor thanks to its giant context window and sharp reasoning.

Google’s family of Pro models is built for deep, nuanced reasoning tasks, while its cheaper Flash models are optimized for speed, suited to low-cost, high-volume tasks. Google hasn’t launched Gemini 3 Flash yet, a release our team eagerly awaits.

Before yesterday’s launch, Gemini models had [more than 13 million developers](https://blog.google/products/gemini/gemini-3/#note-from-ceo) using them as part of their workflow. And according to Google CEO **Sundar Pichai**, Gemini 3 Pro is designed to reason more deeply, understand nuance, and infer the intent behind your request, so you can get what you need with less prompting.

**[Google Antigravity](https://antigravity.google/blog/introducing-google-antigravity): **An AI-powered independent developer environment (IDE) that combines a ChatGPT-style prompt window with a command-line interface pane and a built-in browser. (Command-line interface or CLI are the text-based tools developers use to type commands directly, rather than clicking around in a graphical editor.) But because our team does most of its work straight from the CLI (instead of in a full-fledged IDE), we didn’t test Antigravity as much—this Vibe Check focuses on Gemini 3 Pro, with a small section on Antigravity.

Let’s dig into where Every’s team thinks Gemini 3 Pro shines and stumbles, across coding, writing, and the set of benchmarks we’re nurturing inside Every.

## The Reach Test

#### Dan Shipper, the multi-threaded CEO 🟨

I’m not clearly reaching for Gemini 3 Pro for anything but I’ll be experimenting more with it. There’s obviously a lot of capability there to unlock.

#### Kieran Klaassen, general manager of Cora

##### The Rails-pilled master of Claude Code 🟩

I’m very curious to keep using it more, and also, I want Gemini Flash 3.

#### Danny Aziz, general manager of Spiral

##### The multi-model polyglot 🟨

It seems to be pretty decent at user interface, and when there is a proper plan—it will go and implement the whole [thing]. But for fixing bugs, exploring, and prototyping [quickly trying out rough versions of an idea] where I don’t really know what the hell it is that I’m looking for, I find Sonnet to be a much better model for this kind of stuff.

#### Andrey Galko, engineering lead

##### The cautious vibe coder 🟩

I don’t think it’s an immense step for code generation, but it’s a solid step forward in quality and reliability… It nails complicated things from one go, and most things work well right away. It’s a big step forward for user interface work: It’s much more creative, and it has more variability and chaos (in a good sense) in its output.

#### Alex Duffy, cofounder and CEO of Good Start Labs

##### He who makes AI agents fight each other 🟩

Gemini 3 is a step change and improvement that I haven’t felt since Claude 3.5 Sonnet’s release. It’s noticeably better at most things besides writing that I’ve tried it on. I’ll maintain use of Claude and ChatGPT, but I’ll use a lot more Antigravity and Gemini for coding, if Google’s rate limits will allow it. This [Google stan](https://every.to/context-window/google-s-ai-vision-make-tech-human-again) continues to be a happy Google stan.

#### Naveen Naidu, general manager of Monologue

##### Graduate of IIT Bombay (the MIT of India 💅)

**🟩 **For frontend/UI work: Gemini 3 Pro is my new go-to. It strikes the perfect balance between quality and prompt adherence. Where [Claude](https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five) over-engineers and [Codex](https://every.to/vibe-check/gpt-5-codex-knows-when-to-think-hard-and-when-not-to) underwhelms, Gemini 3 Pro hits the sweet spot.

**🟨 **For complex logic: I still reach for Codex 5.1 when I’m building features that require careful reasoning, handling edge cases, or working with complex state management [ keeping track of changing information in the app, like what screen the user is on]. Codex’s precision is unmatched.

My ideal workflow is using Gemini 3 Pro to scaffold UI [create a basic skeleton of the app’s interface] and create frontend components [ the building blocks of what users see and interact with], then switch to Codex 5.1 when implementing complex logic or debugging intricate issues.

## Using it for coding

### Where Gemini 3 Pro shines

### It’s precise, reliable, and does exactly what you need it to

#### Putting it through its paces for real iOS development

Naveen tested Gemini 3 Pro in [Factory’s CLI Droid](https://every.to/vibe-check/vibe-check-i-canceled-two-ai-max-plans-for-factory-s-coding-agent-droid) by asking it to help build new features for the iOS app for **[Monologue](https://discover.every.to/monologue)**, Every’s voice dictation app. He started by having the model add database features—essentially teaching the app how to save and retrieve information—using a library, which is a pre-made bundle of code developers use so they don’t have to build everything from scratch.

The twist was that he chose a niche SQLite library from a company called Point-Free. SQLite is a lightweight, built-in database that apps use to store information on your device, and since this one is so new, it probably wasn’t in Gemini’s training data. That made it a great test of whether the model could read the documentation, learn the library’s unique rules, and use it correctly inside his existing codebase.

He was impressed by how strong Gemini’s initial setup was. “It not only configured everything correctly,” he says, “but it also analyzed my codebase on its own and added a sample table that matched my schema [or a blueprint for how information is organized in the database]—without me even asking.” The code it produced was clean and well-structured, and showed how well the model could adapt to a library it hadn’t seen before.

#### Three frontier models go head-to-head to redesign an app

To test Gemini 3 Pro, Kieran (the general manager of **[Cora](https://cora.computer)**) pitted it against Anthropic’s [Sonnet 4.5](https://every.to/vibe-check/vibe-check-claude-sonnet-4-5), OpenAI’s [GPT-5.1](https://every.to/context-window/checking-in-on-gpt-5-1), and Cursor’s [Composer 1 Alpha](https://every.to/vibe-check/vibe-check-cursor-2-0-and-composer-1-alpha), asking each to improve the design of an “ugly-looking” app—his words, not ours—that he’d vibe coded with Sonnet 3.5 a year ago.

The TL;DR is that Kieran sees Gemini 3 Pro as a reliable, workhorse model, good for routine tasks and tooling, where predictability matters. It’s consistent, careful, and clearly trained to avoid mistakes, but that caution makes it less creative than Anthropic’s models. “Google is more about models that just work,” he says. We’ve documented Kieran’s process below for more details on the specifics of the test he gave the models and how* *each one fared.

This is a screenshot of the vibe coded app in all its original, unpolished glory:

[![The unpolished vibe coded app that Kieran set Gemini 3 Pro and its competitors loose on. (Screenshot courtesy of Kieran Klaassen.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3834/optimized_1927f8a7-a8c4-42a1-94b3-c3cad0bd820c.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3834/optimized_1927f8a7-a8c4-42a1-94b3-c3cad0bd820c.png)
*The unpolished vibe coded app that Kieran set Gemini 3 Pro and its competitors loose on. (Screenshot courtesy of Kieran Klaassen.)*

Below is a screenshot of a prompt Kieran Monologue-d into Cursor asking the models to create a design system (a design system refers to the set of visual components and rules that define how the app should look and behave):

[![Kieran’s prompt in Cursor to test the four models in parallel. (Screenshot courtesy of Kieran.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3834/optimized_79853cb2-1309-478e-b850-95945096a585.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3834/optimized_79853cb2-1309-478e-b850-95945096a585.png)
*Kieran’s prompt in Cursor to test the four models in parallel. (Screenshot courtesy of Kieran.)*

##### Gemini 3 Pro

Gemini 3 Pro wobbled right out of the gate. Kieran asked it to start with a simple HTML example file—basically a tiny starter page, the bare minimum you’d build to show what an app looks like. Instead, the model skipped over that step and began implementing the design system.

This is a screenshot of what the overeager Gemini 3 Pro generated:

[![Gemini 3 Pro’s first, overeager response to Kieran’s prompt for a design system. (Screenshot courtesy of Kieran.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3834/optimized_4fe94476-c8f5-47ef-8879-eb625d6e0baf.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3834/optimized_4fe94476-c8f5-47ef-8879-eb625d6e0baf.png)
*Gemini 3 Pro’s first, overeager response to Kieran’s prompt for a design system. (Screenshot courtesy of Kieran.)*

Kieran wasn’t thrilled with Gemini 3 Pro’s first attempt. It didn’t follow his instructions to build a proper design system, and even in its overeager effort, it failed to recreate all the components on the page. “Also it’s the only [model] that didn’t do dark mode,” he says.

He prompted the model to recreate one of the components it had initially missed, which the model diligently handled. Even though he’d been originally looking for a design system, Kieran notes that Gemini 3 Pro was “very consistent” and “hit all elements” on the page.

Here’s Gemini 3 Pro’s second go at the redesign:

[![Gemini’s second shot at the prompt—better but still imperfect. (Screenshot courtesy of Kieran.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3834/optimized_c99e7f1e-2e9c-467d-bdbd-8ac0fa482763.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3834/optimized_c99e7f1e-2e9c-467d-bdbd-8ac0fa482763.png)
*Gemini’s second shot at the prompt—better but still imperfect. (Screenshot courtesy of Kieran.)*

[PAYWALL]
