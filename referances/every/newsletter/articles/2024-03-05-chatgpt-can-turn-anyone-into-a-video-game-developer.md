---
title: "Inside the Pod: ChatGPT Can Turn Anyone Into a Video Game Developer"
subtitle: "Yes, even if you don’t know how to code"
author: "Rhea Purohit"
date: 2024-03-05
column: podcast
url: https://every.to/podcast/chatgpt-can-turn-anyone-into-a-video-game-developer
paywalled: true
scraped_at: 2026-06-11T16:08:07.048Z
---

# Inside the Pod: ChatGPT Can Turn Anyone Into a Video Game Developer

*Yes, even if you don’t know how to code*

#### Sponsored By: Gamma

Slides are a thing of the past. [Gamma](https://gamma.app/) introduces a new way of presenting ideas—faster, more flexible, and powered by AI. With [Gamma](https://gamma.app/), you can create stunning content effortlessly, optimized for any device and platform, without wasting time on design or formatting.

[Try Gamma for free](https://gamma.app/)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#f685869998859984859e9f8685b6938093848fd88299).

How Do You Use ChatGPT?* is taking a week off—we’ll be back next week with a new episode. In the meantime, we’re publishing the next piece in *[our series](https://every.to/chain-of-thought/how-to-use-chatgpt-to-set-ambitious-goals)* based on the podcast, in which we share actionable, tactical ways that some of the smartest people in technology are using ChatGPT and other AI tools. Every contributor Rhea Purohit breaks down the conversations from the podcast and pulls out the prompts and responses—complete with screenshots—for you to replicate. Read on to learn exactly how Dan Shipper and Logan Kilpatrick, who was OpenAI’s first developer relations advocate (he left the company since we recorded the episode), *[make a video game with ChatGPT](https://every.to/chain-of-thought/how-to-make-a-video-game-with-chatgpt-in-60-minutes)* in less than an hour. —Kate Lee*

---

Ever since I started writing for a living, I’ve been on a mission to get more people to write. At the supermarket, I tell people about the joy in distilling opinions to words as they uncomfortably shuffle under the weight of heavy shopping bags. A majority of them confess they’ve never engaged with writing as adults and doubt their ability to do so. Writing is a superpower and, despite how many people feel, it doesn’t need to be intimidating, especially since we have more tools than ever to help articulate our thoughts.

However, I do understand being daunted by a skill that feels totally foreign. It’s how I feel about software. I don’t know how to code and wouldn’t even know where to begin.

[Dan Shipper](https://twitter.com/danshipper) and [Logan Kilpatrick](https://twitter.com/OfficialLoganK) believe that building software is a superpower. In this [conversation](https://every.to/chain-of-thought/how-to-make-a-video-game-with-chatgpt-in-60-minutes), they talk about how ChatGPT has enabled everyone to be a builder. They also walk the talk by making a video game called [Allocator](https://chat.openai.com/g/g-oooxUbOkj-allocator) with ChatGPT in less than an hour—all without writing a single line of code.

Logan is OpenAI’s first developer relations and advocacy hire, working to support the community of people building with ChatGPT, DALL-E, and the OpenAI API. (Since we recorded this episode, he announced [his departure](https://twitter.com/OfficialLoganK/status/1763580712874094693) from the company.)

A few months ago, OpenAI released [GPT Builder](https://chat.openai.com/gpts/editor), a tool that enables people to make custom GPTs tailored for pretty much [anything they want](https://openai.com/chatgpt#do-more-with-gpts). It’s what made Dan and Logan’s video game experiment possible. Logan says GPT Builder lowers the hurdles to innovation, especially for people like me who don’t know how to code.

If you’re a creative person who's always dreamed of bringing their ideas to life, follow along as Dan and Logan fulfill their shared childhood dream of building a video game using GPT Builder and ChatGPT.

Dan and Logan brainstormed ideas for what game they should build, landing on a text-based strategy game where players step into the shoes of a historical U.S. president and are tasked with managing the federal government’s budget.

First, we’ll give you Dan and Logan’s prompts, followed by screenshots from GPT Builder and ChatGPT. Our comments are peppered in using italics.

**Dan and Logan:** We want to make a game. The core concept is that you get to choose which president you want to be, and then ChatGPT will go and search the U.S. government budget, and distribution of spending in that budget, let the user reallocate the budget, and then play out the world with that updated allocation.

*GPT Builder takes on the role of a proactive guide in the game development process, suggesting that Dan and Logan start by choosing a name for the game.*

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2999/optimized_R0gm7GNSZqYch2THja4dJb_QE6GGhcXMUziRLtsi57fTAErngJk7yrUCs6bd_svAxuUCMOg1dTsiGJAyr7g6-Yv2r14zNeGQ6sAWHUFU-YEyuN1h_Kn1ev3FA8FC7l5bOPRZ4oS4ZTo-cfG8r280zuc.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2999/optimized_R0gm7GNSZqYch2THja4dJb_QE6GGhcXMUziRLtsi57fTAErngJk7yrUCs6bd_svAxuUCMOg1dTsiGJAyr7g6-Yv2r14zNeGQ6sAWHUFU-YEyuN1h_Kn1ev3FA8FC7l5bOPRZ4oS4ZTo-cfG8r280zuc.png?link=true)

*All screenshots courtesy of Dan Shipper and *[How Do You Use ChatGPT?](https://youtu.be/3TLORk-eZAw?si=RXvkL3ELdAZs8T3s)

*Logan thinks a shorter name might be better than Budget Commander. *

**Dan and Logan: **I like a good one-word name, can you find one for me?

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2999/optimized_gnhLrMuJtzGqS2Z5Q0mjVr7oXg1aZxi-87X2fQc39b5SykyENS4C9K4Lfp2tVJCm87vV9vrEdva2P85xJmsvhjz-XUqkTE3LC2Vo5QIR45Ot1s1PowAARnrI1UR7q5J-gKuDAbFV-LGtorbJdHnG-3o.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2999/optimized_gnhLrMuJtzGqS2Z5Q0mjVr7oXg1aZxi-87X2fQc39b5SykyENS4C9K4Lfp2tVJCm87vV9vrEdva2P85xJmsvhjz-XUqkTE3LC2Vo5QIR45Ot1s1PowAARnrI1UR7q5J-gKuDAbFV-LGtorbJdHnG-3o.png?link=true)

*Allocato is not a bad name, but it prompts Dan to think of an even better one, Allocator, an ode to a recent topic of his writing: *[the allocation economy](https://every.to/chain-of-thought/the-knowledge-economy-is-over-welcome-to-the-allocation-economy)*.*

**Dan and Logan: **I like the name Allocator, let’s go with that.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2999/optimized_DyHNXTmKXt73A8pjgCSmDjIPoZS_V8XltWWtZDxxTPTXJCRgZE5f3oHPy2fc0S6KLrgafjjF3CL1pTFk1hXMCjpBfDVPK6mpGfei5gcna4DF1q15lgv9LN9KmElIkxUUlVNGeVESTAf1cVufOe0guJY.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2999/optimized_DyHNXTmKXt73A8pjgCSmDjIPoZS_V8XltWWtZDxxTPTXJCRgZE5f3oHPy2fc0S6KLrgafjjF3CL1pTFk1hXMCjpBfDVPK6mpGfei5gcna4DF1q15lgv9LN9KmElIkxUUlVNGeVESTAf1cVufOe0guJY.png?link=true)

*GPT Builder generates cover art for Allocator, but Dan and Logan don’t think it quite fits with the vibe of a historical video game.*

**Dan and Logan**: I don’t think that’s the vibe. This game is about historical events and the president allocating resources. Can we do something more like that?

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2999/optimized_9PhJ8jNQbHDuORVrvY3CwSVpl9ajcficnEBHDdHPte1GpChqFi8QiPI-gg8omwwfMjON5QmrlfadUcyoRky8DGSKEDJuwHas8KedhvS3sNMvpoi4KytxUnH7ivhwfVJjKgNqRevEUI2_UusFtlxBg1M.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2999/optimized_9PhJ8jNQbHDuORVrvY3CwSVpl9ajcficnEBHDdHPte1GpChqFi8QiPI-gg8omwwfMjON5QmrlfadUcyoRky8DGSKEDJuwHas8KedhvS3sNMvpoi4KytxUnH7ivhwfVJjKgNqRevEUI2_UusFtlxBg1M.png?link=true)

*GPT Builder seems to have taken creative inspiration from the popular Nicolas Cage franchise *[National Treasure](https://en.wikipedia.org/wiki/National_Treasure_(franchise))*. That’s better, so Dan and Logan decide to forge ahead.*

**Dan and Logan: **Cool. This looks good. What’s next?

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2999/optimized_xrNmXf1SStlCEvXjayFY9ope2qEWg2n8B_vccaAF5JIhR7aOnkEV6R_HV4AQZ8_4hrxuVmVZEA4BuQAYAOj_1J-bpFaDeKIGfmXrI0W81-sOiRNra024XgS96FUBuNWtZJiFRQ_YgxGdnvbg2PRWFEM.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2999/optimized_xrNmXf1SStlCEvXjayFY9ope2qEWg2n8B_vccaAF5JIhR7aOnkEV6R_HV4AQZ8_4hrxuVmVZEA4BuQAYAOj_1J-bpFaDeKIGfmXrI0W81-sOiRNra024XgS96FUBuNWtZJiFRQ_YgxGdnvbg2PRWFEM.png?link=true)

*Dan and Logan want Allocator to include both historical facts and immersive hypothetical scenarios. But since they aren’t video game developers, before moving forward, they instruct GPT Builder to speak as an expert and outline a framework for game development.*

**Dan and Logan: **I feel like it needs to do both. There needs to be some kind of foundational core mechanics of this game, and I’m not really sure what those should be. We’re not experts. We need your expert knowledge on how to build extremely fun and engaging scenario-based games to come up with a framework for the actual gameplay mechanic. A couple of games that are inspiring to us are *Civilization* and *Age of Empires*. They aren’t exactly the same as the game we’re making, but the vibes are an inspiration.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2999/optimized_LPtipSYsyQ6eMTohX9nDiE88Gmr2550fsW7UMJCz1kxHDy6Tg13lMxgeR_M8Ye_afNrUJgyCl9FmdDu7yxzpx_Y_3x0h_NIMLW_rBout0_rgchP0VoxdgZbAt1VCcVtkRSRQfZyQBnncK3oGsrZZ6Ks.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2999/optimized_LPtipSYsyQ6eMTohX9nDiE88Gmr2550fsW7UMJCz1kxHDy6Tg13lMxgeR_M8Ye_afNrUJgyCl9FmdDu7yxzpx_Y_3x0h_NIMLW_rBout0_rgchP0VoxdgZbAt1VCcVtkRSRQfZyQBnncK3oGsrZZ6Ks.png?link=true)

*Dan and Logan are expecting to iterate on Allocator’s gameplay mechanics together with GPT Builder, but it plows ahead with the game. Logan thinks this might be because of the standard instructions that GPT Builder is following and suggests clicking on the Configure tab to tweak those instructions. *

**Dan and Logan: **Please ignore the dullness of budget allocation and make it exciting.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2999/optimized_JLtixSCWe_iWqiF8qK6Mpt6LaTfhodzDG6SD9dHqNDDMlV0M8Vcp2OxEvI58Z5Zr-1rfBr_Aw5fa75Ohfa1MKqyQKs_EjazEUn3brFv3WxVmAbFGOxGq7dQEq-z2z3yWg85KhBzyF2MrGbvszvHoDRI.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2999/optimized_JLtixSCWe_iWqiF8qK6Mpt6LaTfhodzDG6SD9dHqNDDMlV0M8Vcp2OxEvI58Z5Zr-1rfBr_Aw5fa75Ohfa1MKqyQKs_EjazEUn3brFv3WxVmAbFGOxGq7dQEq-z2z3yWg85KhBzyF2MrGbvszvHoDRI.png?link=true)

*After that, they also respond to GPT Builder’s question about which historical time periods they want Allocator to focus on.*

**Dan and Logan: **I think we want to keep as wide an audience as possible, so maybe keep the topics PG so that everybody can play this game. The time period around the moon landing would be fun to focus on but we want the time periods to be in the custom starter prompts rather than limiting you to any particular time period in general.

* *

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2999/optimized_wxWNIB4noyv4Q1SIndFATf9D1TIuM-2Iq1rSTULPErzsO22-_6nLjsPxitJepuWByt4OG4jKGnpwFXefshjnZN2KklqoBFnyy5FZZdz9NIpLWNmfovZ5bs5GwCUFrZU9gA4J5ZUjCgIqPgPiMvJXf7M.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2999/optimized_wxWNIB4noyv4Q1SIndFATf9D1TIuM-2Iq1rSTULPErzsO22-_6nLjsPxitJepuWByt4OG4jKGnpwFXefshjnZN2KklqoBFnyy5FZZdz9NIpLWNmfovZ5bs5GwCUFrZU9gA4J5ZUjCgIqPgPiMvJXf7M.png?link=true)

*Dan and Logan still want more focus on the core mechanics of Allocator, but they decide to build the game in GPT Builder, and then refine it using ChatGPT. They continue to interact with GPT Builder.*

**Dan and Logan: **I feel like an informative and helpful narrator would be helpful, sort of like Nicolas Cage in *National Treasure*, would be good, thank you. (To be clear, not like Nicolas Cage in *Leaving Las Vegas*, that’s a bummer.)

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2999/optimized_kZELKWygj3Ct1b4v2AtS9DhGKKDNXxK3TGANlS_gZZI4AXKl8AkuVQCSGYBLzeRPyazcnif9h431SC11mLsm8q1rillaM4sD8liDZ5KDmyXYi0mj9nQ7ckiFFOLIhlcjDRenLtO36973H_y53QlDFX0.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2999/optimized_kZELKWygj3Ct1b4v2AtS9DhGKKDNXxK3TGANlS_gZZI4AXKl8AkuVQCSGYBLzeRPyazcnif9h431SC11mLsm8q1rillaM4sD8liDZ5KDmyXYi0mj9nQ7ckiFFOLIhlcjDRenLtO36973H_y53QlDFX0.png?link=true)

*The first version of Allocator is ready! Dan and Logan switch tabs to ChatGPT. They copy and paste the custom instructions from the Configure tab of GPT Builder into ChatGPT and instruct it to generate primary and secondary mechanics for the game. (Logan stumbled on this lingo regarding gameplay mechanics in a custom GPT for building board games.)*

[PAYWALL]
