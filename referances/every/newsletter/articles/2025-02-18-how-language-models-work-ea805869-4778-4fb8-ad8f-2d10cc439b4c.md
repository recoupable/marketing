---
title: "How Language Models Work"
subtitle: "A 100-percent jargon-free guide"
author: "Dan Shipper"
date: 2025-02-18
column: chain-of-thought
url: https://every.to/chain-of-thought/how-language-models-work-ea805869-4778-4fb8-ad8f-2d10cc439b4c
paywalled: true
scraped_at: 2026-06-11T16:07:49.055Z
---

# How Language Models Work

*A 100-percent jargon-free guide*

*The world has changed considerably since our last *["think week"](https://every.to/context-window/thinking-up-the-future)* five months ago—and so has Every. We’ve added new *[business](https://every.to/on-every/introducing-every-studio)* *[units](https://every.to/on-every/introducing-every-consulting)*, *[launched](https://every.to/p/introducing-cora-manage-your-inbox-with-ai)* *[new](https://every.to/on-every/introducing-spiral-v2)* *[products](https://every.to/on-every/introducing-extendable-articles)*, and brought on new teammates. So we’re taking this week to come up with new ideas and products that can help us improve how we do our work and, more importantly, your experience as a member of our community. In the meantime, we’re re-upping four pieces by ****Dan Shipper**** that cover basic, powerful questions about AI. (Dan hasn’t been publishing at his regular cadence because he’s working on a longer piece. Look out for that in Q2.) First up is his *[piece](https://every.to/chain-of-thought/how-language-models-work)* from last May that explains how language models work.*—[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief)

*Was this newsletter forwarded to you? *[Sign up](https://every.to/account)* to get it in your inbox.*

---

If we want to wield language models in our work and still call the results creative, we’ll have to understand how they work—at least at a high level. There are plenty of excellent guides about the internal mechanisms of language models, but they’re all quite technical. (One notable exception is [Nir Zicherman’s piece](https://every.to/p/how-ai-works) in Every about LLMs as food.) That’s a shame because there are only a handful of simple ideas you need to understand in order to get a basic understanding of what’s going on under the hood.

I decided to write those ideas out for you—and for me—in as jargon-free a way as possible. The explanation below is deliberately simplified, but it should give you a good intuition for how things work. (If you want to go beyond the simplifications, I suggest putting this article into ChatGPT or Claude.)

Ready? Let’s go.

## Let’s pretend you’re a language model

Imagine you’re a very simple language model. We’re going to give you a single word and make you good at predicting the next word.

I’m your trainer. My job is to put you through your paces. If you get the problems right, I’ll stick my hands into your brain and futz around with your neural wiring to make it more likely that you do that again in the future. If you get it wrong, I’ll futz again, but this time I’ll try to make it more likely you *don’t* do that again.

Here’s a few examples of how I want you to work:

If I say “**Donald**,” you say: “**Trump**.”

If I say “**Kamala**,” you say: “**Harris**.”

Now it’s your turn. If I say “**Joe**,” what do you say?

Seriously, try to guess before going on to the next paragraph.

If you guessed “**Biden**,” congrats—you’re right! Here’s a little treat. (If you guessed wrong, I would’ve slapped you on the wrist.)

This is actually how we train language models. There’s a model (you) and there’s a training program (me). The training program tests the model and adjusts it based on how well it does.

We’ve tested you on simple problems, so let’s move on to something harder.

## Predicting the next word isn’t always so simple

If I say “Jack,” what do you say?

Try to guess again before going on to the next paragraph.

Obviously, you say: “of” as in, “Jack of all trades, master of none! That’s what my mom was afraid would happen to me if I didn’t focus on my school work.”

What? That’s not what immediately flashed through your mind? Oh, you were thinking “Nicholson”? Or maybe you thought “Black.” Or maybe “Harlow.”

That’s understandable. Context can change which word we think will come next. The earlier examples were the first names of celebrity politicians followed by their last names. So you, the language model, predicted that the next word in the sequence would be another celebrity name. (If you thought of “rabbit”, “in the box”, or “beanstalk” we might need to futz around in your brain!)

If you’d had more context before the word “jack”—maybe a story about who I am, my upbringing, my relationship with my parents, and my insecurities about being a generalist—you might have been more likely to predict “jack of all trades, master of none.”

So how do we get you to the right answer? If we just beefed up your smarts—let’s say, by throwing all of the computer power in the world into your brain—you still wouldn’t really be able to reliably predict “of” from just “jack.” You’d need more context to know which “jack” we’re talking about.

This is how language models work. Before the word that comes after “jack,” the models spend a lot of time interrogating it by asking, “What kind of ‘jack’ are we talking about?” They do this until they’ve narrowed down “jack” enough to make a good guess.

[PAYWALL]
