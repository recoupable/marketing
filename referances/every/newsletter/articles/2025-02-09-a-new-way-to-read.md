---
title: "A New Way to Read"
subtitle: "I built an AI tool that has fundamentally changed how I read"
author: "Naveen Naidu"
date: 2025-02-09
column: source-code
url: https://every.to/source-code/a-new-way-to-read
paywalled: true
scraped_at: 2026-06-11T16:07:49.425Z
---

# A New Way to Read

*I built an AI tool that has fundamentally changed how I read*

***Update:**** We shut down the app, as it was an experiment. Thank you for your support.*

***TLDR:**** Today we’re sharing the latest experiment from [Every Studio](https://every.to/studio): ****Kairos****, an AI-powered *﻿[reading](https://every.to/c/ai-frontiers)﻿* companion that helps you read more deeply, understand complicated concepts, and questions you on your comprehension. Kairos is built by our entrepreneur in residence (and the author of this piece) ****Naveen Naidu Mummana****. Try it out on [TestFlight](https://testflight.apple.com/join/vBSKzpbr) and [let us know what you think](https://kairos.a.freeform.computer/respond/28).—[Brandon Gell](https://every.to/@brandon_5263)*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

Something odd happens when you read with AI. You start having conversations with books.

I discovered this accidentally while reading on my iPad. I kept toggling between my ebook and ChatGPT, copying passages to ask questions. At first this felt like a hack—a messy workaround because reading apps haven't caught up to AI. But then I realized I was stumbling onto something more interesting: a fundamentally new way to read.

Having wrapped up my first experiment as an Every [entrepreneur in residence](https://every.to/p/introducing-every-studio), and with a little inspiration from an[X post](https://x.com/karpathy/status/1866896395363553418) by computer scientist **Andrej Karpathy**, I decided to build a piece of software[for myself](https://every.to/source-code/selfish-software): an AI-native reading tool I’m calling Kairos that would solve my own book-reading problems. Now, I’m testing how far I can push the reading experience when AI is built in from the ground up.

## Speedreading the history of reading

Reading hasn't changed much since **Gutenberg**. Sure, we've moved from paper to pixels, but we still primarily consume text linearly, making highlights and notes just as readers did centuries ago. Digital reading platforms have mostly focused on distribution—making books more accessible through devices and online libraries. But the core activity of understanding what we read remains largely unchanged.

This seems especially strange given how much other forms of learning have evolved. We expect students to engage in discussion, not just listen to lectures. We know active learning beats passive consumption. Yet reading remains mostly solitary and one-directional.

AI changes this equation. Instead of just absorbing text, you can probe it. When you encounter a difficult passage, you can ask for clarification. When an idea reminds you of something else you've read, you can explore the connection. The text becomes a [starting point for investigation](https://every.to/chain-of-thought/gpt-4-a-copilot-for-the-mind-45e59508-e109-4bb1-bd6b-d70a73b271ac) rather than just information to absorb.

As I experimented with AI-assisted reading, I found myself asking a fundamental question: What does it mean to read well? The more I toggled between text and AI, the more I realized I needed a framework to understand how this technology was changing not just how we read, but the very nature of reading itself.

This search led me to **Mortimer Adler**, a philosopher and educator best known for his work on the [Great Books](https://en.wikipedia.org/wiki/Great_Books_of_the_Western_World) movement, a project aimed at defining the essential works of Western civilization. In 1940, Adler published*[How to Read a Book](https://www.amazon.com/How-Read-Book-Classic-Intelligent/dp/0671212095)*, a guide to deeper reading that has remained influential for decades. His argument was simple: Most people read passively, skimming for information without truly engaging with the text. He outlined four levels of reading, each representing a more sophisticated way of understanding and interacting with books:

1.
**Elementary**—Basic comprehension. You’re just trying to understand what the words mean and follow along.

2.
**Inspectional**—A strategic skim. You get the gist by scanning the table of contents, reading a few key sections, and figuring out whether the book is worth a deeper dive.

3.
**Analytical**—Slow, deliberate reading. You break down the author’s argument, question their assumptions, and engage critically with the ideas.

4.
**Syntopical**—Reading across books. You pull in perspectives from multiple sources, compare arguments, and piece together a bigger picture.

Adler's framework provides a perfect lens to understand how AI can transform reading. To explore this, I built Kairos with an interface that feels familiar—similar to Apple Books—but with a crucial addition: an AI companion that's always ready to engage. The reading interface remains clean and focused, with a discrete AI button in the bottom left corner that opens up new possibilities for interaction. Tap it, and you'll find options to chat with Kairos, catch up on previous sections, or access chapter summaries—all while maintaining the full context of what you're reading.

The result feels less like traditional reading and more like having a knowledgeable friend reading alongside you. This friend never gets tired of your questions, has read practically everything, and can instantly recall relevant details from other books. It's the kind of reading experience previously available only to those with access to expert tutors or extensive personal libraries.

Let me walk you through how this works, using each of Adler’s reading levels as a guide.

### Elementary: ‘Explain this’

[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3456/optimized_AD_4nXcfiO4TSjumyYILPgA9TMvS52VZJwP5Qx28FwGk0ratEZp2ywx9j0xIUCQeJyT717J0I-6vy-2ONya4ne2xeyzBaDJVNJxcD6rg9qxhm-okEM2zuKnvqH5D.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3456/optimized_AD_4nXcfiO4TSjumyYILPgA9TMvS52VZJwP5Qx28FwGk0ratEZp2ywx9j0xIUCQeJyT717J0I-6vy-2ONya4ne2xeyzBaDJVNJxcD6rg9qxhm-okEM2zuKnvqH5D.png)

[PAYWALL]
