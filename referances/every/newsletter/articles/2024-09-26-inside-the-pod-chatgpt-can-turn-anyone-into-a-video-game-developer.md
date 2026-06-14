---
title: "Inside the Pod: ChatGPT Can Turn Anyone Into a Video Game Developer"
subtitle: "Yes, even if you don’t know how to code"
author: "Rhea Purohit"
date: 2024-09-26
column: podcast
url: https://every.to/podcast/inside-the-pod-chatgpt-can-turn-anyone-into-a-video-game-developer
paywalled: true
scraped_at: 2026-06-11T16:07:57.482Z
---

# Inside the Pod: ChatGPT Can Turn Anyone Into a Video Game Developer

*Yes, even if you don’t know how to code*

*As we conclude Every’s quarterly Think Week, our regularly scheduled stop-and-think period where we halt our writing and republish some of our standout pieces from the past, we wanted to end on a practical note. After each episode of our *AI & I* podcast, Every contributing writer ****Rhea Purohit ****walks our readers step-by-step through the process that host ****Dan Shipper**** and his guest go through on the show, recreating it so listeners can follow along. We’ll be back with new stories next week, including coverage of OpenAI’s DevDay on October 1. Until then, I leave you with Rhea’s write-up of *[Dan and Logan Kilpatrick’s fascinating attempt](https://every.to/podcast/chatgpt-can-turn-anyone-into-a-video-game-developer)* to build a video game using only ChatGPT. *

*ICYMI: We created eight custom wallpapers based on Every’s art for iPhone or Android. *[Download them for free](https://drive.google.com/drive/folders/1txPZiefdj-bfafiAAn61VwAJ4p07Y0WL)*.—*[Kate Lee](https://every.to/news/kate-lee-joins-every-as-editor-in-chief)

---

Ever since I started writing for a living, I’ve been on a mission to get more people to write. At the supermarket, I tell people about the joy in distilling opinions to words as they uncomfortably shuffle under the weight of heavy shopping bags. A majority of them confess they’ve never engaged with writing as adults and doubt their ability to do so. Writing is a superpower and, despite how many people feel, it doesn’t need to be intimidating, especially since we have more tools than ever to help articulate our thoughts.

However, I do understand being daunted by a skill that feels totally foreign. It’s how I feel about software. I don’t know how to code and wouldn’t even know where to begin.

[Dan Shipper](https://twitter.com/danshipper) and [Logan Kilpatrick](https://twitter.com/OfficialLoganK) believe that building software is a superpower. In this [conversation](https://every.to/chain-of-thought/how-to-make-a-video-game-with-chatgpt-in-60-minutes), they talk about how ChatGPT has enabled everyone to be a builder. They also walk the talk by making a video game called [Allocator](https://chat.openai.com/g/g-oooxUbOkj-allocator) with [ChatGPT](https://every.to/c/ai-guides) in less than an hour—all without writing a single line of code.

Logan was OpenAI’s first developer relations and advocacy hire, working to support the community of people building with ChatGPT, DALL-E, and the OpenAI API. (Since we recorded this episode, he announced [his departure](https://twitter.com/OfficialLoganK/status/1763580712874094693) from the company and [decision](https://www.businessinsider.com/google-ai-talent-war-big-win-logan-kilpatrick-openai-developers-2024-4) to join Google.)

A few months ago, OpenAI released [GPT Builder](https://chat.openai.com/gpts/editor), a tool that enables people to make custom GPTs tailored for pretty much [anything they want](https://openai.com/chatgpt#do-more-with-gpts). It’s what made Dan and Logan’s video game experiment possible. Logan says GPT Builder lowers the hurdles to innovation, especially for people like me who don’t know how to code.

If you’re a creative person who's always dreamed of bringing their ideas to life, follow along as Dan and Logan fulfill their shared childhood dream of building a video game using GPT Builder and ChatGPT.

Dan and Logan brainstormed ideas for what game they should build, landing on a text-based strategy game where players step into the shoes of a historical U.S. president and are tasked with managing the federal government’s budget.

First, we’ll give you Dan and Logan’s prompts, followed by screenshots from GPT Builder and ChatGPT. Our comments are peppered in using italics.

**Dan and Logan:** We want to make a game. The core concept is that you get to choose which president you want to be, and then ChatGPT will go and search the U.S. government budget, and distribution of spending in that budget, let the user reallocate the budget, and then play out the world with that updated allocation.

*GPT Builder takes on the role of a proactive guide in the game development process, suggesting that Dan and Logan start by choosing a name for the game.*

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3269/optimized_Screenshot%202024-09-27%20at%208.24.32%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3269/optimized_Screenshot%202024-09-27%20at%208.24.32%20AM.png)

*All screenshots courtesy of Dan Shipper and *[AI & I](https://youtu.be/3TLORk-eZAw?si=RXvkL3ELdAZs8T3s).

*Logan thinks a shorter name might be better than Budget Commander.*

**Dan and Logan:** I like a good one-word name, can you find one for me?

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3269/optimized_Screenshot%202024-09-27%20at%208.25.21%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3269/optimized_Screenshot%202024-09-27%20at%208.25.21%20AM.png)

*Allocato is not a bad name, but it prompts Dan to think of an even better one, Allocator, an ode to a recent topic of his writing: *[the allocation economy](https://every.to/chain-of-thought/the-knowledge-economy-is-over-welcome-to-the-allocation-economy)*.*

**Dan and Logan:** I like the name Allocator, let’s go with that.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3269/optimized_Screenshot%202024-09-27%20at%208.25.56%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3269/optimized_Screenshot%202024-09-27%20at%208.25.56%20AM.png)

*GPT Builder generates cover art for Allocator, but Dan and Logan don’t think it quite fits with the vibe of a historical video game.*

**Dan and Logan:** I don’t think that’s the vibe. This game is about historical events and the president allocating resources. Can we do something more like that?

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3269/optimized_Screenshot%202024-09-27%20at%208.26.29%20AM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3269/optimized_Screenshot%202024-09-27%20at%208.26.29%20AM.png)

*GPT Builder seems to have taken creative inspiration from the popular Nicolas Cage franchise *[National Treasure](https://en.wikipedia.org/wiki/National_Treasure_(franchise))*. That’s better, so Dan and Logan decide to forge ahead.*

**Dan and Logan:** Cool. This looks good. What’s next?

---

Become a [paid subscriber of Every](https://every.to/subscribe) to unlock this piece and learn about:

- From concept to playable prototype in an hour

- Leveraging GPT Builder and ChatGPT's synergy

- The importance of iteration in the building process

[Upgrade to paid](https://every.to/subscribe)

[PAYWALL]
