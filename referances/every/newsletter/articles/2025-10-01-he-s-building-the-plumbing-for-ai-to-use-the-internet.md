---
title: "🎧 He’s Building the Plumbing for AI to Use the Internet"
subtitle: "Stainless founder Alex Rattray on MCP, a protocol giving LLMs the tools they need to do real work"
author: "Rhea Purohit"
date: 2025-10-01
column: podcast
url: https://every.to/podcast/he-s-building-the-plumbing-for-ai-to-use-the-internet
paywalled: false
scraped_at: 2026-06-11T16:07:33.591Z
---

# 🎧 He’s Building the Plumbing for AI to Use the Internet

*Stainless founder Alex Rattray on MCP, a protocol giving LLMs the tools they need to do real work*

*TL;DR: Today we’re releasing a new episode of our podcast *[AI & I](https://every.to/podcast)*. ****[Dan Shipper](https://every.to/@danshipper)**** sits down with ****Alex Rattray****, the founder of Stainless, a startup building a platform for high-quality APIs. ****Watch [on X](https://x.com/danshipper/status/1973402533453312130) or [YouTube](https://youtu.be/lctDoa5M880), or listen on [Spotify](https://open.spotify.com/episode/2w0tiBbfU1DOMVBgjEa9JN) or [Apple Podcasts](https://podcasts.apple.com/us/podcast/mcp-servers-teaching-ai-to-use-the-internet-like-humans/id1719789201?i=1000729535683). ****Here’s a link to the [episode transcript](https://every.to/podcast/transcript-c2d59620-cc92-4e17-a3bb-f7d8231f6af7).*
*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

When you send an email, pay with a credit card, or casually log into X, countless invisible handshakes are taking place behind the scenes. It’s the grand plumbing of the internet that nobody talks about: Programs talk to each other, data moves across services, and to most of us it seems like everything just *works*.
Those handshakes are powered by APIs, and **Alex Rattray** has built a company, [Stainless](https://www.stainless.com/), to make them better.
Up to now, that plumbing has only connected humans and computers, but with LLMs becoming active participants in this ecosystem, a new kind of pipe is becoming necessary: model context protocol, or MCP. If APIs are how programs talk to each other, “MCP servers” are how AI can plug into those same systems—they give a language model tools to get work done. (In the case of sending an email, the MCP server would let the LLM search your inbox, draft a reply, and send it on your behalf.) On this episode of *AI & I*, Rattray joins **Dan Shipper** to talk about why MCP servers don’t yet work as well as they should, what he’s learning about designing reliable ones, and how Stainless is experimenting with using them inside the company.
You can check out their full conversation here:
[![](https://img.youtube.com/vi/lctDoa5M880/maxresdefault.jpg)

![](https://d24ovhgu8s7341.cloudfront.net/static/emails/youtube-logo.png)](https://youtu.be/lctDoa5M880)
If you want a quick summary, here are some of the themes they touch on:

## The hidden wiring of the internet

Rattray sees APIs as critical to the internet’s connectivity in the same way that our brains’ neurons need branching structures called dendrites to send the signals that allow us to think. “APIs are at the heart and center of [modern software], just like dendrites are the center of the mesh of the brain and how we think,” he says.
Until now, humans interacted with computers through user interfaces (clicking through a website to buy a pair of new shoes), and computers interacted with each other through APIs (Stripe talking to your bank while processing a payment). LLMs created a need for a new kind of interface. That’s where MCP comes in. Just as a website presents buttons for humans to click on, MCP presents a set of tools for an LLM to use. An MCP server for Gmail, for instance, might include tools like “send mail,” “compose mail,” or “read inbox.” Instead of a person logging into Gmail to perform those actions, the MCP is a native interface for language models.

## Why teaching LLMs to use software is tricky

The first product Stainless built was a set of software development kits, or SDKs. APIs are the raw wiring that lets programs talk to each other; an SDK is the polished interface that makes that wiring easy to use. Take Stripe as an example: Technically, you can send data back and forth with Stripe by hand, formatting your own requests one by one and shipping them over HTTP, or Hypertext Transfer Protocol (the system that governs how information is sent and received across the net). But most developers would rather not spend their time wrangling raw requests. Instead, they install the Stripe SDK, which lets them write something as simple as “stripe.customers.create” in their code. With one line, a new customer appears in their database. Behind the scenes, the SDK translates that one line into a properly formatted API request, sends it to Stripe’s servers, and returns the result.
You can think of it as the difference between soldering wires yourself and plugging a cable into a finished port.
But so far, no one has cracked how to make MCP servers as easy for language models to use. “[I]t took a long time for humanity to get to the point where we could make a really good Python SDK for a Python developer wrapping an API… we haven’t figured out how to expose an API ergonomically to an LLM,” Rattray says. The reason for this, he explains, is that it’s easier to understand how a Python developer thinks than it is to get into the brain of an LLM.

## Design principles for smarter, usable MCP servers

To make MCP servers more usable, Rattray says Stainless has learned a few design rules. The first is to keep the number of “tools” small. In this context, a tool is just an action the AI can take—like “refund a customer” or “send an email.” If you give the model too many options, it gets confused. The tools also need clear names and descriptions so the AI knows when to use them.
Another rule: Don’t overload a tool with too many blanks to fill in. If you’re building a refund tool, for example, the model might only need a customer name and an order number—not a dozen other fields it won’t know what to do with. The same principle applies to outputs, or what comes back once the tool has run. The refund tool, for instance, might only need to return the refund amount and a confirmation number, not the entire transaction history. To keep responses tidy, Stainless often runs them through a JSON filter, which is essentially a way of stripping out the clutter so only the relevant details remain.

## How Stainless uses MCP—and AI—to run its business

At Stainless, Rattray has built MCP servers for tools like Notion and HubSpot, so he can ask a question such as: Which interesting customers signed up last week? From there, the system queries the database, cross-references the results in HubSpot, pulls notes from Notion, and delivers a tidy summary. It’s not flawless yet—Rattray admits there are still plenty of “paper cuts,” the kind of minor frustrations you expect from technology that’s so new. But it speeds up a process that would normally take a person several logins and searches to complete.
Beyond MCP, Rattray has also built what amounts to a shared company brain. He keeps [Claude Code](https://every.to/source-code/claude-code-camp) running and, whenever something useful comes in—new feedback from a customer, a SQL query he’s refined for board prep, a piece of analysis—he simply asks the AI to save it in Github. Over time, this creates a curated archive of knowledge that Rattray and his team can ask questions to directly.
What do you use AI for? Have you found any interesting or surprising use cases? We want to hear from you—and we might even interview you.
Here’s a link to the [episode transcript](https://every.to/podcast/transcript-c2d59620-cc92-4e17-a3bb-f7d8231f6af7).

##### Timestamps

1.
Introduction: 00:01:14

2.
Why Alex likes running barefoot: 00:02:54

3.
APIs and MCP, the connectors of the new internet: 00:05:09

4.
Why MCP servers are hard to get right: 00:10:53

5.
Design principles for reliable MCP servers: 00:20:07

6.
Scaling MCP servers for large APIs: 00:23:50

7.
Using MCP for business ops at Stainless: 00:25:14

8.
Building a company brain with Claude Code: 00:28:12

9.
Where MCP goes from here: 00:33:59

10.
Alex’s take on the security model for MCP: 00:41:10

You can check out the episode on X, Spotify, Apple Podcasts, or YouTube. Links are below:

1.
[Watch on X](https://x.com/danshipper/status/1973402533453312130)

2.
[Watch on YouTube](https://youtu.be/lctDoa5M880)

3.
[Listen on Spotify](https://open.spotify.com/episode/2w0tiBbfU1DOMVBgjEa9JN) (make sure to follow to help us rank!)

4.
[Listen on Apple Podcasts](https://podcasts.apple.com/us/podcast/mcp-servers-teaching-ai-to-use-the-internet-like-humans/id1719789201?i=1000729535683)

Miss an episode? Catch up on Dan’s recent conversations with founding executive editor of *Wired* **[Kevin Kelly](https://every.to/podcast/how-to-predict-the-future-like-kevin-kelly)**, star podcaster **[Dwarkesh Patel](https://every.to/chain-of-thought/dwarkesh-patel-s-quest-to-learn-everything)**, LinkedIn cofounder **[Reid Hoffman](https://every.to/chain-of-thought/reid-hoffman-on-how-ai-might-answer-our-biggest-questions)**, ChatPRD founder **[Claire Vo](https://every.to/podcast/she-built-an-ai-product-manager-bringing-in-six-figures-as-a-side-hustle-e46be9bc-f426-424d-992d-5a71fd7ac5e4)**, economist **[Tyler Cowen](https://every.to/chain-of-thought/economist-tyler-cowen-on-how-chatgpt-is-changing-your-job)**, writer and entrepreneur **[David Perell](https://every.to/chain-of-thought/how-david-perell-uses-chatgpt-to-write-for-millions)**, founder and newsletter operator **[Ben Tossell](https://every.to/chain-of-thought/how-to-run-a-profitable-one-person-internet-business-using-ai)**, and others, and learn how *they* use AI to think, create, and relate.
If you’re enjoying the podcast, here are a few things I recommend:

1.
[Subscribe](https://every.to/subscribe) to Every

2.
Follow [Dan](https://twitter.com/danshipper) on X

3.
Subscribe to Every’s [YouTube channel](https://www.youtube.com/@EveryInc)

---

***Rhea Purohit**** is a contributing writer for Every focused on research-driven storytelling in tech. You can follow her on X at [@RheaPurohit1](https://twitter.com/RheaPurohit1) and on [LinkedIn](https://www.linkedin.com/in/rhea-purohit-517441198/), and Every on X at [@every](https://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*
*We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with ****[Spiral](https://spiral.computer/?utm_source=everyfooter)****. Organize files automatically with ****[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)****. Deliver yourself from email with ****[Cora](https://cora.computer)****. Dictate effortlessly with ****[Monologue](https://monologue.to)****.*
*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*
*Get paid for sharing Every with your friends. Join our [referral program](https://every.getrewardful.com/signup).*
[Subscribe](https://every.to/subscribe?source=post_button)
