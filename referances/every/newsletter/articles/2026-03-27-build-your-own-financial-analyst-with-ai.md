---
title: "Build Your Own Financial Analyst With AI"
subtitle: "A step-by-step guide to going from ChatGPT earnings previews to a custom investment dashboard—no engineering team required"
author: "Brooker Belcourt"
date: 2026-03-27
column: p
url: https://every.to/p/build-your-own-financial-analyst-with-ai
paywalled: true
scraped_at: 2026-06-11T16:07:19.697Z
---

# Build Your Own Financial Analyst With AI

*A step-by-step guide to going from ChatGPT earnings previews to a custom investment dashboard—no engineering team required*

*We’re hosting a [Custom Agents Camp](https://every.to/events/notion-custom-agents-camp) with Notion on Friday, April 3, at noon ET. We’ll walk through the agents powering daily operations at Every, and give you the templates to start using them yourself*.* Plus, designer ****Brian Lovin**** will share how Notion uses custom agents and what they’re building next.*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

When I was an analyst at a hedge fund, earnings season was a sprint that lasted a month. I had 40 firms to cover, each one reporting over a four-week window. Every earnings preview—the research brief laying out what to expect before a company’s quarterly results were announced—followed the same grind: Grab the data, update my financial model, and write up the takeaways. Four hours of work per company, minimum.

It’s a task that is begging to be automated by AI. The process is [structured and repeatable](https://every.to/p/i-talked-to-more-than-100-companies-about-ai-here-s-what-s-actually-working), and the data sources are well-defined. But if you’ve ever pointed ChatGPT at a collection of data and gotten back a summary with basic math mistakes or that ignored important metrics of a company’s financial health, you know how disappointing the reality can be.

This kind of experience is why many investment teams give up on AI. They try it once, conclude the technology isn’t ready, and go back to the old way. What those teams don’t realize is that they are judging the entire technology based on the sophistication of one tool. It’s like giving up on all email after using the clunky Microsoft 365 browser product.

Over the past six months running [AI consulting for finance teams](https://every.to/p/how-claude-code-is-transforming-finance-without-turning-you-into-a-coder), I’ve been walking clients through what developments in AI capabilities can now let us achieve: the same earnings preview—Shopify’s next quarter—at four levels of tooling, each one more sophisticated than the last. By level four, the system reads your model, applies your thinking about what makes a great company, and runs while you sleep. Here’s how to get there.

## Level one: The custom GPT

This is where most investment teams start. You set up a ChatGPT project—a dedicated workspace where you can store instructions and upload documents—with a detailed prompt that tells the model how you want your earnings preview structured.

The prompt I use specifies everything: how to lay out the beat/miss analysis (where you compare actual results against Wall Street expectations), which financial metrics to prioritize, how to handle management guidance, and whether to source consensus estimates from the web or more premium data sources. I attach the Securities Exchange Commission (SEC) filings and earnings release directly to the project. Run it in thinking mode—where the model reasons longer before answering—and after about 15 minutes, you get a solid preview with web-sourced data, SEC citations, and a clear beat/miss breakdown.

But the output has quirks. Tables format data the way ChatGPT wants, not the way I think—financial metrics are spread across columns when I want financial metrics on the side. Everything lives in a chat window instead of in a custom website. You can partly fix that by adding a second prompt—“Create an HTML dashboard from this”—but now the preview requires two steps. Try to combine both prompts into a single workflow, and you hit ChatGPT’s 8,000-character project instruction limit.

Level one’s ceiling is that it’s great for structured, single-task analysis. But it falls apart when you need multi-step workflows with detailed instructions for each step.

## Level two: Claude with skills and data connectors

[PAYWALL]
