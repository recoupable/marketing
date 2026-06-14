---
title: "AI as Fast as Your Train of Thought"
subtitle: "Plus: The only guide you need for compound engineering"
author: "Every Staff"
date: 2026-02-13
column: context-window
url: https://every.to/context-window/ai-as-fast-as-your-train-of-thought
paywalled: true
scraped_at: 2026-06-11T16:07:23.078Z
---

# AI as Fast as Your Train of Thought

*Plus: The only guide you need for compound engineering*

*Hello, and happy Sunday! This week, Every’s head of platform ****[Willie Williams](https://x.com/bigwilliestyle)**** kicks off a new section—Jagged Frontier—where he goes further out on the AI frontier than we usually venture, returning to a few big ideas from fresh angles each time. First, though, a mini-[Vibe Check](https://every.to/vibe-check) on OpenAI’s warp-speed Codex-Spark. New models are coming out so quickly that sometimes it’s hard even for us to keep pace. We’re off on Monday for Presidents’ Day in the U.S.—we’ll be back in your inbox on Tuesday.—[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief)*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

##

## Mini-Vibe Check: OpenAI’s Codex-Spark is so fast it’ll blow your hair back

[GPT-5.3-Codex-Spark](https://openai.com/index/introducing-gpt-5-3-codex-spark/) was slinging code so fast on our livestream on Thursday, **[Cora](https://cora.computer/)** general manager **[Kieran Klaassen](https://every.to/@kieran_1355)** and Every CEO **[Dan Shipper](https://every.to/@danshipper)** couldn’t get a word in edgewise.

OpenAI’s new model generates ~1,000 tokens per second. For context, Anthropic’s latest heavy-duty model [Opus 4.6](https://every.to/vibe-check/opus-4-6) runs at about 95.

The AI industry has spent the last year optimizing for intelligence—smarter models, deeper reasoning, longer thinking chains. Spark goes in the other direction. It’s not as sharp as Opus 4.6 or [GPT-5.3 Codex](https://every.to/vibe-check/gpt-5-3-codex) on reasoning, so it’s not as reliable on complex tasks. But then again, how smart does a model need to be if it gets you what you need before you lose your train of thought?

### What it is

Spark is a smaller, speed-optimized version of OpenAI’s GPT-5.3 Codex, built to run on hardware from Cerebras, a chipmaker that designed its processors specifically for AI inference. It’s OpenAI’s first model running on non-Nvidia hardware, which is partly why it’s so fast: Cerebras designed its hardware specifically for speed at AI inference, not for general purpose (as Nvidia does).

The tradeoff is that Spark is less capable than both GPT-5.3 Codex and Opus 4.6 on complex reasoning. Think of it as a fast junior developer who can knock out simple tasks instantly, rather than a senior engineer who takes longer but catches edge cases. It’s currently available only to Pro subscribers ($200 per month) in the[Codex app](https://every.to/vibe-check/vibe-check-openai-s-codex-app-gains-ground-on-claude-code) and command line interface, with API access limited to design partners.

### What’s working

Dan has been testing Spark on knowledge work queries where he needs an answer in 30 seconds and staying in flow is more important than getting every detail correct. On the stream, he pulled a YouTube performance report in about 30 seconds that would have taken Opus or 5.3 Codex closer to 90. Dan pointed out that 90 seconds is enough to make him leave the task, check Discord, and lose the thread. Thirty seconds keeps him in his chair.

Kieran found Spark best for brainstorming and rapid iteration. He ran it through his [compound engineering](https://every.to/source-code/compound-engineering-how-every-codes-with-agents-af3a1bae-cf9b-458e-8048-c6b4ba860e62) workflow—triaging GitHub issues, planning features, iterating on Cora’s user interface—and the speed made exploratory work feel frictionless. He ran about 10 design iterations in the time a heavier model would have finished two or three.

The stream’s most interesting finding came from another Kieran experiment. He gave Spark a routine code review task two ways: one where Spark did all the work itself, and one where it delegated pieces to helper agents—the way most developers speed up complex tasks. Spark alone finished in 1.5 minutes. With helpers, it took four minutes, because the helpers had to pass information back and forth.

Kieran thinks this points to a broader change in how developers will approach code. Until now, developers have been building increasingly complex systems where multiple AI agents divide up work and run in parallel—it’s faster than waiting for one model to handle everything. But if the model itself is fast enough, that complexity becomes unnecessary. One well-written prompt that gets an answer in a second can beat a five-agent system that takes four minutes to coordinate.

### What needs work

The code itself isn’t as good. GPT-5.3 Codex and Opus 4.6 both produce more comprehensive and reliable output on serious tasks. Spark is a tier below on reasoning, and for anything production-critical, you’d still reach for a model with heavier reasoning capabilities.

The speed also creates its own problem. Spark can spit out 10 pages of code and work summaries in about 30 seconds, which is overwhelming. Dan flagged this as a UI problem, not a model problem—coding interfaces aren’t built for reviewing output at this pace. Until tools develop affordances for that volume of work, the raw speed can create friction instead of eliminating it.

Dan framed both limitations as part of a larger pattern: Every three to six months, capabilities change so radically that your entire approach has to change. UI overwhelm didn’t used to be a problem. Progress can be energizing but also, as Dan admitted, “a little tiring.”

### Who should try it

It’s worth trying if you have:

1.
**Fast, lightweight tasks** that don’t need deep reasoning: brainstorming, triage, analytics queries, UI iteration

2.
**Workflows where staying in flow matters more than perfection**: changelogs, quick data pulls, exploratory prototyping

3.
**Curiosity about how speed changes your process**: if iteration is part of what you value about AI, this model could be for you,

[PAYWALL]
