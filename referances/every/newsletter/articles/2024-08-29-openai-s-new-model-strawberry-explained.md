---
title: "OpenAI’s New Model, Strawberry, Explained"
subtitle: "ChatGPT’s next big evolution lies in its ability to solve the ‘strawberry’ problem"
author: "Dan Shipper"
date: 2024-08-29
column: chain-of-thought
url: https://every.to/chain-of-thought/openai-s-new-model-strawberry-explained
paywalled: true
scraped_at: 2026-06-11T16:07:58.557Z
---

# OpenAI’s New Model, Strawberry, Explained

*ChatGPT’s next big evolution lies in its ability to solve the ‘strawberry’ problem*

*Was this newsletter forwarded to you? *[Sign up](https://every.to/account)* to get it in your inbox.*

---

OpenAI has created a new model that could represent a major leap forward in its ability to reason. It’s called Strawberry. Here’s why:

If you ask [ChatGPT](https://every.to/c/ai-frontiers) how many “r”s are in the word “strawberry,” it famously fails miserably:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3209/optimized_ChatGPT%2040.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3209/optimized_ChatGPT%2040.png)
This occurs for two reasons. The first is that ChatGPT doesn’t actually see the word “strawberry.” Instead, it translates “strawberry” into an AI-readable language that represents words, not with letters, but with long strings of numbers. There’s no way for ChatGPT to count the number of letters in “strawberry.” It doesn’t see letters because of the way it’s built.

The AI researcher Andrej Karpathy likens what ChatGPT sees to [hieroglyphs](https://x.com/karpathy/status/1816637781659254908?lang=en), rather than letters. So asking it to count the number of “r”’s in strawberry is a little like asking it to count the number of “r”’s in 🍓. The question doesn’t really make sense, so it has to guess.

The second reason is that, even though ChatGPT can score a 700 on an SAT math test, it can’t actually count. It doesn’t reason logically. It simply makes good guesses about what comes next based on what its training data tells it is most statistically likely.

There are probably not many English sentences on the internet asking and answering how many “r”s are in the word strawberry—so its hunch is usually close, but not exactly right. This is true of all other math problems that ChatGPT is asked to solve, and it’s one reason why it often hallucinates on these types of inputs.

As initially reported by [The Information](https://www.theinformation.com/articles/openai-races-to-launch-strawberry-reasoning-ai-to-boost-chatbot-business), we don’t know a ton about Strawberry’s underlying architecture, but it appears to be a language model with significantly better reasoning abilities than current frontier models. This makes it better at solving problems that it hasn’t seen before, and less likely to hallucinate and make weird reasoning mistakes. Here’s what we know, and why it matters.

## What Strawberry is

Strawberry is a language model trained through [“process supervision.”](https://openai.com/index/improving-mathematical-reasoning-with-process-supervision/)

Process supervision means that during training, a model is rewarded for correctly moving through each reasoning step that will lead it to the answer. By comparison, most of today’s language models are trained via “outcome supervision.” They’re only rewarded if they get the answer right.

According to The Information, Strawberry “can solve math problems it hasn't seen before.” It can also “solve *New York Times* Connections, a complex word puzzle.” (I tried ChatGPT and Claude on Connections while writing this article. With the right prompting, I think I could get it to be a decent player, but it’s definitely not going to be expert-level.)

[PAYWALL]
