---
title: "OpenAI: the Next Tech Giant?"
subtitle: "Reading the tea leaves and reacting to the hype"
author: "Nathan Baschez"
date: 2023-03-28
column: divinations
url: https://every.to/divinations/openai-the-next-tech-giant
paywalled: true
scraped_at: 2026-06-11T16:08:22.358Z
---

# OpenAI: the Next Tech Giant?

*Reading the tea leaves and reacting to the hype*

It’s pretty rare for a company to transition from a research lab to a developer infrastructure provider to a behemoth consumer app in just a few years. But given the launch of[ChatGPT plugins](https://openai.com/blog/chatgpt-plugins) last week, there’s a fair chance this could end up being the story of OpenAI.

Plugins allow ChatGPT to browse the web and interact with services like Kayak and Instacart to perform tasks for users beyond just generating text. The news marks OpenAI’s definitive step out of the land of research and into a vastly ambitious and uncertain new world, competing to earn its place as perhaps the newest tech giant, alongside Google, Microsoft, Apple, and Facebook.

Packy McCormick, never one to shy away from a bold optimistic claim, expressed[his prediction](https://www.notboring.co/p/attention-is-all-you-need) for how this will turn out with the following meme:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2542/optimized_lhMthnP5l5c0-8AAhzWD2OB4jRmvJqK6Emr2GLumPP4HAdSZ6cTnKYMU-9f8Nr0mVw_iTMJ2SEyoxO8enZhCv7PcTmUKWEEozyQuFb8GCeJniAVJUJCR41Z9QT7gnX8FNPiR6zsPGD3mQlxsppUhRQ.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2542/optimized_lhMthnP5l5c0-8AAhzWD2OB4jRmvJqK6Emr2GLumPP4HAdSZ6cTnKYMU-9f8Nr0mVw_iTMJ2SEyoxO8enZhCv7PcTmUKWEEozyQuFb8GCeJniAVJUJCR41Z9QT7gnX8FNPiR6zsPGD3mQlxsppUhRQ.png?link=true)

Even if you’re not as bullish as Packy, it’s clear this is an important moment. My hunch is that soon we will all be using ChatGPT with plugins—or something like it—almost every day, for the foreseeable future. I don’t know who will be the dominant market player, or how the value will get captured, but the product/market fit of this emerging category of AI chat product is very real. It is on the same level of importance as the PC, the web browser, the search engine, and the smartphone. Seriously.

Last week, on the day that ChatGPT plugins were announced, I was at an AI conference hosted by Sequoia in San Francisco where Sam Altman was speaking. The [announcement tweet](https://twitter.com/sama/status/1638951865319821312) dropped at 10 a.m., and you could practically see the news ripple through the attendees. *Did you hear? Have you tried it? Wow, you had the beta? Damn…is it good?*

Also, keep in mind that these were not impressionable or easily excited rubes! Many of the smartest investors and CEOs in AI were at this event, and they instantly understood the significance of this announcement.

It’s now possible, perhaps even plausible, that OpenAI considers itself primarily a consumer business. It may have started as a research lab and in recent years evolved into an AI infrastructure provider, but this may not be its final form. Over at Stratechery, Ben Thompson [even went so far as to predict](https://stratechery.com/2023/the-accidental-consumer-tech-company-chatgpt-meta-and-product-market-fit-aggregation-and-apis/) that OpenAI should and eventually may shut off all API access to developers, calling it a waste of resources and a distraction.

**So—what’s going on?** There are so many questions:

- What are ChatGPT plugins?

- Why are they so important?

- Is OpenAI going to become the next tech giant? *Spoiler: I’m excited about the product, but slightly less bullish on the business than most.*

- Should developers using OpenAI’s APIs be concerned?

It’s obviously a rapidly evolving situation, but I am going to do the best I can to answer all these questions and more. I’ve structured this week’s post as a sort of skimmable FAQ, because I want to cover all the basics even though I know a lot of you already know them. Feel free to skip to the parts that are most interesting to you!

(Maybe next time I’ll just write this essay as an input to a chatbot that you can talk to. 😅)

## What are ChatGPT plugins?

In a nutshell, they let ChatGPT perform actions besides just generating text, and they allow ChatGPT to access external information that is not included in its training data.

In the past, developers were able to use OpenAI’s APIs in their own products. Now OpenAI is using developers’ APIs in *its *product.

So far, OpenAI has built three first-party plugins:

1. Web browser: Capable of searching the web, clicking links, and finding current information.

2. Code interpreter: Can run Python code and read the output in a sandboxed environment.

3. Retrieval: This one is a little different from the first two, in that it’s more of a template that others can use to build their own plugins, rather than a finished plugin of its own. But basically it lets you upload a bunch of text and allows ChatGPT to use that text to answer questions. If you’ve ever seen a project like “[chat with a book](https://twitter.com/shl/status/1592590387935596544)” or “[chat with a newsletter](https://twitter.com/lennysan/status/1623002774207365121)” this is basically a way to do that inside ChatGPT.

In addition to these three first-party plugins, OpenAI has partnered with 11 companies to build third-party plugins for ChatGPT. It seems like it wanted to demonstrate a broad variety of use cases. Here’s a screenshot from the[announcement page](https://openai.com/blog/chatgpt-plugins) with descriptions for each:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2542/optimized_trBAUYB6gYGezTY3_6udft-oJHQca-kJ_DgxLIpQkJOQapYN4FyufUq03gsjIR5y4YxPaZZIAnFuSWj9Ky8ERXvB1x3gbFXTXkdpziY2ujcyb5GIEIorYoIEhOF1SV-9y2iYT-6PW3paf2p4RxHZWA.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2542/optimized_trBAUYB6gYGezTY3_6udft-oJHQca-kJ_DgxLIpQkJOQapYN4FyufUq03gsjIR5y4YxPaZZIAnFuSWj9Ky8ERXvB1x3gbFXTXkdpziY2ujcyb5GIEIorYoIEhOF1SV-9y2iYT-6PW3paf2p4RxHZWA.png?link=true)

[PAYWALL]
