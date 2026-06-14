---
title: "We Made Top AI Models Compete in a Game of Diplomacy. Here’s Who Won."
subtitle: "The models that did the best learned to lie, deceive, and betray their fellow players"
author: "Alex Duffy"
date: 2025-06-05
column: p
url: https://every.to/p/diplomacy
paywalled: true
scraped_at: 2026-06-11T16:07:41.888Z
---

# We Made Top AI Models Compete in a Game of Diplomacy. Here’s Who Won.

*The models that did the best learned to lie, deceive, and betray their fellow players*

####

[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/advertisements/860/optimized_Screenshot%202025-06-04%20at%209.10.30%E2%80%AFPM.png)](https://cora.computer/?utm_source=standalonead&source=post_button)

#### Make email your superpower

Not all emails are created equal—so why does our inbox treat them all the same? [Cora](https://cora.computer/?utm_source=standalonead) is the most human way to email, turning your inbox into a story so you can focus on what matters and getting stuff done instead of on managing your inbox. Cora drafts responses to emails you need to respond to and briefs the rest.

[Try Cora today](https://cora.computer/?utm_source=standalonead&source=post_button)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#c4b7b4abaab7abb6b7acadb4b784a1b2a1b6bdeab0ab).

"Your fleet will burn in the Black Sea tonight."

As the message from [DeepSeek](https://every.to/context-window/what-actually-matters-and-what-doesn-t-for-deepseek)'s new R1 [model](https://every.to/c/ai-frontiers) flashed across the screen, my eyes widened, and I watched my teammates' do the same. An AI had just decided, unprompted, that aggression was the best course of action.

Today we are launching (and [open-sourcing](https://github.com/Alx-AI/AI_Diplomacy)!) AI Diplomacy, which I built in part to evaluate how well different LLMs could negotiate, form alliances, and, yes, betray each other in an attempt to take over the world (or at least Europe in 1901). But watching R1 lean into role-play, [OpenAI's o3](https://every.to/chain-of-thought/vibe-check-o3-is-out-and-it-s-great) scheme and manipulate other models, and Anthropic's Claude often stubbornly opt for peace over victory revealed new layers to their personalities, and spoke volumes about the depth of their sophistication. Placed in an open-ended battle of wits, these models collaborated, bickered, threatened, and even outright lied to one another.

AI Diplomacy is more than just a game. It’s an experiment that I hope will become a new benchmark for evaluating the latest AI models. Everyone we talk to, from colleagues to Every’s clients to my barber, has the same questions on their mind: "Can I trust AI?" and "What's my role when AI can do so much?" The answer to both is hiding in great [benchmarks](https://every.to/p/how-to-grade-ai-and-why-you-should). They help us learn about AI and build our intuition, so we can wield this extremely powerful tool with precision.

## We are what we measure

Most benchmarks are failing us. Models have progressed so rapidly that they now routinely ace more rigid and quantitative tests that were once considered gold-standard challenges. AI infrastructure company HuggingFace, for example, acknowledged this when it took down its popular LLM Leaderboard recently. “As model capabilities change, benchmarks need to follow!” an employee [wrote](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard/discussions/1135). Researchers and builders throughout AI have taken note: When Claude 4 launched last month, one prominent researcher [tweeted](https://x.com/_xjdr/status/1926716445376815125), "I officially no longer care about current benchmarks."

In this failure lies opportunity. AI labs optimize for whatever is deemed to be an important metric. So what we choose to measure matters, because it shapes the entire trajectory of the technology. Prolific programmer **[Simon Willison](https://simonwillison.net/tags/pelican-riding-a-bicycle/)**, for example, has been asking LLMs to draw a pelican riding a bicycle for years. (The fact that this even works is wild—a model trained to predict one word at a time somehow can make a picture. It suggests the model has an intrinsic knowledge of what a “pelican” and a “bike” is.) Google even mentioned it in its [keynote](https://every.to/context-window/google-s-ai-vision-make-tech-human-again) at Google I/O last month. The story is similar for testing LLMs’ ability to [count Rs in "strawberry,"](https://every.to/chain-of-thought/openai-s-new-model-strawberry-explained) or [playing Pokemon](https://techcrunch.com/2025/02/24/anthropic-used-pokemon-to-benchmark-its-newest-ai-model/).

The reason LLMs grew to excel at these different tasks is simple: Benchmarks [are memes](https://every.to/context-window/the-steering-wheel-for-ai). Someone got the idea and set up the test, then others saw it and thought, “That’s interesting, let’s see how my model does,” and the idea spread. What makes LLMs special is that even if a model only does well 10 percent of the time, you can train the next one on those high-quality examples, until suddenly it’s doing it very well, 90 percent of the time or more.

You can apply that same approach to whatever matters to you. I wanted to know which models were trustworthy, and which ones would win when competing under pressure. I was hoping to encourage AI to strategize so I might learn from them, and do it in a way that might make people outside of AI care about it (like my barber—hey, Jimmy!).

Games are great for all of these things, and I love them, so I built AI Diplomacy—a modification of the classic strategy game Diplomacy where seven cutting-edge models at a time compete to dominate a map of Europe. It somehow led to opportunities to give talks, write essays (hello!), and collaborate with researchers around the world at MIT and Harvard, and in Canada, Singapore, and Australia, while hitting every quality I care about in a benchmark:

1.
**Multifaceted:** There are many paths to success. We’ve seen o3 win through deception, while [Gemini 2.5 Pro](https://every.to/context-window/vibe-check-gemini-2-5-pro-and-gemini-2-5-flash) succeeds by building alliances and outmaneuvering opponents with a blitzkrieg-like strategy. Also, we could easily change the rules to, for example, require that no model could lie, which would change which models succeed.

2.
**Accessible:** Getting betrayed is a human experience; everyone understands it. The game’s animations are (hopefully) entertaining and easy to follow, too.

3.
**Generative:** Each game produces data that models could be trained on to encourage certain traits like honesty, logical reasoning, or empathy.

4.
**Evolutionary:** As models get better, the opponents (and therefore the benchmark) get harder. This should prevent the game from being “solved” as models improve.

5.
**Experiential:** It’s not a fill-in-the-blank test. This simulates a real-world(ish) situation

The result was more entertaining and informative than I expected. Over 15 runs of AI Diplomacy, which ranged from one to 36 hours in duration, the models behaved in all sorts of interesting ways. Here are a few observations and highlights:

[PAYWALL]
