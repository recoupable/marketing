---
title: "I Built an AI Chatbot Based on My Favorite Podcast"
subtitle: "Here’s how I built it and what I learned about the future"
author: "Dan Shipper"
date: 2022-12-16
column: chain-of-thought
url: https://every.to/chain-of-thought/i-trained-a-gpt-3-chatbot-on-every-episode-of-my-favorite-podcast
paywalled: true
scraped_at: 2026-06-11T16:08:27.802Z
---

# I Built an AI Chatbot Based on My Favorite Podcast

*Here’s how I built it and what I learned about the future*

#### Sponsored By: Reflect

This article is brought to you by [Reflect](https://reflect.app/?utm_source=every&utm_campaign=every2&utm_medium=newsletter), a beautifully designed note-taking app that helps you to keep track of everything, from meeting notes to Kindle highlights.

[Learn More](https://reflect.app/?utm_source=every&utm_campaign=every2&utm_medium=newsletter)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#2f5c5f40415c405d5c47465f5c6f4a594a5d56015b40).

*Update: if you want to use the chat bot mentioned in this article, it's available for Every subscribers here:*

[Get the Chat Bot](https://every.to/p/access-to-our-science-chat-bot)

---

In the future, any time you look up information you’re going to use a [chatbot](https://every.to/c/ai-and-gpt3). This applies to every piece of information you interact with day to day: personal, organizational, and cultural.

On the personal side, if you're trying to remember an idea from a book you read, or something a colleague said in a meeting, or a restaurant a friend recommended to you, you’re not going to dig through your second brain. Instead, you’re going to ask a chatbot that sits on top of all of your notes, and the chatbot will return the right answer to you.

On the organizational side, if you have a question about a new initiative at your company, you’re not going to consult the internal wiki or bother a colleague. You’re going to ask the internal chatbot, and it will return an up-to-date, trustworthy answer to you in seconds.

On the cultural side, if you want to know what your favorite podcaster says about a specific topic, you’re not going to have to Google them, sort through an episode list, and listen to a two-hour audio file to find the answer. Instead, you’ll just ask a chatbot trained on their content library, and get an answer instantly.

This future may seem far out, but it’s actually achievable right now. I know, because I just built a demo over the weekend. And it already works.

.   .   .

I love listening to the [Huberman Lab podcast](http://hubermanlab.com/), a neuroscience podcast by Stanford neurobiologist Andrew Huberman. It’s got a good mix of interesting science and actionable advice to improve how your brain and body operate.

Unfortunately, the episodes are also very long—each one averages a few hours. I often have a specific question related to something that he's already covered, but it's a pain to go back and try to find the answer by scrubbing through old episodes.

So I made a solution over the weekend: a *Huberman Lab* chatbot using GPT-3.

[![](https://pbs.twimg.com/profile_images/1462558295814807559/SRk1KwWS_normal.jpg)
Dan Shipper 📧@danshipper

I made a chatbot based on @hubermanlab! Ask it any question and it will scan through Huberman Lab podcast transcripts and return the answer using GPT-3.(You can even ask it if Cell Press journal is high quality or not....😉)

![](https://pbs.twimg.com/ext_tw_video_thumb/1602126140814106626/pu/img/e6MzpbJT7a50vrdc.jpg)

![](/packs/media/components/quilljs/tweet/play-285d23947da53f3cc0e095b225553e45.png)

December 11th 2022, 9:21pm EST

36 Retweets358 Likes](https://twitter.com/danshipper/status/1602126357953142784)

It was simple to build, and it can already answer questions plausibly well. I can ask questions about topics that the podcast has covered in the past, and it answers them using transcripts of old episodes as an information source.

Here’s a quick example. Dr. Huberman recently did an episode on the science of creating and maintaining habits. One of his suggestions is to do “task bracketing” to help create habits—a phrase I’ve had in my head to try since I listened to the episode, but I can’t remember exactly what it means.

Usually, I’d have to go and re-listen to the episode to answer the question. But instead I asked Huberman bot:

> ***Me: ****Can you describe how to do task bracketing?*

> ***Huberman bot: ****Task bracketing involves dividing the 24-hour day into three phases: phase one (0 to 8 hours after waking up), phase two (8 to 16 hours after waking up), and phase three (16 to 24 hours after waking up). Place particular habits at particular phases of the day in order to engage the task-bracketing mechanisms. This will make it more likely that you will be able to regularly engage in these habits and activities over a long period of time. Additionally, positively anticipate the onset and the offset of the session and reward yourself for the entire experience. This will help shift your nervous system toward being able to predict that certain things are going to happen at particular times of day.*

> ***Me: ****Why do I divide the day into three phases when I'm doing task bracketing?*

> ***Huberman bot: ****Dividing the day into three phases when doing task bracketing is useful because it allows you to leverage neural systems in order to help you make it more likely that you're going to be able to engage and maintain a particular habit. Phase one (0-8 hours after waking) is useful for acquiring certain habits, phase two (9-14/15 hours after waking) is useful for acquiring other types of habits, and phase three (16-24 hours after waking) is useful for calming activities.*

[PAYWALL]
