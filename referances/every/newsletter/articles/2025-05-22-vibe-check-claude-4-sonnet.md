---
title: "Vibe Check: Claude 4 Opus"
subtitle: "Anthropic’s new model crushes pull requests, research deep dives, and honest editing—yet o3 keeps the daily-driver crown"
author: "Dan Shipper"
date: 2025-05-22
column: vibe-check
url: https://every.to/vibe-check/vibe-check-claude-4-sonnet
paywalled: true
scraped_at: 2026-06-11T16:07:43.172Z
---

# Vibe Check: Claude 4 Opus

*Anthropic’s new model crushes pull requests, research deep dives, and honest editing—yet o3 keeps the daily-driver crown*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

This week has been a doozy: I went to Microsoft Build and [interviewed the company's CTO](https://every.to/chain-of-thought/microsoft-s-ai-vision-an-open-internet-made-for-agents)**[Kevin Scott](https://every.to/chain-of-thought/microsoft-s-ai-vision-an-open-internet-made-for-agents)**, we [announced our fundraise](https://every.to/on-every/so-we-raised-some-money) in the *[New York Times](https://www.nytimes.com/2025/05/21/business/media/ai-every-media-startup.html?unlocked_article_code=1.I08.whc0.Du0m4QZJA4aB&smid=url-share)*, Google held its I/O event (more on that from **[Alex Duffy](https://every.to/@AlxAi)** tomorrow), OpenAI [acqui-hired](https://www.bloomberg.com/news/articles/2025-05-21/openai-to-buy-apple-veteran-jony-ive-s-ai-device-startup-in-6-5-billion-deal) Apple designer **Jony Ive, **and today I’m at Anthropic’s Code With Claude event. Let me state for the record: I am tired of all of this progress. My fingers feel like they are about to fall off, and my brain is functioning at a comparable intelligence to GPT-2.

But there’s a new Claude model launching today, for which I had to uphold my promise of writing [day-o, hands-on vibe checks](https://every.to/on-every/so-we-raised-some-money). So here it is for the long-awaited Claude 4 [Opus](https://every.to/c/ai-frontiers) (which Anthropic had code-named Linen), the follow-up model to [Claude 3.7 Sonnet](https://every.to/context-window/vibe-check-claude-3-7-sonnet-and-claude-code). (Besides, who needs fingers when voice-to-text AI is this good?)

I tried Opus on a variety of tasks, from coding to writing to researching. My verdict: Anthropic cooked with this one. In fact, it does some things that no model I’ve ever tried has been able to do, including OpenAI’s [o3](https://every.to/chain-of-thought/vibe-check-o3-is-out-and-it-s-great) and Google’s [Gemini 2.5 Pro](https://every.to/admin/posts/vibe-check-gemini-2-5-pro-and-gemini-2-5-flash/edit).

Let’s get into benchmarks. We’ll start, as always, with the [Reach Test](https://every.to/admin/posts/vibe-check-codex-openai-s-new-coding-agent/edit).

## The Reach Test: Do we reach for Opus over other models?

#### For day-to-day tasks: no

I’m still an o3 boi. I think this has a lot to do with ChatGPT’s memory—it’s an incredibly sticky feature. Opus would have to be a lot smarter and faster to make the trade-off worth it.

#### For coding: yes

It’s a beast in Claude Code, Anthropic’s [command line interface](https://chatgpt.com/share/e/682f3124-3afc-8011-8599-23bde1350be2) for programmers. If you assign it a task, it will code for long periods of time on its own with no intervention. It [one-shotted](https://chatgpt.com/share/682f2ead-28b0-8012-b57a-9600eaa0359b) a few complex pull requests better than OpenAI’s coding tool [Codex](https://every.to/admin/posts/vibe-check-codex-openai-s-new-coding-agent/edit). For example, I asked it to implement an infinite scroll feature in [Cora](https://cora.computer/), our AI email assistant—i.e., to keep scrolling to see your next unread email summary. It made a good infinite scroll experience. We couldn’t ship it as it was, but it was close.

Anthropic seems to have solved Claude 3.7 Sonnet’s famously overeager personality, too. No longer does the model try to build the Taj Mahal when you ask it to change a button color.

**[Kieran Klaassen](https://every.to/podcast/an-inside-look-at-building-an-email-client-in-three-months)**—Cora general manager, resident Rails expert, and opinionated agent-ophile—is also loving it, and he’s a tough sell. Advantage Claude.

#### For writing and editing: yes and no

o3 is still a significantly better writer. But Opus is a great editor because it can do something no other model can: It edits honestly—no rubber-stamping.

One of the biggest problems with current AI models is they tell you your writing is good when it is obviously bad (ask me how I know). Earlier versions of Claude, when asked to edit a piece of writing, would [return a B+](https://www.youtube.com/watch?v=AcgrFWKQdoQ) on the first response. If you edited the piece at all, you’d get upgraded to an A-. A third turn got you to an A.

As much as I wish my physics teacher graded me like this in high school, it’s not how I want my AI models to work. I want **[R. Lee Ermey](https://en.wikipedia.org/wiki/R._Lee_Ermey)** with a thesaurus and a red pen.

[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3587/optimized_Screenshot%202025-05-22%20at%2012.19.16%E2%80%AFPM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3587/optimized_Screenshot%202025-05-22%20at%2012.19.16%E2%80%AFPM.png)

*ChatGPT’s version of R. Lee Ermey in the 1987 movie *Full Metal Jacket*. Source: ChatGPT-4o image generation/Dan Shipper.*

To my delight, Opus is a good judge of writing. To test it, I worked with [Spiral](https://spiral.computer/) general manager **[Danny Aziz](https://every.to/source-code/i-left-my-job-to-run-an-ai-wrapper-at-every)**, our resident expert on teaching LLMs to write. We gave it a set of writing principles that attempt to outline what good writing is. For example, good writing elicits genuine emotional and intellectual investment from the reader, and avoids predictable patterns and cliches.

We fed it both interesting and boring writing (the latter was probably mine), and it nailed which pieces were boring and why:

[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3587/optimized_Screenshot%202025-05-22%20at%2012.20.07%E2%80%AFPM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3587/optimized_Screenshot%202025-05-22%20at%2012.20.07%E2%80%AFPM.png)

*Source: Opus/Dan Shipper.*

Not only does Opus not [glaze](https://www.merriam-webster.com/slang/glaze) you, it can keep multiple principles in mind at once even when they’re hidden in the middle of long prompts with lots of context. Other models often narrow in on one principle to the exclusion of the others (ask **Sam Bankman-Fried** if you want to know [how well that works out](https://chatgpt.com/share/682f3e04-eb58-8012-8157-d47e8f67eab8)).

Danny found that “other reasoning (3.7, o3, and o4-mini) models tend to lose sight of their writing principles when they’re dealing with lots of context, like a lot of source material or a long chat. Opus (with reasoning) does a great job of continually reminding itself what it needs to do so the principles don’t get lost.”

Opus can also notice subtle patterns across large blocks of text. which is useful if you, like me, are writing a book. I fed it 50,000 words of a book I’m writing and asked it to find themes and patterns that I hadn’t written about yet. Could it tell me what I’m trying to say better than I can? The answer is yes. It found a few ideas about my parents’ divorce and my relationship to work that run throughout the book. While I knew this already, in an unspoken way, Opus put its finger on it.

[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3587/optimized_Screenshot%202025-05-22%20at%2012.20.44%E2%80%AFPM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3587/optimized_Screenshot%202025-05-22%20at%2012.20.44%E2%80%AFPM.png)

*Source: Opus/Dan Shipper.*

#### For longer research tasks: yes

[PAYWALL]
