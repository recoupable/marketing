---
title: "Vibe Check: Grok 4 Aced Its Exams. The Real World Is a Different Story."
subtitle: "The smartest model isn’t always the most useful one"
author: "Rhea Purohit"
date: 2025-07-18
column: vibe-check
url: https://every.to/vibe-check/vibe-check-grok-4-aced-its-exams-the-real-world-is-a-different-story
paywalled: true
scraped_at: 2026-06-11T16:07:39.263Z
---

# Vibe Check: Grok 4 Aced Its Exams. The Real World Is a Different Story.

*The smartest model isn’t always the most useful one*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

Grok 4 is topping some [big](https://x.com/lmarena_ai/status/1945146348203905063) [AI](https://arcprize.org/leaderboard) [benchmarks](https://mashable.com/article/grok-4-ai-benchmark-tests-leaderboard-rankings). So why [have](https://thezvi.substack.com/p/grok-4-various-things) [the](https://www.interconnects.ai/p/grok-4-an-o3-look-alike-in-search) [responses](https://www.reddit.com/r/singularity/comments/1lyzqzg/grok_4_disappointment_is_evidence_that_benchmarks/) to it been so mixed? And how come Every’s engineers aren’t using it much?

xAI’s latest launch, Grok 4, is positioned as an LLM with advanced reasoning capabilities. The model debuted last week in a [livestream](https://x.com/xai/status/1943158495588815072) featuring **Elon Musk** and other members of the [xAI](https://every.to/c/ai-frontiers) team seated on black sofas and pointing at graphs that seemed to indicate Grok 4’s superior performance on prominent benchmarks like [Humanity’s Last Exam](https://agi.safe.ai/) and [ARC-AGI](https://arcprize.org/arc-agi).

But the TL;DR from our [Studio team](https://every.to/p/introducing-every-studio) is this: Grok 4 is smart, but seems overtrained on benchmarks—while not being useful enough to be a go-to for everyday tasks. It should be good at coding, but without its own built-in command-line interface (CLI), the barrier to trying it is high. (A CLI is a text-based interface where developers type instructions directly to the model, without needing to switch between apps or windows.)

“There are new competitive dynamics here—[Claude Code](https://every.to/context-window/vibe-check-claude-3-7-sonnet-and-claude-code) [which has its own CLI] is sticky,” Every CEO and cofounder **Dan Shipper** says.

Here’s what’s new, what the team thinks, and what everyone else thinks.

### The nuts and bolts of Grok 4

Grok 4 is a reasoning model where you can’t see the reasoning tokens or turn the reasoning mode off. In other words, it always thinks deeply before answering, but won’t show you how it got there or let you stop it from thinking so deeply.

xAI trained the model through reinforcement learning tailored to increase its reasoning capabilities—and as a result, Grok 4 is touted to excel in technical domains like math and physics. It accepts both images and text prompts and has a context window of 256,000 tokens, double that of its predecessor, Grok 3, and more than both [OpenAI’s o3](https://every.to/vibe-check/vibe-check-o3-is-out-and-it-s-great) and [Claude Opus 4](https://every.to/vibe-check/vibe-check-claude-4-sonnet), which are currently capped at 200,000 tokens.

The launch also included Grok 4 Heavy, described as Grok 4’s more powerful version. While explaining how it worked, Musk [said](https://x.com/xai/status/1943158495588815072) it “spawns multiple [Grok 4] agents in parallel,” and then they compare their work “like a study group” to find the best answer.

The models are available to consumers through two subscription plans: the “SuperGrok” plan at $30 per month, or the “SuperGrok Heavy” plan at $300 per month, which includes access to Grok 4 Heavy. For developers, Grok 4 matches the cost of Anthropic's Claude Sonnet 4: $3 per million input tokens and $15 per million output tokens.

### When a model gets the answer right but misses the point

Grok 4 should, in theory, excel at coding tasks thanks to its reasoning-first training. But early signals suggest that it’s been overfitted to do well on benchmarks—or to correctly answer what writer **[Zvi Mowshowitz](https://x.com/thezvi?lang=en)** [calls](https://thezvi.substack.com/p/grok-4-various-things?img=https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe491ae46-f5a4-4d0d-ad29-c8222e1fe648_900x900.png&open=false) “exam-shaped questions.” [Physicist](https://x.com/CJHandmer)**[Casey Handmer](https://x.com/CJHandmer)** asked Grok four questions where the process of answering mattered more than the result, and found that the model did not perform very well. “Grok 4 is routinely nailing Physics Olympiad style problems,” Handmer [tweeted](https://x.com/CJHandmer/status/1943588166331732460), “and yet it seems to still be missing the core of insight which is so critical to physics.”

This leaves Grok 4 seeming more useful than it actually is in the real world. Its lack of tooling adds to the friction: Grok 4 doesn’t come with a built-in CLI, so using it takes more setup—unless you go through a third-party tool like the AI code editor [Cursor](https://cursor.com/). (Most of the Every team has moved away from Cursor, since Claude Code is now more tightly integrated into the [day-to-day workflows](https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five).)

And then there are the safety issues associated with xAI’s models. Writer **[Simon Willison](https://x.com/simonw?lang=en)** [found](https://simonwillison.net/2025/Jul/11/grok-musk/) that Grok 4 appeared to reference Elon Musk’s views when responding to controversial questions. An Anthropic researcher openly [criticized](https://x.com/saprmarks/status/1944455357629333938?s=61&utm_source=substack&utm_medium=email) xAI for not releasing any documentation of its safety testing, a standard practice in the industry. Grok 3 also [showered praise on Adolf Hitler](https://www.theguardian.com/technology/2025/jul/09/grok-ai-praised-hitler-antisemitism-x-ntwnfb) earlier this month, and though xAI issued a [statement](https://x.com/grok/status/1943916977481036128) of apology, this kind of behavior from a frontier model does little to build trust.

### What everyone at Every is thinking…

Here’s how Grok 4 performs on some of the benchmarks the Every team uses internally to evaluate new models:

##### Diplomacy: Top-level performance

[PAYWALL]
