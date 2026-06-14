---
title: "Why Aggregators Ate the Internet"
subtitle: "The hidden architectural choice that makes big platforms bigger—and how we could change the rules for AI"
author: "Alex Komoroske"
date: 2025-07-14
column: thesis
url: https://every.to/thesis/why-aggregators-ate-the-internet
paywalled: true
scraped_at: 2026-06-11T16:07:39.559Z
---

# Why Aggregators Ate the Internet

*The hidden architectural choice that makes big platforms bigger—and how we could change the rules for AI*

*In the [most recent episode](https://every.to/podcast/he-s-building-ai-for-the-person-you-want-to-become) of *AI & I*, former Stripe and Google executive ****Alex Koromoske**** referenced the “same-origin paradigm”—a security decision made by Netscape engineers in the 1990s that has inadvertently shaped our digital landscape. In today’s [Thesis](https://every.to/thesis), Alex explains how this choice created the conditions for big tech monopolies by forcing our data into silos, making it nearly impossible to move information between apps without friction. The good news: AI has reached an inflection point such that new technologies could finally break this cycle. Imagine a personal research assistant that understands your note-taking system, a financial tracker customized to your budgeting approach, or a task manager that adapts to your changing work style—read on to learn more.—[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief)*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

There's a bug in the operating system of the internet. It's why your photos are trapped in Apple’s ecosystem, you can’t easily move your data between apps, and every new app starts from scratch, knowing nothing about you. Most importantly, it's why the AI revolution—for all its promise—risks making big tech companies even bigger instead of putting powerful tools in your hands.

The bug is called the [same origin paradigm](https://en.wikipedia.org/wiki/Same-origin_policy). It's a historical accident—a quick fix the Netscape browser team implemented one night in the 1990s that somehow became the invisible physics of modern software. Once you understand how it works, you can't unsee it. You start to notice how every frustration with modern technology traces back to this one architectural choice.

I've spent more than a decade as a product manager and strategist at companies like Stripe and Google. I've seen waves of technology promise to change everything—mobile, social, cloud. But there's a pattern: Each wave makes the biggest companies bigger. Every "revolution" reinforces the existing structures instead of empowering us to create new ones. And it all goes back to the same origin paradigm.

Now it's AI's turn.

The good news? For the first time in decades, we might be able to fix it. The tools to transcend the same origin paradigm are already here.

But first, we need to understand what we're dealing with.

## The hidden physics of software

Here's how the same origin paradigm works: Every website, every app, is its own universe. The browser treats amazon.com and google.com as completely separate worlds that can never intersect. It’s the same with the Instagram app and the Uber app on your phone. The isolation is absolute—your data in one origin might as well be on Mars as far as other origins are concerned.

This creates what I call the iron triangle of modern software. It's a constraint that binds the hands of system designers—the architects of operating systems and browsers we all depend on. These designers face an impossible choice. They can build systems that support:

1.
Sensitive data (your emails, photos, documents)

2.
Network access (ability to communicate with servers)

3.
Untrusted code (software from developers you don't know)

But they can only enable two at once—never all three. If untrusted code can both access your sensitive data *and* communicate over the network, it could steal everything and send it anywhere.

So system designers picked safety through isolation. Each app becomes a fortress—secure but solitary. Want to use a cool new photo organization tool? The browser or operating system forces a stark choice: Either trust it completely with your data (sacrificing the "untrusted" part), or keep your data out of it entirely (sacrificing functionality).

Even when you grant an app or website permission only to look at your photos, you're not really saying, "You can use my photos for this specific purpose." You're saying, "I trust whoever controls this *origin*, now and forever, to do anything they want with my photos, including sending them anywhere." It's an all-or-nothing proposition.

## The aggregation ratchet

[PAYWALL]
