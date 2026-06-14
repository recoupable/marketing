---
title: "To Improve LLMs, Coach Them Like Athletes in an Arena"
subtitle: "Games will teach you more about model capabilities than benchmarks ever could"
author: "Alex Duffy"
date: 2025-08-15
column: p
url: https://every.to/p/to-improve-llms-coach-them-like-athletes-in-an-arena
paywalled: true
scraped_at: 2026-06-11T16:07:37.214Z
---

# To Improve LLMs, Coach Them Like Athletes in an Arena

*Games will teach you more about model capabilities than benchmarks ever could*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

This week I and several colleagues [published our findings](https://arxiv.org/pdf/2508.07485) about how, with a little elbow grease and creativity, anyone can dramatically increase [performance](https://every.to/c/ai-guides) of any LLM.

The secret is in coaching. Allow me to explain.

The reason an athlete can credibly claim to be “best in the world” is because arenas and structured competition—games—exist. There are rules, clocks, standings, and tape you can study. The AI world has benchmarks—but benchmarks only check facts. Games reveal a model’s behavior, which can be recorded and studied to help models get better. That is what we did with [AI Diplomacy](https://every.to/diplomacy), a project in which we turned the classic strategy game Diplomacy into a competitive arena for language models.

AI Diplomacy works because it has clear goals—try to outfox your opponents and take over Europe—and room to improvise. But subtlety and guile are key parts of the game, which centers on tactical negotiations (check out our complete [list of rules](https://every.to/diplomacy)). When we first set up the game environment, the LLMs were lost. After we got past a bunch of thorny technical problems, we realized that we could learn a ton about the models’ strengths and weaknesses from how they play against each other—and that we could coach them to be better. For example, prompting models to act more aggressively turned [GPT-5](https://every.to/vibe-check/gpt-5) from a patsy into a formidable contender. [Claude Sonnet 4](https://every.to/vibe-check/vibe-check-claude-sonnet-4-now-has-a-1-million-token-context-window), meanwhile, was a strong, speedy player even without specialized prompting.

These are useful differences. One model is highly steerable, the other is fast and consistent. That improvement tells you how the model will respond to a real-world task. If you have more time to craft a great prompt and need the best result, GPT-5 would be great. In a rush? Try Claude 4.

The industry is starting to realize that games can help evaluate models and push them to new levels of performance. Google has launched Google Arena, for instance, because the company [says](https://blog.google/technology/ai/kaggle-game-arena/) games are “[the] perfect testbed for evaluating models & agents.”

We agree. In fact, we think there’s so much potential here that we’re putting up $1,000 in prize money to see who can prompt their agent to victory in AI Diplomacy in our [Battle of the Bots](https://goodstartlabs.com/) in September.

In the meantime, let’s break down our findings so far.

## What AI Diplomacy taught us about models

Diplomacy is one of the hardest games language models can play today. Our coaching setup took a long time to optimize, but now even small models can finish full games. The key is to provide all the information needed, and nothing more—easier said than done. For us that was a text version of the board that conveys what matters to the LLMs: who controls which locations on the map, where each unit is allowed to move, nearby threats, and the current phase of the game. We set simple rules for how models negotiate and submit orders, but left room for creativity.

[PAYWALL]
