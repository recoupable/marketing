---
title: "What I Saw at OpenAI’s Developer Day"
subtitle: "Bigger, smarter, faster, cheaper, easier"
author: "Dan Shipper"
date: 2023-11-06
column: chain-of-thought
url: https://every.to/chain-of-thought/what-i-saw-at-openai-s-developer-day
paywalled: true
scraped_at: 2026-06-11T16:08:10.522Z
---

# What I Saw at OpenAI’s Developer Day

*Bigger, smarter, faster, cheaper, easier*

#### Sponsored By: LiveFlow

This essay is brought to you by [LiveFlow](https://bit.ly/45CaNVY), North America’s #1 Financial Analysis Software.

Planning your 2024 Budget but don’t know where to start? [LiveFlow](https://bit.ly/45CaNVY) has already made the financial models and templates. Budget vs Actuals by Department, 13-week Cash Flow Forecasting, Consolidation… All you have to do is plug and play. Just connect your QuickBooks Online to their models and it’ll be fully set up in minutes. Say goodbye to manually entering financial data. Say hi to automatic updates of your custom models and fully streamlined financial management. Get 20% off for 3 months with promo code EVERY.

[LiveFlow](https://bit.ly/45CaNVY), the ideal choice for automation and efficiency. #1 Easiest to use software for Financial Planning & Analysis by G2.

[Learn More](https://bit.ly/45CaNVY)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#9deeedf2f3eef2efeef5f4edeeddf8ebf8efe4b3e9f2).

I like to watch what people do when they think no one's looking.

That's the incredible thing about going to events like OpenAI's Dev Day: you get to see the things that the cameras don't pick up, and hear the things that don't get said on stage.

It was all crowds, concrete, fast wifi, and LED lights. A magic show for AI nerds like me.

I waded through the crowd doing my patented FCO: Furtive Conference Ogle. I would see someone maybe-famous—[Roon](https://twitter.com/tszzl), say, or [Karpathy,](https://twitter.com/karpathy) or [Kevin Roose](https://twitter.com/kevinroose)—and quickly glance down at their badge and back up at their face before they could give me a look like, "Hey, my eyes are up here, buddy!"

I usually sit near the back at events, but at Dev Day I made sure to get a seat at the front. I wanted to see the magic up close.

Sam Altman walked on stage and greeted the crowd. I could see the taut, contained, nervous energy in his face and body as he performed. I could feel the hours of practice in his delivery. After a short opening monologue, Sam introduced a video of creative professionals, developers, and regular people talking about how they use ChatGPT. The lights dimmed, he stepped off to the side, and the video started. Everyone was watching the video, but I was watching Sam.

He was standing alone in the shadows on the corner of the stage. He was wearing dark jeans and Adidas x LEGO collab sneakers in primary colors. His hands were folded in front of him, and he stared intently at the floor. Sam is intense and always “on.” But on the side of the stage, listening to the video being played, he was unpracticed and unstudied. I felt like I had caught a magician’s left hand as he maneuvered a hidden coin, while the audience watched his right hand waving.

Seeing a magician's secret temporarily breaks their spell. But it also creates a new kind of magic: you see the magician as a human being. Eating, breathing, putting their pants on one leg at a time, and making magic all the same.

Sam is on his way to becoming a legendary figure in tech. But in that moment on the stage, he was also a human being. He looked like he was enjoying himself, observing and anticipating the thing he's made, and watching it play out on the biggest stage in the world. He was living the dream of anyone who’s ever built something and hoped the world would like it.

Watching him in that moment was worth the price of admission. I won’t soon forget it.

Here’s what he had to tell us:

Bigger, smarter, faster, cheaper, easier.

That’s the summary of the changes that OpenAI announced yesterday. Let’s go through the updates one by one and discuss why they’re important.

## A new model: GPT-4 Turbo

### Bigger

OpenAI launched a new model, GPT-4 Turbo, that sports a 128K token context window. That means that each prompt you send to GPT-4 Turbo can be up to the equivalent of 300 pages of text. Here are a few things that can fit into 300 pages:

- 100% of *The Lean Startup* by Eric Ries

- Three copies of *The Little Prince* by Antoine de Saint Exupery

- At least half of my collection of moody journal entries from middle school

This is a 16x increase from the context window length of the most widely available version of GPT-4 prior to today. It significantly enhances the complexity and power of the queries developers can run with GPT-4. Previously, developers had to spend time and energy deciding what pieces of information to put into their prompts, which I’ve previously argued is one of the [most important bottlenecks for LLM performance](https://every.to/chain-of-thought/a-few-things-i-believe-about-ai?sid=27581).

A 128K context window makes this task far easier, but it doesn’t solve every problem. Long context windows are hard to manage, and LLMs are more likely to forget or miss context the longer the inputted context gets. We don’t know if GPT-4 Turbo suffers from these problems yet, but I’ll let you know as I start to build things with it.

### Smarter

GPT-4 Turbo is smarter than previous generations of OpenAI models, in a few ways.

**It can use multiple tools at a time.** The previous version of GPT-4 introduced tool use, which [I covered](https://every.to/chain-of-thought/gpt-4-can-use-tools-now-that-s-a-big-deal). Tool use allows GPT-4 to call out to developer-defined tools—like web browsing, calculators, or APIs—in order to complete queries. Previously, GPT-4 could only use one tool at a time. Now it can use many.

**Updated knowledge cutoff.** Previous versions of GPT-4 only knew about events up to September of 2021. This version is current up to April 2023, making it far more reliable.

**GPT-4 speaks JSON.** JSON is text that’s easily readable by non-AI applications. GPT-4 Turbo can return results reliably in this format—making it far easier to integrate into other pieces of software. Previously, developers had to cajole GPT to format its output correctly by, for example, telling GPT they would be fired if it messed up. No more cajoling necessary.

**GPT-4 can write and run code.** For a while, ChatGPT Plus users have been able to use [Code Interpreter](https://every.to/napkin-math/openai-s-code-interpreter-is-about-to-remake-finance) (later renamed Advanced Data Analysis), a ChatGPT plugin that can write and run Python code for you. It’s like a data scientist in your pocket—and now it’s available for developers to use and integrate into their own programs via the GPT-4 API.

**Multimodal.** The GPT-4 API can accept images at input: developers can send it any image and GPT-4 can tell them what it sees. It can also do text-to-speech, meaning it can reply with human-like voices to text input. And it can do image creation with DALL-E.

### Faster

As far as I can tell there are no publicly available speed benchmarks, but Sam said it was faster. Based on my very scientific testing of playing with it in my PJs last night, he’s right. It’s really fast. It leaves GPT-4 in the dust and seems at least as fast as, if not slightly faster than, GPT 3.5 Turbo—the fastest previous model..

### Cheaper

GPT-4 Turbo is **3x** **cheaper** than GPT-4. I can’t remember a company that’s been able to so aggressively improve performance while also slashing the price.

[PAYWALL]
