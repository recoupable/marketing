---
title: "Five AI Products You Can Build With GPT-3 Today"
subtitle: "I’m surprised these don’t exist yet"
author: "Nathan Baschez"
date: 2023-02-21
column: divinations
url: https://every.to/divinations/five-ai-products-you-can-build-with-gpt-3-today
paywalled: true
scraped_at: 2026-06-11T16:08:24.323Z
---

# Five AI Products You Can Build With GPT-3 Today

*I’m surprised these don’t exist yet*

#### Come hear Nathan speak

If you like this post, you’ll love getting to hear from Nathan live at our Thesis conference this Saturday. Only a few tickets remain—purchase them at the link below.

[RSVP](https://www.thesisconference.com/)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#4536352a2b362a37362d2c353605203320373c6b312a).

AI critics say that the technology is all hype. They are wrong. I’ll show five categories of products that are a) currently possible, and b) I am extremely excited to use, hopefully soon.

I’ve become familiar with what GPT-3 is capable of by building [Lex](https://lex.page/). I spend a lot of time writing prompts, and seeing what it gets right and what its limits are. It reminds me of when the iPhone first came out: if you paid attention, it was easy to see that transformative new product experiences would inevitably emerge. It’s hard to see exactly what those will be. Still, it’s fun to guess :)

So here are some of the new products that I predict will emerge thanks to AI. None of the ideas are dependent on technical advances—they could all be built *today* using GPT-3.

## 1. The infinite article

How much of your time do you spend scrolling through feeds and scanning articles? If you’re like me, it represents a decent chunk of your time. What if you could hire someone to do this work for you and compile a daily briefing? What if you could ask them questions and prod them to go deeper on the topics that interest you, and skip over anything that isn’t worth your time?

I would love this! I can’t wait for someone to build it. I [presented this idea](https://every.to/divinations/the-infinite-article) initially in September of last year. At the time I thought it was something that was years in the future. Now, I’m convinced you could build it today.

When I first thought of the idea I assumed the best you could do is to build a personalized list of articles based on a user’s Twitter history, the email newsletters they subscribe to, or any other data you can gather about the user. And I thought the best the AI could do is offer a short summary. I didn’t think it was possible to allow users to ask questions and have the AI give accurate, interesting answers.

I was wrong. Since then, a few things have caused me to update my thinking.

First, I realized you don’t need to get much information from users to offer a compelling user experience quickly. You definitely don’t need to scrape their Twitter feed, browsing history, or email. How did I learn this? From a new product called [Artifact](https://www.theverge.com/2023/1/31/23579552/artifact-instagram-cofounders-kevin-systrom-mike-krieger-news-app), created by the Instagram founders. The basic idea is simple: you check a few boxes of topics you’re interested in (e.g., Formula 1, tech, interior design), and the app will start recommending articles to you. It doesn’t collect any data on you other than what you do inside the app.

When you first start using Artifact, the article suggestions are just okay. But it only takes a few days for the suggestions to get much better—proving that good personalized recommendations are not as hard to make as I thought, and don’t require a large existing user base.

The second big shift in my belief happened when I learned about embeddings, a technology that makes the “question answering” part of the idea easy to implement. Without diving too deeply into the technical weeds, embeddings make it possible to retrieve chunks of text from a document that are relevant to a user’s question. You can then stuff these chunks of text into a prompt and have GPT-3 use it to factually answer questions. My co-founder Dan has done a lot of cool stuff using embeddings to create chatbots that answer questions based on a specific corpus of text, like [Huberman Lab transcripts](https://every.to/chain-of-thought/i-trained-a-gpt-3-chatbot-on-every-episode-of-my-favorite-podcast) or [Lenny Rachitsky’s newsletter](https://www.lennysnewsletter.com/p/i-built-a-lenny-chatbot-using-gpt).

With these two pieces in place, I feel like someone could easily build a wonderful daily briefing tool. If you’re building it, pleaselet me know [on Twitter](https://twitter.com/nbashaw). I would love to try it.

## 2. Shopping assistant

I perform the following routine at least once a week:

[PAYWALL]
