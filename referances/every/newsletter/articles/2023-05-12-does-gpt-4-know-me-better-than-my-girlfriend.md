---
title: "Does GPT-4 Know Me Better Than My Girlfriend?"
subtitle: "A dangerous question with fascinating answers"
author: "Dan Shipper"
date: 2023-05-12
column: chain-of-thought
url: https://every.to/chain-of-thought/does-gpt-4-know-me-better-than-my-girlfriend
paywalled: true
scraped_at: 2026-06-11T16:08:19.711Z
---

# Does GPT-4 Know Me Better Than My Girlfriend?

*A dangerous question with fascinating answers*

#### Sponsor Every

**Want to reach AI early-adopters? **Every is the premier place for 80,000+ founders, operators, and investors to read about business, AI, and personal development.

We're currently accepting sponsors for Q3! If you're interested in reaching our audience, learn more:

[Learn More](https://modern-ton-234.notion.site/Sponsor-Every-Media-Kit-9f9e253fa01f4b3d99fdf31027c0b33d)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#e291928d8c918d90918a8b9291a2879487909bcc968d).

The answer is: yes.

I know because I tried it. This week, I built an AI that can simulate me and predict how I would answer personality questions. It can guess my scores better than my girlfriend does.

(If you try this at home, do not tell your girlfriend/boyfriend/partner this. You should definitely never show them a graph of how badly they did versus an AI. You can try saying, “But baby, it’s just math!”. This doesn’t seem to help for some reason.)

I got into this mess because I had an idea the other night: Can GPT-4 predict my personality? And, more importantly, can it predict my personality from just a little bit of information like stuff I’ve written online or a sampling of notes and journal entries?

I decided to test GPT-4 as follows: I’d take a personality test. Then, I’d give GPT-4 some information about me and ask it to take the same personality test—but pretend to be* me*. I’d tell it to attempt to predict the ways I’d answer the questions based on what it knows. Then I’d measure the difference between what GPT-4 predicted my responses would be and my actual responses to see how accurate it was.

I’d also ask my girlfriend, Julia, who is unusually perceptive about people and knows me quite well, to do the same task. Then I’d compare GPT-4’s accuracy against hers.

Below are the results. The graph you see measures how well each predictor (the AI, Julia, and random chance) did at predicting my scores:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2614/optimized_nxQAAAAASUVORK5CYII=.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2614/optimized_nxQAAAAASUVORK5CYII=.png?link=true)

As you can see, random chance—blindly picking answers to a personality test—performed the worst. Julia placed in the middle of the pack. And an AI that was pretending to be me, using as its source material a small sampling of my notes, journal entries, articles, and therapy transcripts did the best.

It’s still not perfect—but this is what I could cook up over the course of a day or two. I think it will get even better than this.

Here's how I built it, and what it means.

## Using GPT-4 to create a personality profile

I wanted GPT-4 to get to know me. So the first thing I did was ask it to create a personality profile of me based on my Twitter account. I used an alpha version of GPT-4 that has access to the web. Here’s my prompt:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2614/optimized_wFqR5bPXalZsQAAAABJRU5ErkJggg==.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2614/optimized_wFqR5bPXalZsQAAAABJRU5ErkJggg==.png?link=true)

(Despite the typos in this prompt, GPT-4 understood the task anyway.)

Given this prompt, GPT-4 happily went off and perused my Twitter pretending to be an expert psychologist looking for insights. It read through all of my tweets, and came back a few minutes later with a few pages of flattering missives like this:

*“Shipper frequently tweets about AI and its potential impact, indicating a high level of curiosity and a willingness to explore and understand complex topics. For example, he has tweeted about the nature of AI models like GPT-4, emphasizing that they are reasoning engines rather than simple knowledge databases​​. He also expresses enthusiasm about the application of AI in various fields, such as media and science​​​. This suggests a high degree of intellectual curiosity and a desire for knowledge, typically associated with individuals who are analytical, thoughtful, and forward-thinking.”*

Everything in here is complimentary, but I actually think this is fairly perceptive. (Of course, I do.) It’s missing things that I don’t share on social media—like what I’m afraid of, what I struggle with, or things I think about that are not at all related to the audience I’m building. Tweets are, of course, only a slice of one person’s personality. I wondered how well it would do without nuanced data sources nuance—but I also felt confident it had perceived *some* things accurately.

Once I had the Twitter-based personality I also tried to construct a few other profiles from a more varied group of sources. I collected a group of 7 pieces of text that ranged from a summary of a therapy session, to some randomly selected Roam Notes, to a life goals document I wrote a few years ago. I then used GPT-4 to summarize these documents into a profile that I could use to compare against the Twitter one.

When those were ready, I proceeded to the next step: getting GPT-4 to don my personality like a new coat and begin to answer test questions as me.

## Using GPT-4 to simulate my personality

GPT-4 is already, at its core, a [simulator](https://www.lesswrong.com/s/N7nDePaNabJdnbXeE/p/vJFdjigzmcXMhNTsx):

If you ask it to take on the personality of a New Yorker writer and edit your sentences—it will do that. If you ask it to pretend to be William Shakespeare and write a sonnet about McDonalds—it will do that. If you ask it to pretend to be a super smart programmer hellbent on draining large banks of all of their money who will use their winnings to buy a large island for you and your relatives—it probably *could* do that. But it won’t, instead, it will tell you, “As an AI language model, I cannot support, condone or participate in illegal activities.”

Interestingly, the simulation capacity of GPT-4 runs so deep that its capabilities go up and down depending on what it’s being asked to simulate. For example, [people have found](https://astralcodexten.substack.com/p/janus-simulators) if you ask it to be “super smart” it will answer questions better than if you don’t.

OpenAI provides a way to do this for developers by setting what’s called a “system” message. This is a message at the start of a chat that sets the “personality” of the bot. I did this first in the GPT-4 Playground which provides an easy interface for testing.

I just copy and pasted the output of GPT-4’s Twitter sleuthing from the previous step into the System Message with a little preamble to give it more context:

[PAYWALL]
