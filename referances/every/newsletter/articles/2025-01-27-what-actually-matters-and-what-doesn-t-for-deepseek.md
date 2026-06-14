---
title: "What Actually Matters (And What Doesn’t) For DeepSeek"
subtitle: "Allow us to explain why your 401k is down"
author: "Evan Armstrong, Alex Duffy, Edmar Ferreira"
date: 2025-01-27
column: context-window
url: https://every.to/context-window/what-actually-matters-and-what-doesn-t-for-deepseek
paywalled: true
scraped_at: 2026-06-11T16:07:50.434Z
---

# What Actually Matters (And What Doesn’t) For DeepSeek

*Allow us to explain why your 401k is down*

*Was this newsletter forwarded to you? *[Sign up](https://every.to/account)* to get it in your inbox.*

---

News of [DeepSeek’s](https://every.to/c/ai-frontiers) R1 model, released last week, has sent shockwaves through the tech world. Like many of you, we at Every have been captivated by the Chinese startup’s inexpensive, high-performing model, and the innovations that were necessary to achieve it.

As for the implications? There’s a lot to reckon with, and we’re still only just figuring out what this new model can do. Investors mostly felt R1’s arrival on the scene wasn’t positive news for AI’s U.S.-based incumbents, and shares of Nvidia and other chip makers were hit particularly hard. Builders, meanwhile—including some of us here at Every—are pretty excited.

Because there’s so much to unpack, we’ve pulled together three of our writers to each tackle one aspect of the news that struck them, and where they see things going. [Alex Duffy](https://every.to/chain-of-thought/we-tried-openai-s-new-agent-here-s-what-we-found) breaks down the innovations that led to R1 achieving a 90 percent cost reduction in performance compared with [OpenAI’s o1 model](https://every.to/chain-of-thought/openai-s-o1-model-explained). Entrepreneur in residence [Edmar Ferreira](https://every.to/@edmar) discusses the immediate implications for people looking to build AI-based applications. Finally, [Evan Armstrong](https://every.to/@ItsUrBoyEvan) talks about the markets’ (over-re)reactions.

Let’s dive in.*—Michael Reilly, managing editor*

## DeepSeek R1 is a shift from ‘sounding good’ to ‘thinking better’

Most large language models (LLMs) rely on [reinforcement learning (RL)](https://every.to/chain-of-thought/openai-s-o1-model-explained) to refine how “helpful and harmless” they sound. Notoriously, OpenAI has used [cheap labor in Kenya](https://time.com/6247678/openai-chatgpt-kenya-workers/) to label and filter toxic outputs, fine-tuning its models to produce more acceptable language.

DeepSeek R1 took a different path: Instead of focusing on *sounding* right, it zeroes in on *being* right—especially in math, coding, and logic. Rather than learning from subjective human preferences, R1 follows reasoning-oriented RL that rewards the model only if its code compiles and passes tests or if its math solutions are indisputably correct. Because “correctness” is easier to define for these tasks, R1 can scale its training without needing armies of human data labelers. Surprisingly, even for tasks that are more subjective—like creative writing—this emphasis on logical consistency tends to deliver better results, too.

R1’s leap in capability and efficiency wouldn’t be possible without its foundation model, DeepSeek-V3, which was [released in December 2024](https://arxiv.org/pdf/2412.19437). V3 itself is big—671 billion parameters (by comparison, [GPT4-o is rumored to be 1.8 trillion](https://every.to/chain-of-thought/gpt-4o-and-openai-s-race-to-win-consumers), or three times as big)—yet it’s surprisingly cost-effective to run. That’s because V3 uses a mixture of experts (MoE) approach, where the model is divided into specialized sections, each of which functions as an “expert” in a certain domain. When a query comes in, only the expert section “lights up”—around 5 percent of the model, or 37 billion parameters. This significantly reduces the compute power needed. MoE gained traction in 2024 thanks to teams at companies like [Mistral](https://arxiv.org/abs/2401.04088), [xAI](https://x.ai/blog/grok-os), and [Databricks](https://arxiv.org/abs/2403.04132), which showed it can be easily integrated, scales well, and brings major efficiency gains.

On top of that, V3 embraced multi-token prediction (MTP). Rather than predicting text [one word at a time](https://every.to/chain-of-thought/how-language-models-work) and inspired by Meta’s FAIR (Fundamental AI Research) team’s ideas toward building ["Better & Faster Large Language Models via Multi-token Prediction,"](https://openreview.net/forum?id=pEWAcejiU2) it predicts multiple words simultaneously. Finally, a trick called FP8 training helps V3 run even faster and cheaper by using “rounded” (lower-precision) numbers. This approach slashes compute costs, memory usage, and reliance on huge GPU clusters—an especially big deal in an era of [hardware export controls](https://en.wikipedia.org/wiki/United_States_New_Export_Controls_on_Advanced_Computing_and_Semiconductors_to_China?utm_source=chatgpt.com).

Crucially, thanks to R1's new distillation approach to maintaining performance with models of smaller sizes, these advanced reasoning skills don’t require a Google-sized infrastructure. DeepSeek’s distillation techniques let R1’s capabilities trickle down into smaller, more budget-friendly versions of the model. You can even run a distilled variant locally on your MacBook Pro with just [one line of code](https://simonwillison.net/2025/Jan/20/deepseek-r1/). In conjunction with its open-source license, this efficiency has led many cloud providers, like [Groq](https://x.com/GroqInc/status/1884042845117677721), to provide access to their own hosted version of the R1 model. Having options gives consumers more choices taking factors like speed, reliability, price, and privacy into account.

Perhaps R1’s biggest breakthrough is the confirmation that you no longer need enormous data centers or thousands of labelers to push the limits of LLMs. **If you can define what “correctness” means in your domain**—whether it’s coding, finance, medical diagnostics, or creative writing—**you can apply reasoning-oriented RL to train or fine-tune your own model**. You pick the benchmarks; you control the objective “good.” Meanwhile, V3’s underlying architecture and cost-saving optimizations ensure you won’t break the bank. By decoupling “performance” from raw scale and shifting it toward well-defined standards of correctness, and being willing to share its innovations, DeepSeek R1 hands more power to researchers, entrepreneurs, and even hobbyists—anyone willing to experiment on how we train and evaluate AI.—*Alex Duffy*

[Subscribe](https://every.to/subscribe)

## Welcome to the post-training era for startups

Training LLMs can be divided into two major phases: pre-training and post-training. The pre-training phase is an extremely expensive process that involves training a general model from a large corpus of data. Even in the case of DeepSeek, a single run of training [costs $6 million](https://arxiv.org/html/2412.19437v1), while it’s estimated that Meta’s Llama 3 model [costs $120 million to train](https://apxml.com/posts/training-cost-deepseek-v3-vs-llama-3). DeepSeek’s decreased costs are a huge breakthrough, but they’re still too expensive for most organizations.

[PAYWALL]
