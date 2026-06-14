---
title: "How to Get the Most Out of Fable 5"
author: "Laura Entis"
date: 2026-06-10
column: context-window
url: https://every.to/context-window/how-to-get-the-most-out-of-fable-5
paywalled: true
scraped_at: 2026-06-11T16:04:34.542Z
---

# How to Get the Most Out of Fable 5

*We’re hosting [two live camps](http://every.to/events) for paid Every members to put the latest frontier tools to work: ****[Fable 5 Camp](https://every.to/events/fable-5-power-user-camp)**** this Friday, June 12, followed by a rescheduled ****Codex for Power Users Camp**** on Friday, June 26. If you already registered for this Friday’s camp, your seat is saved for the Fable deep dive, and [you can RSVP for the Codex Camp](http://every.to/events).*

---

## ‘AI & I’: How Anthropic uses Claude Fable 5 with Mike Krieger

Today, we’re releasing a new episode of our podcast *[AI & I](https://every.to/podcast)*. **[Dan Shipper](https://every.to/@danshipper)** sits down with **Mike Krieger**, the cofounder of Instagram and head of Anthropic Labs, to discuss what it feels like to build with [Fable 5](https://every.to/vibe-check/anthropic-mythos-our-fable-vibe-check), a model powerful enough that it’s forcing him to rethink the very definition of productivity, engineering, and creative agency.

As someone who built one of the most popular consumer apps in the pre-GPT era and has had access to Fable 5 for months, Krieger has a rare vantage point on what the radical compression of the product development arc means for builders.

Watch on **[X](https://x.com/danshipper/status/2064761654789681281)** or **[YouTube](https://www.youtube.com/watch?v=XWpTgCvgYaE)**, or listen on **[Spotify](https://open.spotify.com/episode/7s1VcIHp1q6PG9hofb2fVY?si=DsAlKVymRs2-J0cnM25M6w&nd=1&dlsi=4383c06a09314ba1)** or **[Apple Podcasts](https://podcasts.apple.com/us/podcast/how-anthropic-uses-claude-fable-5-with-mike-krieger/id1719789201?i=1000772067637)**. You can also read the **[transcript](https://every.to/podcast/transcript-how-anthropic-uses-claude-fable-5-with-mike-krieger)**.

Here are the highlights:

1.
**More work is happening overnight.** Fable 5 is the first model capable enough that you can hand it a complex task, walk away, and trust it will be completed by morning. When it hits an obstacle—a remote service goes down, say, or a tool stops working—it writes a workaround and forges ahead. That resilience has changed the daily rhythm of Krieger’s work: He now ends his workday by briefing the model on what needs to get done while he sleeps, rather than sitting down to do it himself.

2.
**The gap between what’s in your head and what exists in the world is closing.** Given access to Fable 5 and a set of internal MCPs, an Anthropic recruiter described the experience as, “The first time in my life where I feel like the thing that’s in my head and the thing that exists in the world are right next to each other. I can just do it.” *This* is the most meaningful thing about the new model class, Krieger says—it allows non-engineers to create the exact products they need to get more done.

3.
**Software engineering is dead. Long live software engineering.** Engineers now spend less time writing code and more time setting direction, reviewing what their AI agents have built, and making judgment calls when something breaks in production. The divide between product managers and engineers has blurred. “There is a feeling of loss, I think, in some of the better engineers that I talk to, as well as the feeling of, ‘Oh my God, but I can do insane amounts of work now at the same time.’ We’re holding both ideas in our heads at once,” Krieger says.

4.
**All eyes are on verification.** If we can delegate more to the model, it becomes more important to check what it has built works in practice. Krieger’s approach combines regression testing on known workflows, visual checks—including giving the model video captures of its own work so it can catch animation glitches screenshots would miss—and mock backends for anything too complex to test live. When a bug arrives via Slack, Fable 5 makes the fix, posts the pull request, then follows up hours later.

Miss an episode? Catch up on Dan’s recent conversations with LinkedIn cofounder **[Reid Hoffman](https://every.to/podcast/reid-hoffman-makes-five-predictions-about-ai-in-2026)**; the team that built Claude Code, **[Cat Wu](https://every.to/podcast/how-to-use-claude-code-like-the-people-who-built-it)** and **[Boris Cherny](https://every.to/podcast/how-to-use-claude-code-like-the-people-who-built-it)**; Vercel cofounder **[Guillermo Rauch](https://every.to/podcast/vercel-s-guillermo-rauch-on-what-comes-after-coding)**; podcaster **[Dwarkesh Patel](https://every.to/podcast/dwarkesh-patel-s-quest-to-learn-everything)**; and others, and learn how they use AI to think, create, and relate.

### How the Every team is using Fable 5

The easiest way to be disappointed by Fable 5 is to use it as if it were [GPT-5.5](https://every.to/vibe-check/gpt-5-5) or [Opus 4.8](https://every.to/context-window/opus-4-8-is-smart-enough-to-get-in-your-way), smart models that require specific instructions and careful prompting for the best results.

Instead, Fable 5 feels like working with a capable coworker—at least that’s Every’s consensus [after a week of testing](https://every.to/vibe-check/anthropic-mythos-our-fable-vibe-check).

“It feels like you have an engineer on your team that you just gave a problem to, and they’ll figure it out,” says **[Cora](https://cora.computer/)** general manager **[Kieran Klaassen](https://every.to/@kieran_1355)**.

That means, to get the most out of Anthropic’s [first Mythos-class model](https://every.to/vibe-check/anthropic-mythos-our-fable-vibe-check) available to the public, you have to [think like a manager](https://every.to/chain-of-thought/the-knowledge-economy-is-over-welcome-to-the-allocation-economy): Equip the model with context, goals, and a way to verify the work, then step aside. It may even stumble on a solution you hadn’t considered.

Not every task deserves this treatment. Smart colleagues don’t come cheap, and neither does Fable 5. Here’s how to get the most out of this powerful new model and some of the workflows the team is using.

#### Pick the right tasks

Tasks that are good candidates for Fable 5 have four qualities: You’re able to give the model organized and deep context, a well-defined goal, and a clear definition of what good or done looks like, and the importance of the task justifies the cost.

The model is smart enough to reason its way through complex problems and likes to carry tasks through to the end, but if your data is wrong or out of date, or your goals conflict, it will likely reach the wrong conclusion. That’s less of a concern on earlier, less powerful models, where you’re giving feedback more frequently during a task and could catch those mistakes.

[PAYWALL]
