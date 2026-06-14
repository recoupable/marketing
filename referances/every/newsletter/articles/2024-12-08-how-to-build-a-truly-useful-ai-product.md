---
title: "How to Build a Truly Useful AI Product"
subtitle: "Generative AI breaks the old startup playbook"
author: "Chris Pedregal"
date: 2024-12-08
column: thesis
url: https://every.to/thesis/how-to-build-a-truly-useful-ai-product
paywalled: true
scraped_at: 2026-06-11T16:07:52.863Z
---

# How to Build a Truly Useful AI Product

*Generative AI breaks the old startup playbook*

*I used to take notes during Zoom meetings, toggling between the call screen and a Notion document that housed my notes—always hoping that whatever I jotted down actually made sense when I reviewed it later. Now I use an AI-powered meeting notes tool called [Granola](https://every.to/c/next-billion-dollar-company) that automatically captures what’s happening in my call, so I can stay focused on the conversation. Some of my Every colleagues do as well, so we’re thrilled to publish this piece by Granola cofounder ****Chris Pedregal ****in today’s *[Thesis](https://every.to/thesis)*. In a landscape where the underlying AI models improve faster than developers can build applications for them, Chris argues that building AI products requires an entirely new playbook, and he shares four essential principles drawn from his own experience. If you’re interested in learning more from Chris’s experience, tune in to this week's episode of *[AI & I](https://every.to/podcast), *where he talks with *[Dan Shipper](https://every.to/@danshipper)* about building Granola and what he’s learned.—*[Kate Lee](https://every.to/news/kate-lee-joins-every-as-editor-in-chief)

*Was this newsletter forwarded to you? *[Sign up](https://every.to/account)* to get it in your inbox.*

---

If building a startup is like playing a tough video game, building a startup in generative AI is like playing that video game at 2x speed.

When you’re building at the application layer—your startup uses an AI model provided by companies like OpenAI and Anthropic—you're relying on technology that is improving at an unpredictable and unprecedented rate, with major model releases happening at least twice a year. If you're not careful, you might spend weeks on a feature, only to find that the next AI model release automates it. And because everyone has access to great APIs and frontier large language models, your incredible product idea can be built by anyone.

Many opportunities are being unlocked—LLMs have opened up product abilities like code generation and research assistance that were impossible before—but you need to make sure you are surfing the wave of AI progress, not getting tumbled by it.

That’s why we need a new playbook.

Having spent the last two years building [Granola](http://granola.ai/), a notepad that takes your meeting notes and enhances them using transcription and AI, I’ve come to believe that generative AI is a unique space. The traditional laws of “startup physics”—like solving the biggest pain points first or that supporting users gets cheaper at scale—don’t fully apply here. And if your intuitions were trained on regular startup physics, you’ll need to develop some new ones in AI. After developing these intuitions over the last two years, I have a set of four principles for building in AI that I believe every app-layer founder needs to know.

### 1.  Don't solve problems that won't be problems soon

LLMs are undergoing one of the fastest technical developments in history. Two years ago, ChatGPT couldn’t process images, handle complex math, or generate sophisticated code—tasks that are easy for today’s LLMs. And two years from now, this picture will look very different.

If you’re building at the app layer, it’s easy to spend time on the wrong problems—those that will go away when the next version of GPT comes out. Don’t spend any time working on problems that will go away.** **It sounds simple, but doing this is hard because it feels wrong.

Predicting the future is now part of your job (uncomfortable, right?). To know what problems will stick around, you’ll need to predict what GPT-X-plus-one will be capable of, and that can feel like staring into a crystal ball. And once you have your predictions, you have to base your product roadmap and strategy around them.

For example, the first version of Granola didn’t work for meetings longer than 30 minutes. The best model at the time, OpenAI’s DaVinci, only had a 4,000-token context window, which limited how long meetings could be.

Normally, lengthening this time frame would have been our top priority. How can you expect people to use a notetaker that only works for short meetings? But we had a hypothesis that LLMs were going to be much better: They’d get smarter, faster, cheaper, and have longer context windows. We decided not to spend any** **time fixing the context window limitation. Instead, we spent our time improving note quality.

[PAYWALL]
