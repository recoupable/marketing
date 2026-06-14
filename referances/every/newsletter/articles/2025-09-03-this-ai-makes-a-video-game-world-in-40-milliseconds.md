---
title: "🎧 This AI Makes a Video Game World in 40 Milliseconds"
subtitle: "Decart cofounder Dean Leitersdorf built a model that edits live video as it streams—here’s what he learned building it"
author: "Rhea Purohit"
date: 2025-09-03
column: podcast
url: https://every.to/podcast/this-ai-makes-a-video-game-world-in-40-milliseconds
paywalled: false
scraped_at: 2026-06-11T16:07:35.488Z
---

# 🎧 This AI Makes a Video Game World in 40 Milliseconds

*Decart cofounder Dean Leitersdorf built a model that edits live video as it streams—here’s what he learned building it*

*TL;DR: Today we’re releasing a new episode of our podcast *[AI & I](https://every.to/podcast)*. ****[Dan Shipper](https://every.to/@danshipper)**** sits down with ****Dean Leitersdorf, ****cofounder and CEO of Decart, the creator of the only real-time video-to-video model in the world. ****Watch [on X](https://x.com/danshipper/status/1963285303977775193) or [YouTube](https://www.youtube.com/watch?v=E23cV48Iv9A), or listen on [Spotify](https://open.spotify.com/episode/5KRajxICmJwn5COzpWJp6c?si=axdEGq1XTwO9E9tSuKkMWg) or [Apple Podcasts](https://podcasts.apple.com/us/podcast/this-ai-makes-a-video-game-world-in-40-milliseconds/id1719789201?i=1000724784873). ****Here’s a link to the ****[episode transcript](https://every.to/podcast/transcript-this-ai-makes-a-video-game-world-in-40-milliseconds)****.*
*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

At first glance **[Dean Leitersdorf](https://x.com/DLeitersdorf)** looks like every other startup founder on a Zoom call: wavy hair, spectacles, a plain black t-shirt.
Then mid-sentence he’s transformed into a wizard conjuring light from his hands. A few seconds later, he’s a Lego figurine, spectacles now molded in yellow plastic. Each avatar looks just like him, mirroring his expressions and movements in real time, from adjusting his glasses to the exact sync of his lips as he speaks.
This shape-shifting—which Leitersdorf showed off in the video recording of this week’s *AI & I* with **Dan Shipper**—was made possible by [Mirage](https://mirage.decart.ai/), the only real-time video-to-video model in the world. Mirage can take a live video feed (like Leitersdorf speaking on Zoom) and instantly re-render every frame in a new style, without breaking flow. It’s editing reality as it happens.
Leitersdorf is the co-founder and CEO of [Decart](https://about.decart.ai/), a startup that makes Mirage. Decart recently [raised](https://fortune.com/2025/08/07/exclusive-decart-raises-100-million-at-a-3-1-billion-valuation-chasing-the-future-of-real-time-creative-ai/) $100 million at a $3.1 billion valuation as part of its push to usher in a new era of real-time generative experiences like this.
Mirage has obvious potential for how we play and design video games: Imagine creating endless variations on existing titles, like a *Barbie*-skinned *Minecraft*, or a brand-new game, taking a bare-bones vibe-coded prototype and instantly layering it with immersive textures and themes. But Leitersdorf also sees the beginnings of a new medium, a new experience created by AI.
Dan and Leitersdorf take a look at how Mirage works under the hood, and what the Decart team learned about the future of software while wrestling with its toughest research problems. They also debate [AGI](https://every.to/feeds/a630fe04be274eeef350/toward-a-definition-of-agi?ref=target-is-new.ghost.io)—how close it really is, what counts as progress, and what kind of society it might create.
You can check out their full conversation here:
[![](https://img.youtube.com/vi/E23cV48Iv9A/maxresdefault.jpg)

![](https://d24ovhgu8s7341.cloudfront.net/static/emails/youtube-logo.png)](https://www.youtube.com/watch?v=E23cV48Iv9A)
If you want a quick summary, here are some of the themes they touch on:

## The skeleton and muscle of modern software

Leitersdorf sees a fundamental divide in what traditional software and AI each do best. Classical code is best at handling problems that are discrete, exact, and brittle, where getting something almost right is the same as getting it totally wrong.
AI, on the other hand, is good at problems where approximate solutions are acceptable, and sometimes even preferred. Leitersdorf takes drawing an image of Dan as an example. “It’s fine if I'm missing a few things,” he says. “If your shirt's a bit off, if the wall behind you is slightly different, if your glasses are slightly bigger.”
This division suggests a hybrid future for software architecture, one that Mirage is built on. The traditional game engine handles the rigid logic, like remembering “you have exactly 71 gold coins in your pouch,” or that “you took this pickaxe and put it in that chest.” AI takes care of the flexible, creative parts, like giving *Grand Theft Auto V* a convincingly frigid winter filter.
Dan likens this to our own bodies, with traditional software like a skeleton that gives us structure and the ability to “stand up.” AI, meanwhile, is like muscles and tendons that add flexibility and movement. For the longest time, we could only build software that resembled “bones,” and AI has now enabled systems to bend and respond in fluid ways.

## The breakthroughs that make Mirage work

#### Videos come alive with speed

To make real-time video possible, Mirage had to process video fast, blazingly so. The way to do this, Leitersdorf explains, is “writ[ing] lots of very optimized GPU code.” Most developers who work with NVIDIA GPUs use something called [CUDA](https://developer.nvidia.com/cuda-zone), a programming toolkit that makes it easier to tell the GPU what to do. But the Decart team went a level deeper. Instead of going through CUDA, they wrote code directly in [PTX](https://developer.nvidia.com/blog/understanding-ptx-the-assembly-language-of-cuda-gpu-computing/), the GPU’s assembly language. That’s the computer’s native tongue: harder for humans to write, but much faster for the hardware to understand. This decision let them squeeze every ounce of performance out of the hardware. It’s how Mirage can process video with only a 40-millisecond delay today—with plans to shrink that to just 16 milliseconds.

#### How Mirage thinks like an LLM

The second problem Decart had to tackle was creating a new kind of model altogether. When you use AI video tools like Google Veo, for example, you prompt them, and they process it and generate a short video. Mirage generates videos frame by frame, almost like an [LLM predicting the next word in a sentence](https://every.to/chain-of-thought/how-language-models-work). To do that, it looks at two things at the same time: the live video it’s supposed to transform (say, a Zoom feed of Leitersdorf), and the video it has already generated up to that point (the running output). “You feed it in two video streams…and it needs to predict the next frame,” Leitersdorf says.

#### The error accumulation problem

Beyond speed and model architecture, the real test for the Decart team was stability. As Leitersdorf explains, early versions of Mirage were like GPT-2 or GPT-3.5: impressive for the first few back-and-forths, but eventually getting caught in a loop where they would repeat the same thing over and over again.
“We could easily get Mirage to be great for two to three seconds but then it slowly started to degrade and it got stuck in this loop… in a single color and your entire screen just became red or blue or green,” he says. Solving this ["error accumulation"](https://x.com/ylecun/status/1640123182983045120) problem—called such because with every frame, tiny mistakes pile up, gradually pushing the model further away from the patterns it was trained to follow—took six months and thousands of experiments.

## What will a world with AGI look like?

Questions about that small, uncontroversial topic—AGI—sparks a friendly back-and-forth between Dan and Leitersdorf. Leitersdorf argues that economic AGI—when machines “are able to do any economic job better than all of us, or better than the vast majority of humanity”—is just 12 to 18 months away. When asked what a world like that might look like, he draws an analogy to how democracy came to be in ancient Greece: As technology improved, it lightened the burden of farming, giving people time to think—and their minds turned toward philosophy and governance.
Skeptical of Leitersdorf's timeline, Dan pushes back. He agrees that AI can outperform humans in specific tasks if properly prompted, but stresses that “given the right prompt” is the crux of the problem. AI still can’t reliably direct itself. To him, a [better definition of AGI](https://every.to/feeds/a630fe04be274eeef350/toward-a-definition-of-agi?ref=target-is-new.ghost.io) is “when it is economically profitable to leave your AI on all the time.” Getting there, he argues, will require AI systems capable of continuous learning—being able to update their own weights, adapt to new information, and refine themselves over time—rather than just relying on better prompting. Without that ability, AGI remains years away.
When pressed on this point, Leitersdorf reframes his position: “So I think that maybe a different way to phrase it is there's a chance in 12 to 18 months, AI lets us be so productive that we're able to create companies that are just way bigger than anything we saw so far.” He takes the example of the first trillion-dollar company ever, Apple, in 2017, to the 10 that exist today, predicting that AI could create so much value that the stock market might double.
Dan ties this back to Athens: Democracy flourished in Athens because it was a society of [generalists](https://every.to/chain-of-thought/why-generalists-own-the-future), where citizens had to wear many hats—statesman, lawyer, prosecutor, juror, warrior—all at once. That balance broke down when Athens grew into an empire, the equivalent of a trillion-dollar corporation, where specialization became necessary to manage scale. Specialization enabled progress but diminished the generalist ethos, a pattern that has carried through Western society ever since. He argues that AI could change this: With “a thousand specialists in your pocket,” individuals and small teams can stay generalists for longer, blurring roles and doing more across domains.
What do you use AI for? Have you found any interesting or surprising use cases? We want to hear from you—and we might even interview you.
Here’s a link to the [episode transcript](https://every.to/podcast/transcript-this-ai-makes-a-video-game-world-in-40-milliseconds).
You can check out the episode on X, Spotify, Apple Podcasts, or YouTube. Links are below:

1.
[Watch on X](https://x.com/danshipper/status/1963285303977775193)

2.
[Watch on YouTube](https://www.youtube.com/watch?v=E23cV48Iv9A)

3.
[Listen on Spotify](https://open.spotify.com/episode/5KRajxICmJwn5COzpWJp6c?si=axdEGq1XTwO9E9tSuKkMWg) (make sure to follow to help us rank!)

4.
[Listen on Apple Podcasts](https://podcasts.apple.com/us/podcast/this-ai-makes-a-video-game-world-in-40-milliseconds/id1719789201?i=1000724784873)

Miss an episode? Catch up on Dan’s recent conversations with founding executive editor of *Wired* **[Kevin Kelly](https://every.to/podcast/how-to-predict-the-future-like-kevin-kelly)**, star podcaster **[Dwarkesh Patel](https://every.to/chain-of-thought/dwarkesh-patel-s-quest-to-learn-everything)**, LinkedIn cofounder **[Reid Hoffman](https://every.to/chain-of-thought/reid-hoffman-on-how-ai-might-answer-our-biggest-questions)**, ChatPRD founder **[Claire Vo](https://every.to/podcast/she-built-an-ai-product-manager-bringing-in-six-figures-as-a-side-hustle-e46be9bc-f426-424d-992d-5a71fd7ac5e4)**, economist **[Tyler Cowen](https://every.to/chain-of-thought/economist-tyler-cowen-on-how-chatgpt-is-changing-your-job)**, writer and entrepreneur **[David Perell](https://every.to/chain-of-thought/how-david-perell-uses-chatgpt-to-write-for-millions)**, founder and newsletter operator **[Ben Tossell](https://every.to/chain-of-thought/how-to-run-a-profitable-one-person-internet-business-using-ai)**, and others, and learn how *they* use AI to think, create, and relate.
If you’re enjoying the podcast, here are a few things I recommend:

1.
[Subscribe](https://every.to/subscribe) to Every

2.
Follow [Dan](https://twitter.com/danshipper) on X

3.
Subscribe to Every’s [YouTube channel](https://www.youtube.com/@EveryInc)

---

***Rhea Purohit**** is a contributing writer for Every focused on research-driven storytelling in tech. You can follow her on X at [@RheaPurohit1](https://twitter.com/RheaPurohit1) and on [LinkedIn](https://www.linkedin.com/in/rhea-purohit-517441198/), and Every on X at [@every](https://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*
*We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with ****[Spiral](https://spiral.computer/?utm_source=everyfooter)****. Organize files automatically with ****[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)****. Deliver yourself from email with ****[Cora](https://cora.computer)****.*
*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*
*Get paid for sharing Every with your friends. Join our [referral program](https://every.getrewardful.com/signup).*
[Subscribe](https://every.to/subscribe?source=post_button)
