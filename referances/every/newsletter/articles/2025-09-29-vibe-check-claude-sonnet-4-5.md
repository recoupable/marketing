---
title: "Vibe Check: Claude Sonnet 4.5"
subtitle: "Faster than GPT-5 Codex, smarter and more steerable than Opus 4.1"
author: "Dan Shipper"
date: 2025-09-29
column: vibe-check
url: https://every.to/vibe-check/vibe-check-claude-sonnet-4-5
paywalled: false
scraped_at: 2026-06-11T16:07:33.690Z
---

# Vibe Check: Claude Sonnet 4.5

*Faster than GPT-5 Codex, smarter and more steerable than Opus 4.1*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

Anthropic just rolled out Claude ﻿Sonnet﻿ 4.5, and, of course, we spent the weekend using it to code and running long agentic tasks with it.
The headline: It’s noticeably faster, more steerable, and more reliable than [Opus 4.1](https://every.to/vibe-check/vibe-check-genie-3-claude-4-1-gpt-oss-and-gpt-5)—especially inside Claude Code. In head-to-head tests it blitzed through a large pull request review in minutes, handled multi-file reasoning without wandering, and stayed terse when we asked it to.
It won’t dethrone [GPT-5 Codex](https://every.to/vibe-check/gpt-5-codex-knows-when-to-think-hard-and-when-not-to) for the trickiest production bug hunts, but as a day-to-day builder’s tool, it feels like an exciting jump. Here’s our day zero vibe check.

## Speed

If you’re used to using Opus in Claude Code or the Claude app, you’ll be happy: The new Sonnet 4.5 is *really* fast. **[Kieran Klaassen](https://every.to/@kieran_1355)**, general manager of **[Cora](https://cora.computer)**, said, “It feels about 50 percent faster than previous versions of Claude.”
In a head-to-head code review challenge, it finished a comprehensive code review of a new feature in a large code base in about two minutes. GPT-5 Codex took about 10 to do the same task.
Speed is a dimension of intelligence, and Sonnet 4.5’s speed makes it much easier to pair with.

## Performance

It’s quite good at long-running agentic tasks in the Claude app and in Claude Code. I fed it the three spreadsheets we use to run Every, our profit-and-loss accounting, our weekly performance tracker, and our consulting tracker—and it easily wrote a Word doc with a third-quarter investor update that I could’ve sent with only minor tweaks.
Kieran found that it solved a bug in Cora in about 20 minutes that Opus 4.1 couldn’t crack at all. He also used it to [vibe code](https://every.to/working-overtime/it-s-me-hi-i-m-the-vibe-coder) an iOS app for Cora by feeding it the current codebase and a [book on iOS programming](https://pragprog.com/titles/jmnative/hotwire-native-for-rails-developers/):

[![The Cora iOS app that Kieran vibe coded with Claude Sonnet 4.5. (Source: Kieran Klaassen.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3770/optimized_a1727378-bd44-44d5-8769-f6ae68e37566.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3770/optimized_a1727378-bd44-44d5-8769-f6ae68e37566.png)
*The Cora iOS app that Kieran vibe coded with Claude Sonnet 4.5. (Source: Kieran Klaassen.)*

This jump in performance seems to be a combination of:

1.
**Better steerability: **It’s able to adhere better to the directions in your prompt in a way that feels like GPT-5 Codex. It is less overeager than previous versions of Claude. **[Alex Duffy](https://every.to/@AlxAi)**, who leads our AI training, told me that it feels more reliable as a result.

2.
**Ability to manage big contexts: **It is less likely to get lost in big code bases and knows what to pay attention to in long prompts.

3.
**More deterministic. **Alex noted that it’s more likely to come to the same result given the same prompt multiple times. This predictability makes it easier to use.

4.
**More focused and terse: **Kieran noted that it seems like Anthropic has learned from GPT-5. The new Sonnet 4.5 just tells you what you need to know, instead of going on tangents, which makes it easier to work with.

There’s** **one notable exception: GPT-5 Codex still beats Claude Sonnet 4.5 for difficult production coding tasks. When I asked it to review a large pull request, Sonnet finished faster—but Codex caught a hard-to-find edge case that Sonnet missed.

####

[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/advertisements/908/optimized_5294d2ab-797a-487f-9a27-32c7127ad542.png)](https://every.to/teams/new)

#### Make your team AI‑native

Scattered tools slow teams down. Every Teams gives your whole organization full access to Every and our AI apps—**Sparkle** to organize files, **Spiral** to write well, **Cora** to manage email, and **Monologue** for smart dictation—plus our daily newsletter, subscriber‑only livestreams, Discord, and course discounts. One subscription to keep your company at the AI frontier. Trusted by 200+ AI-native companies—including The Browser Company, Portola, and Stainless.

[Create your team](https://every.to/teams/new?source=post_button)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#92e1e2fdfce1fde0e1fafbe2e1d2f7e4f7e0ebbce6fd).

## The Reach Test: Do we use it every day?

The best leading indicator for long-term usefulness of an AI product is what we call the Reach Test: Do we find ourselves automatically turning to this tool to do certain tasks? Or do we leave it on the shelf and forget about it?

#### Dan: No

ChatGPT and Codex CLI are my current daily drivers for coding. I’d reach for this over Opus 4.1 when I want to use Claude, though.
For day-to-day use cases, it’s hard to beat GPT-5’s speed in ChatGPT. For programming use cases, I trust GPT-5 Codex more. Right now, I’m primarily programming in large codebases that I’m unfamiliar with—like building features for Cora—rather than vibe coding, and GPT-5 Codex makes me feel like I’m less likely to submit an embarrassing PR.

#### Kieran: Yes

For Kieran, it’s hard to beat the combination of Sonnet 4.5 in Claude Code’s harness. “Claude Code is like a smart person who’s programmed for 20 years,” as compared to Opus 4.1 which feels like “it has a Ph.D.,” or GPT-5 Codex, which feels like “a grumpy senior engineer.”
Claude Code is a more fully-featured command line interface than Codex CLI, and Sonnet 4.5 can push it to its fullest: It’s good at background tasks, like running servers and coordinating multiple parallel subagents, the latter of which is currently not available in Codex.

#### Alex: Yes

Alex would use Sonnet 4.5 in Claude Code over Opus 4.1. Claude Code is still his daily driver over Codex CLI.

## The final verdict

If you’re using Claude Code as your daily driver for programming, you just got a new best friend in Sonnet 4.5. It’s faster, more reliable, and more steerable than Opus 4.1. If you’re a newly minted GPT-5 Codex stan, Sonnet 4.5 isn’t going to make you switch back—but you should consider it for new projects, vibe coding, and tasks that require Claude’s unique combination of industriousness and speed.
At publish time, Sonnet 4.5’s pricing wasn’t available, but if we assume it stays the same as Sonnet 4—$3 per million input tokens—it’s an easy switch to anything currently running on Opus in the API. Opus 4.1 is five times more expensive, and Sonnet 4.5 is faster and smarter. GPT-5 is still significantly cheaper, however.

---

***Dan Shipper**** is the cofounder and CEO of Every, where he writes the [Chain of Thought](https://every.to/chain-of-thought) column and hosts the podcast* [AI & I](https://open.spotify.com/show/5qX1nRTaFsfWdmdj5JWO1G). *You can follow him on X at [@danshipper](https://twitter.com/danshipper) and on [LinkedIn](https://www.linkedin.com/in/danshipper/), and Every on X at [@every](https://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*
*We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with ****[Spiral](https://spiral.computer/?utm_source=everyfooter)****. Organize files automatically with ****[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)****. Deliver yourself from email with ****[Cora](https://cora.computer)****. Dictate effortlessly with ****[Monologue](https://monologue.to)****.*
*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*
*Get paid for sharing Every with your friends. Join our [referral program](https://every.getrewardful.com/signup).*
*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*
[Subscribe](https://every.to/subscribe?source=post_button)
