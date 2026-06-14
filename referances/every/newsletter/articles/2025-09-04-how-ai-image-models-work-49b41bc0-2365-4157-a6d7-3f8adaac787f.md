---
title: "How AI Image Models Work"
subtitle: "An entirely non-technical explanation of image generators"
author: "Nir Zicherman"
date: 2025-09-04
column: p
url: https://every.to/p/how-ai-image-models-work-49b41bc0-2365-4157-a6d7-3f8adaac787f
paywalled: true
scraped_at: 2026-06-11T16:07:35.071Z
---

# How AI Image Models Work

*An entirely non-technical explanation of image generators*

*To follow up on our [latest podcast episode](https://every.to/podcast/this-ai-makes-a-video-game-world-in-40-milliseconds) with Decart cofounder ****Dean Leitersdorf—****about AI video generation—we're re-publishing ****Nir Zicherman****'s [piece](https://every.to/admin/posts/how-ai-image-models-work/edit) about how AI image models work. (Nir is also an upcoming guest on *[AI & I](https://every.to/podcast).) *Plus: Paid Every subscribers are invited to ****[Every Demo Day](https://every.to/on-every/for-paid-subscribers-only-every-demo-day)**** on Friday (tomorrow), September 5 at 12 p.m. ET. [Sign up to attend](https://every.to/courses/demo-day-september-2025/purchase), or [upgrade your subscription](https://every.to/courses/demo-day-september-2025/purchase) to register.—[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief)*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

I can vividly recall the day I got access to the DALL-E beta. It was the summer of 2022. For months, I’d been on the waitlist, hearing about this magical new tool that could take *any* description and output a matching image.

One of the first images I created used the prompt “80s tv commercial showing a hippo fighting a pegasus.” This was the output:

[![All images courtesy of the author.](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3748/optimized_97575bfc-1ec8-4612-bd4e-c944de1a7bf6.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3748/optimized_97575bfc-1ec8-4612-bd4e-c944de1a7bf6.png)
*All images courtesy of the author.*

Fast-forward to today, less than two years after the advent of that mind-blowing capability. The same prompt, in ﻿[ChatGPT](https://every.to/c/ai-frontiers)﻿ 4o, yields this:

[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3124/optimized_AD_4nXdEmxEFfcy6FifsVqxQPVLsZNOXwImffOJ7aXTaYP_SzUrE0zowsKc1e7Zd2YWr5zpF7s7LcOhs_eHdeaqWUK2ntHHnY4NYODaPU721_1uDobL21qeMzWhw.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3124/optimized_AD_4nXdEmxEFfcy6FifsVqxQPVLsZNOXwImffOJ7aXTaYP_SzUrE0zowsKc1e7Zd2YWr5zpF7s7LcOhs_eHdeaqWUK2ntHHnY4NYODaPU721_1uDobL21qeMzWhw.png)

Despite persistent flaws and hallucinations (that hippo has three legs!), it is mind-boggling how far we’ve come in such a short period of time. Dream up *anything*, with any text description, and a machine will create a matching image in seconds.

Yet despite the technology’s sudden ubiquity, few people who regularly use it understand how it works or how these improvements come about.

Several months ago, I published a primer that explained [how large language models (LLMs) work](https://every.to/p/how-ai-works) using no technical language. I’d like to do the same now for image generators. As with LLMs, I believe that the core concepts are straightforward. The fancy calculus and ground-breaking computing power used to train these models is simply the application of something we can explain with an analogy to a kids’ game.

## The story plot game

Let's imagine inventing a new game intended to teach children how to unleash their creativity and come up with fictional stories. Left to their own devices, children will typically write about topics that interest them. But our intention is to broaden their horizons and encourage them to think outside the box, to be comfortable ideating and crafting stories about *any* topic.

We're going to teach this incrementally. We’ll begin with a skill that (at first glance) might seem unrelated: identifying *existing* story plots.

The children will be presented with a sentence containing a single typo. If they find the typo, they will uncover the plot of a well-known film. Here it goes:

*A princess with magical towers accidentally sets off an eternal winter in her kingdom.*

I imagine most children would successfully identify that the outlying word is *towers* and that the word with which it should be replaced is *powers*. (The film, of course, is *Frozen*.)

Let's make it a bit harder. This time, the error won't be a rhyming word but an entirely different word altogether. For instance:

*A clown fish gets separated from his banana and must find his way home.*

This time, a child familiar with *Finding Nemo *will hopefully recognize the word *banana* as a typo and replace it with the word *father* to decipher the correct plot. But here's an interesting implication that comes with this second example: Had the child replaced *banana *with *best friend*, the resulting sentence would be perfectly logical and the plot perfectly plausible, even if it did not accurately summarize any particular Pixar film.

## Getting noisier

We may seem far removed from our eventual goal of mirroring generative image models, but there is more happening here than it might seem at first glance. We’re teaching the children to identify compelling story plots hidden somewhere in a summary rife with errors.

Let's give these errors another name: noise. And let's turn the difficulty up a notch and replace two words in a given plot:

[PAYWALL]
