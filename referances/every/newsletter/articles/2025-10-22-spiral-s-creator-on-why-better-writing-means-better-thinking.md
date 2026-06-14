---
title: "🎧 He Built an AI Ghostwriter With Taste"
subtitle: "Spiral creator Danny Aziz on building an AI writing partner that sounds like you—and helps you think"
author: "Rhea Purohit"
date: 2025-10-22
column: podcast
url: https://every.to/podcast/spiral-s-creator-on-why-better-writing-means-better-thinking
paywalled: false
scraped_at: 2026-06-11T16:07:31.701Z
---

# 🎧 He Built an AI Ghostwriter With Taste

*Spiral creator Danny Aziz on building an AI writing partner that sounds like you—and helps you think*

*TL;DR: Today we’re releasing a new episode of our podcast *[AI & I](https://every.to/podcast)*. ****[Dan Shipper](https://every.to/@danshipper)**** sits down with ****Danny Aziz****, general manager of ****[Spiral](http://writewithspiral.com)****, an AI writing partner informed by Every’s editorial tastes—the latest version of which launched yesterday. ****Watch [on X](https://x.com/danshipper/status/1981012669629906997) or [YouTube](https://www.youtube.com/watch?v=U2a0xDcqsoU), or listen on [Spotify](https://open.spotify.com/episode/1917MObMnGcKInx5MutRgI) or [Apple Podcasts](https://podcasts.apple.com/us/podcast/spiral-designing-an-ai-ghostwriter-with-taste/id1719789201?i=1000732993129). ****Here’s a link to the [episode transcript](https://every.to/podcast/transcript-spiral-s-creator-on-why-better-writing-means-better-thinking).*
*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

**[Danny Aziz](https://every.to/@dannyaziz97)** loves AI but he hates what many people end up doing with it: make ["slop."](https://every.to/napkin-math/feasting-at-the-trough-of-ai-slop)
Creation—whether it’s writing or code—has always demanded thought, that uncomfortable work of staring at a blank screen and figuring out how something should exist. With AI, the path of least resistance is to gleefully skip over that step. It’s easier than ever to generate words that sound just fine but mean nothing, and to flood the internet with software that’s never received a moment of care.
That doesn’t mean we need to retreat into caves built in the time before ChatGPT launched. Danny has staked out a clear middle ground: Use AI, but don’t outsource your judgment; use the tools with care and intention.
In this episode of *AI & I*, **Dan Shipper** talks to Danny about how this philosophy shaped every decision in the new version of **[Spiral](http://writewithspiral.com)**, an AI writing tool that pushes you to think better—and, as a result, write better. They also talk about how this plays into the engineering workflow he used to build Spiral itself, and everything Danny learned about cajoling AI to write well. Here is a link to the [episode transcript](https://every.to/podcast/transcript-spiral-s-creator-on-why-better-writing-means-better-thinking).
You can check out their full conversation here:
[![](https://img.youtube.com/vi/U2a0xDcqsoU/maxresdefault.jpg)

![](https://d24ovhgu8s7341.cloudfront.net/static/emails/youtube-logo.png)](https://www.youtube.com/watch?v=U2a0xDcqsoU)
Here are some of the themes they touch on:

## AI that helps you think by design

While most AI writing tools rush to turn your half-baked thoughts into a handful of slightly different drafts, Spiral takes the opposite approach: It slows you down.

#### Get clear on what you want to say

Before Spiral helps you write, it works to understand your ideas, mirroring the process of any ghostwriter worth their salt. When you open a “Workspace”—the Spiral equivalent of a project in ChatGPT or Claude—it draws on the context of your past conversations and documents. Danny opened one tied to Spiral itself and told it that he was preparing for a podcast about the app. After reflecting on what it knew about itself, Spiral suggested different directions that the conversation could take. Danny steered it toward the story of Spiral’s development, and it followed up with targeted questions, like: What was the first thing you tried differently? How many iterations were there? What surprised you about what makes writing good?
This kind of questioning helps you move past the surface of an idea into deeper, more specific territory. “We had an early user who said… that Spiral helped him go downstream from the original thought that he shared with [it],” Danny says, “as opposed to [Spiral] just repurposing the original thought that he shared.”
With a ghostwriter, there’s a mutual discovery process between writer and subject: asking questions, listening closely, teasing out what really needs to be said. The team built Spiral to do the same. If you’ve worked with Spiral before and it knows your voice, it can move quickly. If not, it takes the time to get to know you. And under the hood, the questions Spiral asks are prompted by a rule of thumb from improv called ["Yes, and…"](https://en.wikipedia.org/wiki/Yes,_and...) that’s designed to encourage free sharing of ideas.

#### Good writing starts with better thinking

When you’re collaborating with another person—whether in writing, engineering, or design—it helps to know how they think. Spiral is designed so you can easily know its mind; it uses a reasoning model, and shows you the path it followed to arrive at its output.
While many LLMs hide the model’s thinking behind a dropdown or a toggle, as an intentional design choice, the reasoning in Spiral is visible by default. You can see it think through your question step by step in a running commentary, which makes it easier to spot when it misunderstands you—or when it lands on an insight you hadn’t seen yourself.
“We're calling it a writing partner,” Danny says, “and I think that word partner is really important. It's one of the principles we've anchored everything around.” Spiral is opinionated software, built around his belief that good writing requires good thinking, and that you can’t separate one from the other.

#### See where your idea can go before deciding where to take it

Part of what Spiral tries to preserve in the writing process is the feeling of exploring an infinite canvas of possibilities; Dan likens it to a tree. Every idea, Dan thinks, can branch into countless directions—and an AI writing partner should help you see those branches, not collapse them into a single “best” answer.
Building on that metaphor, Spiral’s AI offers three different directions you can take. This requires the app to hold a lot of context, and through early experiments, Danny discovered that even the largest LLMs, with their million-token context windows, weren’t paying attention to everything they contained. In plain terms, even though these models can technically “read” a huge amount of text at once, they still struggle to keep track of all the details in it.
The solution was to turn Spiral into a multi-agent system. One agent—the interviewer—asks questions, while the other—the writer—takes over when it’s time to draft. Both the LLMs share the same context, so nothing gets lost in translation.

## How Danny builds AI without sacrificing his craft

For Danny, working with AI hasn’t diluted his craft; the tools may change, but the discipline of making good choices has stayed the same in his workflow.

#### The craft is in the choices, not the code

As Danny began using AI tools to code, he found himself shedding the identity of the traditional engineer—“I'm going to use [the old school text editor] [Vim](https://www.vim.org/) and I'm going to write code”—and embracing a broader one— “I’m somebody who just makes things.” “I clearly care about the end product,” he says, “but I don't care if I have an agent writing the code or if I'm writing the code. As long as it's good code and it does what I want it to do, does it really matter?”
That mindset reframes craftsmanship as a matter of judgment, not authorship. It shifts focus toward developing an instinct for when something feels right—whether it’s a line of code, a button, or the spacing on a page. “LLMs can skin a cat a million different ways; there are probably only a handful that… actually fit the way that you want it to do.” The act of measuring twice and cutting once is what defines his craft, no matter who—or what—holds the tools.

#### Danny’s workflow with his favorite AI coding tool

One of the tools Danny relies on most these days is [Droid](https://factory.ai/)—a command-line interface that lets him switch between OpenAI’s [GPT-5](https://every.to/vibe-check/gpt-5), Anthropic’s models, and others with ease. What stands out is how it feels to use. Danny says the team behind Droid seems to have figured out the ergonomics: how to prompt each model, how to give it the right tools, how to make it work with the grain of its own reasoning style. “I will literally have the same type of request inside Claude Code and another one inside Droid,” he says, “and Droid will just do so much better with the same model.”
Danny rarely uses a single agent in isolation—he’s almost always running several in parallel. Instead of waiting around for a model to finish, he splits his terminal into multiple panes, each working on something different. In one, the AI might be fixing a stubborn bug; in another, editing copy; in a third, experimenting with prompts inside a Python notebook. “The worst habit I got into,” he says, “was scrolling Twitter while waiting for an agent to complete. That’s a productivity killer.” Working this way keeps him in a kind of steady flow.
What do you use AI for? Have you found any interesting or surprising use cases? We want to hear from you—and we might even interview you.
Here’s a link to the episode transcript.

##### Timestamps

1.
Introduction: 00:01:00

2.
How Danny used Spiral to prepare for this podcast: 00:05:26

3.
Why slowing down makes AI writing better: 00:08:29

4.
The agents working under the hood for Spiral: 00:13:42

5.
How Spiral helps you explore the canvas of possibilities: 00:14:46

6.
Why Danny pivoted away from the old version of Spiral: 00:24:41

7.
How to use AI without losing your craft: 00:31:51

8.
Danny’s workflow for building Spiral as a solo engineer: 00:34:55

9.
Code with AI while staying in control: 00:40:39

10.
What Danny learned about getting AI to write well: 00:45:26

11.
How Danny used DSPy to give AI taste: 00:47:52

12.
Dan versus AI Dan: Can the machine match the man?: 00:56:16

You can check out the episode on X, Spotify, Apple Podcasts, or YouTube. Links are below:

1.
[Watch on X](https://x.com/danshipper/status/1981012669629906997)

2.
[Watch on YouTube](https://www.youtube.com/watch?v=U2a0xDcqsoU)

3.
[Listen on Spotify](https://open.spotify.com/episode/1917MObMnGcKInx5MutRgI) (make sure to follow to help us rank!)

4.
[Listen on Apple Podcasts](https://podcasts.apple.com/us/podcast/spiral-designing-an-ai-ghostwriter-with-taste/id1719789201?i=1000732993129)

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
*We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with ****[Spiral](https://writewithspiral.com/)****. Organize files automatically with ****[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)****. Deliver yourself from email with ****[Cora](https://cora.computer)****. Dictate effortlessly with ****[Monologue](https://monologue.to)****.*
*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*
*Get paid for sharing Every with your friends. Join our [referral program](https://every.getrewardful.com/signup).*
[Subscribe](https://every.to/subscribe?source=post_button)
