---
title: "What Can Language Models Actually Do?"
subtitle: "Part one: Language models as text compressors"
author: "Dan Shipper"
date: 2024-04-25
column: chain-of-thought
url: https://every.to/chain-of-thought/what-can-language-models-actually-do
paywalled: true
scraped_at: 2026-06-11T16:08:04.417Z
---

# What Can Language Models Actually Do?

*Part one: Language models as text compressors*

*This is the first of a five-part series I'm writing about redefining human creativity in the age of AI.*

[Subscribe](https://every.to/subscribe?hash=%recipient.hash%)

---

I want to help save our idea of human creativity.

Artificial intelligence can write, illustrate, design, code, and much more. But rather than eliminating the need for human creativity, these new powers can help us redefine and expand it.

We need to do a [technological dissection](https://every.to/chain-of-thought/chatgpt-and-the-future-of-the-human-mind) of language models, defining what they can do well—and what they can’t. By doing so, we can isolate our own role in the creative process.

If we can do that, we’ll be able to wield language models for creative work—and still call it creativity.

To start, let’s talk about what language models *can* do.

## The psychology and behavior of language models

The current generation of language models is called *transformers*, and in order to understand what they do, we need to take that word seriously. What kind of *transformations* can transformers do?

Mathematically, language models are recursive next-token predictors. They are given a sequence of text and predict the next bit of text in the sequence. This process runs over and over in a loop, building upon its previous outputs self-referentially until it reaches a stopping point. It’s sort of like a snowball rolling downhill and picking up more and more snow along the way.

But this question is best asked at a higher level than simply mathematical possibility. Instead, what are the inputs and outputs we observe from today’s language models? And what can we infer about how they think?

In essence, we need to study LLMs’ behavior and psychology, rather than their biology and physics.

This is a sketch based on experience. It’s a framework I’ve built for the purposes of doing great creative work with AI.

## A framework for what language models do

Language models transform text in the following ways:

-
**Compression: **They compress a big prompt into a short response.

-
**Expansion: **They expand a short prompt into a long response.

-
**Translation: **They convert a prompt in one form into a response in another form.

These are manifestations of their outward behavior. From there, we can infer a property of their psychology—the underlying thinking process that creates their behavior:

-
**Remixing: **They mix two or more texts (or learned representations of texts) together and interpolate between them.

I’m going to break down these elements in successive parts of this series over the next few weeks. None of these answers are final, so consider this a public exploration that’s open for critique. Today, I want to talk to you about the first operation: compression.

## Language models as compressors

Language models can take any piece of text and make it smaller:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3082/optimized_5Tq2gD1Muk2a4tRNN8xPnFbmHeiVTj7FMvby7V2WLDYlNve_z5zZ-o1ZzEQZd3lAWmurtaG5API_Ql_N1gUJtjbmKtwtcCLo88wOj2i_nfJSvnisC3BtBXwBtPj7sCQgiWunuMtpGnyaYrt7.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3082/optimized_5Tq2gD1Muk2a4tRNN8xPnFbmHeiVTj7FMvby7V2WLDYlNve_z5zZ-o1ZzEQZd3lAWmurtaG5API_Ql_N1gUJtjbmKtwtcCLo88wOj2i_nfJSvnisC3BtBXwBtPj7sCQgiWunuMtpGnyaYrt7.png?link=true)

*Source: All images courtesy of the author.*

This might seem simple, but, in fact, it’s a marvel. Language models can take a big chunk of text and smush it down like a foot crushing a can of Coke. Except it doesn’t come out crushed—it comes out as a perfectly packaged and proportional mini-Coke. And it’s even drinkable! This is a Willy Wonka-esque magic trick, without the Oompa Loompas.

Language model compression comes in many different flavors. A common one is what I’ll call *comprehensive* compression, or summarization.

## Language models are comprehensive compressors

Humans comprehensively compress things all the time—it’s called summarization. Language models are good at it in the same way a fifth grader summarizes a children’s novel for a book report, or the app [Blinkist](https://www.blinkist.com/en/lp) summarizes nonfiction books for busy professionals.

This kind of summarizing is intended to take a source text, pick out the ideas that explain its main points for a general reader, and reconstitute those into a compressed form for faster consumption:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3082/optimized_w_s9uA9XpkcOlUPDUuSl9Z8UQKrOEbk0AKBHQ7dQ4CPc3vMkvDPNvInQjD4P5ZCKI1rJIoPO84N_Hid5w9JcfH7B_rgAsQkDItxz6LUjnStpzPST4CGlY3WvAsvN6c8vzfyDYp0PD_WDoe-t.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3082/optimized_w_s9uA9XpkcOlUPDUuSl9Z8UQKrOEbk0AKBHQ7dQ4CPc3vMkvDPNvInQjD4P5ZCKI1rJIoPO84N_Hid5w9JcfH7B_rgAsQkDItxz6LUjnStpzPST4CGlY3WvAsvN6c8vzfyDYp0PD_WDoe-t.png?link=true)
These summaries are intended to be both comprehensive (they note all the main ideas) and helpful for the average reader (they express the main ideas at a high level with little background knowledge assumed).

In the same way, a language model like Anthropic’s Claude, given the text of the Ursula K. LeGuin classic *A Wizard of Earthsea*, will easily output a comprehensive summary of the book’s main plot points:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3082/optimized_uassCnZHIUzfN-VWOs7NJKIbTfvpmLpvA6w_Mo4sV19DMzfWk5OQSkxQdMpxJLT7sm4D9qzhFNTYMLotq3Uh6W5LlGjIgLTqWN4SnXje2si9VXZEf_QPm1Mq53Pzy1CCnfF2s8VrUgAD0v3F.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3082/optimized_uassCnZHIUzfN-VWOs7NJKIbTfvpmLpvA6w_Mo4sV19DMzfWk5OQSkxQdMpxJLT7sm4D9qzhFNTYMLotq3Uh6W5LlGjIgLTqWN4SnXje2si9VXZEf_QPm1Mq53Pzy1CCnfF2s8VrUgAD0v3F.png?link=true)
But comprehensive compression isn’t the only thing language models can do. You can compress text without being comprehensive—which creates room for totally different forms of compression.

### Language models are engaging compressors

[PAYWALL]
