---
title: "Where Copilots Work"
subtitle: "A simple checklist for builders"
author: "Dan Shipper"
date: 2023-03-09
column: chain-of-thought
url: https://every.to/chain-of-thought/where-copilots-work
paywalled: true
scraped_at: 2026-06-11T16:08:23.506Z
---

# Where Copilots Work

*A simple checklist for builders*

#### Sponsored By: Lever

Hire smarter with [Lever](https://www.lever.co/demo/?utm_medium=third_party_email&utm_source=other&utm_campaign=none&utm_content=every_divinations_sponsored_newsletter)—the only complete hiring solution that provides modern talent acquisition leaders with complete ATS and robust CRM capabilities in one product: LeverTRM

[Learn More](https://www.lever.co/demo/?utm_medium=third_party_email&utm_source=other&utm_campaign=none&utm_content=every_divinations_sponsored_newsletter)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#087b7867667b677a7b6061787b486d7e6d7a71267c67).

Luke Skywalker had R2-D2’s whistles and beeps. Maverick had Goose. Bertie had his butler Jeeves, who shimmered in and out of the room to perform tasks well before he’d even been asked to.

These stories are popular because everyone wants a copilot—a partner who makes you better, and who (sometimes) becomes a friend you can lean on when things get hard.

This sort of thing is exactly what a lot of people in AI are building right now.

GitHub CoPilot is the first large-scale AI use case that has significant traction—reportedly writing [40% of the code for developers who use it](https://github.blog/2022-06-21-github-copilot-is-generally-available-to-all-developers/). Reid Hoffman thinks there will be a [copilot for every profession](https://fortune.com/2022/12/07/linkedin-founder-reid-hoffman-on-ai-human-amplification/). Microsoft is building an [AI copilot into Office](https://techcrunch.com/2023/03/06/microsoft-dynamics-copilot/). Diagram is building a [copilot for designers](https://genius.design/). The list goes on.

These systems work like a superpowered autocomplete. They predict what you’re about to do, and then offer that to you before you have a chance to do it yourself. It saves time and effort.

If you’re a builder hacking away on side projects, you’re probably thinking about building a copilot too. GPT-3 makes this kind of thing pretty easy to pull together over a weekend. I know because I’ve been doing it too:

I built a little copilot for my mind. I want it to help make me smarter: to make connections between ideas, bring up pieces of supporting evidence for points I’m making, and suggest quotes to use as I’m writing.

It takes in any chunk of text, and then attempts to complete the chunk using quotes it finds in my [Readwise](https://readwise.io/) database.

[![](https://pbs.twimg.com/profile_images/1462558295814807559/SRk1KwWS_normal.jpg)
Dan Shipper 📧@danshipper

I built a little writing copilot that lets me input sections of essays I'm writing and then uses GPT-3 to autosuggest quotes from my @readwise to use in my piece:

![](https://pbs.twimg.com/media/FqVNGDlWYAE5yS3.jpg)

March 3rd 2023, 6:14pm EST

7 Retweets122 Likes](https://twitter.com/danshipper/status/1631795281376182274)

It’s a cool demo, but it isn’t anywhere close to being a usable product yet. It doesn’t always pull great quotes for me, and it doesn’t always complete them in a way that actually supports the point I’m trying to make. It also doesn’t demonstrate sufficient understanding of my writing, or the writing of the authors it’s pulling from to be useful.

As I wrote in the [End of Organizing](https://every.to/chain-of-thought/the-end-of-organizing), I’m quite optimistic about the future of technologies like this. I find myself reading fewer and fewer physical books and taking fewer physical notes. I’m increasingly confident that every digital highlight I make will be made 10x more useful by these tools in the next year or so.

The question for me and other builders like me, is this: Where can these kinds of copilot experiences *actually *deliver* *value with the technology that’s available *today*? And what are the bottlenecks that need to be resolved to make these useful for more use cases?

Let’s take these one at a time.

## Where copilots can be built today

AI-based copilots are quite useful with out-of-the-box technology in situations where small pieces of lightly transformed boilerplate text provide a lot of value.

This is particularly true in areas where:

1. Text can be checked for accuracy quickly with little user effort

2. The cost of inaccuracies is low

3. Relevant text can be found reliably with [embeddings search](https://platform.openai.com/docs/guides/embeddings)

GitHub CoPilot is a great example of this. But other examples are things like [grant writing](https://grantable.co/), [contract writing](https://motionize.io/), tax prep, many types of [email replies](https://chrome.google.com/webstore/detail/ellie-your-ai-email-assis/mhcnlcilgicfodlpjcacgglchmpoojcp), [RFP responses](https://www.userogue.com/), medical recommendations to doctors, and more.

If you’re building a copilot (or thinking of building one), I’ve put together a little checklist for you to go through in order to figure out whether it will be possible to get good results with today’s technology.

## Can you build a copilot for it? A checklist.

If you want to build a copilot for a specific domain using today’s technology here’s the list of things you need to check off:

1. Is there a corpus of relevant text completions to be used by this copilot?

2. Can relevant text for completions be found reliably with embeddings search over this text corpus?

3. Can those pieces of text, without more context needed, be lightly transformed and inserted as an accurate completion?

4. Can completions be checked for accuracy with little to no user effort?

[PAYWALL]
