---
title: "What Can Language Models Actually Do?"
subtitle: "Language models as text compressors"
author: "Dan Shipper"
date: 2025-02-19
column: chain-of-thought
url: https://every.to/chain-of-thought/what-can-language-models-actually-do-371b969e-d470-4639-a9fa-f873c133c19b
paywalled: true
scraped_at: 2026-06-11T16:07:48.725Z
---

# What Can Language Models Actually Do?

*Language models as text compressors*

*The world has changed considerably since our last *[”think week”](https://every.to/context-window/thinking-up-the-future) *five months ago—and so has Every. We’ve added new *[business](https://every.to/on-every/introducing-every-studio)* *[units](https://every.to/on-every/introducing-every-consulting)*, *[launched](https://every.to/p/introducing-cora-manage-your-inbox-with-ai)* *[new](https://every.to/on-every/introducing-spiral-v2)* *[products](https://every.to/on-every/introducing-extendable-articles)*, and brought on new teammates. So we've been taking this week to come up with new ideas and products that can help us improve how we do our work and, more importantly, your experience as a member of our community. In the meantime, we’re re-upping four pieces by ****Dan Shipper**** that cover basic, powerful questions about AI. (Dan hasn’t been publishing at his regular cadence because he’s working on a longer piece. Look out for that in Q2.) Yesterday we re-published his *[jargon-free explainer](https://every.to/chain-of-thought/how-language-models-work-ea805869-4778-4fb8-ad8f-2d10cc439b4c)* of how language models work. Today we’re re-upping his *[piece](https://every.to/chain-of-thought/what-can-language-models-actually-do)* about how language models function as compressors—or summarizers—of text.*—[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief)

*Was this newsletter forwarded to you? *[Sign up](https://every.to/account)* to get it in your inbox.*

---

I want to help save our idea of human creativity. Artificial intelligence can write, illustrate, design, code, and much more. But rather than eliminating the need for human creativity, these new powers can help us redefine and expand it.

We need to do a [technological dissection](https://every.to/chain-of-thought/chatgpt-and-the-future-of-the-human-mind) of language models, defining what they can do well—and what they can’t. By doing so, we can isolate our own role in the creative process.

If we can do that, we’ll be able to wield language models for creative work—and still call it creativity.

To start, let’s talk about what language models *can *do.

## The psychology and behavior of language models

The current generation of language models is called *transformers*, and in order to understand what they do, we need to take that word seriously. What kind of *transformations* can transformers do?

Mathematically, language models are recursive next-token predictors. They are given a sequence of text and predict the next bit of text in the sequence. This process runs over and over in a loop, building upon its previous outputs self-referentially until it reaches a stopping point. It’s sort of like a snowball rolling downhill and picking up more and more snow along the way.

But this question is best asked at a higher level than simply mathematical possibility. Instead, what are the inputs and outputs we observe from today’s language models? And what can we infer about how they think?

In essence, we need to study LLMs’ behavior and psychology, rather than their biology and physics.

This is a sketch based on experience. It’s a framework I’ve built for the purposes of doing great creative work with AI.

## A framework for what language models do

Language models transform text in the following ways:

- Compression: They compress a big prompt into a short response.

- Expansion: They expand a short prompt into a long response.

- Translation: They convert a prompt in one form into a response in another form.

These are manifestations of their outward behavior. From there, we can infer a property of their psychology—the underlying thinking process that creates their behavior:

- Remixing: They mix two or more texts (or learned representations of texts) together and interpolate between them.

I’m going to break down these elements in successive parts of this series over the next few weeks. None of these answers are final, so consider this a public exploration that’s open for critique. Today, I want to talk to you about the first operation: compression.

### Language models as compressors

Language models can take any piece of text and make it smaller:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3082/optimized_5Tq2gD1Muk2a4tRNN8xPnFbmHeiVTj7FMvby7V2WLDYlNve_z5zZ-o1ZzEQZd3lAWmurtaG5API_Ql_N1gUJtjbmKtwtcCLo88wOj2i_nfJSvnisC3BtBXwBtPj7sCQgiWunuMtpGnyaYrt7.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3082/optimized_5Tq2gD1Muk2a4tRNN8xPnFbmHeiVTj7FMvby7V2WLDYlNve_z5zZ-o1ZzEQZd3lAWmurtaG5API_Ql_N1gUJtjbmKtwtcCLo88wOj2i_nfJSvnisC3BtBXwBtPj7sCQgiWunuMtpGnyaYrt7.png?link=true)

*Source: All images courtesy of the author.*

This might seem simple, but, in fact, it’s a marvel. Language models can take a big chunk of text and smush it down like a foot crushing a can of Coke. Except it doesn’t come out crushed—it comes out as a perfectly packaged and proportional mini-Coke. And it’s even drinkable! This is a Willy Wonka-esque magic trick, without the Oompa Loompas.

Language model compression comes in many different flavors. A common one is what I’ll call *comprehensive* compression, or summarization.

### Language models are comprehensive compressors

Humans comprehensively compress things all the time—it’s called summarization. Language models are good at it in the same way a fifth grader summarizes a children’s novel for a book report, or the app [Blinkist](https://www.blinkist.com/en/lp) summarizes nonfiction books for busy professionals.

This kind of summarizing is intended to take a source text, pick out the ideas that explain its main points for a general reader, and reconstitute those into a compressed form for faster consumption:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3082/optimized_w_s9uA9XpkcOlUPDUuSl9Z8UQKrOEbk0AKBHQ7dQ4CPc3vMkvDPNvInQjD4P5ZCKI1rJIoPO84N_Hid5w9JcfH7B_rgAsQkDItxz6LUjnStpzPST4CGlY3WvAsvN6c8vzfyDYp0PD_WDoe-t.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3082/optimized_w_s9uA9XpkcOlUPDUuSl9Z8UQKrOEbk0AKBHQ7dQ4CPc3vMkvDPNvInQjD4P5ZCKI1rJIoPO84N_Hid5w9JcfH7B_rgAsQkDItxz6LUjnStpzPST4CGlY3WvAsvN6c8vzfyDYp0PD_WDoe-t.png?link=true)
These summaries are intended to be both comprehensive (they note all the main ideas) and helpful for the average reader (they express the main ideas at a high level with little background knowledge assumed).In the same way, a language model like Anthropic’s Claude, given the text of the Ursula K. LeGuin classic *A Wizard of Earthsea*, will easily output a comprehensive summary of the book’s main plot points:

[PAYWALL]
