---
title: "The Agent That Saved My Brain"
subtitle: "How Every's growth lead built a command center in Claude Code"
author: "Austin Tedesco"
date: 2026-03-23
column: p
url: https://every.to/p/the-agent-that-saved-my-brain
paywalled: true
scraped_at: 2026-06-11T16:07:20.179Z
---

# The Agent That Saved My Brain

*How Every's growth lead built a command center in Claude Code*

*If your job involves toggling between a dozen apps and sources of data, this one’s for you. Every’s head of growth ****[Austin Tedesco](https://every.to/on-every/austin-tedesco-joins-every-as-head-of-growth)****—who will be the first to tell you he doesn’t have a technical background—used Claude Code to build an agent that handles the manual parts of his role. Here’s how he did it, what he learned, and how you can build your own. He’s also open-sourced the[compound knowledge plugin](https://github.com/EveryInc/compound-knowledge-plugin) that powers part of the system, inspired by ****[Kieran Klaassen](https://every.to/@kieran_1355)****’s [compound engineering](https://github.com/EveryInc/compound-engineering-plugin) system.—****[Eleanor Warnock](https://every.to/@eleanor_b03474_1)***

*Join us this [Friday for Every’s Q2 Demo Day](https://every.to/events/q2-2026-demo-day), where we’ll go deeper on how agents are changing the way we work via a brand new product we’re launching in beta. *

---

I was in a meeting recently when someone asked how the buttons on a new landing page were performing. Months earlier, that question would have sent me on a distracting dashboard scavenger hunt. Instead, I typed “Can you get the click-through and conversion numbers on these buttons?” into an agent in Slack and had the answer in a couple of minutes, complete with relevant context.

For years, a large part of growth jobs like mine involved searching for information across multiple surfaces, analyzing it, distilling it into a plan somewhere else, and then executing on it. Sifting through Slack for team updates. Pulling data sets from Stripe, PostHog, and ChartMogul. Importing planning documents into projects on Claude’s desktop app for manual analysis and then exporting them back to Notion to share with the team.

If you, like me, can’t have too many browser tabs open without losing your mind, that kind of regular context and tool switching chips away at productivity and creativity in meaningful ways. By the time you gather everything you need to think, you’re fried. You have nothing left for the decisions that matter.

I built an agent that fixed this for me. Its name is Montaigne. Most of what you hear about AI agents is that they get things done fast. And Montaigne is fast. But the reason why I can’t imagine working without it is that it allows me to have energy for the hard and fulfilling parts of my job. Montaigne keeps me sane.

Montaigne lives in Claude Code on my terminal and as an OpenClaw bot on Slack. It has access to everything I use for growth work, including Stripe, PostHog, Slack, Notion, Figma, the full Every product suite, email, and calendar. It also has knowledge layers built on context about the business and a bench of skills for repeat workflows, giving the agent the tools to use that access with tremendous power.

[![Montaigne is connected to all the tools that I use in my growth role. (All screenshots courtesy of Austin Tedesco.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4018/optimized_7379be05-f247-4e97-a509-6d18f9ff3b6c.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4018/optimized_7379be05-f247-4e97-a509-6d18f9ff3b6c.png)
*Montaigne is connected to all the tools that I use in my growth role. (All screenshots courtesy of Austin Tedesco.)*

[![Montaigne also has more than 80 skills that it can apply to the data it can access.](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4018/optimized_949354ce-b2cb-41dd-97ae-873aa6c9fe60.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4018/optimized_949354ce-b2cb-41dd-97ae-873aa6c9fe60.png)
*Montaigne also has more than 80 skills that it can apply to the data it can access.*

## Three weeks of playing

I could not have built Montaigne without first playing around with Claude Code for weeks. When I first opened Claude Code over the holidays, I went straight to building things I was personally excited about: a cooking companion app trained on your personal style, and a version of Fandango for indie movie theaters so I could stop checking six different websites to see what’s playing locally.

Those projects are what got me hooked, but they’re also what taught me the most. If you ask, the newest AI models are genuinely good at teaching you what they can do. When I didn’t know how to scrape for showtimes, I asked. When something didn’t work perfectly, I asked for alternatives and bug fixes. When I needed to connect a database and set up Google OAuth, I had Claude Code do it, but I also asked how it worked and why.

[PAYWALL]
