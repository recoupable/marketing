---
title: "I Cloned 2,000 Hacker News Users to Predict Viral Posts"
subtitle: "My AI experiment hit 60 percent accuracy—not perfect, but enough to change how we think about market research"
author: "Mike Taylor"
date: 2025-06-17
column: also-true-for-humans
url: https://every.to/also-true-for-humans/i-cloned-2-000-hacker-news-users-to-predict-viral-posts
paywalled: true
scraped_at: 2026-06-11T16:07:41.308Z
---

# I Cloned 2,000 Hacker News Users to Predict Viral Posts

*My AI experiment hit 60 percent accuracy—not perfect, but enough to change how we think about market research*

*Can AI predict what will go viral online? That's the question at the heart of ****Michael Taylor****’s latest experiment, in which nearly 2,000 AI personas based on real Hacker News commenters were tasked with predicting which headlines would take off. The resulting 60 percent accuracy rate was significantly better than chance, but with revealing limitations: The social dynamics that determine virality (those early upvotes that create momentum) introduce an element of chaos that AI models can't fully capture. Michael balances out his technical insights with practical takeaways for using AI in market research and a prompt template for you to try this approach yourself.—[Kate Lee](https://every.to/news/kate-lee-joins-every-as-editor-in-chief)*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

I created 1,903 AI personas based on real Hacker News [commenters](https://every.to/c/ai-guides) and asked them to predict which headlines would go viral. They got it right 60 percent of the time—20 percent better than flipping a coin.

That's a meaningful result. [Chief marketing officers say](https://a16z.com/ai-market-research/) they'd use AI market research if it matched human responses just 70 percent of the time. At 60 percent accuracy, we're close enough to matter—but my experiment also revealed why it’ll be difficult to do much better.

The excitement around my original [Hacker News simulator post](https://every.to/also-true-for-humans/i-created-a-hacker-news-simulator-to-reverse-engineer-what-goes-viral) was understandable: If AI could reliably predict viral headlines, you could keep testing until you found one that hits the jackpot. Using AI would be much faster and cheaper than traditional market research as well. But the 100-plus people who reached out after my post were skeptical that machines could match real focus groups. Marketing is a number-driven game, and marketers are finely tuned bullshit detectors. They wanted proof.

So I ran the experiment. I pulled 1,147 headlines from a single day and asked my nearly 2,000 personas to pick winners from a mix of top stories and flops. The 60 percent accuracy rate was encouraging—but when I dug into which headlines the AI got wrong, I discovered something more important than the success rate itself. The problem isn't just predicting individual behavior. It's that viral content depends on social dynamics that compound in unpredictable ways. Even if I could perfectly model your choices, you're influenced by how many upvotes a headline already has when you see it. One extra early vote can change everything—sending identical content down completely different paths in parallel universes.

Here's what I learned about the promise and limits of AI market research, and why achieving a useful but imperfect level of accuracy in predicting viral headlines might be the best we can do. I’ll also walk you through the prompt template you can use to try this yourself in ChatGPT or Claude.

## The experiment: Is ChatGPT an Oracle?

Our [Hacker News simulation](https://every.to/also-true-for-humans/i-created-a-hacker-news-simulator-to-reverse-engineer-what-goes-viral) asks ChatGPT to [roleplay](https://hubs.ly/Q03sbV6Y0) as 81 different personas, and then aggregates the results of their answers. That allows you to predict how people might respond to headlines you haven’t published yet, helping you refine your idea before posting.

Here’s what I did: I pulled 1,147 headlines posted on March 12, 2025 via the Hacker News API. By pulling more profiles of people who commented that day (running the same script for longer), I expanded the audience to 1,903 AI personas, and asked them to decide whether to upvote headlines that were a 50/50 mixture of stories that made the front page that day, and those that never did. (I ran this study in a Jupyter Notebook so I could process thousands of AI personas at once.)

## The results: Imperfect, but useful

The Hacker News personas’ predictions of which headlines would make the front page were accurate 60 percent of the time.

[![Bar chart showing actuals versus predicted for several of the top-vote vs low-vote stories. Source: Google Sheets, screenshot courtesy of author.](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3675/optimized_7867a59b-fec4-4ddc-be65-de545d45331f.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3675/optimized_7867a59b-fec4-4ddc-be65-de545d45331f.png)
*Bar chart showing actuals versus predicted for several of the top-vote vs low-vote stories. Source: Google Sheets, screenshot courtesy of author.*

[PAYWALL]
