---
title: "Vibe Check: Codex—OpenAI’s New Coding Agent"
subtitle: "Our hands-on day-0 review of the new autonomous software engineer"
author: "Dan Shipper"
date: 2025-05-16
column: vibe-check
url: https://every.to/vibe-check/vibe-check-codex-openai-s-new-coding-agent
paywalled: true
scraped_at: 2026-06-11T16:07:43.511Z
---

# Vibe Check: Codex—OpenAI’s New Coding Agent

*Our hands-on day-0 review of the new autonomous software engineer*

🎧 🖥 *Bonus: A special episode of *[AI & I](https://every.to/podcast)*with OpenAI product team member ****Alexander Embiricos ****is now live. Watch [on X](https://x.com/dhttps://x.com/danshipper/status/1923393410569736213anshipper/status/1922664820249432544) or [YouTube](https://youtu.be/HdhGsBgYYt8), or listen on [Spotify](https://open.spotify.com/episode/5QTRnZdflOEk1mKcvwxzXO?si=GDq8J1UvRlOCDdXt7wq6yw) or [Apple Podcasts](https://podcasts.apple.com/ca/podcast/openai-launches-codex-an-autonomous-programming-agent/id1719789201?i=1000708744229).*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

Last night I shipped a new feature for [Cora](https://cora.computer/), Every’s AI-enabled email assistant. Cora is not a [vibe-coded](https://every.to/working-overtime/it-s-me-hi-i-m-the-vibe-coder) product: Its codebase is a 5,500-plus commit cathedral of Rails craftsmanship mostly from **[Kieran Klaassen](https://every.to/podcast/an-inside-look-at-building-an-email-client-in-three-months)**, Cora’s general manager, our resident [DHH](https://dhh.dk/). Needless to say, exactly zero previous commits are mine.

Undaunted (or somewhat daunted, but holding my shit together), I pressed “merge” on a pull request for a little quality-of-life UI update, and what had previously been just a twinkle in my eye appeared on production in less than an hour. How?

I used [Codex](https://every.to/c/future-of-programming)—OpenAI’s new coding agent, launching publicly as a research preview today. Like [Devin](https://every.to/chain-of-thought/coding-with-devin-my-new-ai-programming-agent), Codex is designed as a software engineer that can build features and fix bugs autonomously. OpenAI has tried to incorporate the taste of a senior software engineer into how Codex writes code: It’s familiar with how large codebases work, and writes clean code and commit messages. It’s designed for you to run many sessions in parallel, so you can manage a team of agents without touching a single line of code.

In OpenAI’s storied tradition, Codex is confusingly named. The company has previously used the same name for both a model and a command-line tool. (Here’s an [o3 summary](https://chatgpt.com/share/6825f872-b9e8-8012-8eb8-7398f5170e62) of the full history of OpenAI’s use of this name.) It’s a little rough around the edges and balkanized into a product separate from ChatGPT (more on this later). Even so, it’s useful.

We’ve been testing it for the last few days at Every. What follows is our day-zero vibe check. I invited Kieran to help me write this review because Codex, unlike many other AI coding agents, is clearly built for senior engineers like himself, and I think his perspective is important.

I also had a chance to speak to the member of the OpenAI team responsible for Codex, **Alexander Embiricos**. You can check out our full conversation here:

[![](https://img.youtube.com/vi/qIhdpIP1d-I/maxresdefault.jpg)

![](https://d24ovhgu8s7341.cloudfront.net/static/emails/youtube-logo.png)](https://youtu.be/qIhdpIP1d-I)

Let's go through what it is, how it works, what to use it for, and what it means. But first: the Reach Test.

## The Reach Test: Do we use it every day?

The best leading indicator for long-term usefulness of an AI product is what I’m calling the Reach Test: Do I find myself automatically turning to this tool to do certain tasks? Or do I just leave it on the shelf and forget it’s there?

Here are the results of our Reach Test on Codex:

1.
**Kieran (agent-pilled tech lead archetype): **Yes, he’s thinking about how to use it all day and night.

2.
**Dan (technical tinkerer CEO, weekend vibe coder archetype): **No, but because I’m normally coding on net new ideas rather than existing products.

**Overall:** It’s a tool you’ll reach for if you’re a tech lead adding features or fixing bugs on an existing codebase. If you’re trying to vibe code a new [one-person billion-dollar SaaS company](https://every.to/napkin-math/the-one-person-billion-dollar-company), look elsewhere.

## A Codex tour

Codex presents you with a simple text box that asks you to describe the programming task you want it to perform, followed by two buttons: “Ask” and “Code”:

[PAYWALL]
