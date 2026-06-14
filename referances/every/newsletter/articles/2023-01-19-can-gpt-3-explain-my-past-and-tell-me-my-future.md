---
title: "Can GPT-3 Explain My Past and Tell My Future?"
subtitle: "I loaded journal entries from the past 10 years into GPT-3—and started asking it questions"
author: "Dan Shipper"
date: 2023-01-19
column: chain-of-thought
url: https://every.to/chain-of-thought/can-gpt-3-explain-my-past-and-tell-me-my-future
paywalled: true
scraped_at: 2026-06-11T16:08:26.230Z
---

# Can GPT-3 Explain My Past and Tell My Future?

*I loaded journal entries from the past 10 years into GPT-3—and started asking it questions*

#### Sponsor Every

**Want to reach AI early-adopters? **Every is the premier place for 80,000+ founders, operators, and investors to read about business, AI, and personal development.

We're currently accepting sponsors for Q3! If you're interested in reaching our audience, learn more:

[Learn More](https://modern-ton-234.notion.site/Sponsor-Every-Media-Kit-9f9e253fa01f4b3d99fdf31027c0b33d)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#a1d2d1cecfd2ced3d2c9c8d1d2e1c4d7c4d3d88fd5ce).

*What do you want to know about yourself?* asks the bot.

The bot is built with [GPT-3](https://every.to/c/ai-and-gpt3), and has access to hundreds of my old journal entries from the last 10 years that it can use to answer my questions. It took me a few hours of programming, and I’m using it for the first time. I built it to analyze my past so, hopefully, I could better understand my future. “What’s past is prologue,” wrote Shakespeare, after all.

I start to type a question into my laptop. “When in his life has the author been the happiest?” GPT-3 doesn’t know my name yet, so I have to refer to myself as the author.* *“Please be specific about moments and situations. Identify what caused the happiness. Be truthful, don't make anything up. If you can't find a specific moment of happiness, don't summarize. Find moments that are surprising.”

I hit enter, and GPT-3 begins its work, finding the entries that are most relevant to my question and summarizing them to create an answer.

I watch its progress scroll past me with greedy focus. I feel like I just squeezed my soul into the coin slot of a self-designed slot machine. Now, I’m waiting to see if it will pay out.

Finally, a response comes back:

*“The author felt the most happiness when he was walking on the beach in Koh Phangan, Thailand. He started out feeling somber, but as he walked he started to think about ideas for a novel about startups written in a style similar to Alain de Botton. This inspired him and he felt a lot lighter and happier.” *

It continues:

*“He also felt happiness when he was with Julia, reading, writing, building/creating things, having good conversations with people, watching football, reading Jonathan Gold, feeling in command of himself, going into an office and having people who look to him to set direction, and during/immediately after public speaking that went well.”*

Jackpot.

. . . .

I’ve been experimenting a lot with GPT-3 recently. I built [a chatbot based on the Huberman Lab podcast](https://every.to/chain-of-thought/i-trained-a-gpt-3-chatbot-on-every-episode-of-my-favorite-podcast). I built [a custom journal bot](https://every.to/chain-of-thought/gpt-3-is-the-best-journal-you-ve-ever-used) to help me unpack issues in my life.

But this is by far my most personal experiment—and, in my opinion, one of the most valuable.

I’ll take you through how I came up with the idea, how I built it, what the results are, and what I think the future holds for these kinds of tools.

## Summarizing the present

I found out innocently enough that GPT-3 is good at summarizing.

I was writing an article for Every and having trouble finding the main thread, so I pasted what I had so far into ChatGPT and asked it to summarize my key points. Usually, I’d ask someone at Every to help me with this, but no one was online. So I figured, why not ask GPT-3 to do it?

I hit enter and got the results—they were *great*. I saw the article I was writing in a totally new way, and I was able to finish it quickly and easily.

My curiosity was piqued. What else might GPT-3 be good at summarizing? Maybe it would work for more than just my half-finished essays.

In my next therapy session I had an idea. I asked my therapist if I could record our session and feed the transcripts into GPT-3. It’s been a tough few weeks, and I wanted to see if it could help me look at what I was dealing with from a new perspective.

He was intrigued, so we laid a few ground rules about what I would do with the recording and what I would share. Then we dove in. *(Note: if you are in therapy, do not do this without explicitly discussing it with your therapist.) *Afterwards I threw a section of the transcript into ChatGPT and asked it to summarize.

The results were stunning.

*“From this session, it appears the client is experiencing a lot of stress due to a variety of life events, such as [REDACTED]. The client is feeling overwhelmed, exhausted, and scared, and is struggling to manage conflicting feelings of wanting to escape the situation and wanting to remain brave and committed to working through it. On a deeper level, the client is struggling with feelings of inadequacy and fear of disappointing others, and a fear of conflict.”*

It correctly identified each of the things that I was struggling with, and then, in its own words, it expressed how I’d been feeling—but far more precisely than I had been able to do on my own. In some strange way, it felt like the [AI](https://every.to/c/ai-frontiers) knew me better than I knew myself.

When someone, or something, puts their finger on exactly what you’re feeling, something clicks, and it creates an instant sense of relief. That’s exactly what happened when I read the summary. I had never directly used the word “inadequacy” to explain how I was feeling in that situation, but I was clearly feeling it. Now, when that feeling comes up, I can recognize it, label it, and work with it in a way that I wasn’t able to before.

The experience left me even more curious to experiment.

What other kinds of insights were hiding in plain sight? What would happen if I had recorded more than that one therapy session? I wanted to try giving it 100x the amount of material to work with.

I had an idea where to look.

## Explaining the past

A journal is a way to catch pieces of yourself as they float through the present.

I’ve been patiently catching those pieces for 10 years, in journals of every type. I’ve marked up markdown files and back-linked my morning pages in Roam. I’ve scrawled in yellow legal pads, Moleskines, and Midoris. (I even built a [GPT-3 journal](https://every.to/superorganizers/gpt-3-is-the-best-journal-you-ve-ever-used).)

I’ve always wondered why I do journaling. It helps me think through things in the moment, but I’ve always felt like I would use all of these entries for something more important. Maybe a book—a memoir. Now, it occurred to me that I should feed my journal into a machine.

It is, perhaps, the most delightfully narcissistic use of AI ever. But maybe it will also be helpful.

There’s only one problem.

## Solving GPT-3’s poor memory

GPT-3 might be good at summarizing text, but, at least for now, it has a poor memory. You can only feed it a few pages of text at a time to get summaries back. If you try to, say, feed it an entire journal, it'll error out.

I needed an alternative solution.

Luckily, I discovered a new library called [GPTIndex](https://github.com/jerryjliu/gpt_index) that makes this easy with just a few lines of code. I spent a few hours on it (and some time on the phone with GPTIndex’s creator, [Jerry Liu](https://twitter.com/jerryjliu0)) and eventually arrived at a setup that works like this:

1. It breaks all of my entries into small chunks.

2. It stores them in a form that makes them easily searchable.

3. When I ask a question, it retrieves the most relevant chunks.

4. It summarizes the chunks, and then synthesizes the summaries repeatedly until it gets a final answer.

5. It displays the answer.

Here’s more detail on how it works.

### Preparing the journal entries

The first thing I needed to do was prepare the journal entries. I compiled them into a folder and—using GPTIndex’s GPTSimpleVectorIndex, a data structure—wrote a short script that could break them into chunks and store them in a way that made them easily searchable.

The code looks like this:

[PAYWALL]
