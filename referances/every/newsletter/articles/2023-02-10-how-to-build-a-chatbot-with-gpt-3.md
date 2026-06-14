---
title: "How to Build a Chatbot with GPT-3"
subtitle: "A step-by-step guide"
author: "Dan Shipper"
date: 2023-02-10
column: chain-of-thought
url: https://every.to/chain-of-thought/how-to-build-a-chatbot-with-gpt-3
paywalled: true
scraped_at: 2026-06-11T16:08:24.865Z
---

# How to Build a Chatbot with GPT-3

*A step-by-step guide*

On a Friday night a few weeks ago I woke up to an email from [Lenny Rachitsky](https://twitter.com/lennysan), writer of [Lenny’s Newsletter](http://lennysnewsletter.com/), one of the largest newsletters on Substack. He wanted to know how I built one of our Every chatbots:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_Q0km_tHWLeEt8InISSI07EnAv3fU8QrNdKtij6x9I_ilRlsGZz2Wrne8MfujtM5pNLyQ7c6q5QbqXmrkmtDwJOasS4B-QuMap5Rw-WC1kARCMG-91LsL24FFyYzVzLTHmj4m5MwnzQ0jz3PlhvNnweI.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_Q0km_tHWLeEt8InISSI07EnAv3fU8QrNdKtij6x9I_ilRlsGZz2Wrne8MfujtM5pNLyQ7c6q5QbqXmrkmtDwJOasS4B-QuMap5Rw-WC1kARCMG-91LsL24FFyYzVzLTHmj4m5MwnzQ0jz3PlhvNnweI.png?link=true)
I *love* Lenny. He’s a major inspiration for us at Every, so to see him interested in chatbots was exciting. It also created an opportunity for me to test a theory I’d been [playing around with](https://every.to/chain-of-thought/i-trained-a-gpt-3-chatbot-on-every-episode-of-my-favorite-podcast):
*Chatbots are a new and valuable content format for creators.*
I knew Lenny’s audience would be a perfect way to test this theory:

- It’s large (he has 300,000 subscribers).

- They’re highly engaged.

- All of his posts are evergreen.

- They’re often used as reference material.

For all of these reasons, making his posts available in a chatbot format made sense. Rather than having to scroll through his archive to answer a product question, any of his subscribers could ask the bot instead and get instant answers.
I knew it would be pretty easy to build one for him based on the work we’d already done—so I offered to make it for him:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_yLTdniTU5CCaYAqxdkpCS7Per0cIW5eLVZPE0tyx2elzN3xTGaN16TD7I9tsrEbBF5oGlIyZDczqb5VhrdABM8SoTbV34CLAyenER4Dl6XOk0YM7yhZQlLOG_CkQHnwkYpWdkK-AcIwq0lzc1q6qWJw.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_yLTdniTU5CCaYAqxdkpCS7Per0cIW5eLVZPE0tyx2elzN3xTGaN16TD7I9tsrEbBF5oGlIyZDczqb5VhrdABM8SoTbV34CLAyenER4Dl6XOk0YM7yhZQlLOG_CkQHnwkYpWdkK-AcIwq0lzc1q6qWJw.png?link=true)
He said yes, and the next day I woke up early and delivered him a Lenny chatbot built to give answers from his newsletter archives:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_NRGKCSTfgKRhI3uT1ZKAd8gCGigiV5CZ9SnXtVs3qG55NtuFssZqhJD6VeNRmEOLLe6yxj0naq54nXZciwdAkXLI9PqczA2vvCyrODh2ALhmQ3u6kGSBCI4Ba_gmfN9lQp_Q1dp2Sg4u47YfiglskjQ.png)](https://lennybot.com)

[Try the Lenny Bot](https://lennybot.com)

Over the next couple of weeks I also wrote an essay, [published as a guest post on his newsletter](https://www.lennysnewsletter.com/p/39b613d6-063b-45df-9a8e-40fece9d6bde), about how I built the bot. It’s a detailed, step-by-step guide to how [GPT-3](https://every.to/c/ai-and-gpt3) works and how it can be used to create Q&A chatbots like this easily—no programming experience required. It went live on Tuesday and became Lenny’s highest trafficked day ever:

[![](https://pbs.twimg.com/profile_images/1592990461517389824/iln8hi1f_normal.jpg)
Lenny Rachitsky@lennysan

New highest trafficked day to the newsletter, thanks to @danshipper's piece on building the Lenny Bot 💥If you haven't played with the Lenny Bot yet, try asking it some questions ➔ https://t.co/FNJrH4SYWnRead the story of how it came to be here ➔ https://t.co/cNj3rtZsiD

![](https://pbs.twimg.com/media/FodvdKEaQAA_C7X.png)

February 8th 2023, 1:34pm EST

2 Retweets34 Likes](https://twitter.com/lennysan/status/1623389919908614144)

It was a wild ride, and I’m syndicating the full post below for all of you. There is also **a section at the bottom exclusively for Every paying subscribers with**:

- A retrospective on launch day including metrics

- Server-side code samples

- Client-side chatbot code samples

I hope you enjoy!

## I Built a Lenny Chatbot Using GPT-3

Lenny’s Newsletter is great, but it’s one-sided. It talks *to* you, but you can’t talk back. Wouldn’t it be awesome if you could ask Lenny’s Newsletter a question?
Now that’s possible.
Over the course of a week I built an AI-powered chatbot for Lenny that uses his entire newsletter archive to answer any question you have about product, growth, and startups. It’s built with GPT-3 and took a couple hours to do, end to end. In this post, I’ll break down exactly how the Lenny Bot works so you can learn to build one yourself.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_oKrL3_vcbdw_wfj91BEZjZYnI8JZ0jmqrv0dbNsRUO9MXjnavX3cRHH27CEE3bVLXIIG5vBcfiUkGppcJHAHIwsvrEeXYHFB_eSbB-HVEoO2m-EwLOTY5w1lpScc6ys5AHdIfMfuOdJtTnUb_iO1SG4.jpeg)](https://lennybot.com)

You can also use it right now 👇

[Try the Lenny Bot](https://lennybot.com)

AI technologies like GPT-3 are still in their infancy, but they’re going to be everywhere soon. Staying on top of how they work is going to be crucial to your career in tech, and especially in building product. The best way to prepare for a fast-approaching future is to dive in and get your hands dirty.
It might seem intimidating to get started, especially if you don’t have a technical background. But I’m going to start at the very beginning. You’ll be able to understand what I’m talking about and begin using it yourself,** ***no programming required***. **(And if you have any questions, you can always paste them into ChatGPT—it’ll give you good responses ;)

## Preamble: GPT-3 vs. ChatGPT

You’ve probably heard of both GPT-3 and ChatGPT. Maybe you use those terms interchangeably, or maybe you’re not really sure what the difference is. It’s worth taking a minute to understand how they differ.
GPT-3 and ChatGPT are both “large language models” (LLMs). These are machine-learning models that can generate natural-sounding text, code, and more. They’re trained using large data sets of text, which helps them master natural-language tasks, like answering questions, writing marketing copy, and holding conversations. So what’s the difference between them? And why is it important?
GPT-3 is a general-purpose language model: it can hold conversations, write code, complete a blog post, do translation tasks, and more. You can think of it like a flexible know-it-all that can expound on any topic you want.
ChatGPT is a version of GPT-3 that’s been turned into a friendly, inoffensive extrovert. Basically, it’s been trained to be good at holding conversations. Its creator OpenAI does this by repeatedly holding conversations with the model, and rewarding it for good responses and punishing it for bad ones—a process called [Reinforcement Learning from Human Feedback](https://huggingface.co/blog/rlhf).
You’d think since we’re building a chatbot, we’d use ChatGPT, right? Unfortunately not. OpenAI hasn’t created a way for us to interact with the ChatGPT model directly—you can only use it through the ChatGPT web app. So it’s not suitable for our purposes.
We want to be able to interact with the model directly, not through an intervening app. So instead we’ll use GPT-3 for our explorations. It’ll give us all the power and flexibility we need to build a chatbot.
We’ll do it in two ways: using [OpenAI’s Playground](https://platform.openai.com/playground) to start, and with a little bit of code after that. The Playground is a web app that lets you prompt GPT-3 and get responses back, making it a great place for us to experiment.
Let’s start there and see how things go.

## The basics of GPT-3

The basic way to explain GPT-3 is that it likes to finish your sentences for you. You provide it with a starting set of words, and it tries to figure out the most likely set of words that follow from your input. You can provide any string of words. It’s very flexible and can talk about anything you want, from product management to astrophysics.
The set of words you provide is called a *prompt*, and the answer you get back from GPT-3 is called a *completion*.
Below is a simple example in the [GPT-3 Playground](https://platform.openai.com/playground?model=text-davinci-003). The non-green text is what I typed in as a prompt, and the green text is what GPT-3 returned as the completion:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_P07k7gUSSDCWJb3bs60gxbtxLbhtYp6biS_EI83vDvwp_i-4OO0kPopFnHkQumJIX_SeUcEKHoBIPhy4dNp9h8gUqcrYJutYtUGW4jxu9OCyHNjVHqpnCpyxUx7z6sgToneiX49DcpL81CcziDpVxHo.jpeg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_P07k7gUSSDCWJb3bs60gxbtxLbhtYp6biS_EI83vDvwp_i-4OO0kPopFnHkQumJIX_SeUcEKHoBIPhy4dNp9h8gUqcrYJutYtUGW4jxu9OCyHNjVHqpnCpyxUx7z6sgToneiX49DcpL81CcziDpVxHo.jpeg?link=true)

You can see that GPT-3 performs well on a simple completion like this. But it performs well even when the prompts get more complicated.
You can, for example, prompt it to define product-market fit:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_2rCne12eHdcu4MvgBq2ozVwotsZjuYdrxypSsuDFFo3ROB-3n2ut-RQ7aHiGvk1gU7W8SGvk44xXGJ89QYdTjtz_Z7n3Kv8BLqV8W5XT1-xBJ8irw_nclsiYavxWT2Era13jxe-xUMUEug5BPoUNOco.jpeg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_2rCne12eHdcu4MvgBq2ozVwotsZjuYdrxypSsuDFFo3ROB-3n2ut-RQ7aHiGvk1gU7W8SGvk44xXGJ89QYdTjtz_Z7n3Kv8BLqV8W5XT1-xBJ8irw_nclsiYavxWT2Era13jxe-xUMUEug5BPoUNOco.jpeg?link=true)

That’s not bad! Since it can already answer product questions, this looks like it will be useful for our Lenny Chatbot out of the box.
You might assume that on the back end, GPT-3 has a compendium of concepts that it’s using to understand your sentence and generate the right completion. But in reality, it’s a probability engine—one that’s very good at, given a prompt, finding the words that are most likely to follow it.
It can do this because it’s been [trained by analyzing](https://en.wikipedia.org/wiki/GPT-3#Training_and_capabilities) the statistical probabilities of sentences from basically the entire internet, so it has a lot of data to learn from. (All those Medium posts about product-market fit are good for something!)
If you want to learn more about how this works from a technical perspective, I recommend checking out Andrej Karpathy’s [videos](https://www.youtube.com/@AndrejKarpathy).

## Turning GPT-3 into a chatbot

Now we have the bot answering questions, but how can we get it to actually chat with us?
Ideally we want it to get messages from the user and give responses back. And we want to give it a little bit of personality. It would be great if it sounded like Lenny himself—warm, friendly, and smart.
That’s pretty simple to do with GPT-3 as well. We can ask it to behave in this way in our prompt:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_iCPJRbs8BkKFs1kqKgA96iIOXJfdDR7jhWkfqLKhYC1C6Aps6C9lXsn7QOdjzn8GVd6BiFs4zAnhTNzJB2UssAEfzod6DXXxFg6xcJiHoBEVJWXCqtVuE07VUhCeHy3wQbnBdEkXqRHt-GFh-SN4zV0.jpeg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_iCPJRbs8BkKFs1kqKgA96iIOXJfdDR7jhWkfqLKhYC1C6Aps6C9lXsn7QOdjzn8GVd6BiFs4zAnhTNzJB2UssAEfzod6DXXxFg6xcJiHoBEVJWXCqtVuE07VUhCeHy3wQbnBdEkXqRHt-GFh-SN4zV0.jpeg?link=true)

As you can see, GPT-3 has read enough chatbot transcripts and product management posts to be able to start a conversation with us based on this kind of prompt.
We can continue our conversation with it by writing more of the transcript:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_Y5z0yuBdnG4JqwXinbKqOJZHxax4ptjlPFGkvmX_79FvOvF-zaakQaLLWfa1lARrmiY5AGT3bUYtXkAHcy_1-E2Jx0gfQjUeeeHJmOHhMETGYO8bCXtLccyGwq2fise9RCM3_RRKREJNlA5HkuiM2xE.jpeg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_Y5z0yuBdnG4JqwXinbKqOJZHxax4ptjlPFGkvmX_79FvOvF-zaakQaLLWfa1lARrmiY5AGT3bUYtXkAHcy_1-E2Jx0gfQjUeeeHJmOHhMETGYO8bCXtLccyGwq2fise9RCM3_RRKREJNlA5HkuiM2xE.jpeg?link=true)

Notice what we’re doing: every time we run the model, we have to feed it the entire transcript of what came before in the conversation. That guides its responses:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_p6O8lS9XnN7yy9JCUss4nhEQoN5FQ_sCsOY1RbVUo2DfWtUhywfPenqKQOTGT4abfIbwZ3ZxE11Om4bnvjsLLZxkQYvAo1ob1ahlnLrBaamuuvB2wb2lJqX9tTgHy85c4ngI44VCtFk-KrLFXqtOcts.jpeg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_p6O8lS9XnN7yy9JCUss4nhEQoN5FQ_sCsOY1RbVUo2DfWtUhywfPenqKQOTGT4abfIbwZ3ZxE11Om4bnvjsLLZxkQYvAo1ob1ahlnLrBaamuuvB2wb2lJqX9tTgHy85c4ngI44VCtFk-KrLFXqtOcts.jpeg?link=true)

Success! It’s chatting with us at a high level about product management questions, like how to build a roadmap.
But what if we want to get responses to questions that are harder to answer? For example, one of the biggest values of Lenny’s Newsletter is the amount of benchmark data he provides so that you can measure how well you’re doing against the best in the business.
If we go back through Lenny’s archive, we find in his post about [activation rates](https://www.lennysnewsletter.com/p/what-is-a-good-activation-rate) that the average one across different kinds of products is about 34% and the median is 25%.
Let’s ask GPT-3 and see whether it knows this:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_3_uNxP0R7l68rcuD8QoVot75sl8YEptCkLwLsBq4sKSmsQRzsfONazOFcJQkglgaXno2zL5ofIu67U8wouQaPsd923m5BV2pHY2FUUXT482JKB67ibeFuinGvnfZ0pGpja6tb9xXVXbymp_EC5FEG7g.jpeg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_3_uNxP0R7l68rcuD8QoVot75sl8YEptCkLwLsBq4sKSmsQRzsfONazOFcJQkglgaXno2zL5ofIu67U8wouQaPsd923m5BV2pHY2FUUXT482JKB67ibeFuinGvnfZ0pGpja6tb9xXVXbymp_EC5FEG7g.jpeg?link=true)

Not bad! It’s in the right ballpark, but its estimate for a good activation rate is a little lower than Lenny’s data says is the average. Ideally, since it’s a Lenny chatbot, we want it to return the benchmark he provides in his article.
Once we start really probing the bot, this kind of problem only gets bigger. For example, if we ask it who Substack’s first publisher was—a [topic Lenny covered](https://www.lennysnewsletter.com/p/consumer-business-find-first-users)—it will say it was Andrew Sullivan:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_5W6T0VGukuQisvWPP9zzuL9WAhMdElF89YFI8XGgaOa7RBPzrYF4oN3VxuJ2i4CJWM7Ga6Kr2GoIwHReOdmfsZmYfglHm-QLjCfZSof7Ng6zJO0H9SpwyfPS3L11t2NzTvKcSnmaBsnbscf7sG7kqU8.jpeg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_5W6T0VGukuQisvWPP9zzuL9WAhMdElF89YFI8XGgaOa7RBPzrYF4oN3VxuJ2i4CJWM7Ga6Kr2GoIwHReOdmfsZmYfglHm-QLjCfZSof7Ng6zJO0H9SpwyfPS3L11t2NzTvKcSnmaBsnbscf7sG7kqU8.jpeg?link=true)

This answer sounds confident, but it is incorrect. (The correct answer is [Bill Bishop](https://sinocism.com/).) This isn’t an isolated incident. For example, if I ask, “Is it best for consumer startup ideas to come from founders who are trying to solve their own problems?” it replies:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_lq7__blfZdk19B4QFgUaFMjXXlhcZnXvjv3SDUOhMurfAec-pB54r1LSupwhxNU0PDoLns7dcgQm8vxLOuTqIbyhK8fzcd6WIlEKzmQafxcEHobcx7L6hUhmOVa88thzeF-FhIxdzRxwCwqQ9Ml5P0M.jpeg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_lq7__blfZdk19B4QFgUaFMjXXlhcZnXvjv3SDUOhMurfAec-pB54r1LSupwhxNU0PDoLns7dcgQm8vxLOuTqIbyhK8fzcd6WIlEKzmQafxcEHobcx7L6hUhmOVa88thzeF-FhIxdzRxwCwqQ9Ml5P0M.jpeg?link=true)

This is confident—and also wrong. As Lenny covered in his post on [starting and scaling consumer businesses](https://www.lennysnewsletter.com/p/kickstarting-and-scaling-a-consumer), less than a third of consumer startup ideas came from founders solving their own problems. So it’s not “absolutely” a best practice.
What’s going on here? There are two intertwined problems:

1.
**GPT-3 tends to “hallucinate.”** [Hallucination](https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)) is a technical term that refers to the model’s propensity to return nonsensical or false completions depending on what’s asked of it. The model is like a smart and overeager 6-year-old. It will try its best to give you a good answer even if it doesn’t know what it’s talking about. OpenAI and other foundational-model companies are actively working on this problem, but it’s still common. It’s compounded by the second problem.

2.
**GPT-3 might not have the right data. **GPT-3 has a knowledge cutoff—meaning all of the information it uses to produce its responses is frozen in 2021. Also, much of Lenny’s writing is behind a paywall. That means that even though GPT-3 has read the whole internet, it won’t have the material from his newsletter available to construct answers.

So how could we construct a chatbot with GPT-3 that solves these problems? Ideally we want to feed GPT-3 the information it needs to answer questions spontaneously. That way it will have the right information available and be less likely to make things up.
There’s an easy way to do that.

## Stuffing context into the prompt

When I was in high school, I had a physics teacher who allowed open-book tests. He would allow you to bring a single index card to the test with any of the formulas that you thought you needed to answer the questions.
Memorizing the formulas didn’t matter so much, but what did was using your reasoning abilities to turn the formulas into the correct answer.
People would come to the test with microscopic handwriting covering every inch of their notecard, which was a helpful strategy. The formulas gave you the context you needed to think through the answers to the questions on the tests, so the tests became less about your memory and more about how well you understood the topic. (I got a B in that class, so my understanding was pretty average.)
You can work with GPT-3 in a similar way. If, in your prompt, you include the equivalent of a notecard with context to help it answer the question, it will often get it right. (Its reasoning capabilities are better than mine.)
Let’s go back to an example GPT-3 failed on earlier and see if we can correct it with this technique.
As I mentioned above, in his post on consumer businesses, Lenny notes that less than a third of the founders got their idea from trying to solve their own problem:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_rqEyNEHfe4lzkHSGVRkZS7V4VsdZymt77YXHrD9fs_r1QCLNApLhvLBEUbuUvDa2_bx4I9uT6nlBIQAoO_iANmmE-YJtTjTm1WCFZ11KDIBWnQYuyUemfDjJ0Isp02wseDWsphjaRuzy5idvAhktkTM.jpeg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_rqEyNEHfe4lzkHSGVRkZS7V4VsdZymt77YXHrD9fs_r1QCLNApLhvLBEUbuUvDa2_bx4I9uT6nlBIQAoO_iANmmE-YJtTjTm1WCFZ11KDIBWnQYuyUemfDjJ0Isp02wseDWsphjaRuzy5idvAhktkTM.jpeg?link=true)

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_YMWdSFf-WSxXmLxgMto-8zHKMWVtrVyQcMA-SZb1e0zKqoumz9sUPqxopGdfoIxOuvbRFSSMbyHjzR_EZIhcFlEf9TE1FugzwDEJYFnZax4IDaLCeaiCpBqhTP2Jh7_zmtyLlN0Tipq4WwrU6ROSvxo.jpeg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_YMWdSFf-WSxXmLxgMto-8zHKMWVtrVyQcMA-SZb1e0zKqoumz9sUPqxopGdfoIxOuvbRFSSMbyHjzR_EZIhcFlEf9TE1FugzwDEJYFnZax4IDaLCeaiCpBqhTP2Jh7_zmtyLlN0Tipq4WwrU6ROSvxo.jpeg?link=true)

Last time, when we asked GPT-3 if it was best for consumer business founders to try to solve their own problem, it responded, “Absolutely!” Given what’s in Lenny’s article, that’s wrong.
Let’s ask GPT-3 this question again—but with a little help. We’ll feed it the equivalent of a notecard that has written on it the section of Lenny’s article with the answer. Then we’ll see if it can get it right.
To make this fair, we won’t give it just the text containing the answer. We’ll give it some of the surrounding text in the article as well to see how it does. Let’s see if it works:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_JA7O8gFy-IuKe_5HCZvuCwiTPp2-5PAauk-Sb2YSiC-EIIDdkB6oQjdvaRyYHZsqVg4zqWl1RQvrEiW8o3y7zappfptrXLbSa_4w-Q2dY4tHGVQ9_a3xq41b63QkG0BNUhA7OV0MPcIiC6M2I_8LGy8.jpeg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_JA7O8gFy-IuKe_5HCZvuCwiTPp2-5PAauk-Sb2YSiC-EIIDdkB6oQjdvaRyYHZsqVg4zqWl1RQvrEiW8o3y7zappfptrXLbSa_4w-Q2dY4tHGVQ9_a3xq41b63QkG0BNUhA7OV0MPcIiC6M2I_8LGy8.jpeg?link=true)

Success! Now it tells us that less than a third of founders were trying to solve their own problem. All we have to do is write all of Lenny’s posts on a notecard and feed it into the model along with any question we have, and it will answer based on what he’s written.
But this introduces another problem: space limitations.
The notecard analogy is apt because there’s limited space in the prompt—right now, about 4,000 tokens (each token is the equivalent of three-quarters of a word). So we can’t feed in Lenny’s entire archive on every question. We have to be choosy about what we select.
Let’s talk about how to solve this.

## Embedding Lenny’s archive

At this point we’re going to have to move out of manual interactions with GPT-3’s Playground and start using chunks of code that work directly with the GPT-3 API. The code we’re building is going to do the following tasks:

1. We need to download and store Lenny’s archive in a way that makes it easily searchable for our bot.

2. We need some code that will help find relevant chunks of text from the archive of Lenny’s content that we created in the previous step.

3. When a user asks a question, we want to use the code from the last step to get the chunks of text that are most likely to answer the question, and put them into the prompt that we send to GPT-3.

4. We’ll display the resulting answer to the user.

This is simple to do with a library called [GPT Index](https://gpt-index.readthedocs.io/en/latest/), an open-source library created by [Jerry Liu](https://twitter.com/jerryjliu0). It’s separate from OpenAI but built to help with tasks like this. Here’s how it works:

1. Create an index of article chunks.

2. Find the most relevant chunks.

3. Ask our question to GPT-3 using the most relevant chunk.

*Note:* This is about to get a little bit more complicated and technical. If you’re interested in that, read on for an explanation.
You can access and run the code from this article in a [Google Colab file](https://colab.research.google.com/drive/1p2AablavDkSXly6H-XNLoSylMtoz7NDG?usp=sharing). Colab is a cloud-based programming environment that will let you run everything from your browser. (If you have questions about any of this, reach out to me on [Twitter](https://www.twitter.com/danshipper).)
If you’re not interested in the technical details, skip to the end to try out the chatbot for yourself.
Still here? Great. Let’s start with index construction.

### Constructing our index

The first thing we need to do is construct our index. You can think of an index as a database: it stores a collection of pieces of text in a way that makes them easily searchable.
First we collect Lenny’s newsletter archive into a folder. Then we ask GPT Index to take all of the files in the folder and break each one into small, sequential pieces. Then we store those pieces in a searchable format.
The code looks like this:
[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_PaQisLUQ7Oh0nuOKMQNAciyhWzP5U160aE1Bf1bS0JZTk2vB4H7k7oXCiD2e1zNUnVvSWuKdaaB-QQnvT1shlJ0DAj035M_8Pv85DA4i955pJgv8MsQBens5Icn5XbI7ICTz0cOHwprQK-nreGomRp4.jpeg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_PaQisLUQ7Oh0nuOKMQNAciyhWzP5U160aE1Bf1bS0JZTk2vB4H7k7oXCiD2e1zNUnVvSWuKdaaB-QQnvT1shlJ0DAj035M_8Pv85DA4i955pJgv8MsQBens5Icn5XbI7ICTz0cOHwprQK-nreGomRp4.jpeg?link=true)
When we run this function, we’ll have created a file called index.json that contains chunks of Lenny’s articles converted into a searchable format. These are called [embeddings](https://platform.openai.com/docs/guides/embeddings)—a condensed mathematical representation of each chunk of text.
Just like latitude and longitude can help you tell how close two cities are on a map, embeddings do the same kind of thing for text chunks. If you want to know if two pieces of text are similar, calculate the embeddings for them and compare. Text chunks with embeddings that are “closer” together are similar.
Embeddings are handy because when a user asks a question, they’ll make it easy to search Lenny’s archive and find articles that are most likely to answer our question.
With that in mind, let’s run the code and see what happens.
[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_j-9gqn7nUNBez8mCPn_XjpHgxQyvb6k0-faHWKF60EurErq6es5_STb_A-9NUBceV_qyb43spXl6DPPdb1DZqTP1KDNii2atCUsII4w7xsjOp41v66i2Z2E4u5fyz97zgVkC2oriEX2yApyQSTOxdk4.jpeg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_j-9gqn7nUNBez8mCPn_XjpHgxQyvb6k0-faHWKF60EurErq6es5_STb_A-9NUBceV_qyb43spXl6DPPdb1DZqTP1KDNii2atCUsII4w7xsjOp41v66i2Z2E4u5fyz97zgVkC2oriEX2yApyQSTOxdk4.jpeg?link=true)
Success! The Lenny’s archive is fully indexed, and we can query it to find relevant chunks of documents and use those chunks to answer our questions. (Be careful if you do this with big documents, as embeddings cost $0.0004 for every 1,000 tokens.)

### Asking our question

To query the index we created in the last section, all we have to do is paste a question into GPT Index. It will then:

- Find the chunks of our index that are most relevant to the question.

- Combine those chunks and our question into a prompt that it sends to GPT-3.

- Print the output.

Here’s what the code looks like:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_LWaq_a7QZXsPX_GXCV-vYGSrkW7AmDgMQJhQmYBwLMb7sogjmWGiQxC2KNlmyRau40uMMI9lwWc29x0VIeD-btaVNBMEbKkqxd5bdnxoRfv3I34RdYKvzWzp_loUclNSTkk5i3byYytYNjPBASFZ6Eo.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_LWaq_a7QZXsPX_GXCV-vYGSrkW7AmDgMQJhQmYBwLMb7sogjmWGiQxC2KNlmyRau40uMMI9lwWc29x0VIeD-btaVNBMEbKkqxd5bdnxoRfv3I34RdYKvzWzp_loUclNSTkk5i3byYytYNjPBASFZ6Eo.png?link=true)

If I ask it, “What is good retention for a consumer social product?” it says:
“25% is good.”
If I query it, “Is it best for consumer startup ideas to come from founders who are trying to solve their own problem?” it returns the right answer:
*“Based on the research, it appears that it is a good idea for consumer startup ideas to come from founders who are trying to solve their own problem, as this was the strategy used by around 30% of the most successful consumer companies. *
*However, it is not necessarily the best strategy, as other strategies such as paying attention to curiosity, what’s already working, and paradigm shifts were also used by a significant number of successful companies.”*
We now have an end-to-end solution to turn questions into answers that are based on Lenny’s archive. And it only took a few lines of code!
If you want to see the results in action, check out the bot:

[Lenny Bot](https://lennybot.com)

You can also access the [full source code](https://colab.research.google.com/drive/1p2AablavDkSXly6H-XNLoSylMtoz7NDG#scrollTo=4gHdfdtsSGEW) for this article in this Colab notebook. More details exclusively for Every subscribers are at the bottom of this post.

## What all of this means

This is just the beginning. The horizon of possibility is shifting almost every day with these technologies. What’s hard to do today will be easy in a matter of months.
Every newsletter, book, blog, and podcast that’s used as evergreen reference information by its audience can now be repackaged as a chatbot.
This is great for audiences because it means that any time you want to know what Lenny (or any other creator) says about a topic, you’re not going to have to sort through an archive of articles or podcast episodes in order to get their answer to your question. Instead, you’ll just be able to use Lenny’s chatbot to get his answer instantly—and then maybe later read the article in full if you want more details.
This is also great for content creators. They now get the ability to monetize the content they’ve already created in new ways, and lessen the amount of repetitive questions they have to answer. This will (hopefully) give them more time and money to create great content.
A new class of content creators will learn to create compelling chatbot experiences that combine their personality and worldview for their niche audience in the same way that some creators learned to create compelling YouTube videos, newsletter articles, or TikTok clips.
If you use Lenny’s chatbot or follow the code samples, you’ll see that it’s promising but not yet perfect. There are tremendous returns available to the individuals or groups who learn to make these types of experiences incredible for users.
I hope this inspires you to embark on that journey.

## More details for Every subscribers

In this section, I’ll give an update for Every paying subscribers on:

- How launch day went

- Server-side code samples

- Client-side code samples including React code and CSS

Let’s dive in!

### How launch day went

Launching this thing was a fun ride. It went live at 6 a.m. my time, and so I woke up at 5:50 to man the servers and make sure things didn’t go down. Good thing I did because as soon as it went live our Google Analytics went wild:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_5ONxKh-zQv5KjfAOCTqRpDTaY0klT2OYYhgmMhrIfBZEtepNZZfIgz9onRzWphc5DWGP1dYm6XXlekrggPej8ZBzbzb-WkW-XHAcmTzEPe60GV1FsExoCKjlb9v9a04NZQPjzAHBhhoc4WGPc9vjKA4.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_5ONxKh-zQv5KjfAOCTqRpDTaY0klT2OYYhgmMhrIfBZEtepNZZfIgz9onRzWphc5DWGP1dYm6XXlekrggPej8ZBzbzb-WkW-XHAcmTzEPe60GV1FsExoCKjlb9v9a04NZQPjzAHBhhoc4WGPc9vjKA4.png?link=true)

For context, generally when I check the Every site we usually have 30-50 users on at any given time.
Our logs also showed many questions being asked every minute:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2491/optimized_RfuGZKOXlznQhRtAUV2kCQcJD2ApptziAW02s-1vFBptpwyVhFRrt1PXB7UcsgaUP0XrnXpD85EOHdMi8adA374SZqj7HrSAkHq9KFKMsYUrjB5F10sJi0gY5DaBSCQlY5-dCUaYf7ykAb1is0Opw1g.png)](https://www.loom.com/share/dbc86309497c40d59e08dc63e3483774)
There were so many questions that the servers crashed, and I spent a few frantic minutes adding more capacity on Heroku. Once we had scaled up, though, the rest of launch day was pretty smooth, and we got encouraging feedback:

[![](https://pbs.twimg.com/profile_images/1613704891427586049/ow338GTH_normal.jpg)
Jason Hughes@json_hughes

@danshipper Lenny Bot is kinda replacing chatGPT for me as the place I got to start figuring things out day to day. Super awesome!
February 8th 2023, 5:55pm EST](https://twitter.com/json_hughes/status/1623455557855350786)

It’s clear there’s a lot of demand for products like this—a positive sign for my theory about chatbots. But the most important question still has to be answered: Lots of people wanted to try the Lenny Bot, but how many of them are coming back?
According to our metrics, on launch day a little more than 3,000 people tried the Lenny Bot. Two days later, about 500 people used it. Right now, day 2 retention looks like it’s at about 2%—very low.
We’ll see how things trend over time, but I think that’s going to be the biggest challenge for products like this. How do you create an experience that’s so compelling that I might want to use it every day?
There’s a lot of things that lead me to believe it’s possible, but it’s also clear that we’re not quite there yet.

## Code samples

If you’re interested in this and want to build your own chatbots, here are some code samples you can use to help you get started. Keep in mind that this is code I wrote quickly to build these projects, so it’s messy, and you may find better ways to accomplish the same things I did.
As part of the article shared above, I showed you how to create a chatbot that can solicit questions from a user and use GPT-3 to answer those questions from a large corpus of text. But what’s missing from those code samples is how to build them into a web app.
What you need is:

- A server that can handle requests from a web browser and forward them to the GPT-3 code we wrote in the main article

- A client-side component that renders a chatbot in the browser that the user can ask questions to and get answers from

If you need a starting point for the above, these files should point you in the right direction:

-
[app.py](https://gist.github.com/dshipper/59a6fb57a7c39ccf894d6182d2b8c4aa)—this file implements a Flask server that can handle to POST requests from a chatbot client and return results

-
[chatbot.js](https://gist.github.com/dshipper/5fcd0de33fea6254833a4e9406df7277)—this file implements a mobile-friendly chatbot in React

-
[style.css](https://gist.github.com/dshipper/33eae95d05d70df5c3c7ca14c732a856)—this file styles the chatbot built in chatbot.js

I hope this is helpful for you in your explorations. I’ll have more on all of this next week.

[PAYWALL]
