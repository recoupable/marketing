---
title: "OpenAI’s o1 Model, Explained"
subtitle: "Chain of thought opens a new paradigm in AI progress"
author: "Dan Shipper"
date: 2024-09-13
column: chain-of-thought
url: https://every.to/chain-of-thought/openai-s-o1-model-explained
paywalled: true
scraped_at: 2026-06-11T16:07:57.849Z
---

# OpenAI’s o1 Model, Explained

*Chain of thought opens a new paradigm in AI progress*

*Was this newsletter forwarded to you? *[Sign up](https://every.to/account)* to get it in your inbox.*

---

OpenAI launched a new model, o1 ([previously code-named Strawberry](https://every.to/chain-of-thought/openai-s-new-model-strawberry-explained)), yesterday. It’s significantly better at reasoning tasks, scoring in the 89th percentile in competitive programming, and exceeding Ph.D.-level smarts on physics, biology, and chemistry questions.

It’s been taught to use chain of thought reasoning to answer each question it’s given rather than just blurting out a response.

Chain of thought, of course, has been around for a long time. It’s the practice of asking a language model to [solve problems by thinking out loud](https://every.to/also-true-for-humans/7-22). You’re probably better at doing long division if you write out the steps one by one than you are at doing it in your head. Language models are the same way: Chain of thought creates a tunnel of reason that keeps the AI on track.

Chain of thought used to be just a prompting technique that would improve outputs in the original GPT models.

o1 is different because it’s been trained via reinforcement learning to *always* use chain of thought in its responses without any extra prompting required. Now, when you ask ChatGPT with o1 enabled a question, up pops an expandable thinking indicator that lets you see its thought process:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3223/optimized_how%20many%20r's%20in%20the%20word%20strawberry.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3223/optimized_how%20many%20r's%20in%20the%20word%20strawberry.png)
It also gets the classic strawberry problem correct. Hooray! I’ve been playing around with o1 a lot for the last day and will have much more to say over the next few weeks, but I wanted to give you a quick reaction today.

## A new paradigm in AI: Test-time compute

Well, I’m glad I named this column Chain of Thought because it turns out Chain of Thought is probably the next big paradigm in AI progress. (Better to be lucky and partial to [polysemy](https://en.wikipedia.org/wiki/Polysemy) than good, as the saying goes.)

As I mentioned in my[article on Strawberry](https://every.to/chain-of-thought/openai-s-new-model-strawberry-explained), the key ingredients for AI progress so far has been: more data and more compute during training.

The interesting update from Strawberry is that OpenAI has found a way to add a new dimension on which to improve performance: compute during inference. The company has found that when Strawberry takes longer to respond to a prompt—in other words, when it’s given more time to think—it generally responds more accurately.

This wasn’t *necessarily* the case with previous models. The longer GPT-4 was left to run in an autonomous loop, the more likely it was to go off the rails or get stuck in a meaningless rabbit hole. Because o1 has been trained to perform better on chain of thought reasoning, it seems to be able to better stay on track.

The success of o1 gives OpenAI a new way to approach performance improvements. Instead of doing a training run for GPT-7 that requires the entire energy output of the sun, it can do something with a shorter feedback loop: giving o1 more time to think before it responds to a prompt.

[PAYWALL]
