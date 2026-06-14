---
title: "Vibe Check: Anthropic Cooked on Claude Haiku 4.5"
subtitle: "This one’s for the developers"
author: "Dan Shipper, Kieran Klaassen, Alex Duffy"
date: 2025-10-15
column: vibe-check
url: https://every.to/vibe-check/vibe-check-claude-haiku-4-5-anthropic-cooked
paywalled: true
scraped_at: 2026-06-11T16:07:32.689Z
---

# Vibe Check: Anthropic Cooked on Claude Haiku 4.5

*This one’s for the developers*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

Anthropic just dropped [Haiku 4.5](https://x.com/claudeai/status/1978505436358697052)—Anthropic’s newest “small” (aka least powerful, and cheapest—Claude model, and it’s great. We got our hands on it early and put it through its paces.

This is the story of the new Haiku, which just jumped version numbers from 3.5 to 4.5: It’s almost as powerful as the new [Sonnet 4.5](https://every.to/vibe-check/vibe-check-claude-sonnet-4-5), faster, and much cheaper. And when I say almost as powerful, I mean it—I had a hard time telling the difference when testing it on complex queries like “given this P&L, analyze our Q3 performance.”

Here’s your day zero vibe check:

## Everything you love about Sonnet 4.5 priced like Haiku

It’s priced at $1 per $5 per million input and output tokens. For comparison, [GPT-5-mini](https://every.to/vibe-check/gpt-5) is about $0.25 per $2.50 per million input and output tokens—and [Gemini 2.5 Flash](http://every.to/vibe-check/vibe-check-gemini-2-5-pro-and-gemini-2-5-flash) is around the same. So Haiku 4.5 *still *costs about four times more than GPT-5 mini or Flash.

But it’s about three times cheaper than Sonnet 4.5, and it performs surprisingly close to as well. That makes it a gift for developers.

## Your agentic apps just got an upgrade

If you’re a developer building an agent, Claude models are the premium option. They’re the best at tool calling and running for long periods of time without going off the rails. But Sonnet 4.5 is *really* expensive.

When it first came out, we used Sonnet 4 in **[Cora](https://cora.computer/)**’s email assistant, and it rocked. Then we got our Anthropic bill that month, and COO **[Brandon Gell](https://every.to/@brandon_5263)** told us that Every would go out of business if we didn’t figure out how to make it work with GPT-5-mini.

But as of today, we’ve switched back to Haiku because it works incredibly well inside of Cora, and it’s not priced like beluga caviar.

[![Dan Shipper's Cora Assistant running on Haiku 4.5. (Source: Dan Shipper/Every.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3788/optimized_490e6f5d-7e9b-4058-8357-ea860cf0ddd0.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3788/optimized_490e6f5d-7e9b-4058-8357-ea860cf0ddd0.png)
*Dan Shipper's Cora Assistant running on Haiku 4.5. (Source: Dan Shipper/Every.)*

[PAYWALL]
