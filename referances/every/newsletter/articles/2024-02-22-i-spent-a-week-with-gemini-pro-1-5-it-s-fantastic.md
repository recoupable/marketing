---
title: "I Spent a Week With Gemini Pro 1.5—It’s Fantastic"
subtitle: "When it comes to context windows, size matters "
author: "Dan Shipper"
date: 2024-02-22
column: chain-of-thought
url: https://every.to/chain-of-thought/i-spent-a-week-with-gemini-pro-1-5-it-s-fantastic
paywalled: true
scraped_at: 2026-06-11T16:08:07.196Z
---

# I Spent a Week With Gemini Pro 1.5—It’s Fantastic

*When it comes to context windows, size matters *

#### Sponsored By: Destiny

##### [![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/advertisements/596/optimized_Every%20.png)](https://destiny.xyz/every)

##### Own Game-changing Companies

Venture capital investing has long been limited to a select few—until now.

With the [Destiny Tech100 (DXYZ)](https://destiny.xyz/every) , you'll be able to invest in top private companies like OpenAI and SpaceX from the convenience of your brokerage account.

[Claim your free share](https://destiny.xyz/every) before it lists on the NYSE. Sponsored by Destiny.

[Claim your free share](https://destiny.xyz/every)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#3d4e4d52534e524f4e55544d4e7d584b584f44134952).

I got access to Gemini Pro 1.5 this week, a new private beta LLM from Google that is significantly better than previous models the company has released. (This is not the same as the publicly available version of Gemini that made headlines for [refusing to create pictures of white people](https://www.theverge.com/2024/2/21/24079371/google-ai-gemini-generative-inaccurate-historical). That will be forgotten in a week; this will be relevant for months and years to come.)

Gemini 1.5 Pro read an entire novel and told me in detail about a scene hidden in the middle of it. It read a whole codebase and suggested a place to insert a new feature—with sample code. It even read through all of my highlights on reading app Readwise and selected one for an essay I’m writing.

Somehow, Google figured out how to build an [AI](https://every.to/c/ai-frontiers) model that can comfortably accept up to *1 million tokens* with each prompt. For context, you could fit all of Eliezer Yudkowsky’s 1,967-page opus *Harry Potter and the Methods of Rationality *into *every message* you send to Gemini. (Why would you want to do this, you ask? For science, of course.)

Gemini Pro 1.5 is a serious achievement for two reasons:

1) **Gemini Pro 1.5’s context window is far bigger than the next closest models. **While Gemini Pro 1.5 is comfortably consuming entire works of rationalist doomer fanfiction, GPT-4 Turbo can only accept 128,000 tokens. This is about enough to accept Peter Singer’s comparatively slim 354-page volume *Animal Liberation, *one of the founding texts of the effective altruism movement.

Last week GPT-4’s context window seemed big; this week—after using Gemini Pro 1.5—it seems like an amount that would curl Derek Zoolander’s hair:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2987/optimized_SKrl7Ap8_CshyMPZzU6g5BYJQiO4qovUOxHxtEwsnMKgt3hyE62jLlphOGOnymq3IWijCRw52Qa2CHLCV0P2ayN_vW0Ty3vKQCvEHUJjyMTwFDwOlRTmvu3vzELxeBX3KmMyk0rEGD3-OJbprsbWClo.jpeg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2987/optimized_SKrl7Ap8_CshyMPZzU6g5BYJQiO4qovUOxHxtEwsnMKgt3hyE62jLlphOGOnymq3IWijCRw52Qa2CHLCV0P2ayN_vW0Ty3vKQCvEHUJjyMTwFDwOlRTmvu3vzELxeBX3KmMyk0rEGD3-OJbprsbWClo.jpeg?link=true)
2) **Gemini Pro 1.5 can use the whole context window. **In my testing, Gemini Pro 1.5 handled huge prompts wonderfully. It’s a big leap forward from current models, whose performance degrades significantly as prompts get bigger. Even though their context windows are smaller, they don’t perform well as prompts approach their size limits. They tend to forget what you said at the beginning of the prompt or miss key information located in the middle. This doesn’t happen with Gemini.

These context window improvements are so important because they make the model smarter and easier to work with out of the box. It might be possible to get the same performance from GPT-4, but you’d have to write a lot of extra code in order to do so. I’ll explain why in a moment, but for now you should know: Gemini means you don’t need any of that infrastructure. It just works.

Let’s walk through an example, and then talk about the new use cases that Gemini Pro 1.5 enables.

## Why size matters (when it comes to a context window)

I’ve been reading Chaim Potok’s 1967 novel, *The Chosen. *It features a classic enemies-to-lovers storyline about two Brooklyn Jews who find friendship and personal growth in the midst of a horrible softball accident. (As a Jew, let me say that yes, “horrible softball accident” is the most Jewish inciting incident in a book since Moses parted the Red Sea.)

In the book, Reuven Malter and his Orthodox yeshiva softball team are playing against a Hasidic team led by Danny Saunders, the son of the rebbe. In a pivotal early scene, Danny is at bat and full of rage. He hits a line drive toward Reuven, who catches the ball with his face. It smashes his glasses, spraying shards of glass into his eye and nearly blinding him. Despite his injury, Reuven catches the ball. The first thing his teammates care about is not his eye or the traumatic head injury he just suffered—it’s that he made the catch.

If you’re a writer like me and you’re typing an anecdote like the one I just wrote, you might want to put into your article the quote from one of Reuven’s teammates right after he caught the ball to make it come alive.

If you go to ChatGPT for help, it’s not going to do a good job initially:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2987/optimized_5m9XaeCjJatECMsZPWfHiETRxcnEuqNzAsS-7tLNXfldqs5t4B5cFb69KayzRsHqDp7ILGdT7_Bm4e2r47Rk2l157vTp-upj0hxz4Uv25qGIRbQW5CJgaxsqIqNcITFUT4IcVxRaY8UF8yAK2Yz7nUg.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2987/optimized_5m9XaeCjJatECMsZPWfHiETRxcnEuqNzAsS-7tLNXfldqs5t4B5cFb69KayzRsHqDp7ILGdT7_Bm4e2r47Rk2l157vTp-upj0hxz4Uv25qGIRbQW5CJgaxsqIqNcITFUT4IcVxRaY8UF8yAK2Yz7nUg.png?link=true)
This is wrong. Because, as I said, Sydney Goldberg did not care about Reuven’s injury—he cared about the game! But all is not lost. If you give ChatGPT a plain text version of *The Chosen* and ask the same question, it’ll return a great answer:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2987/optimized_RzVSwQXYEzkc1-jRgMbJI0w_MORMnpOxiUxuFsor9W8aQc89Kg2rNQwUbISr2tZYhoMoY3ytH3PzyChjzWCAeosSW-gSs3-cQ7eWVmKGoOVJWBYajK2sq_pSAY7-VWKT5nEYvCc7AhirdVZo8tkDOV4.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2987/optimized_RzVSwQXYEzkc1-jRgMbJI0w_MORMnpOxiUxuFsor9W8aQc89Kg2rNQwUbISr2tZYhoMoY3ytH3PzyChjzWCAeosSW-gSs3-cQ7eWVmKGoOVJWBYajK2sq_pSAY7-VWKT5nEYvCc7AhirdVZo8tkDOV4.png?link=true)
This is correct! (It also confirms for us that Sydney Goldberg has his priorities straight.) So what happened?

ChatGPT behaved as if I’d given it an open-book test. We can improve ChatGPT’s responses by, when asking it a question, giving it a little notecard with some extra information that it might use to answer it.

In this case we gave it an entire book to read through. But you’ll notice a problem: The entire book can’t fit into ChatGPT’s context window. So how does it work?

[PAYWALL]
