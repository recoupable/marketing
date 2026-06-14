---
title: "How to Grade AI (And Why You Should)"
subtitle: "Evals are often all you need"
author: "Mike Taylor"
date: 2024-06-24
column: also-true-for-humans
url: https://every.to/also-true-for-humans/how-to-grade-ai-and-why-you-should-d4557c4c-b427-4cfb-a097-d9aaaf099cff
paywalled: true
scraped_at: 2026-06-11T16:08:02.099Z
---

# How to Grade AI (And Why You Should)

*Evals are often all you need*

*At Every, we pride ourselves on being able to analyze and write at the speed of technology. We move quickly so that we can help our readers understand how the world around them is changing—possibly never more so than now, with AI transforming our world like no other technology of the past decade. But in order to do that, we need to take a deep breath every once in a while. So we’re taking another *[Think Week](https://every.to/everything/welcome-to-q2-2024)*: We’ll be publishing some of our greatest writing on AI and giving our team the space to dissect the ideas, questions, and themes that captivate us so we can create a better product for you. On Monday, we debuted ****Michael Taylor****’s new column, *[Also True for Humans](https://every.to/also-true-for-humans)*, which examines how we manage AI tools like we would human coworkers. This week we’re republishing some of Mike’s most trenchant Every pieces, starting with *[this one](https://every.to/p/how-to-grade-ai-and-why-you-should)* about why evaluating AI tools is so important. —*[Kate Lee](https://every.to/news/kate-lee-joins-every-as-editor-in-chief)* *

*﻿Was this newsletter forwarded to you? *[Sign up](https://every.to/account)* to get it in your inbox.*

---

To paraphrase [Picasso](https://www.goodreads.com/quotes/485128-when-art-critics-get-together-they-talk-about-form-and), when AI experts get together, they talk about transformers and GPUs and AI safety. When prompt engineers get together, they talk about how to run cheap evals.Evals, short for “evaluation metrics,” are how we measure alignment between AI responses and business goals, as well as the accuracy, reliability, and quality of AI responses. In turn, these evals are matched against generally accepted benchmarks developed by research organizations or noted in scientific papers. Benchmarks often have obscure names, like MMLU, HumanEval, or DROP. Together, evals and benchmarks help discern a model’s quality and its progress from previous models.

Below is an example for Anthropic’s new model, Claude 3.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3139/optimized_1.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3139/optimized_1.png)

*Source: *[Anthropic](https://x.com/AnthropicAI/status/1764653830468428150?s=20). Benchmarks are lists of questions and answers that test for general signs of intelligence, such as reasoning ability, grade school math, or coding ability. It’s a big deal when a model surpasses a state-of-the-art benchmark, which might enable its company to attract key talent and millions of dollars in venture capital investment. However, benchmarks are not enough. While they help researchers understand which models are good at tasks, the operators who are using these models don’t depend as much on them: There are rumors that answers to benchmark questions have “[leaked](https://x.com/vimota/status/1745623738287059216?s=20)” into the AI models’ training data, which makes them subject to being gamed, or [overfit to the data](https://twitter.com/karpathy/status/1764731169109872952) in undefined ways.

And even though head-to-head comparison rankings—where the results of two models for the same prompt are reviewed side-by-side—use real humans and can therefore be better, they’re not infallible. With Google Gemini able to search the web, it’s like we’re giving the AI model an [open-book exam](https://x.com/hammer_mt/status/1751762738131431531?s=20).

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3139/optimized_2.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3139/optimized_2.png)

[More examples of model evals](https://x.com/aparnadhinak/status/1752768581396222088?s=20).As OpenAI cofounder and president [Greg Brockman](https://twitter.com/gdb/status/1733553161884127435) puts it, “evals are surprisingly often all you need.” Benchmarking can tell you which models are worth trying, but there’s no substitute for evals. If you’re a practitioner, it doesn’t matter whether the AI can pass the [bar exam](https://www.iit.edu/news/gpt-4-passes-bar-exam) or [qualify as a CFA](https://www.businessinsider.com/list-here-are-the-exams-chatgpt-has-passed-so-far-2023-1), as benchmarks tend to discern. Evaluations can’t capture [how it feels](https://every.to/napkin-math/claude-3-is-the-most-human-ai-yet) to talk to a model. What matters is if they work for you.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3139/optimized_3.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3139/optimized_3.png)

*Source: *[X/Greg Brockman](https://twitter.com/gdb/status/1733553161884127435).In my experience as a prompt engineer, 80–90 percent of my work involves building evals, testing new ones, and trying to beat previous benchmarks. Evals are so important that OpenAI [open-sourced](https://github.com/openai/evals) its eval framework to encourage third-party contributions to its question-and-answer test sets to make them more diverse.

In this piece, we’ll explore how to get started with evals. We’ll touch on what makes evals so hard to implement, then run through the strengths and weaknesses of the three main types of eval metrics—programmatic, synthetic, and human. I’ll also give examples of recent projects I’ve worked on, so you can get a sense of how this work is done.

## What makes evals so hard to implement?

---

**Become a **[paid subscriber to Every](https://every.to/subscribe?__cf_chl_tk=2MQqbARKL_6UKXSgPZaXttbNQ2EhHLJ25DxMySffTtA-1715698503-0.0.1.1-1621)** to learn about:**

- The AI eval trifecta: Programmatic, synthetic, and human

- Why evals matter more than benchmarks for real-world AI applications

- The challenges of implementing effective AI evaluation metrics

- Lessons from the trenches: A prompt engineer's guide to practical evals

[PAYWALL]
