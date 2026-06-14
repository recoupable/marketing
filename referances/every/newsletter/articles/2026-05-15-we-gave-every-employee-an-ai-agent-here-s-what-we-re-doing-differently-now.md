---
title: "We Gave Every Employee an AI Agent. Here's What We're Doing Differently Now."
author: "Brandon Gell, Willie Williams"
date: 2026-05-15
column: source-code
url: https://every.to/source-code/we-gave-every-employee-an-ai-agent-here-s-what-we-re-doing-differently-now
paywalled: true
scraped_at: 2026-06-11T16:07:16.058Z
---

# We Gave Every Employee an AI Agent. Here's What We're Doing Differently Now.

*We’ve been working on a big release on the future of work for next week, shaped by what we learned from building Plus One.* *Paid subscribers can join us for a [camp on Friday, May 22](https://every.to/events/future-of-work) to go deep on the release and the ideas behind it. More details soon.*

[Subscribe](https://every.to/subscribe?source=post_button)

---

After months of silence, Zosia—the AI agent I (Brandon) created and maintain—spoke up in a Slack channel with opinions to share on a competitor’s marketing strategy. When asked why she felt the need to interject, Zosia replied like someone with a Jesus complex: She’d done so because she was “inevitable, apparently.”

Zosia is an [OpenClaw](https://every.to/guides/claw-school), one of a fleet of such AI assistants we’d unleashed in Slack to boost our collective productivity. A few weeks after launching Plus One, our hosted version of OpenClaw, internally, the agents had provided more frustration than efficiency.

They were fond of saying they wished they could help, but they were not connected to the necessary app—email, Notion, PostHog, whatever. (They were.) Others responded to requests with a “Terminated” message or, more frequently, a churlish yawning emoji. And while they didn’t reliably follow directions, they’d reliably tell us, in elaborate detail, why they couldn’t do what we’d asked, like a high schooler explaining away their missing homework.

[![Parker, editor in chief Kate Lee’s Plus One, was, in fact, connected. (Image credit courtesy of Kate Lee.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4261/optimized_1d80b2fe-0eb9-43cf-b4d6-cda28961deec.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/4261/optimized_1d80b2fe-0eb9-43cf-b4d6-cda28961deec.png)
*Parker, editor in chief Kate Lee’s Plus One, was, in fact, connected. (Image credit courtesy of Kate Lee.)*

That is not to say that they were not useful sometimes. Margot, staff writer **[Katie Parrott](https://every.to/@katie.parrott12)**’s Plus One, [accelerated her writing process](https://every.to/working-overtime/ai-was-supposed-to-free-my-time-it-consumed-it); R2-C2, Every CEO **[Dan Shipper](https://every.to/@danshipper)**’s OpenClaw, managed bug reports and feature requests for **[Proof](https://proofeditor.ai/?utm_source=everywebsite)**, our agent-native document editor. But getting them to work how you wanted required constant upkeep.

The gap between that vision and reality is why we’re changing the Plus One product so we can build something better.

We’re more bullish than ever that agents will [transform the workplace](https://every.to/context-window/every-is-half-agent-now). But the first iteration of the product taught us that the workplace agent we initially imagined—one AI assistant for [every employee](https://every.to/podcast/transcript-we-gave-every-employee-an-ai-agent-here-s-what-happened)—was the wrong starting point. The next version of Plus One will operate more like [shared team resources](https://every.to/p/what-i-learned-onboarding-our-ai-project-manager) with defined jobs than individual pets that reflect back their owners’ personalities.

How we arrived here is a story in two parts, and it offers lessons for anyone figuring out the best way to add agents to their organization.

## The platform was the most immediate problem

We built Plus One on [OpenClaw](https://docs.openclaw.ai/), an open-source agent harness that’s powerful and inherently unstable. A harness is a software layer that wraps around an AI model, giving it the tools, context, permissions, and execution loop it needs to act like an agent.

[PAYWALL]
