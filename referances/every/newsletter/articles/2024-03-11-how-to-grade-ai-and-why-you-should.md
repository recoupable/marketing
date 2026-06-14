---
title: "How to Grade AI (And Why You Should)"
subtitle: "Evals are often all you need"
author: "Mike Taylor"
date: 2024-03-11
column: p
url: https://every.to/p/how-to-grade-ai-and-why-you-should
paywalled: true
scraped_at: 2026-06-11T16:08:06.371Z
---

# How to Grade AI (And Why You Should)

*Evals are often all you need*

*AI isn’t like other software. Historically, when you used a computer, input X would always give you output Y. With AI, you give it input X and get back output I, T, D, E, P, E, N, D, S. The computer responds with a marginally different answer every time, so evaluating and comparing these tools is a devilishly hard task. But because we are devoting ever more of our intellectual effort to LLMs, this is a task we must figure out. Michael Taylor has spent an obscene amount of time trying to build AI evaluations, and in this article, he tells how you can do the same. As go the evals, so goes the world. —[Evan Armstrong](https://twitter.com/itsurboyevan)*

---

To paraphrase [Picasso](https://www.goodreads.com/quotes/485128-when-art-critics-get-together-they-talk-about-form-and), when AI experts get together, they talk about transformers and GPUs and AI safety. When prompt engineers get together, they talk about how to run cheap evals.Evals, short for “evaluation metrics,” are how we measure alignment between AI responses and business goals, as well as the accuracy, reliability, and quality of AI responses. In turn, these evals are matched against generally accepted benchmarks developed by research organizations or noted in scientific papers. Benchmarks often have obscure names, like MMLU, HumanEval, or DROP. Together, evals and benchmarks help discern a model’s quality and its progress from previous models. Below is an example for Anthropic’s new model, Claude 3.

[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3003/optimized_41XjF5THVCkrEz9E2mYaBR1vaE9PrN-tQESB-wqIl3eL3JmaX3FO4X7MBAXjpT5rtzhoJrR3yv5inLaLiZ0ZPee873_tvEVs0CxfQi4bwZ3o2vvG040aVPorEQS13tSFKSRiLPlHdesesKYDrmW3aHo.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3003/optimized_41XjF5THVCkrEz9E2mYaBR1vaE9PrN-tQESB-wqIl3eL3JmaX3FO4X7MBAXjpT5rtzhoJrR3yv5inLaLiZ0ZPee873_tvEVs0CxfQi4bwZ3o2vvG040aVPorEQS13tSFKSRiLPlHdesesKYDrmW3aHo.png?link=true)

*Source: [Anthropic](https://x.com/AnthropicAI/status/1764653830468428150?s=20)*.

Benchmarks are lists of questions and answers that test for general signs of intelligence, such as reasoning ability, grade school math, or coding ability. It’s a big deal when a model surpasses a state-of-the-art benchmark, which might enable its company to attract key talent and millions of dollars in venture capital investment. However, benchmarks are not enough. While they help researchers understand which models are good at tasks, the operators who are using these models don’t depend as much on them: There are rumors that answers to benchmark questions have “[leaked](https://x.com/vimota/status/1745623738287059216?s=20)” into the AI models’ training data, which makes them subject to being gamed, or [overfit to the data](https://twitter.com/karpathy/status/1764731169109872952) in undefined ways.

And even though head-to-head comparison rankings—where the results of two models for the same prompt are reviewed side-by-side—use real humans and can therefore be better, they’re not infallible. With Google Gemini able to search the web, it’s like we’re giving the AI model an [open-book exam](https://x.com/hammer_mt/status/1751762738131431531?s=20).

[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3003/optimized_fyV0UuRdO75SWxpMrPxmhm_DlQ_m-H3NJnqBXV6VFG_2tcCs0SgDXs-RNJjsJWtDML7-iBVmAXq9rtbagUgZoB3ririP8dOvz3WPO1YXeWr0ZGu-AHsfjN52msUAwhEN7mOQc6tLqiniD8_QNuFXAS0.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3003/optimized_fyV0UuRdO75SWxpMrPxmhm_DlQ_m-H3NJnqBXV6VFG_2tcCs0SgDXs-RNJjsJWtDML7-iBVmAXq9rtbagUgZoB3ririP8dOvz3WPO1YXeWr0ZGu-AHsfjN52msUAwhEN7mOQc6tLqiniD8_QNuFXAS0.png?link=true)

*[More examples of model evals](https://x.com/aparnadhinak/status/1752768581396222088?s=20)*.

As OpenAI cofounder and president [Greg Brockman](https://twitter.com/gdb/status/1733553161884127435) puts it, “evals are surprisingly often all you need.” Benchmarking can tell you which models are worth trying, but there’s no substitute for evals. If you’re a practitioner, it doesn’t matter whether the AI can pass the [bar exam](https://www.iit.edu/news/gpt-4-passes-bar-exam) or [qualify as a CFA](https://www.businessinsider.com/list-here-are-the-exams-chatgpt-has-passed-so-far-2023-1), as benchmarks tend to discern. Evaluations can’t capture [how it feels](https://every.to/napkin-math/claude-3-is-the-most-human-ai-yet) to talk to a model. What matters is if they work for you.

[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3003/optimized_XjvYxMNfDhw2fH7g-3Sm-PvH1o3sPsrlN1cJUyVeInsgo5i6ulaAgo7rfIoHUNEId13QMYmfCk7DZ8Vewllo0ivAfePvFcIKt1pCZ0D1Nl64dNUetND3mMBHcUhO1rCSilg32mykWvHxTygxxYOev2Q.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3003/optimized_XjvYxMNfDhw2fH7g-3Sm-PvH1o3sPsrlN1cJUyVeInsgo5i6ulaAgo7rfIoHUNEId13QMYmfCk7DZ8Vewllo0ivAfePvFcIKt1pCZ0D1Nl64dNUetND3mMBHcUhO1rCSilg32mykWvHxTygxxYOev2Q.png?link=true)

*Source: [X/Greg Brockman](https://twitter.com/gdb/status/1733553161884127435)*.

In my experience as a prompt engineer, 80–90 percent of my work involves building evals, testing new ones, and trying to beat previous benchmarks. Evals are so important that OpenAI [open-sourced](https://github.com/openai/evals) its eval framework to encourage third-party contributions to its question-and-answer test sets to make them more diverse.

In this piece, we’ll explore how to get started with evals. We’ll touch on what makes evals so hard to implement, then run through the strengths and weaknesses of the three main types of eval metrics—programmatic, synthetic, and human. I’ll also give examples of recent projects I’ve worked on, so you can get a sense of how this work is done.

[PAYWALL]
