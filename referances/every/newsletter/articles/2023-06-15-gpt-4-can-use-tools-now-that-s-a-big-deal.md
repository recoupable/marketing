---
title: "GPT-4 Can Use Tools Now—That’s a Big Deal"
subtitle: "What \"function calling\" is, how it works, and what it means"
author: "Dan Shipper"
date: 2023-06-15
column: chain-of-thought
url: https://every.to/chain-of-thought/gpt-4-can-use-tools-now-that-s-a-big-deal
paywalled: true
scraped_at: 2026-06-11T16:08:18.010Z
---

# GPT-4 Can Use Tools Now—That’s a Big Deal

*What "function calling" is, how it works, and what it means*

#### Sponsored By: Brilliant

This article is brought to you by [Brilliant](https://brilliant.org/Every/), the best way to future-proof your mind through interactive lessons on everything from logic and math to data science, programming, and beyond.

[Learn More](https://brilliant.org/Every/)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#3744475859445845445f5e474477524152454e194358).

Human children come out of the womb totally helpless except in one important way: they know how to use their parents as tools.

Infant tool use is quite blunt at first: they cry loudly and incessantly whenever there’s a problem: “HUNGRY”, DIRTYY DIAPER!!!!”, “TIREEDDD!!!!”, and so on. They keep crying until their parent adequately diagnoses and resolves the issue through trial and error.

As they get older, however, children ditch these crude initial methods and instead use language to skillfully manipulate their parents in ever more targeted and precise ways. Rather than simply becoming totally unconsolable because they see someone eating a cookie and want one for themselves they can now specify in precise language exactly what they want: “Can I have a cookie?”. Parents can then use their unique capabilities—the ability to walk, their height differential, their manual dexterity, and strength—to walk to the cookie jar, open it, select a cookie, and appropriately offer it up as tribute. This kind of tool use is a powerful method for intelligent beings with significant limitations to accomplish goals in the world.

In contrast to human children, large language models like GPT-4 were not created knowing how to use tools to accomplish their aims. This limited their capabilities significantly. Third-party libraries tried to implement this functionality—but the results were often slow and inconsistent.

Earlier this week, OpenAI built tool use right into the GPT API with an update called *function calling. *It’s a little like a child’s ability to ask their parents to help them with a task that they know they can’t do on their own. Except in this case, instead of parents, GPT can call out to external code, databases, or other APIs when it needs to.

Each function in *function calling* represents a tool that a GPT model can use when necessary, and GPT gets to decide which ones it wants to use and when. This instantly upgrades GPT capabilities—not because it can now do every task perfectly—but because it now knows how to ask for what it wants and get it.

Function calling works like this:

When you query a GPT model you can now send along with it a set of tools that the model can use if it needs to. For each tool you can specify a description of its capabilities (do math, call a SQL database, launch nuclear bombs) and instructions for how GPT can properly call each one if it wants to. Depending on the query, GPT can choose to respond directly, or instead request to use a tool. If GPT sends back a request to use a tool your code calls the tool and sends back the results to GPT for further processing, if necessary.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2646/optimized_9P3zQkgcP-Aqsm2XaZ6Gp4Zb5XzHUHrRatpBRAIgppcToKII-RosOtQcWQg0daC0Iv_-EDsi17Gs10EbX5ymYNTzuAsdkJh1dVAhMdUHf6och5hOW6OJNodvwEfHGgPhWASQLi8HJNGT9v9RtWiaghU.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2646/optimized_9P3zQkgcP-Aqsm2XaZ6Gp4Zb5XzHUHrRatpBRAIgppcToKII-RosOtQcWQg0daC0Iv_-EDsi17Gs10EbX5ymYNTzuAsdkJh1dVAhMdUHf6och5hOW6OJNodvwEfHGgPhWASQLi8HJNGT9v9RtWiaghU.png?link=true)

[PAYWALL]
