---
title: "Generative AIs Narrow the Taste Gap"
subtitle: "Musings from the frontier of AI and the written word"
author: "Dan Shipper"
date: 2022-11-04
column: chain-of-thought
url: https://every.to/chain-of-thought/generative-ais-narrow-the-taste-gap
paywalled: true
scraped_at: 2026-06-11T16:08:30.312Z
---

# Generative AIs Narrow the Taste Gap

*Musings from the frontier of AI and the written word*

#### Sponsored By: Insidetracker

[InsideTracker](https://info.insidetracker.com/every) is a [personalized nutrition platform](https://info.insidetracker.com/every) that analyzes data from your blood, DNA, and workouts to help you optimize your body for peak performance.

For a limited time, Every readers can get 20% off the entire [InsideTracker](https://info.insidetracker.com/every) store with discount code **EVERY20.**

[Get 20% Off](https://info.insidetracker.com/every)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#0172716e6f726e7372696871724164776473782f756e).

[AI](https://every.to/c/ai-and-gpt3) that writes like the average English speaker is fine. But AI that writes like you is magical.

When Nathan was building the earliest versions of [Lex](https://lex.page/), Every’s AI-powered writing tool, we wanted it to eventually be able to write in the voice of whoever was using it. That seemed doable, but like it would also require lots of fine-tuning to get it to work.

As we played with Lex we noticed something strange: it could already write in anyone’s voice—no training required.

[![](https://pbs.twimg.com/profile_images/1581741530083123202/1Zv6udlL_normal.jpg)
Ben Basche@basche42

OK. I just had my first "magic moment" with https://t.co/s4V7bgUGJt where it added one perfect sentence to complete the thought I had but couldn't fully articulate @nbashaw

November 2nd 2022, 5:35am EST
1 Likes](https://twitter.com/basche42/status/1587755357019033603)

To be sure, it’s not perfect. Depending on your writing style it might be better or worse at doing completions. But if you feed a Zen koan into Lex, it will output a koan. And if you feed Twitter hustle porn into Lex, it will output Twitter hustle porn.

This is a big part of Lex’s “wow” moment. It’s a lot like looking in a mirror for the first time. You’re seeing something familiar but also totally unexpected.

There’s a strangeness to seeing a machine write something that you *could have said* or *could have thought* but haven’t yet. Even stranger is the idea that the machine doing it doesn’t know anything about who you are or what you think except a few lines of input text…yet it seems to be able to write as you better than any professional ghostwriter could.

I want to talk about how this is even possible, and also what its implications are. Technology is redrawing the lines around what it means to be a writer—who writers are and what they do. It’s also narrowing the taste gap—the gap between what you hope to make and what your skills allow for—by making it easier for writers to write great stuff without years of trial and error.

The coming shift is going to be profound.

## How to sound like me

Here’s a very high-level explanation for how GPT-3 does text completion:

GPT-3 looks at the text that came before the point where you want completion and predicts what words are most likely to come next. In order to do this, it uses a statistical model to learn the associations between words and word sequences. The model is trained on lots and lots of source data (basically everything on the entire internet) to predict what comes next from what comes before.

How does this apply to me?

It might seem like an intractable task to figure out how to write sentences that sound like me. After all, after any sentence I write there’s an infinite number of sentences that could follow it.

But Lex shows that if you think about this problem probabilistically, it’s not as impossible as it seems.

To make this easier to think about, you might think of the set of possible sentences as an infinite space. Any particular point in the space represents a sentence that could follow the one I just wrote.

Given that the space is infinite, in principle, it should be hard for a machine to find a sentence in that space that’s close to the one I would’ve written on my own. But in practice, it seems that I (and everyone else) like to play around in a comparatively small corner of all of the possible sentences that we could write.

For example, the sentences that follow from whatever I’m writing are very likely to follow the rules of English grammar (with some minor exceptions 😉.) That narrows down the possibility space by a *lot*. But technically, its size is still quite large.

There are more constraints, though, than meet the eye.

[PAYWALL]
