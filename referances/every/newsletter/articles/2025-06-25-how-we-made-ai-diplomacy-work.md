---
title: "How We Made AI Diplomacy Work"
subtitle: "Lessons learned taking our game-based AI benchmark from demo to 50,000 live viewers"
author: "Alex Duffy"
date: 2025-06-25
column: p
url: https://every.to/p/how-we-made-ai-diplomacy-work
paywalled: true
scraped_at: 2026-06-11T16:07:40.454Z
---

# How We Made AI Diplomacy Work

*Lessons learned taking our game-based AI benchmark from demo to 50,000 live viewers*

*When we launched [AI Diplomacy](https://every.to/diplomacy) earlier this month, we were excited to share what we felt was an innovative AI benchmark, built as a game that anyone could watch and enjoy. The response from readers and the AI research community has been fantastic, and today we’re revealing the details of how ****[Alex Duffy](https://every.to/@AlxAi)****’s labor of love came together.—Michael Reilly *

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

"Could you play the ﻿[game](https://every.to/c/ai-frontiers)﻿ given this context?" That question transformed our barely working [AI demo](https://x.com/alxai_/status/1886070580539281745) into something 50,000 people watched live on Twitch and millions would see around the world.

I built [AI Diplomacy](https://every.to/diplomacy) along with my friend and developer **Tyler Marques** because we strongly believe in the power of benchmarks to help us learn about AI and shape its development. By modifying the classic strategy game Diplomacy into a game that AIs could play against one another, we felt we could accomplish two goals at once: We’d be able to measure how models work in a complex environment, and do it in a way that can appeal to regular people (everyone loves games!).

After a few weeks of toil, though, we were struggling to make it work. The large language models (LLMs) couldn’t handle the vast amount of game data we were throwing at them. Then **Sam Paech**, an AI researcher and one of our collaborators, posed that fateful question about context, and our mistake snapped into focus: We were thinking too much like machines. Instead of force-feeding the LLM’s game data, we needed to *tell them a story*.

The story of our team’s first-hand experience building the game AI Diplomacy is also about the broader lessons we learned on how to effectively [communicate knowledge about the world](https://x.com/danshipper/status/1935636298993397919) to LLMs—something that is crucial to building complex agentic AI systems. The process was instructive on a number of levels:

1.
We learned (the hard way) why orchestrating knowledge is so critical.

2.
We learned how to turn a fragile demo into a robust, production-grade system (including music, visuals, and synthetically voiced narration).

3.
We’ll share several practical insights into building intuitive, approachable benchmarks.

The most important of the lessons was the first one: thinking carefully about how to tell models what they need to know, as Sam put it. This is orchestrating knowledge, or engineering context.

## Context engineering is communication

[Context engineering](https://blog.langchain.com/the-rise-of-context-engineering/) is less like operating a scientific instrument and more like mastering a musical one. At its core is the deeply human skill of communicating clearly. We can now use the same skill that enables us to tell great stories around a fire to talk to an LLM and turn our dream into reality.

That was my approach with building AI Diplomacy, but it came with a number of obstacles. Early on, a big one was figuring out how to represent the complex visual map of Diplomacy as text. Our first attempt was to faithfully convert tables of every territory of the map of 1901 Europe, every one of the players’ units, and every possible move into sprawling lists that grew longer each turn. The models choked. Games froze mid-move. None of the AIs could form a coherent strategy—they just took random actions, many of which violated basic game rules. It was clear we hadn’t communicated our intentions for them well at all.

Then Sam asked the question that changed everything for the project: "Could you play the game given this context?” The answer was obviously no. We'd been speaking to the AI in database queries when it needed the story behind the game, in the same way we understood it. So we rebuilt everything in plain text: clear summaries of who controlled what, which territories connected where, what moves mattered right now.

Then we asked ourselves, what other context do we as humans think about while playing? How we relate to other players—as allies, enemies, or neutral—was an obvious one to track trustworthiness. So we gave the models relationships they could update each turn, scoring their opponents from -2 (enemy) to 2 (ally). We also created private diaries for models to clearly define their goals and reflect on past moves, negotiations, and outcomes. From them, we had the system generate summaries calling out what happened at each turn. The AI players could read these to understand the latest moves and decide what to do next.

[PAYWALL]
