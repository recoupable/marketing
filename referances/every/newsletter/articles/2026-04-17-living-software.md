---
title: "Living Software"
subtitle: "AI has made software disorienting. It doesn’t have to be."
author: "Jack Cheng"
date: 2026-04-17
column: p
url: https://every.to/p/living-software
paywalled: true
scraped_at: 2026-06-11T16:07:18.008Z
---

# Living Software

*AI has made software disorienting. It doesn’t have to be.*

*Why do constant updates fill us with dread in some apps, while we greet the daily evolution of an AI agent with more curiosity? ****[Jack Cheng](https://every.to/@jackcheng)****, Every’s senior editor, explores that tension through a clarifying distinction: “tool-like software,” which we expect to be stable and consistent, versus “living software,” which we expect to grow and adapt. Read on for his practical advice for builders of both.—[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief)*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

Lately, I’ve been wishing that more software had a “freeze” button.

When pressed, the product would crystalize in its present state. The feature set would lock, and the interface would solidify, as if [dipped in carbonite](https://starwars.fandom.com/wiki/Carbon-freezing). There would be no more new updates. No changes whatsoever.

I want this button because companies are loading apps with more and more features, whether AI or the result of AI-accelerated development, making the tools unrecognizable. The additions are even more jarring for apps that I only use occasionally, like Figma. There, a chat box now beckons to describe my idea to make it come to life. A “Recents” toolbar above it has buttons for Figma Sites, Figma Buzz, and Figma Make—all [launched last May](https://www.figma.com/blog/config-2025-recap/). A sidebar module encourages me to try an AI image- and video-generation product called [Figma Weave](https://www.figma.com/blog/welcome-weavy-to-figma/)—and which I have to log into separately using my Figma account.

And here I am just trying to update the gradient on an app icon.

At the same time, my [Claw](https://every.to/guides/claw-school), Pip, gets new releases almost daily. I wake up, and Pip suddenly knows kung fu—or if not kung fu, [how to dream](https://every.to/context-window/every-is-half-agent-now). Sometimes, the same updates send me on [daylong bug hunts](https://every.to/p/i-hired-an-ai-to-do-my-chores-now-i-maintain-the-ai), locking me out of a product I rely on to help plan my week, coordinate my family calendar, write code, and brainstorm marketing ideas for my friend’s [Delorean rental](https://turo.com/us/en/car-rental/united-states/marina-del-rey-ca/delorean/dmc-12/335668). Still, I find myself wondering, regularly, “What new thing can Pip do now?”

Why do I loathe change for the first case and forgive—or even embrace—it in the second?

It’s because the first case is software that I want to use for a specific purpose. Half-baked AI features pumped out to appease investors muddy that purpose, but so do legitimate additions, AI or not. Each new addition brings new functionality that seems neat on its own but, in aggregate, transforms the overall product into something other than the tool I know it to be.

On the other hand, software such as my Claw does not have a defined purpose. I’m creating uses and applications as I go that might be entirely different from how someone else is using the same technology, and it’s adapting to me just as much as I’m adapting to it. Its properties—and our relationship—are dynamic.

I’ve come to call the former group “tool-like software” and the latter group “living software.” Living software doesn’t just mean AI agents—though often there’s an agentic aspect to them. Both categories come with a set of expectations, and recognizing the differences in those expectations can explain my disorientation. For builders, it can also help us decide how and what to build.

## How we got here: A brief history of software development

Software development cycles have been accelerating for decades. In the 1980s, nine years passed between MS-DOS and Windows 3.0, in part because software was distributed physically, on floppy disks—and later, CD-ROMs. Customers had to [go out of their way](https://qz.com/486379/photos-scenes-from-the-worldwide-frenzy-of-microsofts-windows-95-release) to upgrade, so major releases had to prove their value. The internet hastened the tempo considerably. Tools like Rails and React scaffolded repetitive forms and database connections, Amazon Web Services and GitHub let developers deploy code to millions remotely, and app stores made automatic updates the default on billions of devices. But even as software went from a box on a shelf to something more like fluid pushed through a digital IV, it made sense to bundle significant changes and release them infrequently, because they took time and coordination to build.

Now, AI coding models have made it possible for a single developer [to produce dramatically more code](https://every.to/chain-of-thought/when-your-vibe-coded-app-goes-viral-and-then-goes-down). The review of this code itself can be automated by AI, and the codebase can [learn from its mistakes](https://every.to/guides/compound-engineering). Features can also be replicated much more quickly—just point your coding agent at the thing you want to clone.

The result for end users is a lot of things we didn’t expect, and in many cases didn’t want. The old, slower pace of development ensured that companies and teams thought long and hard about what features they wanted to ship and what would truly be useful to users. Today’s hyper-fast timelines—Anthropic and OpenAI rolled out OpenClaw-esque features [within weeks](https://x.com/emollick/status/2034780127431688684)—are pushing the builders of traditional software to capitulate to trends or ship simply because they *can*.

[PAYWALL]
