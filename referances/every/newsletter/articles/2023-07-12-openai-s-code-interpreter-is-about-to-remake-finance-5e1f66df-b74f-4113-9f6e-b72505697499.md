---
title: "OpenAI’s Code Interpreter Is About to Remake Finance"
subtitle: "Get in, loser—we’re disrupting Oracle"
author: "Evan Armstrong"
date: 2023-07-12
column: napkin-math
url: https://every.to/napkin-math/openai-s-code-interpreter-is-about-to-remake-finance-5e1f66df-b74f-4113-9f6e-b72505697499
paywalled: true
scraped_at: 2026-06-11T16:08:17.378Z
---

# OpenAI’s Code Interpreter Is About to Remake Finance

*Get in, loser—we’re disrupting Oracle*

#### Sponsored By: Uptrends.ai

This essay is brought to you by [Uptrends.ai](https://www.uptrends.ai/?utm_campaign=every), it's like Google Trends and Wall Street merged into one powerful tool. Get your first-month subscription 100% free by entering the code **EVERY** when you sign-up and jumpstart your financial journey.

[Try Uptrends.ai](https://www.uptrends.ai/?utm_campaign=every)

Currently, our platform is exclusive to desktop users. So, pull up your chair, log in from your desktop and start leveraging the power of [Uptrends.ai](https://www.uptrends.ai/?utm_campaign=every) to stay a step ahead in the market.

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#3744475859445845445f5e474477524152454e194358).

*Editor’s note: This week OpenAI is making Code Interpreter generally available to ChatGPT Plus users. Evan (who is on vacation) got access to the tool a few weeks ago, so we’re re-running his *[recent piece](https://every.to/napkin-math/openai-s-code-interpreter-is-about-to-remake-finance)* about experimenting with it for Every’s accounting operations. Are you using Code Interpreter? Let us know how in the comments. *

Like most startups, we’ve been looking at how to reduce our expenses at Every with AI. One area I’ve been experimenting with is just how much accounting minutiae I can automate. Recently I had a breakthrough thanks to a ChatGPT plug-in called [Code Interpreter](https://openai.com/blog/chatgpt-plugins#code-interpreter) (it’s not widely available, so don’t be sad if you don’t have it on your account yet). A user uploads a file, and ChatGPT will write in Python code to understand and analyze the data in that file.

It sounds simple, but *that is basically what every finance job on the planet does.* You take a standard form, like an income statement or a general ledger; populate it with data; and run analysis on top of that data. So theoretically, Code Interpreter can do the majority of finance work. What does it mean when you can do sophisticated analysis for <$0.10 a question? What does it mean when you can use Code Interpreter to answer every question that involves spreadsheets?

It’s easy for your eyes to glaze over with statements like that. Between AI Twitter threads, theatrically bombastic headlines, and the beating drums of corporate PR, the temptation is to dismiss AI stuff as hyperbole. Honestly, that’s where I’m at. Most of the AI claims I see online I dismiss on principle.

With that perspective in mind, please take me seriously when I say this: I’ve glimpsed the future, and it is *weird*. Code Interpreter has a chance to remake knowledge work as we know it. To arrive at that conclusion, I started somewhere boring—accounting.

## Experimenting with the general ledger

AI has been used by accountants for a long time; it just depends on what techniques you give the moniker of artificial intelligence. The big accounting firms will sometimes use machine learning models to classify risk. However, because large language models (LLMs) like GPT-4 and Claude are still relatively new, these techniques haven’t been widely integrated into auditors’ or accountants’ workflows.

When I say, “I want to replace my accountant with a Terminator robot,” I’m looking for a way to use LLMs to automate work that an accountant would typically do.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2694/optimized_c0CATbmcRqeX0fvkhtO_JIq2hi8Ong9TRZ1helRthPoGhbp-s2V-8rxlJ1Aa2vAyiuprcblX0HL_JtyGJA9oLWp1VeLYWyMzMbAfcq2ht-LYxdVhPSvsTA-1eb_M.jpg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2694/optimized_c0CATbmcRqeX0fvkhtO_JIq2hi8Ong9TRZ1helRthPoGhbp-s2V-8rxlJ1Aa2vAyiuprcblX0HL_JtyGJA9oLWp1VeLYWyMzMbAfcq2ht-LYxdVhPSvsTA-1eb_M.jpg)

My journey to nerdy Skynet started simply.

I uploaded Every’s general ledger—a spreadsheet that lists all of the debits and credits for a period—into ChatGPT. My goal was to run a battery of tests that an auditing firm would do: tasks like looking for strange transactions, checking on the health of the business—stuff like that. While the tests are rather abstract, they’re small pieces of analysis that build into a cohesive understanding of the health of a business.

Once the CSV file is uploaded, the system goes to work. It realizes this CSV is a general ledger and writes five blocks of code to make it readable for itself.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2694/optimized_o7jBk2aHiff2rYWO49_MmgxZ75E-I45jj9_Ed4qyMi-3ltpXxDuuyYpPCVtlZjn89NZ8dG7GnyTQMpEGiCBlXvuGerXsSzGAqLXYkGpHmlrNCf5ip1V8bmdAJIUH.jpg)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2694/optimized_o7jBk2aHiff2rYWO49_MmgxZ75E-I45jj9_Ed4qyMi-3ltpXxDuuyYpPCVtlZjn89NZ8dG7GnyTQMpEGiCBlXvuGerXsSzGAqLXYkGpHmlrNCf5ip1V8bmdAJIUH.jpg)

*Note: I’ve done some creative image sizing because I don’t want to expose our bank account info. Images will all be supplemental and are not necessary for reading this piece.*

It classifies the data and is ready for me to ask it questions in ~10 seconds. Compare that with the usual 24-hour turnaround time on emails with an accountant.

From there, I run the AI through some of the small tests an auditor would do. First, I ask it to create a graph showing the volume of transactions by week. An auditor would do this analysis as a simplistic risk test; if there were a week with unusually high volume, they would want to examine that further.

In ~10 seconds, faster than a finance professional could do it with a pivot table and charting tool, I have a graph.

[PAYWALL]
