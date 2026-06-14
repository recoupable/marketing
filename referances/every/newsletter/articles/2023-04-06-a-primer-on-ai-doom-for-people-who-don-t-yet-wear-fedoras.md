---
title: "AI Doomsday For People Who Don’t Wear Fedoras"
subtitle: "Should we bomb the GPU clusters? A primer."
author: "Dan Shipper"
date: 2023-04-06
column: chain-of-thought
url: https://every.to/chain-of-thought/a-primer-on-ai-doom-for-people-who-don-t-yet-wear-fedoras
paywalled: true
scraped_at: 2026-06-11T16:08:21.696Z
---

# AI Doomsday For People Who Don’t Wear Fedoras

*Should we bomb the GPU clusters? A primer.*

#### Sponsored By: Reflect

This article is brought to you by [Reflect](http://reflect.app/?utm_source=every.to&utm_medium=newsletter&utm_campaign=march23), a frictionless note-taking app with a built-in AI assistant. Use it to generate summaries, list key takeaways or action items, or ask it anything you want.

[Start Free Trial](http://reflect.app/?utm_source=every.to&utm_medium=newsletter&utm_campaign=march23)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#ef9c9f80819c809d9c87869f9caf8a998a9d96c19b80).

Harry: “It’s just that I always try to imagine the worst thing that could happen.”

Professor McGonagall: “Why?”

Harry: “So I can stop it from happening!”

* — Eliezer Yudkowsky, Harry Potter and the Methods of Rationality*

---

I’ve been on a bit of an [Eliezer Yudkowsky](https://twitter.com/ESYudkowsky) kick lately. Yudkowsky is, of course, the fedora-wearing AI researcher famous for saying repeatedly that AI will kill us all.

He’s also been on a media tour recently. He went on the podcast circuit ([Lex Fridman podcast](https://www.youtube.com/watch?v=AaTRHFaaPG8), the [Bankless podcast](https://www.youtube.com/watch?v=gA1sNLL6yg4), and the [Lunar Society podcast](https://www.youtube.com/watch?v=41SUp-TRVlg).) He also wrote a widely circulated [letter in Time](https://time.com/6266923/ai-eliezer-yudkowsky-open-letter-not-enough/) advocating a multinational shutdown of current AI capabilities research, and the lawful destruction of “rogue datacenters by airstrike.”

I’m very excited about AI progress, and working with this technology has been one of the creative highlights of my life. Still, I feel like it’s important to understand the arguments he (and others) are making about its dangers.

I like him because he’s smart and earnest. He’s been in the field for a long time—he’s not some Johnny-come-lately trying to spread AI doom for clicks. He thinks very deeply about this stuff and seems to be open to being wrong.

But even as someone steeped in this stuff, I find many of his arguments—and a lot of the resulting discussion on AI alignment-focused sites like [LessWrong](http://lesswrong.com/) difficult to parse. They tend to use words like “shoggoth”, “orthogonality”, and “instrumental convergence” that are frustrating for people who don’t speak Klingon.

So to parse his ideas, I read every article I could get my hands on. I listened to hours and hours of podcast episodes. I even read Eliezer’s 1,600-page Harry Potter fanfiction, [Harry Potter and the Methods of Rationality](https://hpmor.com/), just for fun. And now, for better or for worse, I feel like I have a little Imaginary Eliezer on my shoulder to help balance out my AI excitement.

The question Eliezer forces us to confront is this: should we really stop all AI progress? If we don’t, will it really end the world?

Let’s put on our fedoras and examine.

## The crux of the doom argument

If you simplify the doom arguments, they all spring from one fundamental problem:

It’s dangerous to build something smarter than you without fully understanding how it thinks.

This is a real concern, and it reflects the current state of things in AI (in the sense that we don’t completely understand what we’re building).

We do know a lot: a vast amount of math and complicated tricks to make it work, and work better. But we don’t understand how it actually thinks. We haven’t built AI with a theory of how its intelligence works. Instead, it’s mostly linear algebra and trial and error stacked together.

This actually isn’t uncommon in the history of technology—we often understand things only after they work. An easy example is fire: we used flint to generate sparks for thousands of years before we understood anything about friction. Another example is steam engines. We had only a rudimentary understanding of the laws of thermodynamics when they were developed.

If you build something through trial and error, then the only way you can control it is through trial and error. This is the process of RLHF ([reinforcement learning through human feedback](https://huggingface.co/blog/rlhf)) and related techniques. Basically, we try to get the model to do bad things—and if it does we change the model to make those bad things less likely to happen in the future.

The problem is, trial and error only work if you can afford to make an error. Researchers like Eliezer Yudkowsky argue one error with this alignment process leads to the end of humanity.

The rest of the doomer problems flow from this basic issue. If, through trial and error, you’ve built an AI that thinks you find:

- It’s hard to know if you’ve successfully aligned it because they “think” so differently than us

- They are not guaranteed to be nice

- Even it doesn’t explicitly intend to harm humans it could kill us all as a side effect of pursuing whatever goal it does have

In order to judge these arguments, I think it’s important to start from the beginning. How is it possible to build intelligence without understanding it? We built the software ourselves, shouldn’t we know how it works?

## How is it possible to build intelligence without understanding it?

We usually understand how our software works because we have to code every piece of it by hand.

Traditional software is a set of explicit instructions, like a recipe, written by a programmer to get the computer to do something.

An easy example is the software we use to check if you’ve entered your email correctly on a website. It’s simple to write this kind of software because it’s possible to come up with an explicit set of instructions to tell if someone has entered their email correctly:

- Does it contain one and only one “@” symbol?

- Does it end with a recognized TLD like .com, .net, or .edu?

- Does everything before the @ symbol contain only letters, numbers, or a few allowed special characters like “-”?

And so on. This “recipe” can grow to contain millions of lines of instructions for big pieces of software, but it is theoretically readable step by step.

This kind of programming is quite powerful—it’s responsible for almost all of the software you see in the world around you. For example, this very website is written in this way.

But, over time, we’ve found that certain types of problems are *very* difficult to code in this way.

For example, think about writing a program to recognize handwriting. Start with just one letter. How might you write a program that recognizes the letter “e” in an image? Recognizing handwriting is intuitive for humans, but it gets very slippery when you have to write out how to do it. The problem is there are *so* many different ways to write an “e”:

You can write it in capitals or lowercase. You could make the leg of the “e” short and stubby, or as long as an eel. You can write a bowl (the circular enclosed part of the “e”) that looks domed like a half-Sun rising over the morning sea or one that looks ovular like the eggish curve of Marc Andreeson’s forehead.

For this kind of problem, we need to write a different kind of software. And we’ve found a solution: we write code that writes the code for us.

Basically, we write an outline of what we think the final code should look like, but that doesn’t yet work. This outline is what we call a neural network. Then, we write another program that searches through all of the possible configurations of the neural network to find the one that works best for the task we’ve given it.

The process by which it adjusts or “tunes” the neural network, backpropagation through gradient descent, is a little like what a musician does when they tune a guitar: They play a string, and they can tell if the note is too high or too low. If it’s too high, they tune it down. If it’s too low, they tune it up. They repeat this process over and over again until they get the string in tune.

[PAYWALL]
