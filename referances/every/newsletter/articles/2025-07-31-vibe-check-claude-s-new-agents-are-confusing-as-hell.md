---
title: "Vibe Check: Claude's New Agents Are Confusing as Hell—And We Love Them"
subtitle: "We spawned AI agents like crazy. Then we tried to work with them."
author: "Katie Parrott"
date: 2025-07-31
column: vibe-check
url: https://every.to/vibe-check/vibe-check-claude-s-new-agents-are-confusing-as-hell
paywalled: true
scraped_at: 2026-06-11T16:07:38.114Z
---

# Vibe Check: Claude's New Agents Are Confusing as Hell—And We Love Them

*We spawned AI agents like crazy. Then we tried to work with them.*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

News in AI waits for no one and nothing—not even Every’s quarterly [Think Weeks](https://every.to/context-window/thinking-up-the-future).

We’d started last Thursday with an impromptu Demo Day, sharing our hackathon projects for Every subscribers, and finished it at a ping-pong rave in the cellar of a refurbished barn. Then came [the tweet](https://x.com/sidbidasaria/status/1948495478146167251) heard ’round the offsite:

[![Source: X/Sid Bidasaria.](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3717/optimized_ecb2cb1c-395a-4b30-b6c2-4b3f7ab677a7.png)](https://x.com/sidbidasaria/status/1948495478146167251)
*Source: X/Sid Bidasaria.*

As car after car made its way back to the house in upstate New York, almost every person walked through the door and beelined for their machines, ready to see if Anthropic had, to put it in the terms of the week, “made it slap.”

Which is how **Kieran Klaassen** (general manager of **[Cora](https://cora.computer/)**) and **Danny Aziz** (general manager of [Spiral](https://spiral.computer)) ended up at the dining room table around midnight, Kieran's [Limitless pendant](https://www.limitless.ai/) recording everything for posterity, telling the agents inside Claude Code what to do. Literally telling them, using Every's newest product, an AI voice tool called [Monologue](https://www.monologue.to/) (currently in public beta).

To be clear, I wasn't actually at the big kids' table for this conversation. While they were debugging the future of AI orchestration, I was across the room learning what a [branch](https://chatgpt.com/share/e/688b663a-de08-8011-80e9-4a0422033ebe) was and why they're a good thing to have. But thanks to Kieran's pendant and the magic of AI transcription, I can tell you exactly what happened when two senior engineers test-drove Claude's newest feature at what amounted to a very “Every” version of an afterparty.

## The meta-agent ouroboros

If you're like me and the word “agent” tends to evoke **Bond** more than bots, here's what you need to know: [Agents](https://every.to/napkin-math/what-are-ai-agents-and-who-profits-from-them) are AI assistants that can perform specific tasks independently—like specialized employees you can hire for a single job. Claude's new feature lets you create these digital workers on the fly, each with their own personality and expertise.

Agents are supposed to be the next evolution of AI coding, going beyond mere “coding assistants” to managing entire projects on their own. This is exactly the kind of technology that fits into what Kieran calls "compounding engineering"—building systems that build systems, where every iteration makes the next one stronger. He's been [running multiple Claude instances](https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five) in parallel for months, treating them like a coordinated dev team. Now Anthropic has built a version of that capability into Claude Code itself.

At one point during the late-night jam session, Danny decided to test whether they could create an agent that creates other agents. He fired up the "generate command" agent and asked it to create one more agent—a simple Apple user interface reviewer that would review his code changes.

[![Danny asks Claude to show a list of slash commands, but it turns out the generate-command agent doesn’t know any. (Source: Danny Aziz.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3717/optimized_16b31f06-a01f-4319-907a-db3e94b87a5b.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3717/optimized_16b31f06-a01f-4319-907a-db3e94b87a5b.png)
*Danny asks Claude to show a list of slash commands, but it turns out the generate-command agent doesn’t know any. (Source: Danny Aziz.)*

Instead of making one reviewer, the agent created an entire fleet of specialized agents—writing files with names like "fix-accessibility-touch-targets" and "implement-apple-system." It’s a classic case of AI doing too much and at the same time not enough. Kieran has [written about this](https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five) in the past: In its seeming eagerness to please, Claude often tries to solve problems you haven’t asked it to solve yet—and then solves them badly.

[PAYWALL]
