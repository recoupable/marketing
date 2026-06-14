---
title: "The Next Big Programming Language Is English"
subtitle: "I spent 24 hours with AI coding assistant Github Copilot Workspace"
author: "Dan Shipper"
date: 2024-05-02
column: chain-of-thought
url: https://every.to/chain-of-thought/i-spent-24-hours-with-github-copilot-workspaces
paywalled: true
scraped_at: 2026-06-11T16:08:04.142Z
---

# The Next Big Programming Language Is English

*I spent 24 hours with AI coding assistant Github Copilot Workspace*

*Was this newsletter forwarded to you? *[Sign up](https://every.to/account)* to get it in your inbox.*

---

GitHub Copilot is like autocomplete for programmers.

As you type, it guesses what you’re trying to accomplish and suggests the block of code it *thinks* you’re going to write. If it’s right—and very often it is—you press Tab and it’ll fill in the rest for you. Launched in 2021, a year or so before ChatGPT’s arrival, Copilot was the first breakthrough generative AI use case for programming that really took off.

If GitHub Copilot is like autocomplete, [GitHub Copilot Workspace](https://github.blog/2024-04-29-github-copilot-workspace/)—currently in limited technical preview—is like an extremely capable [pair programmer](https://en.wikipedia.org/wiki/Pair_programming#:~:text=Pair%20programming%20is%20a%20software,two%20programmers%20switch%20roles%20frequently.) who never asks for coffee breaks or RSUs.

It’s a tool that lets you code in plain English from start to finish without leaving your browser. If you give it a task to complete, Copilot Workspace will read your existing codebase, construct a step-by-step plan to build it, and then—once you give the green light—it’ll implement the code while you watch.

Put another way, it’s an agent. It’s similar to Devin, the [AI](https://every.to/c/ai-frontiers) agent for programming whose [launch announcement](https://www.cognition-labs.com/introducing-devin) went viral a few months ago, and which was reportedly seeking a [$2 billion valuation](https://www.wsj.com/tech/ai/a-peter-thiel-backed-ai-startup-cognition-labs-seeks-2-billion-valuation-998fa39d) in a new fundraising effort. I haven’t gotten access to that yet (shakes fist in Devin’s general direction!), but I do have access to Copilot Workspace.

Over the past 24 hours, I’ve put Copilot Workspace through some of its paces. I tried to have it build a large, complex feature on its own, but I also asked it to do smaller, better-defined tasks. My goal was to see what I could ask of it, what kinds of tasks it could handle, and when I might choose to use this instead of ChatGPT.

The short answer is: This kind of product is the future of programming. The long answer is below.

## How Copilot Workspace works

I’ve been working on an internal tool that we use at Every called Spiral. It allows users to build and share prompts for common AI tasks—but more on that in a future essay. I fashioned an ugly tribal tattoo-looking logo, and I wanted to replace it with a new one created by [Keshav](https://twitter.com/keshavchan), one of our talented designers.

This is one of those changes that isn’t very hard to code, but it’s a little annoying. You have to make sure the logo looks right in context and doesn’t break any of the styles of the elements around it. It’s one of those all-too-simple tasks that I also usually procrastinate doing until I really need to.

So, I figured it was perfect for an AI. I decided to try Copilot Workspace—from here, simply referred to as CW—to see how it would do.

#### Create a task

First, I opened up CW and created a task. A task is a natural language description of what you want CW to build:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3089/optimized_NKYLLnOCpHkjwTUIECWyXZUYuF46NziGTCBo1ftV3fHfeDW0iSZLepSG9OwmGknQNCMcRcPS00iNvYufIXueH7i64eVAjrz5lZFFFlY0CF7OmZ3eo4PvtTFB5L5v7IN16QVnfjxg96SG50kCQIuym7M.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3089/optimized_NKYLLnOCpHkjwTUIECWyXZUYuF46NziGTCBo1ftV3fHfeDW0iSZLepSG9OwmGknQNCMcRcPS00iNvYufIXueH7i64eVAjrz5lZFFFlY0CF7OmZ3eo4PvtTFB5L5v7IN16QVnfjxg96SG50kCQIuym7M.png?link=true)

*Source: Screenshots courtesy of the author.*

You’ll notice that the task description I gave it has details such as the file I want it to modify, where I want the logo to appear, and the file name of the logo image. I experimented with different prompts (and looked through the GitHub documentation) and learned that giving it more detail should lead to better results.

Once I inputted the task, CW processed it and created a specification: a map of the current state of the codebase, and a set of criteria for what success looks like.

#### Specifying out your idea of success

CW creates a specification through a process that is sort of like what I do before I leave the house to grab coffee: I tap both of my pants pockets to make sure I have my phone, AirPods, wallet, and keys. In a sense, I am asking my pants, “Do you contain all of the essentials I need in order to leave the house, purchase a coffee, and make sure I don’t get locked out?”

Depending on how they reply—bear with me—I know whether each item is either present or missing. This helps me to create a plan to gather the things I need to find in order to successfully complete my mission. (Note to self: Your wallet is always wedged in some physics-defying configuration between the couch and the wall. Look there. Not there? Look again.)

In a sense, CW does this, too. Given the task you assigned it, it attempts to figure out the current state of your codebase (to put it in pants terms, it taps the codebase and finds the wallet and keys are missing). Then it proposes a set of tests for what your codebase *should* look like when the task has been completed properly (the wallet and keys are now safely slotted in their proper pockets).

To make it even easier, it does this in normal English:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3089/optimized_as8Rl7g48-MU0tVnmJ374yGQ_k9dNcjzmFNiSo5dXqeued67Ba7ecXEaDjyhLKL72rjMnjiHWYyPSL-pEbqfalepEMNDeSb2csQNcD--Biav64oq7Yka_Nae-6ICqZ9HfJJeT3PDUKPxy3lQMPxc4bA.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3089/optimized_as8Rl7g48-MU0tVnmJ374yGQ_k9dNcjzmFNiSo5dXqeued67Ba7ecXEaDjyhLKL72rjMnjiHWYyPSL-pEbqfalepEMNDeSb2csQNcD--Biav64oq7Yka_Nae-6ICqZ9HfJJeT3PDUKPxy3lQMPxc4bA.png?link=true)
Plus, you can edit each step of this process and, if you want to, add your own ideas in natural language. Basically, you can give CW your own test criteria for what success should look like so that it will check against it as it writes code.

Once you’re satisfied with the specification, you move on to the plan.

#### Creating your plan

If the specification stage is about figuring out *what* needs to be done in your codebase, the planning step is *how* it will be done. At this stage, CW gets into the nitty-gritty details of your codebase and writes out the changes it will make to each file:

[PAYWALL]
