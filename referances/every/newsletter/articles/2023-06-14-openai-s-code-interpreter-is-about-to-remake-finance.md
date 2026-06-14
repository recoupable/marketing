---
title: "OpenAI’s Code Interpreter Is About to Remake Finance"
subtitle: "Get in loser, we’re disrupting Oracle"
author: "Evan Armstrong"
date: 2023-06-14
column: napkin-math
url: https://every.to/napkin-math/openai-s-code-interpreter-is-about-to-remake-finance
paywalled: true
scraped_at: 2026-06-11T16:08:18.542Z
---

# OpenAI’s Code Interpreter Is About to Remake Finance

*Get in loser, we’re disrupting Oracle*

#### Sponsored By: Sanebox

Today's essay is brought to you by [SaneBox](https://try.sanebox.com/4flir8lsslpw), the AI email assistant that helps you focus on crucial messages, saving you 3-4 hours every week.

[Get a FREE 14 day trial](https://try.sanebox.com/4flir8lsslpw)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#6c1f1c03021f031e1f04051c1f2c091a091e15421803).

Like most startups right now, this publication has been looking at how to reduce our expenses with AI. One area I’ve been experimenting with is seeing just how much accounting minutiae I can automate. Recently I had a breakthrough thanks to a ChatGPT plug-in called [Code Interpreter](https://openai.com/blog/chatgpt-plugins#code-interpreter). This plug-in is not widely available (so don’t be sad if you don’t have it on your account yet), but it allows a user to upload a file and then ChatGPT will write Python to understand and analyze the data in that file.

I know that sounds simple, but *that is basically what every finance job on the planet does.* You take a fairly standard form, something like an income statement or a general ledger, populate it with data, and then run analysis on top of that data. This means that, theoretically, Code Interpreter can do the majority of finance work. What does it mean when you can do sophisticated analysis for <$0.10 a question? What does it mean when you can use Code Interpreter to answer every question that involves spreadsheets?

It is easy to allow your eyes to glaze over with statements like that. Between the AI Twitter threads, the theatrically bombastic headlines, and the drums of corporate PR constantly beating, the temptation is to dismiss AI stuff as hyperbole. Honestly, that’s where I’m at. Most of the AI claims I see online I dismiss on principle.

With that perspective in mind, please take me seriously when I say this: I’ve glimpsed the future and it is *weird*. Code Interpreter has a chance to remake knowledge work as we know it. To arrive at that viewpoint, I started somewhere boring—accounting.

### General Ledger Experiments

First, I have to clarify: AI has been used by accountants for a long time. It just depends on what techniques you give the moniker of artificial intelligence. The big accounting firms will sometimes use machine learning models to classify risk. However, because LLMs like GPT-4 and Claude are still relatively new, these techniques haven’t been widely integrated into auditors’ or accountants’ workflows.

When I say, “I want to replace my accountant with a Terminator robot,” I’m specifically looking for a way to use large language models to automate work that an accountant would typically do.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2645/optimized_bU9TrljP-thlxYEGT8uYNvj0auI6Bs09As2bUfRgyZPjtv1xpUZq2CVb9hWY0F_eP59xEDbuOFeZ81z4xWdkBxYrMhEovNo-_rr11uqnNm8qz1jCTbWrCjHGydT98Hn_cLw3_xzu3VWyzxEqskkO_Zc.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2645/optimized_bU9TrljP-thlxYEGT8uYNvj0auI6Bs09As2bUfRgyZPjtv1xpUZq2CVb9hWY0F_eP59xEDbuOFeZ81z4xWdkBxYrMhEovNo-_rr11uqnNm8qz1jCTbWrCjHGydT98Hn_cLw3_xzu3VWyzxEqskkO_Zc.png?link=true)

My journey to nerdy Skynet started simply.

I uploaded Every’s general ledger—a spreadsheet that lists out all of the debits and credits for a period—into ChatGPT. My goal was to run a battery of tests that an auditing firm would do: tasks like looking for strange transactions, checking on the health of the business, stuff like that. Importantly, these are rather abstract tests. They are a variety of small pieces of analysis that then build into a cohesive understanding of the health of a business.

Once the file is uploaded, the system goes to work. It realizes this CSV is a general ledger and then writes five blocks of code to make it readable for itself.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2645/optimized_WW84Igh9MCoppdFpAOp3Pbj4TsVKO_J22wFHBuleUMUSFi5kt9jq-Cf6ID2V3rb8QC1gcYc7Pf3x27USjWjuEpDaYCGAP2rzE5GfP1yiuXKeJMnb9B_M7IAbPObRlxf154QMAENxYwg7K-8MFZgrMGQ.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2645/optimized_WW84Igh9MCoppdFpAOp3Pbj4TsVKO_J22wFHBuleUMUSFi5kt9jq-Cf6ID2V3rb8QC1gcYc7Pf3x27USjWjuEpDaYCGAP2rzE5GfP1yiuXKeJMnb9B_M7IAbPObRlxf154QMAENxYwg7K-8MFZgrMGQ.png?link=true)

*Note: I’ll have to do some creative image sizing here because I don’t want to expose our bank account info. Images will all be supplemental and are not necessary for reading this piece.*

* *

It classifies the data and is ready for me to ask it questions in ~10 seconds. Compare that with the usual 24-hour turnaround time on emails with an accountant.

From there, I run the AI through some of these small tests an auditor would do. First, I ask it to create a graph showing the volume of transactions by week. An auditor would do this analysis as a very simplistic risk test—if there was a week with unusually high volume, they would want to examine that further.

In ~10 seconds, faster than a finance professional could do it with a pivot table and charting tool, I have a graph.

[PAYWALL]
