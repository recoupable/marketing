---
title: "I Rebuilt an App Thousands of People Use in 14 Days With AI"
subtitle: "Where I went wrong, and then right, with vibe coding our file organizer Sparkle"
author: "Yash Poojary"
date: 2025-04-24
column: source-code
url: https://every.to/source-code/i-rebuilt-sparkle-in-14-days-with-ai
paywalled: true
scraped_at: 2026-06-11T16:07:45.090Z
---

# I Rebuilt an App Thousands of People Use in 14 Days With AI

*Where I went wrong, and then right, with vibe coding our file organizer Sparkle*

*I’ve been a *[Sparkle](https://makeitsparkle.co/)* user for a little under a year (I helped build v1), and despite it having its warts, I’ve loved the end result. My Desktop and Downloads folders being automatically organized allows me to work more peacefully, and offloading my personal organization (think: taxes, family photos, financial information) in my Google Drive to Sparkle means that I find what I need with no hassle. Sparkle is a sneakily special product, and we have a huge vision for it. To get it where it needs to go, we needed to rebuild it from the ground up. Sparkle general manager *[Yash Poojary](https://x.com/poojary_yash)* explains how he did so in this piece.*

***To celebrate the launch of Sparkle v2, we’re giving 25 percent off the ***[Every bundle](https://every.to/subscribe?coupon=zY5mmT9c&utm_source=sparkle)*—your all-access pass to Sparkle, *[Spiral](https://spiral.computer/)*, *[Cora](https://cora.computer/)*, and our full library of newsletters and podcasts. Only want Sparkle? The *[lifetime plan](https://makeitsparkle.co/#pricing)* is 25 percent off, too (just download the app). The offer is valid for the next 48 hours.—*[Brandon Gell](https://every.to/@brandon_5263)

[Download Sparkle and get organized](https://makeitsparkle.co/?source=post_button)

---

It looks too easy.

Every week, someone spins up an AI-powered app, drops a slick demo, and wakes up to $100,000 in annual recurring revenue. It sounds like a dream. These stories are equal parts inspiring and suspect. But mostly, they signal that the way we build software is changing.

Fast.

So I tested it the only way that made sense: by rebuilding something thousands of people use every day—[Sparkle](https://makeitsparkle.co/?utm_source=everyarticle). It uses AI to reorganize any folder into a clean, structured system, all in the background so you never have to think about file management again.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3561/optimized_IMG_4861.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3561/optimized_IMG_4861.png)

*Before Sparkle (left) and after. Source: Sparkle.*

I’m building Sparkle to be the default way people manage files on their (read: your) Mac. It’s already organized over 10 million files. People like bestselling author **Tiago Forte** [praised](https://x.com/fortelabs/status/1824120345290527080) it as “the end of organizing.” But the existing version had technical limitations holding back the user experience.

Sparkle was built with Electron, an open-source framework that made it increasingly painful to maintain. Even implementing a simple paywall took weeks of frustrating workarounds. I thought that by rebuilding Sparkle in Swift, Apple’s preferred language for building native Mac apps, we could make everything feel smoother, faster, more stable. It would act like a real Mac app because it would be one.

It was also, admittedly, selfish. I use Sparkle every day, and it kept getting in my way. I couldn’t tell where my files were going. I couldn’t pause organizing. I couldn’t tweak how often it checked for new ones. I figured that if I was going to spend this much time using it, I might as well make it intuitive.

So I gave myself two weeks to rebuild it from scratch, not because it was realistic, but because artificial deadlines force real choices.

## Vibe coding, take one

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3561/optimized_IMG_4862.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3561/optimized_IMG_4862.png)

*My starting point was the existing version of Sparkle before the rebuild. Source: Sparkle.*

The one-shot build is a popular idea in AI: the fantasy that, with the right tools and a solid prompt, you can ship an entire product in a single pass. No rewrites or second-guessing—just generate, polish, ship.

I wanted to see if that was possible. I’d always been intrigued by the idea of vibe coding, using AI to build quickly with creativity and intention.

The part that really resonated with me came from OpenAI co-founder [Andrej Karpathy](https://x.com/karpathy/status/1886192184808149383?lang=en): You stop thinking like a traditional programmer. You give in to the flow, ignore the underlying code, and just tell your AI assistant what you want. You say things like, “Make the sidebar padding smaller,” without touching the actual layout file. You accept every suggested change without checking the diff. When something breaks, you don’t debug—you just paste the error message into the chat and hope the model fixes it.

I went into the project feeling confident. I had what I called the three Cs of vibe-coding**:** Claude for code generation, Cursor as my go-to code editor, and caffeine (read: Diet Coke) for the inevitable late nights.

With that tech stack, I figured I could knock out most of the app in a weekend, and I did. The first version of v2 came together in just two days. The core file logic was in place, the user interface was functional, and the onboarding flow was complete. Internally, the team responded positively when I gave them a demo.

But something felt off. The team was happy, and I should’ve been too. That night, after presenting the demo, I couldn’t sleep. I kept turning it over in my head.The structure felt shaky. The interface felt soulless. It didn’t reflect any real intention; it wasn’t *sparkling*.

So I got on a video call with **Brandon Gell**, the head of [Every Studio](https://every.to/on-every/introducing-every-studio), and expressed my concerns: I needed a bit more time to get this right. He looked at me for a second and said: “Go be an artist.”

That was all I needed to hear.* *I realized that while the first version worked, it didn’t fully align with my vision. The issue wasn’t just about writing more code. It was about giving the model the right context in the first place.

What follows is what I learned about vibe coding a real product: the pitfalls to avoid, strategies that actually work, and why good software still comes down to clarity and taste.

## Step 1: Set the stage

Before writing a single prompt, I put together a starter project: an early version of Sparkle with just enough in place to show the model how things worked. The folders were named, the files were mapped, and the structure made it clear what connected to what. While the first version didn’t land, it had given me exactly what I needed: a clear foundation to build something better.

There was base functionality for how Sparkle listens to file changes, organizes them into folders, saves settings, and talks to the backend (which we use to sync things like preferences and recent changes).

There’s a saying that you’re the average of the five people you spend the most time with. The same goes for code. *Your code is the average of the first five prompts you feed into your editor.* If those prompts are scattered or vague, the model will drift. But if you set a strong foundation early—clear structure, naming, logic—the model starts acting like a teammate instead of a guesser.

## Step 2: Use a model that gets it

This is where Gemini 2.5 Pro came in.

[PAYWALL]
