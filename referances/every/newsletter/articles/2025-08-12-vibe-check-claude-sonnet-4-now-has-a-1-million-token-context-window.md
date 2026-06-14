---
title: "Vibe Check: Claude Sonnet 4 Now Has a 1-million Token Context Window"
subtitle: "Fast, reliable long-context responses—for a price"
author: "Dan Shipper"
date: 2025-08-12
column: vibe-check
url: https://every.to/vibe-check/vibe-check-claude-sonnet-4-now-has-a-1-million-token-context-window
paywalled: true
scraped_at: 2026-06-11T16:07:37.408Z
---

# Vibe Check: Claude Sonnet 4 Now Has a 1-million Token Context Window

*Fast, reliable long-context responses—for a price*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

Today, Anthropic is releasing a version of Claude Sonnet 4 that has a 1-million [token](https://every.to/c/ai-frontiers) context window. That’s approximately the entire extant set of *Harry Potter* books *in each prompt*.

We got early access last week, so you know we had to put it to the test. We did three main tests on Claude Sonnet 4:

1.
**Long context text analysis: **We hid two movie scenes in 1 million tokens of context, and asked Claude to find those scenes and do a detailed analysis of them in one shot.

2.
**Long context code analysis: **We loaded the entire codebase for Every’s content management system (plus some padding to get to 1 million tokens) and asked Claude to do four detailed code analysis tasks in one shot.

3.
**AI Diplomacy: **We played Claude Sonnet 4 in [AI Diplomacy](https://every.to/diplomacy) to see how it would perform at world domination.

For the text analysis tasks, we compared it against the 1-million token context models from Google—[Gemini 2.5 Pro and Gemini 2.5 Flash](https://every.to/vibe-check/vibe-check-gemini-2-5-pro-and-gemini-2-5-flash). Claude Sonnet 4 performed well—it was generally faster and hallucinated less than Gemini models.

But its text analysis answers were less detailed, and its code analysis was less complete.

Here's your day zero hands-on vibe check.

## Analyzing movie scenes in a million tokens of context

We buried two modern movie scenes deep inside 900,000 words of Sherlock Holmes novels. Scene one: Two cousins dealing with grief at JFK Airport (from Jesse Eisenberg’s "A Real Pain," 2024). Scene two: Tom Hanks taking all the caviar at a Manhattan party (from Nora Ephron’s "You've Got Mail," 1998).

We hid one at line 26,581 and the other at line 42,245. That's 43% and 68% through 900,000 words of model-distracting mystery. All three found both scenes, and correctly analyzed them. Here’s how they stacked up.

#### Speed

Claude Sonnet 4 blazed through the task, returning an answer in about half the time of Gemini Flash and Pro:

**Claude Sonnet 4:** 41.8 seconds ✅

**Gemini 2.5 Flash: **69.2 seconds

**Gemini 2.5 Pro: **78.0 seconds

Advantage: Claude.

#### Accuracy

All three models returned accurate analysis of the scene. However, both Gemini Flash and Pro sometimes incorrectly identified the title of *A Real Pain* as another movie. Sonnet 4 never hallucinated—it just declined to assign a title.

[PAYWALL]
