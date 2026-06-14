---
title: "Vibe Check: Anthropic Just Made Opus Cheaper Without Calling It That "
subtitle: "Sonnet 4.6 delivers Opus-close performance at half the price—but speed didn't come along for the ride"
author: "Katie Parrott"
date: 2026-02-18
column: vibe-check
url: https://every.to/vibe-check/vibe-check-anthropic-just-made-opus-cheaper-without-calling-it-that
paywalled: false
scraped_at: 2026-06-11T16:07:22.681Z
---

# Vibe Check: Anthropic Just Made Opus Cheaper Without Calling It That 

*Sonnet 4.6 delivers Opus-close performance at half the price—but speed didn't come along for the ride*

*Was this newsletter forwarded to you?[Sign up](https://every.to/account) to get it in your inbox.*

---

Historically, [Sonnet](https://every.to/vibe-check/vibe-check-claude-sonnet-4-5) has been Opus’s cheaper, faster sibling: You traded some brainpower for speed and cost savings.
Now, with the release of Sonnet 4.6, Anthropic says you don’t have to trade anything—just pay less. If you’re running a live app with users on Opus right now, there is some good news about your API costs: Sonnet 4.6 costs $3 input/$15 output per million tokens—roughly half what Opus runs. (GPT-5.2, for comparison, costs $1.75 input/$14 output per 1 million tokens.) Cost has been a consistent sticking point with Opus, and with Sonnet 4.6, Anthropic seems to be saying, “We hear you.”
These are true day-zero tests—we got access when everyone else did—so let’s dive in to determine in real time whether it’s true that Sonnet’s new capabilities come without sacrifice. You can also [watch the livestream](https://www.youtube.com/watch?v=mahp6-THjuY) we did yesterday as soon as the model dropped.

## The Reach Test

##### Dan Shipper, cofounder and CEO 🟨

“Green for using inside of products you’re building, yellow for my own daily work. If you’re building an app that was previously too expensive to run on Opus, this is a big deal. For coding and complex tasks where I can afford Opus and 5.3 Codex, I’d probably stick with it.”

##### Kieran Klaassen, general manager of [Cora](https://cora.computer) 🟨

“It’s very usable, and for a lot of people it should be the default. But it frustrated me when it got stuck on something Opus solved in one shot. Anytime a model frustrates me, that’s a no-go for my personal workflow—but this is genuinely solid for production.”

## What works well

The model is smart. Across coding tasks, pull request triage, brainstorming, and a complex P&L restructuring, it held the thread, followed through on multi-step instructions, and didn’t make the kind of mid-task mistakes that would have tripped up Sonnet 4.5.
Kieran ran it through a full [compound engineering](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents) workflow—sorting through a backlog of pending code changes, merging branches, writing changelogs, and theming issues—and came away impressed. “I’ve not found any reasons to believe it’s not as smart as [Opus 4.6](https://every.to/vibe-check/opus-4-6),” he said.
The economics are a big win for teams using Opus inside production AI apps. **[Spiral](https://writewithspiral.com)**, Every’s AI ghostwriter, for example, has been running on Opus at up to $1,000 a day in token costs. With Sonnet 4.6, that cost roughly halves, without touching the codebase.

## What needs work

Given past precedent, you’d expect a new Sonnet model to be meaningfully faster than Opus. This one feels nearly the same. That’s fine if you’re getting Opus-quality output, but disappointing if you were counting on snappier performance for iteration-heavy workflows.
The model also showed some erratic behavior under pressure. When Dan asked it to plan a homepage redesign, it correctly asked for a name for the work tree—a separate copy of the codebase where it could experiment safely—then immediately started rewriting the homepage anyway. As Dan noted, “It’s both too cautious and too eager.” And when Kieran ran into an MCP configuration issue, Sonnet 4.6 spun in circles while Opus solved it in one shot and cited the exact wrong file.

## The verdict

Dan thinks that Anthropic’s strategy is to keep model tier prices stable while continuously improving the product. Whatever Opus can do today, Sonnet will be able to do it in six months for less.
If you’re building AI-powered products and have been holding off on Opus because of cost, the wait is over. Sonnet 4.6 appears to be the model that delivers the capability you want without making your bank account cry. If you’re using Claude for your own complex work and can swing the Opus price, you probably don’t need to switch yet. But if you’re on the $20 Pro plan and want more horsepower, this is a meaningful upgrade.

---

*For more on Claude Sonnet, check out our previous coverage:*

1.
[“Vibe Check: Claude 3.7 Sonnet and Claude Code](https://every.to/vibe-check/vibe-check-claude-3-7-sonnet-and-claude-code)”

2.
[“Vibe Check: Sonnet 4.5](https://every.to/vibe-check/vibe-check-claude-sonnet-4-5)”

3.
[“We Tested Claude Sonnet 4.5 for Writing and Editing](https://every.to/vibe-check/vibe-check-we-tested-claude-sonnet-4-5-for-writing-and-editing)”

4.
[“Claude Sonnet 4 Now Has a 1-million Token Context Window](https://every.to/vibe-check/vibe-check-claude-sonnet-4-now-has-a-1-million-token-context-window)”

---

***[Katie Parrott](https://every.to/@katie.parrott12)*** *is a staff writer and AI editorial lead at Every. You can read more of her work in* *[her newsletter](https://katieparrott.substack.com/).*
*To read more essays like this, subscribe to [Every](https://every.to/subscribe), and follow us on X at [@every](http://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/).*
*We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with [Spiral](https://writewithspiral.com/). Organize files automatically with ****[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)****. Deliver yourself from email with [Cora](https://cora.computer/). Dictate effortlessly with ****[Monologue](https://monologue.to/)****.*
*We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization.*
*Get paid for sharing Every with your friends. Join our [referral program](https://every.getrewardful.com/signup).*
*For sponsorship opportunities, reach out to [[email protected]](https://every.to/cdn-cgi/l/email-protection).*
*Help us scale the only subscription you need to stay at the edge of AI. Explore [open roles at Every](https://www.notion.so/Jobs-Every-25cca4f355ac80c5ad6ee7a6e93d6b4e?pvs=21).*
[Upgrade to paid](https://every.to/subscribe?source=post_button)
