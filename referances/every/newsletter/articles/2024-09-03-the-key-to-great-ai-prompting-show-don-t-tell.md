---
title: "The Key to Great AI Prompting? Show, Don’t Tell"
subtitle: "Provide examples to your LLM with few-shot learning"
author: "Mike Taylor"
date: 2024-09-03
column: also-true-for-humans
url: https://every.to/also-true-for-humans/the-key-to-great-ai-prompting-show-don-t-tell
paywalled: true
scraped_at: 2026-06-11T16:07:58.696Z
---

# The Key to Great AI Prompting? Show, Don’t Tell

*Provide examples to your LLM with few-shot learning*

#### Sponsored By: NERVOUS SYSTEM MASTERY

This essay is brought to you by [Nervous System Mastery](https://nsmastery.com/?coupon_source=Dan+Shipper&coupon=EVERY), a five-week boot camp designed to equip you with evidence-backed protocols to cultivate greater calm and agency over your internal state. Rewire your stress responses, improve your sleep, and elevate your daily performance. Applications close on September 27, so don't miss this chance to transform your life.

[Learn more](https://nsmastery.com/?coupon_source=Dan+Shipper&coupon=EVERY)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#c6b5b6a9a8b5a9b4b5aeafb6b586a3b0a3b4bfe8b2a9).

*In ****Michael Taylor****’s work as a prompt engineer, he’s found that many of the issues he encounters in managing AI tools—such as their inconsistency, tendency to make things up, and lack of creativity—are ones he used to struggle with when he ran a marketing agency. It’s all about giving these tools the right context to do the job, just like with humans. This piece is the latest in his series *[Also True for Humans](https://every.to/also-true-for-humans)*, about managing AIs like you'd manage people. Michael explores few-shot learning, providing examples of the task you want the LLM to do. You probably wouldn’t hire a human without showing them how to do the work, so put a few examples in the prompt to make your AI tools do their best work for you.—*[Kate Lee](https://every.to/news/kate-lee-joins-every-as-editor-in-chief)

[Subscribe to Every](https://every.to/subscribe)

---

When I went to put sunscreen on my 5-year-old daughter on vacation last week, she said to me, *“*You have to start with the nose, because that’s the most likely to burn.” That’s something I taught her, but it’s also something my father taught me. At that moment, I had a flashback to when I was a kid at the beach: “You have to start with the nose,” my father told me.

In imitating my father’s method of sunscreen application, I’ve passed it down to my daughter, who imitated me. Hopefully all my future descendants will avoid burned noses, too.

Imitation is one of the great superpowers of the human species. Trial and error is an expensive and dangerous way to learn. As advertising executive [Rory Sutherland](https://www.lennysnewsletter.com/p/what-most-people-miss-about-marketing) says, “An organism that had to learn everything from first principles would eat a hell of a lot of poisonous berries.”

Babies can imitate their parents as early as [eight months old](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4137790/#:~:text=Data%20and%20theory%20are%20adduced,an%20act%20of%20social%20cognition.&text=Classic%20developmental%20theories%20consider%20the,e.g.%2C%20Piaget%2C%201962).) by clapping, waving, or sticking out their tongues. Children are so hardwired to imitate that they will copy actions even though they [serve no obvious function](https://www.sciencedaily.com/releases/2017/07/170725085916.htm), a characteristic that separates us from most other animals. Copying has been so extraordinarily helpful to our species that we evolved to max it out.

But now, there is a new master imitator on the block: generative AI. Give ChatGPT a handful of examples of the task you’re asking it to do, and it will learn from those examples and do a better job than it would otherwise.

Providing examples is so powerful that researchers testing new AI models will distinguish between the performance of the model at tasks based on the number of examples given:

-
**Zero-shot**: Writing instructions for tasks without any specific training examples.

-
**One-shot**: The model is given a single example to learn from in order to generate the response.

-
**Few-shot**: The model is provided with a small number of examples, usually under 10.

-
**Many-shot**: Writing instructions for tasks with a larger number of examples, often in the dozens or hundreds.

This technique is so effective that even being able to complete a task zero-shot is considered an impressive feat by AI researchers. Only the largest of large language models are capable of completing tasks without examples, but it’s always better to put the work into finding good examples to add to the prompt.

In fact, I can’t think of a single prompt I worked on that ended up getting used in a product that didn’t have at least one example in the prompt—this technique is *that* powerful and prevalent. I’ll show you how to get the most out of your prompts by using examples.

---

**Become a **[paid subscriber to Every](https://every.to/subscribe?__cf_chl_tk=2MQqbARKL_6UKXSgPZaXttbNQ2EhHLJ25DxMySffTtA-1715698503-0.0.1.1-1621)** to unlock the rest of this piece and read about:**

- The power of examples in AI prompts

- The crucial role of imitation

- Few-shot learning: AI's ability to generalize from limited data

- Balancing reliability and creativity in prompt engineering

[Subscribe](https://every.to/subscribe)

[PAYWALL]
