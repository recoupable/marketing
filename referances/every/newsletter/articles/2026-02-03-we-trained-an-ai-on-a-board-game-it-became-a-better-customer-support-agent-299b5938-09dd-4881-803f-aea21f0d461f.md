---
title: "We Trained an AI on a Board Game. It Became a Better Customer Support Agent."
subtitle: "Games teach transferable skills—to humans and AI alike"
author: "Alex Duffy"
date: 2026-02-03
column: playtesting
url: https://every.to/playtesting/we-trained-an-ai-on-a-board-game-it-became-a-better-customer-support-agent-299b5938-09dd-4881-803f-aea21f0d461f
paywalled: true
scraped_at: 2026-06-11T16:07:23.920Z
---

# We Trained an AI on a Board Game. It Became a Better Customer Support Agent.

*Games teach transferable skills—to humans and AI alike*

*In this installment of [Playtesting](https://every.to/playtesting), ****[Alex Duffy](https://every.to/@AlxAi)**** shows why games might be the smartest approach to AI training right now. As the cofounder and CEO of Good Start Labs, he’s been exploring how game environments can improve AI capabilities across unexpected domains. His latest finding is surprising: Fine-tuning a model on the strategy game Diplomacy improved its performance on customer support and industrial operations benchmarks. Read on to learn why games generate the kind of data and behaviors that make AI better at the serious stuff, and what the Every team has learned from classics like *StarCraft*.—[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief)*

*Was this newsletter forwarded to you?[Sign up](https://every.to/account) to get it in your inbox.*

---

It’s my job to make AI play games. One board game we’ve focused on at [Good Start Labs](http://goodstartlabs.com) has been [Diplomacy](https://every.to/diplomacy), a World War I simulation reportedly played by **John F. Kennedy** and **Henry Kissinger**. There’s no dice and no luck. As everything shifts around you, all you can rely on are persuasion and strategy.

When we fine-tuned the Qwen3-235B model—an open-source model developed by the team at Chinese cloud computing company Alibaba Cloud—on thousands of rounds of Diplomacy, we found an over 10 percent improvement in performance on other games such as the card game Hanabi and word game Wordle. But we were encouraged to see that these improvements translated to other realms. The fine-tuned model also did better on Tau2, [a benchmark](https://taubench.com/#home) that tests how well AI agents handle customer support conversations, and[AssetOpsBench](https://huggingface.co/blog/ibm-research/assetopsbench-playground-on-hugging-face), IBM’s benchmark for industrial operations like equipment monitoring and maintenance.

It’s not a big leap to believe that improvement in one game could boost the model’s performance on others. But how does understanding WWI strategy make a model better at helping someone change their airline reservation or monitor equipment? Simple: Games reward specific behaviors. When you get good at those behaviors, they show up elsewhere.

When I asked my colleagues at Every what games had taught them, everyone had similar experiences. “*StarCraft* taught me how to cook,” Every’s head of platform **[Willie Williams](https://x.com/bigwilliestyle)** tells me, recalling the high-speed chess-like game. “You have things that take different amounts of time, and you want them to land at the same time.” Our senior designer, **Daniel Rodrigues**, learned English from Pokémon before any classroom. AI editorial lead **[Katie Parrott](https://every.to/@katie.parrott12)** became a more systematic thinker from board game mechanics and applied it to designing AI workflows.

This transfer of skills from games to other domains works for AI, too—and we can measure it. Diplomacy trains context-tracking, shifting priorities, and strategic communication. Customer support, where information is often incomplete and requests shift, needs the same capabilities.

We trained our model on Diplomacy in a reinforcement learning environment where you can clearly score whether the AI did something right. Labs are racing to build these kinds of environments because they do something that feeding the models static data can’t: They give models feedback on their decisions, teaching them to strategize, not just recall facts.

When you train a model on text from the internet, it learns to predict words. If you train it in an environment with goals and feedback, the model starts to develop skills that look remarkably like strategy. It’s a glimpse of where AI training is headed: less scraping the web, more learning by doing.

[![When fine-tuned in the Diplomacy learning environment, the Qwen 235B model improved significantly on certain benchmarks unrelated to gameplay. (Graph courtesy of Alex Duffy.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3925/optimized_f9bfa028-d95f-4c9d-9b97-fd415d0648ea.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3925/optimized_f9bfa028-d95f-4c9d-9b97-fd415d0648ea.png)
*When fine-tuned in the Diplomacy learning environment, the Qwen 235B model improved significantly on certain benchmarks unrelated to gameplay. (Graph courtesy of Alex Duffy.)*

[PAYWALL]
