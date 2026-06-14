---
title: "Introducing Our First Synthetic Show: ‘TLDR’"
subtitle: "Your business is an epic story. Tell it with ‘TLDR.’"
author: "Dan Shipper"
date: 2024-12-11
column: p
url: https://every.to/p/introducing-our-first-synthetic-show-tldr
paywalled: false
scraped_at: 2026-06-11T16:07:52.400Z
---

# Introducing Our First Synthetic Show: ‘TLDR’

*Your business is an epic story. Tell it with ‘TLDR.’*

*TLDR: We’re launching a new show called *TLDR*. It’s a 3-5 minute AI-generated [podcast](https://every.to/c/ai-frontiers) that quickly catches you up on meetings you missed at your company. We’re releasing our internal Every *TLDR* for you to listen to on *[YouTube](https://www.youtube.com/playlist?list=PLuMcoKK9mKgH_yMb3JH1_oXfBKRnQQyPz)*, *[Spotify](https://open.spotify.com/show/6zSJrKyv438FOb0Ou3YNyS?si=5dbdf099b5044f60)*, *[or X](https://x.com/danshipper/status/1866863063095275814)*. If you want to bring *TLDR* to your company, you can apply to be an early design partner. Preference goes to Every paid subscribers:*

[Bring ‘TLDR’ to your company](https://dub.sh/tldr)

---

Today, we’re launching a new experiment: a synthetic show called *TLDR* about what’s going on inside our business—and yours.
***TLDR*** is a 3-5 minute AI-generated podcast that quickly catches you up on meetings you missed at your company. It’s an easy way to stay up to date on what’s going on at work without having to scroll through endless Slack feeds and email chains, or listen to long meeting recordings.
It takes any meeting recording and turns it into short, compelling (and sometimes spicy!) recap. It’ll tell you key decisions that were made and action items taken. It replays short clips of key moments from the meeting so you can skip the small talk and quickly catch up what’s going on at your company—hands-free.

## How synthetic shows work

***TLDR*** is what we call a synthetic show: a new kind of podcast generated with AI by a product we’ve built in house.
In the past, our writers and producers wrote and edited every story and podcast we published. Instead, with a synthetic show, they pour everything they know about making great podcasts into the *prompts* that become the show. Then, you bring the raw material—your company’s communications. Together, we make a story.
It’s a way for us to spread Every’s storytelling to any business in the world. We believe every company has an epic story—and synthetic shows can tell yours.
*TLDR* is an experiment, but if it works, we’ll produce more shows about your company for both internal and external consumption: Think Sunday strategy deep dives, *How It’s Made*-style explainers, or *Acquired*-style histories.

####

##### Automatically turn 1 piece of content into 10—in your voice

You’re probably creating more than ever before—writing essays, recording podcasts, promoting your work on social media. We want to make it easier for you to move fast. Use **Spiral**, our tool to automate 80 percent of the repeat work that comes after creating—social media posts, YouTube descriptions, newsletter blurbs, and more.

[Automate your content workflows today](https://spiral.computer/?utm_source=everyfooter)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#b9cac9d6d7cad6cbcad1d0c9caf9dccfdccbc097cdd6).

## Listen to our internal Every ‘TLDR’

We want you to get a sense of what *TLDR* is, so we’re making our internal Every *TLDR* available publicly for you to listen to.
It tells the story of our weekly [Every Studio](https://every.to/p/introducing-every-studio) standup where all of our entrepreneurs in residence (including Naveen Naidu, the EIR who built *TLDR*) meet to discuss what they’re working on.
The episodes are fun to listen to. I’m always slightly nervous and excited to hear a colleague's name mentioned, and to hear how the show summarizes what they said and how they said it—it’s like how it would feel to see or hear them on TV or on the news. There’s something different and compelling about having the inner workings of your company reflected back to you in this way. And it’s useful—I genuinely stay better informed about what’s going on inside of Every with TLDR.
All of the recordings are available publicly on [YouTube](https://www.youtube.com/playlist?list=PLuMcoKK9mKgH_yMb3JH1_oXfBKRnQQyPz), [Spotify](https://open.spotify.com/show/6zSJrKyv438FOb0Ou3YNyS?si=5dbdf099b5044f60), [and X](https://x.com/danshipper/status/1866863063095275814).

[![](https://i.ytimg.com/vi/P1PkKlBm5z4/hqdefault.jpg)

![](https://d24ovhgu8s7341.cloudfront.net/static/emails/youtube-logo.png)](https://www.youtube.com/watch?v=P1PkKlBm5z4&list=PLuMcoKK9mKgH_yMb3JH1_oXfBKRnQQyPz&index=1)

Now that we have *TLDR* working internally at Every, we want to bring it to you. We’re looking for 10 early adopters to work with us as design partners—to help us tell stories about your company as a synthetic show. We’ll give preference to paid Every subscribers (so [subscribe](https://every.to/subscribe)!) and people working at companies we think are interesting:

[Bring ‘TLDR’ to your company](https://dub.sh/tldr)

*TLDR* was built end-to-end as an experiment by Every EIR Naveen Naidu, who’s been working at the intersection of podcasts and tech for a while. He came to Every working on a product called PodBrew, which turned news articles into podcasts, and we evolved it into TLDR.
If you’re curious about synthetic shows, here’s a bit more about how and why we built *TLDR*.

## How we built ‘TLDR’

You’ve probably seen AI-generated podcasts through products like NotebookLM, which turns your uploaded source documents into an NPR-style show. When Naveen started working on the original version of *TLDR*, we thought it would be pretty easy to build something of similar quality.
But it turns out, making a great synthetic show is challenging. It requires both building a technology pipeline to turn meeting transcripts into first scripts and then audio—*and* great prompting to make the scripts good.

### The models we used

Naveen tested three different models for script generation: GPT-4o, Claude, and Gemini 1.5 Pro. He found that Claude was a better writer than 4o, but that it often missed interesting or important pieces of the transcript when creating the script. Gemini was best for consistently pulling out everything important and seemed to pay better attention to all of the different parts of the context.
For simplicity, he stuck with Claude because it’s the best writer, but in future versions we may use a mix of models.
Naveen also tested a few different voice models, including those from OpenAI, ElevenLabs, and Google AI Studio. But he ended up picking Play.ai because the voices sound more natural and conversational. They felt more appropriate for the kind of vibe we were trying to create.

### Model pipeline

In order to generate the script for the show from the meeting transcripts, we use a cascading prompt system with three prompts: introduction, body, and outro sections.
First, we generate the introduction. We feed the meeting transcript and our intro prompt into Claude. The intro prompt is a few-shot prompt that contains a script written by Every lead writer [Rhea Purohit](https://every.to/@rhea_5618).
Once we’ve generated the intro, we feed it—along with the original meeting transcript—back into Claude and prompt it to generate the body of the script. This is where the host summarizes the meeting in detail.
Then we take the intro and body and pass it back one more time to Claude to generate a conclusion. Once the whole script is generated, we pass it to Play.AI to create the audio.

### How it all comes together

We record our meetings in Zoom and use Zapier to post the meeting transcript into our synthetic show creation tool. About an hour after any meeting finishes, we get a notification in our Spotify and Apple Podcast players that a new episode is live.
It’s a pretty cool experience! I listen while I’m walking to get coffee in the morning.

## Why we built ‘TLDR’

A year and a half ago [I wrote](https://every.to/chain-of-thought/we-re-building-ai-into-our-media-business):

> “From the beginning of Every, we’ve noticed that the best ideas in business are never written down—they’re locked up in people’s heads…Part of the mission of Every is to bring these ideas to life on the page—but for now, it’s been slow, difficult, and expensive…AI changes this equation significantly.”

Ever since then, we’ve been looking for a way to put this idea into practice. When NotebookLM’s AI-generated podcasts came out, I realized the time might have finally come. *TLDR* and synthetic shows are our first foray into this territory—expect to see more in the months and years to come.
We believe every business has a story, but, unfortunately, most never get told.
Together, we hope to change that.

[Listen to ‘TLDR’](https://x.com/danshipper/status/1866863063095275814)

---

***Dan Shipper**** is the cofounder and CEO of Every, where he writes the *[Chain of Thought](https://every.to/chain-of-thought)* column and hosts the podcast* [AI & I](https://open.spotify.com/show/5qX1nRTaFsfWdmdj5JWO1G). *You can follow him on X at *[@danshipper](https://twitter.com/danshipper)* and on *[LinkedIn](https://www.linkedin.com/in/danshipper/)*, and Every on X at *[@every](https://twitter.com/every)* and on *[LinkedIn](https://www.linkedin.com/company/everyinc/)*.*
*We also *[build AI tools](https://every.to/studio)* for readers like you. Automate repeat writing with *[Spiral](https://spiral.computer/?utm_source=everyfooter)*. Organize files automatically with *[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)*. Write something great with *[Lex](https://lex.page/?utm_source=everyfooter)*.*

[Subscribe to Every](https://every.to/subscribe)
