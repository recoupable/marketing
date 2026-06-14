---
title: "The Better AI Gets, The More It Needs Us"
subtitle: "Hunting rare data and teaching models—the human expertise that's more valuable than ever"
author: "Alex Duffy"
date: 2025-06-27
column: context-window
url: https://every.to/context-window/the-better-ai-gets-the-more-it-needs-us
paywalled: true
scraped_at: 2026-06-11T16:07:40.540Z
---

# The Better AI Gets, The More It Needs Us

*Hunting rare data and teaching models—the human expertise that's more valuable than ever*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

This past week, a federal judge [ruled in favor of Anthropic](https://www.theverge.com/news/692015/anthropic-wins-a-major-fair-use-victory-for-ai-but-its-still-in-trouble-for-stealing-books) in a copyright case contested by five authors. At the center of the case was a creative, almost analog act: Anthropic purchased millions of physical books, ripped off their bindings, scanned each page, and used the resulting digital files to train its AI models. In a summary judgment, the court called this act “transformative” and ruled that it was protected under the principle of [fair use](https://en.wikipedia.org/wiki/Fair_use).

While explaining his rationale, Judge **William Alsup** [said](https://simonwillison.net/2025/Jun/24/anthropic-training/#atom-everything), “They may need to pay for getting their hands on a text in the first instance. But to make anyone pay specifically for the use of a book each time they read it, each time they recall it from memory, each time they later draw upon it when writing new things in new ways would be unthinkable.” (The ruling didn’t greenlight everything Anthropic did. The court took issue with another set of books: pirated files, downloaded en masse and stored in Anthropic’s systems even though the company decided not to train on them, and that part of the case will go to trial.)

This case underscores that data is the nexus of AI’s value. But once the data is in hand, the real work begins—making it useful for LLMs as they take on increasingly complex tasks.

### Teaching AI to hunt: New methods of reinforcement learning

One way to do that is [reinforcement learning](https://www.understandingai.org/p/reinforcement-learning-explained). In simplistic terms, reinforcement learning (RL) is like training a puppy: The model tries different actions, and you reward it for good ones and not for bad ones, Over time it figures out which actions get the most rewards, and does more of that.

Machine learning researcher **[Nathan Lambert](https://www.natolambert.com/)** has found that [OpenAI’s reasoning model o3](https://every.to/chain-of-thought/vibe-check-o3-is-out-and-it-s-great) [is incredible for search](https://www.interconnects.ai/p/summertime-outlook-o3s-novelty-coming). In particular, Lambert noted its relentlessness in finding an obscure piece of information, comparing it to a “trained hunting dog on the scent.” This is a big deal in RL, where models are known to give up quickly if a tool—in this case, the search engine that the model is accessing—isn’t immediately helpful. According to Lambert, o3’s persistence suggests that OpenAI has figured out how to get AI not to quit prematurely, turning it into a more effective learner.

Meanwhile, at Japanese research lab Sakana AI, a team is [rethinking how to train AI through reinforcement learning entirely](https://sakana.ai/rlt/). Instead of traditional RL methods that reward models for their ability to solve problems, Sakana is training models to *teach*. The models are given problems—along with the correct solution—and evaluated on their ability to explain the solution in a clear, helpful way. If you can train small, efficient models to teach well, you can use them to educate larger, more capable models much faster and cheaper than before. And long-term, you might even get models that teach themselves.

### Why setting the stage is everything

[PAYWALL]
