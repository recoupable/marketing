---
title: "A Few Things I Believe About AI"
subtitle: "Taking time for a 10,000 foot perspective"
author: "Dan Shipper"
date: 2023-04-21
column: chain-of-thought
url: https://every.to/chain-of-thought/a-few-things-i-believe-about-ai
paywalled: true
scraped_at: 2026-06-11T16:08:21.072Z
---

# A Few Things I Believe About AI

*Taking time for a 10,000 foot perspective*

#### CHATBOT COURSE EARLY BIRD PRICING ENDING SOON!

We are thrilled to announce we are relaunching our [How to Build a Chatbot course](https://www.chatbot-course.com/)! If you are interested in learning how to build with AI, join our upcoming Fall cohort taught by our very own Dan Shipper.

In the course you'll learn:

- How to aggregate sources of data for your chatbot

- How to manage your vector databases

- How to build a UI and bring your chatbot into production

- How to use Langchain and LlamaIndex to build a chatbot that can access private data, and use tools

- and so much more!

Learn [how to build your own chatbot in less than 30 days](https://www.chatbot-course.com/). It will run once a week for five weeks starting September 5th and early bird pricing is available for $1,300 along with an Every membership. Last time we ran the course it sold out pretty quickly, so if you are interested, grab your seat now while early bird pricing still applies.

[Get Early Bird Pricing](https://www.chatbot-course.com/)

Early-bird pricing ends on July 31st, after that the price will be $2000.

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#2350534c4d504c51504b4a535063465546515a0d574c).

Over the last 6 months I’ve been obsessively tinkering with, writing about, and investing in AI. It’s been a ride. I’ve talked to some of the [most interesting thinkers in the space](https://every.to/chain-of-thought/linus-lee-is-living-with-ai), I’ve stayed up late at night [hacking zillions of little experiments](https://every.to/chain-of-thought/how-to-build-a-chatbot-with-gpt-3?sid=18166), I’ve panicked about [AI doom](https://every.to/chain-of-thought/a-primer-on-ai-doom-for-people-who-don-t-yet-wear-fedoras?sid=18167), I’ve imagined never [organizing anything again](https://every.to/chain-of-thought/the-end-of-organizing), and I’ve basked in the warm [glow of curiosity](https://every.to/chain-of-thought/gpt-3-is-the-best-journal-you-ve-ever-used) and [delight](https://every.to/chain-of-thought/permission-to-be-excited) I get from using these models.

Working in AI during this period has felt like having a SpaceX rocket strapped to my butt. I think everyone feels this way. You go very fast, but you constantly feel behind. Every once in a while your brain explodes with the possibilities in front of you. It’s easy to end up carried away with all caps tweets about how THE WORLD HAS CHANGED.

Today, I’d like to write something a little more nuanced and reflective. Even if you’ve got a rocket strapped to your butt, it’s important to look down every once in a while, and take stock of where you are. As such, here’s a short list of things I believe about AI that are shaping how I’m approaching my work at Every and beyond.

## Knowledge orchestration is the most important bottleneck for AI applications

There are two important components to intelligence: reasoning and knowledge.[GPT-4 is quite good at reasoning](https://every.to/chain-of-thought/gpt-4-is-a-reasoning-engine), but its knowledge of the world is limited. As such, its performance is bottlenecked by our ability to give it the right knowledge at the right time for it to reason with.

This problem, which I’m calling *knowledge orchestration*, is the biggest unsolved problem for builders in AI outside of progress on foundational models. It touches how you store, index, and retrieve the knowledge you need to perform useful large language model tasks. There are many people trying to improve this at different layers of the stack:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2596/optimized_uv388gM584E8CI8n7VEKRjpMEvme3_sAj80lqmTkdrdjDZz5galD_EapxYffCOqpuX2rSE72RcBusF70vaRseZgZJFHYbc4YmHoAx1DQCQVvTKsfGh9DvLXMQQHubLdH2OJR5_Yru8ljqjtfe7MG-J0.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2596/optimized_uv388gM584E8CI8n7VEKRjpMEvme3_sAj80lqmTkdrdjDZz5galD_EapxYffCOqpuX2rSE72RcBusF70vaRseZgZJFHYbc4YmHoAx1DQCQVvTKsfGh9DvLXMQQHubLdH2OJR5_Yru8ljqjtfe7MG-J0.png?link=true)

OpenAI and other players are working to build this at the foundational model layer. They’re building bigger context window sizes: the more knowledge you can fit into your prompt, the better. [GPT-4’s 32,000 token context window](https://help.openai.com/en/articles/7127966-what-is-the-difference-between-the-gpt-4-models) is 8x better than previous models, so improvement is happening quickly.

One layer up from that, [LlamaIndex](https://gpt-index.readthedocs.io/en/latest/) and [Langchain](https://python.langchain.com/en/latest/index.html) are building at the developer tool / infrastructure layer. They’re making it easy for developers to chunk, store, and retrieve knowledge from various different kinds of databases with only a few lines of code.

Vector database providers are also working on this problem. Pinecone, Weaviate, and Chroma are all battling for supremacy here—with Pinecone in the lead.

Finally, various all-in-one solutions like [Metal](https://getmetal.io) and [Baseplate](https://www.baseplate.ai) are bundling all of these layers of the stack together to make it easy for developers to get started. They’ve got slick web interfaces that make data observable, and easy for developers to get started quickly.

I suspect all of these players will start to leak out of their current layer of the stack, and try to grow into other areas. The right solution will figure out how to integrate layers in the right way to make it easy for builders to get started and to make iteration speeds faster.

Knowledge orchestration is the *process* around knowledge. But what about the knowledge itself? What *kind* of knowledge is most valuable?

[PAYWALL]
