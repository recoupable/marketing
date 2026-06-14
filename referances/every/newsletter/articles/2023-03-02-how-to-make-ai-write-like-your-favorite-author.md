---
title: "How to Make AI Write Like Your Favorite Author"
subtitle: "A step-by-step guide from prompting to fine-tuning"
author: "Dan Shipper"
date: 2023-03-02
column: chain-of-thought
url: https://every.to/chain-of-thought/how-to-make-ai-write-like-your-favorite-author
paywalled: true
scraped_at: 2026-06-11T16:08:23.835Z
---

# How to Make AI Write Like Your Favorite Author

*A step-by-step guide from prompting to fine-tuning*

#### Sponsored By: Scrintal

This essay is brought to you by [Scrintal](https://www.scrintal.com/?utm_source=newsletter&utm_medium=partnership&utm_term=10252), a visual-first knowledge management tool that lets you organize and connect all your thoughts in one place.

[Get Started](https://www.scrintal.com/?utm_source=newsletter&utm_medium=partnership&utm_term=10252)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#4536352a2b362a37362d2c353605203320373c6b312a).

There is a unique blandness to entry-level AI writing.

It’s the prose version of licking cardboard. There is a taste to it, but it is the absence of any real flavor that is most striking. So, reasonably, [AI](https://every.to/c/ai-frontiers)-assisted writing gets a bad rap. People say it reads like SEO content farm marketing swill. It’s not for serious writers.

This criticism is correct, in the sense that inputting a basic prompt to a popular model like ChatGPT or Bing will output wholly middle-of-the-road responses.

But this criticism is a little like saying that the output of keyboards is typically bland. Yes, it’s true, when you first learned to write on a keyboard you couldn’t write anything particularly good.

With a little practice, though, you can get a keyboard to write anything you want. The same is true for AI.

I’ve written before about how I use [AI as part of my writing process](https://every.to/chain-of-thought/writing-essays-with-ai-a-guide)—it can help me get ideas out of my head, find the narrative of a piece, or help me when I get stuck. But today I want to focus on one of the most useful things you can do with AI -assisted writing:

Capture a particular kind of voice or style.

This article will go through the whole process: from finding prompts that work to fine-tuning. By the end, you’ll have a richer understanding of how to push generative AI models in new directions, and how to add more depth and flavor to your own writing.

I know the title of this article claims to teach you how to use AI to write like your favorite author. But this is not going to be about learning to push one button in order to output a deep fake Tolstoy novel. That’s not technically possible and probably not desirable.

Instead, this article will teach you to use AI to write like a richer, deeper version of yourself. It can be used to help you understand what you love about a particular writer. And it can also be used to help push your brain into the territory of their language, so that you can incorporate some of their style into your own.

## How I Started Doing This

I love Annie Dillard.

Sometimes I want to push my writing to better describe nature, or a metaphor or simile that’s as vivid as hers. Usually, if I want to do this, I’ll sit down and read some of her stuff—like [Pilgrim at Tinker Creek](https://www.amazon.com/Pilgrim-Tinker-Harper-Perennial-Classics/dp/0061233323/ref=sr_1_1?crid=ELXM9XCOKCVF&keywords=pilgrim+at+tinker+creek&qid=1660335632&sprefix=pilgrim+at+tinker+creek%2Caps%2C76&sr=8-1) or [The Writing Life](https://www.amazon.com/Writing-Life-Annie-Dillard/dp/0060919884)—and then I’ll go off to write.

Some of what I’ve read will tint the voice I have that day, and if I’m lucky it’ll show up in the writing that I’m doing. It sort of pushes me into the right headspace to get the style that I want.

Recently, I began wondering if GPT-3 could help with that. I didn’t want it to automatically spit out prose I could pass off as my own. Instead, I wondered if it could help get my brain going in the same way that reading a piece by that writer might—but with the added benefit that the sentences I was reading would be about the topic I was writing about, rather than being totally unrelated.

So I hopped into the OpenAI Playground and tried a naïve prompt: “When I breathe I feel…”

I figured starting off with a sentence like that would be somewhat close to the territory of language that Annie Dillard’s style might live in. And that might be an ample opportunity for GPT-3 to get vivid and poetic. Unfortunately, it did not work:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2513/optimized_Kg98MXQknFoUHZH2H8OmzS7vY17N7g7uQhHy49bR8y5q3S-FXW6U_qd7HPoEqsR84KHSGsmF4iLZOSLyAR-Hdo3r4hssAB-tgx8UaohywlqXd1F3xZQ4q_7Wpa3ej-ZekNy5ojicI75o_BoxnOdFJXk.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2513/optimized_Kg98MXQknFoUHZH2H8OmzS7vY17N7g7uQhHy49bR8y5q3S-FXW6U_qd7HPoEqsR84KHSGsmF4iLZOSLyAR-Hdo3r4hssAB-tgx8UaohywlqXd1F3xZQ4q_7Wpa3ej-ZekNy5ojicI75o_BoxnOdFJXk.png?link=true)
This is grammatically correct, but it’s everything that AI critics say it is. It’s bland and boring. It doesn’t do anything interesting. But after experimenting with this a good amount, I’ve devised some ways to get the AI into a territory where it does sound a bit more like Dillard—and that in turn gets *my* mind working.

OK, ready? Let’s dive in.

## How to capture a voice in AI-assisted writing

I’ve found three good ways to capture a voice in AI-assisted writing:

1. Directly ask the AI to write like the writer you have in mind

2. Describe what the writer’s voice is like, and ask the AI to write like that (preferably with examples)

3. Fine-tune the AI on a specific writer

I’ve listed these in order of difficulty and expense. If you’re trying to do this yourself, start out by directly asking the AI to write like a writer you admire. If that doesn’t work, try describing the style you want the AI to write in. And, finally, if that doesn’t work, try fine-tuning.

Just because fine-tuning is more technical and expensive doesn’t necessarily mean it’s going to be the best option for your use-case. Try the easy thing first, and work up to the hard thing. You’ll learn a lot along the way. (Of course, if you just want to do fine-tuning because it’s fun, that’s also nice and I won’t stop you.)

So, let’s start with step one: Directly ask the AI to write like the writer you have in mind.

## Ask the AI to simulate a famous writer

AI is not one single *thing* that sounds or thinks. Rather, it’s a simulator. It’s ingesting a prompt and trying to predict what it thinks you want. So directly asking it to sound like a writer you admire is a good place to start.

This actually works quite well for writers whose work is famous and is well represented on the internet.

Let’s start by asking GPT-3 to rewrite a sentence that could use some Dillard-ifying:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2513/optimized_maa5oyn_wYsuQP2CKYgBUsJiVjFviBkjnKv9HDEh2D0ouQuxQS5XdiznjyTk8mLmVNPkQm1dTCe7aWzgO_8Nyu0HZLcqvzxl-lUw9rZfY6lvXwz5iw4RoVdnzuCYLffHi45zgJ0fcrTchyhJZCct-Qc.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2513/optimized_maa5oyn_wYsuQP2CKYgBUsJiVjFviBkjnKv9HDEh2D0ouQuxQS5XdiznjyTk8mLmVNPkQm1dTCe7aWzgO_8Nyu0HZLcqvzxl-lUw9rZfY6lvXwz5iw4RoVdnzuCYLffHi45zgJ0fcrTchyhJZCct-Qc.png?link=true)
OK, so this is obviously ridiculous and doesn’t sound anything like Dillard. But…it does sound *different.*

That should tell us we’re on to something. The voice and tone is, like, vaguely Shakespearean or medieval or “high schooler discovering a thesaurus for the first time-ish.” It’s using big words that it wouldn’t have ordinarily used. For example, I like the phrase “cushioned throne” and the word “sonorous.” So I might not take this output wholesale, but I *might* feel good about using some of these words in whatever I’m writing about. It’s getting my mind going and expanding the options in my vocabulary—which is exactly what I want.

Interestingly, Bing (which uses a more advanced version of the same model) is a bit better here:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2513/optimized_maa5oyn_wYsuQP2CKYgBUsJiVjFviBkjnKv9HDEh2D0ouQuxQS5XdiznjyTk8mLmVNPkQm1dTCe7aWzgO_8Nyu0HZLcqvzxl-lUw9rZfY6lvXwz5iw4RoVdnzuCYLffHi45zgJ0fcrTchyhJZCct-Qc.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2513/optimized_maa5oyn_wYsuQP2CKYgBUsJiVjFviBkjnKv9HDEh2D0ouQuxQS5XdiznjyTk8mLmVNPkQm1dTCe7aWzgO_8Nyu0HZLcqvzxl-lUw9rZfY6lvXwz5iw4RoVdnzuCYLffHi45zgJ0fcrTchyhJZCct-Qc.png?link=true)
Here, we can see Bing is using similes: “The notes are clear and precise, like icicles hanging from the eaves.” This feels vaguely Dillard-y. But I have to decide…is that really true? Do the notes of the music sound clear and precise? I also have to decide whether icicles hanging from the eaves evoke that for me.

But now I’m actually thinking about it. What is the quality of the music I’m listening to? And what’s a simile that might evoke it? These kinds of questions get *my* brain working—and once again, help me improve the passage I’m working on.

This same technique works well with other major writers. Here’s Shakespeare:

[PAYWALL]
