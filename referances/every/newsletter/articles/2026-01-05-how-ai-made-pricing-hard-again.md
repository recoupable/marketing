---
title: "How AI Made Pricing Hard Again"
subtitle: "Don’t be like MoviePass. Here are five pricing models for a world where growth costs you money."
author: "Anh-Tho Chuong"
date: 2026-01-05
column: p
url: https://every.to/p/how-ai-made-pricing-hard-again
paywalled: true
scraped_at: 2026-06-11T16:07:25.935Z
---

# How AI Made Pricing Hard Again

*Don’t be like MoviePass. Here are five pricing models for a world where growth costs you money.*

***[Anh-Tho Chuong](https://www.linkedin.com/in/anhthochuong)**** has a front-row seat to one of the trickiest problems in AI right now: how to price products when your costs scale with usage. As the cofounder of Lago, a Y Combinator-backed open-source billing company, she’s watched dozens of AI startups hit the same wall—growth that should be cause for celebration instead becomes a path to bankruptcy. In her piece, she breaks down a paradigm shift that’s forcing the entire industry to rethink its business model: AI killed the economics that made traditional SaaS so profitable. So what do you do when your best customers are also your most expensive? Read on for five pricing models built for this new reality, three core principles every founder needs to understand, and a framework for choosing the right approach for your business.—****[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief)***

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

MoviePass’s [high-profile failure](https://every.to/napkin-math/cogs-how-i-bankrupted-moviepass-c6535dbb-3ea2-4329-ac3e-1249415ae81b) lacked the elaborate deception of Theranos, the mercurial maverick founder of WeWork, and the absurdity of the useless Juicero smoothie maker. Out of all the legendary crashes of 2010, it was just *silly*.

The company’s pitfall was simple: It gave customers $9.95 a month to see up to 30 movies while the company paid theaters $10 per ticket. As it turns out, you can’t offer a 96.68 percent discount for very long.

Companies building products powered by AI today face the same trap. In traditional software as a service, once you have paid your developers and Amazon Web Services for storage, it doesn’t cost you any more if more people use your product. But AI companies pay LLM providers per use. Growth is expensive.

AI vibe coding platform Replit learned this the hard way. The people who use it to code apps and websites pay a monthly fee, plus a bit more if they use it a lot. Meanwhile, Replit has to pay to use the LLMs that power it. Gross margins—revenue minus direct costs—collapsed from 36 percent gross margin last February to [negative 14 percent](https://www.theinformation.com/articles/replits-margins-illustrate-high-costs-coding-agents?rc=65wdzw) in April; it was losing money the more customers used it. By July, it had recovered to 23 percent, but it’s far below the 70 to 85 percent gross margins that traditional SaaS companies enjoyed.

As the co-founder of Y Combinator-backed open-source billing company [Lago](https://www.getlago.com/), which helps companies charge customers and create invoices, I’ve watched dozens of AI companies hit the same wall. It’s clear to me that the era of a one-size-fits-all pricing strategy is over. There is not concrete clear information for founders and teams building with AI and worried about how much to charge when much of their revenue is going toward LLMs.

AI has shrunk not only gross profit margins, but also the margin for error when competition is so fierce. That makes figuring out product pricing and maintaining reasonably healthy margins a full-company effort. If you are building an AI company, more of your team beyond the finance department will need to know about pricing, monetization, and margins.

Founders and builders need to understand the five pricing models that can be adapted to AI tools so companies don’t face bankruptcy from LLM costs. If you follow these new pricing principles for the AI age, you’ll understand why your engineering team needs to care about margins as much as your CFO does, and how to structure pricing that turns AI’s marginal costs from a liability into a competitive advantage.

## AI pricing models: Where they succeed and where they fail

Let’s break down the pricing models on which you can build a sustainable business when much of your costs come from paying LLMs.

### Usage-based pricing: Pay for what you consume

Usage-based pricing is where you only pay for what you consume. This is how infrastructure providers like Amazon Web Services or OpenAI charge their customers—per gigabyte stored or token processed. Replit pays OpenAI per token processed, both input and output, instead of with a fixed subscription.

[![OpenAI charges customers by millions of tokens. One million tokens is roughly 750,000 words. (Source: OpenAI.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3882/optimized_45b9e942-4c63-4c6d-bd0c-27059ffb5db3.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3882/optimized_45b9e942-4c63-4c6d-bd0c-27059ffb5db3.png)
*OpenAI charges customers by millions of tokens. One million tokens is roughly 750,000 words. (Source: OpenAI.)*

### Seat-based subscription: Still alive and well in the AI era

Seat-based subscriptions—one person, one seat, one monthly fee—were how traditional SaaS companies made their fortunes. [There’s](https://www.forbes.com/councils/forbestechcouncil/2025/04/18/ai-is-reshaping-saas-pricing-why-per-seat-models-no-longer-fit/) [no](https://www.agilegrowthlabs.com/blog/seat-based-pricing-is-dead-how-ai-first-saas-companies-are-monetizing-with-outcome-based-pricing/) [shortage](https://www.thomabravo.com/insights/beyond-the-seat-future-of-saas) [of](https://www.businessinsider.com/saas-ai-changing-how-software-companies-charge-customers-2025-4) opinions that say AI killed this model. Collaborative brainstorming tool Miro proves that it’s still alive and well. The company’s plans now include AI credits (to rate-limit the most expensive features), but customers still pay by the user.

[![Collaborative tool Miro’s plans include a seat-based subscription. (Source: Miro.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3882/optimized_c7cf3f99-4898-4335-8704-0358305784c8.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3882/optimized_c7cf3f99-4898-4335-8704-0358305784c8.png)
*Collaborative tool Miro’s plans include a seat-based subscription. (Source: Miro.)*

Seat-based subscriptions work when the product facilitates collaboration. AI features cost more to operate, so companies might raise prices per seat. But the real threat is that AI makes teams more productive with fewer people—meaning fewer seats to sell in the first place.

### Subscription with overages: Users pay more when they go over

Subscriptions with overages give customers a base plan with included usage, then charge extra when they exceed it. AI code editor [Cursor](https://every.to/vibe-check/vibe-check-cursor-2-0-and-composer-1-alpha) uses this model, giving developers a certain amount of AI-assisted coding each month before charging more.

[![AI code editor Cursor gives customers an allocated amount of use, then charges more when that is exceeded. (Source: Cursor.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3882/optimized_d1edbefc-7e6c-4219-bf1f-90e4d6957480.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3882/optimized_d1edbefc-7e6c-4219-bf1f-90e4d6957480.png)
*AI code editor Cursor gives customers an allocated amount of use, then charges more when that is exceeded. (Source: Cursor.)*

This model is ideal for products where reliability is paramount, such as code editors, infrastructure, or communication tools. If users weren’t able to use Cursor after going over the included usage, for example, business-critical engineering workflows would be interrupted.

[PAYWALL]
