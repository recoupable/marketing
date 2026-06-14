---
title: "Mini-Vibe Check: Cursor Bets on Fast and Cheap With Composer 2"
subtitle: "Plus: Help your AI write more like you"
author: "Every Staff"
date: 2026-03-21
column: context-window
url: https://every.to/context-window/mini-vibe-check-cursor-bets-on-fast-and-cheap
paywalled: false
scraped_at: 2026-06-11T16:07:20.645Z
---

# Mini-Vibe Check: Cursor Bets on Fast and Cheap With Composer 2

*Plus: Help your AI write more like you*

*Hello, and happy Sunday! Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

##

## Cursor’s new model is competitive but not quite frontier

##### The benchmarks say Composer 2 competes with the best. Our testers say it’s built for a different kind of developer.

Over the past year, OpenAI and Anthropic have converged on the same vision of AI coding. [Claude Code](https://every.to/vibe-check/vibe-check-opus-4-5-is-the-coding-model-we-ve-been-waiting-for) and [Codex](https://every.to/vibe-check/vibe-check-openai-s-codex-app-gains-ground-on-claude-code) both optimize for delegation: You describe the problem, the model goes away and solves it, you come back and review.
[Cursor](https://every.to/source-code/what-the-team-behind-cursor-knows-about-the-future-of-code), on the other hand, wants the developer in the loop, inside a visual workspace, managing agents in real time. And if you’re running lots of tight cycles instead of delegating a 30-minute task, you need a model that’s fast, cheap, and smart *enough*.
Composer 2, which Cursor [released on Wednesday](https://cursor.com/blog/composer-2), aspires to that vision. It comes in two flavors: a standard variant that’s one-tenth the cost of [Opus 4.6](https://every.to/vibe-check/opus-4-6) and one-fifth the cost of [GPT-5.](https://every.to/vibe-check/gpt-5-4-openai-is-back)4, and a default “fast” version that’s faster than the fastest Opus model (and still a fraction of the cost).
Cursor says its benchmark scores put Composer 2 at frontier level. In our testing, the benchmarks hold up—but only within Cursor’s ideal workflow.

## What we found

Speed is the standout feature here. **[Kieran Klaassen](https://every.to/@kieran_1355)**, general manager of **[Cora](https://cora.computer/)**, called Composer 2 “[Gemini](https://every.to/vibe-check/vibe-check-gemini-2-5-pro-and-gemini-2-5-flash) fast.” **[Mike Taylor](https://every.to/@mike_2114)**, Every’s head of tech consulting, found that even the “slower” version completed some tasks in a third or a quarter of the time he’d expect from frontier models.
For a coding workflow built around tight cycles, that speed compounds quickly. As Mike put it: “When you’re in the loop, you need the loop to go fast. When you’re out of the loop, who cares—it’s running in the background overnight anyway.”
The model is also cautious. It undershoots rather than spiraling into overwrought solutions—a trade-off Kieran prefers. And on retrieval-heavy tasks, it performed well. Mike found that it comprehensively identified quoted material across a book manuscript, missing only a handful of quotes.
Composer 2’s weaknesses were what you’d expect from a model at this price point. Kieran found the design quality “way worse than Codex, Claude, Gemini” in his benchmark tests. An e-commerce site built in React was functional but missing features. A 3D island scene had “nothing wrong with it” but was “boring.” When writing Ruby code, the model didn’t lean into the language’s idioms. Mike ran into Composer 2’s literal-mindedness on non-coding tasks: In one case, it looked for the words “surprising” and “interesting” instead of reasoning about what in the data was noteworthy. He also found himself wanting subagent functionality—where a model divides up complex tasks among background agents—on more-involved research work.

## Who this is for

To Kieran, Composer 2 feels six-to-eight months behind the frontier. For developers who have gone all-in on delegation—handing entire features to Claude Code or Codex and walking away—that gap is disqualifying.
But Cursor isn’t building for those developers, or at least not *only* for them, but instead for the ones still inside the IDE—the “integrated development environment,” where they pore over code changes and steer any AI work in real time. Here, Composer 2 is fast enough to keep the loop tight and cheap enough to run all day, and capable enough to handle the bounded tasks that make up most of the work.—*[Katie Parrott](https://every.to/@katie.parrott12)*

##

## Knowledge base

**[“How to Build an AI Style Guide](https://every.to/guides/how-to-build-an-ai-style-guide)**[”](https://every.to/guides/how-to-build-an-ai-style-guide) *by Katie Parrott*: When you give a model a loose prompt, you get writing that sounds like nobody—coherent but generic. [Every staff writer and AI editorial lead](https://every.to/@katie.parrott12) **Katie Parrott** explains how to fix that with an AI style guide, a reusable document that encodes your tone, structure, sentence habits, and deal-breakers so the model starts sounding more like you. Read this for [the full template](https://every.to/guides/ai-style-guide?source=post_button), a starter interview prompt, and lessons from the guides Every uses daily.
[“](https://every.to/context-window/editing-ai-writing)**[Editing AI Writing](https://every.to/context-window/editing-ai-writing)**[”](https://every.to/context-window/editing-ai-writing) *by Every staff/Context Window*: AI-generated prose can be so flimsy that it’s sometimes easier to start over and write it yourself. No amount of editing fixes text that was never grounded in real thinking, Eleanor writes. That thought leads nicely into this week’s podcast, where Every editor in chief **[Kate Lee](https://every.to/@kate_1767)** tells Dan how she uses AI daily, and the moment when the potential of AI tools finally clicked for her. 🎧 🖥 Listen on [Spotify](https://open.spotify.com/episode/5UWdocdFeOxXsfbfqb84sQ?si=XlBW12Q5T6uD03Vuz7M9PQ) or [Apple Podcasts](https://podcasts.apple.com/us/podcast/how-every-builds-a-writing-team-in-the-age-of-ai/id1719789201?i=1000755978947), or watch on [X](https://x.com/danshipper/status/2034324683181474163) or [YouTube](https://youtu.be/Uif_qAcgnLk).
[“](https://every.to/chain-of-thought/when-your-vibe-coded-app-goes-viral-and-then-goes-down)**[When Your Vibe Coded App Goes Viral—And Then Goes Down](https://every.to/chain-of-thought/when-your-vibe-coded-app-goes-viral-and-then-goes-down)**[”](https://every.to/chain-of-thought/when-your-vibe-coded-app-goes-viral-and-then-goes-down) *by Dan Shipper/Chain of Thought*: [Every CEO](https://every.to/@danshipper)**[Dan Shipper](https://every.to/@danshipper)** vibe coded our new document editor, **[Proof](https://www.proofeditor.ai/?source=post_button)**, in his spare time. But when it kept crashing on launch day, he spent 24 sleepless hours watching Codex agents hunt bugs in a codebase he didn’t fully understand. Dan’s takeaway is that if the AI can build it, it can also fix it—but it might take a while. Read this for an honest post-mortem on vibe coding at production scale.
[“](https://every.to/p/what-comes-after-linkedin)**[What Comes After LinkedIn](https://every.to/p/what-comes-after-linkedin)**[”](https://every.to/p/what-comes-after-linkedin) *by Eleanor Warnock*: AI is automating the routine work that many white-collar professionals built careers on, and a resume full of big-name employers no longer proves you have the judgment and taste that matter. [Every managing editor](https://every.to/@eleanor_b03474_1)**[Eleanor Warnock](https://every.to/@eleanor_b03474_1)** writes that knowledge workers need portfolios—collections of artifacts that show how they solve problems. Read this for the emerging portfolio formats and examples worth stealing.
[“](https://every.to/p/i-hired-an-ai-to-do-my-chores-now-i-maintain-the-ai)**[I Hired an AI to Do My Chores. Now I Maintain the AI.](https://every.to/p/i-hired-an-ai-to-do-my-chores-now-i-maintain-the-ai)**[”](https://every.to/p/i-hired-an-ai-to-do-my-chores-now-i-maintain-the-ai) *by Jack Cheng*: [Every senior editor](https://every.to/@jackcheng)**[Jack Cheng](https://every.to/@jackcheng)** wanted his AI agent to handle the stuff nobody wants to do, like disputing bank charges, changing leaked passwords, clearing desktop clutter, etc. Instead, the agent kept breaking—and fixing it became another burden. The irony sent Jack down a rabbit hole about why we’re so bad at maintaining things, and what we lose when we stop doing it ourselves. Read this before you automate away your to-do list.

##

## Log on

We host [camps and workshops](https://every.to/events) on topics like [compound engineering](https://www.youtube.com/watch?v=7YUBxMTF1Tc&time_continue=3&source_ve_path=NzY3NTg&embeds_referring_euri=https%3A%2F%2Fevery.to%2F) and [writing with AI](https://www.youtube.com/watch?v=oEvjbPwGwnc&source_ve_path=OTY3MTQ&embeds_referring_euri=https%3A%2F%2Fevery.to%2F) to share the knowledge we’ve acquired from training teams at companies like the *[New York Times](https://every.to/on-every/the-next-chapter-of-every-consulting)*[and leading hedge funds](https://every.to/on-every/the-next-chapter-of-every-consulting), and by learning and playing with AI every day ourselves.

##### Upcoming camps

-
[Claude Code for Absolute Beginners](https://every.to/events/cc-for-absolute-beginners) (April 14): Early bird registration is open for this beginner-friendly, live workshop led by [Mike Taylor](https://every.to/@mike_2114) (head of tech consulting at Every), designed to get you from zero to a working project with Claude Code.

[Learn more and sign up](https://every.to/events/claude-code-101-2?source=post_button)

##

## Alignment

**The n-of-1 problem. **This week, a [heartfelt story](https://news.unsw.edu.au/en/meet-the-man-who-designed-a-cancer-vaccine-for-his-dog) went viral about an Australian data analyst named **Paul Conyngham** who used ChatGPT, AlphaFold, and Grok to help design a personalized mRNA cancer vaccine for his dying dog, Rosie.
Rosie had advanced mast cell tumors that had beaten surgery, chemotherapy, and immunotherapy. Vets had given her months to live. So Conyngham, who has no background in biology, [used AI to sequence](https://www.ibtimes.co.uk/sydney-data-engineer-mrna-cancer-vaccine-dog-1785607) her tumor DNA, identify the mutations driving the cancer, and design a vaccine blueprint targeting those specific mutations. He handed that information to scientists at the University of New South Wales, who created a vaccine that a veterinary immunologist then injected around the tumors. Within a few weeks, the largest tumor shrank by about 75 percent, and Rosie is now happily chasing rabbits again.
I love this story, and it went viral for obvious reasons: A man’s love for his dog meets a bold act of individual agency meets a glimpse into medicine’s AI-enabled future—this is Tech Twitter’s dream!
But what Conyngham built was a treatment designed for one dog’s specific tumors, tested on that one dog, validated by a sample size of one—also known as an “n-of-1” trial (a play on notation from clinical experiments, where the variable *n *represents the number of participants).
Conyngham’s n-of-Rosie trial may have worked, which is wonderful. But her cancer isn’t cured, and it’s not known how much the response came from the vaccine or other simultaneous treatments. The entire infrastructure of modern medicine, from randomized controlled trials to regulatory bodies, exists precisely because we learned the hard way that anecdotes aren’t evidence.
Yet we’re drifting into n-of-1 territory everywhere. Some people are [injecting peptides](https://www.bbc.com/news/articles/cdr268m5pxro) sourced from Chinese manufacturers and self-reporting benefits that could easily be placebo, while others are going to Mexico and Colombia for [untested gene therapies](https://www.wired.com/story/bioviva-gene-therapies-liz-parrish-longevity/) that they believe will prevent aging.
What happens to evidence-based medicine when personalized treatments become trivially easy to design but remain extremely difficult to validate? Ethics committees, which approve and oversee lab experiments on humans and other animals, took Conyngham months to navigate and are not built for a world where thousands of people are desperate to use their own AI-generated blueprints.
Many people will understandably look at Conyngham’s example and be emboldened to take a similar approach to their own health. I also suspect that, because of Rosie’s story, bioethicists are losing quite a bit of sleep.—*[Ashwin Sharma](https://www.glp1digest.com/)*

###

*That’s all for this week! Be sure to follow Every on X at [@every](https://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*
*We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with ****[Spiral](https://writewithspiral.com/)****. Organize files automatically with ****[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)****. Deliver yourself from email with [Cora](https://cora.computer). Dictate effortlessly with ****[Monologue](https://monologue.to)****. Work on documents with AI agents using [Proof](https://www.proofeditor.ai/?source=post_button).*
*For sponsorship opportunities, reach out to [[email protected]](https://every.to/cdn-cgi/l/email-protection).*
[Upgrade to paid](https://every.to/subscribe?source=post_button)
