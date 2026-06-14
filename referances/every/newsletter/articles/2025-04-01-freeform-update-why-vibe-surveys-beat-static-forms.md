---
title: "Freeform Update: Why Vibe Surveys Beat Static Forms"
subtitle: "If tools are getting more expressive, why are user experiences still stuck in checkboxes and static flows? Freeform is our answer to that question."
author: "Cassius Kiani"
date: 2025-04-01
column: source-code
url: https://every.to/source-code/freeform-update-why-vibe-surveys-beat-static-forms
paywalled: false
scraped_at: 2026-06-11T16:07:46.475Z
---

# Freeform Update: Why Vibe Surveys Beat Static Forms

*If tools are getting more expressive, why are user experiences still stuck in checkboxes and static flows? Freeform is our answer to that question.*

*TLDR: Today we’re sharing an update on *[Freeform](https://freeform.computer/create_form)*, first launched in *[Source Code](https://every.to/source-code/freeform-a-new-experiment-from-every-studio)* as an experiment on January 8 by one of Every’s entrepreneurs in residence, *[Cassius Kiani](https://every.to/@cassius)*. He’s been exploring how forms that are fun and uncover the “vibe” of the user are more effective than static ones. We’ve been using Freeform internally for things like job applications and product market-fit surveys, and have seen significant increases in the quality of responses and completion rate.—*[Brandon Gell](https://every.to/@brandon_5263)
*Was this newsletter forwarded to you? *[Sign up](https://every.to/account)* to get it in your inbox.*

---

AI-based vibe coding tools have a blind spot. Sure, they’ve genuinely changed how software is built, allowing developers to work faster and more efficiently. And they’ve proven [wildly popular](https://every.to/napkin-math/analyzing-the-fastest-growing-software-category-i-ve-ever-seen), with legions of customers diving into products that have been carefully designed to create an intuitive, frictionless, even delightful experience for coders.
But in this rush to cater to the whims of *developers*, less consideration has been paid to whether all this glorious software being churned out is helping the people who use it—the end users.
Take online forms, for example. We all know the sinking feeling we get when we go to sign up for a service, apply for a job, or submit our information somewhere and are confronted with an interminable scroll of radio buttons, drop-down menus, and open response fields. While apps and websites have evolved to feel more dynamic and personal, forms remain stubbornly stuck in the checkbox era.
Over the past three months, I've been exploring how to change that by [building Freeform](https://every.to/source-code/freeform-a-new-experiment-from-every-studio). It’s what I call a “vibe form.” Instead of just collecting data like most forms, it adapts the questions it asks based on your responses. This allows it to sense a person’s mood, adjust the flow of a form or survey, and meet people where they are.
Every subscribers get free access to Freeform. If you’re an Every subscriber, you can access your Freeform account by clicking “[Login to Freeform](https://www.google.com/url?q=https://freeform.computer/login&sa=D&source=docs&ust=1743521646722257&usg=AOvVaw2gtIp4eUTR8AgKF_IvRXGl).”

[Subscribe to Every](https://every.to/subscribe?utm=freeform)

[Create a Freeform account](https://freeform.computer)

I’m going to provide a peek into the process behind our efforts: what I and the Every Studio team have tried, what we’ve learned, and why I think this shift—from static forms to adaptive, AI-native experiences—might point to something bigger. I think we’re on the brink of a new era of tools, not just for makers, but for the people on the other side of the screen, too. The ones filling out the forms, having the conversations, and clicking the buttons.

## From dashboards to dynamics

When we first introduced Freeform, the initial response was exciting. We saw enthusiasm from some big names in tech, and we couldn't wait to see how they'd use what we'd built. Dashboards, conditional logic, integrations—all the classic SaaS features were there, and we assumed that's what had captured their interest.
But when these early users started using Freeform, their reactions were surprisingly lukewarm. They didn't complain about missing features or request more powerful dashboards. Instead, they seemed to be missing something intangible—something that the term “AI-powered form builder” had promised that we hadn’t quite managed to deliver. Yet.
It wasn't until we noticed our own boredom while building and testing forms in Freeform—clicking through repetitive interfaces—that it fully hit us. If we, the creators, felt bored and disengaged, what did that mean for the users filling out these forms? The excitement we saw initially wasn't about the tech or the backend features; it was about the experience itself. That realization pushed us to rethink everything about Freeform, shifting our focus from yet another administrative control panel to creating an experience genuinely tuned to the end user.
As part of the rethink, we challenged ourselves with a set of questions:

- What could we do to make the form really fun? Could Freeform feel like a choose-your-own adventure?

- How could we make each Freeform feel super unique—not just to other people, but to ourselves?

- What would be some ridiculous promises we could make? Could we make Freeform feel even better than a conversation?

This shift in thinking took us from building just another form tool to creating something deeper: an experience that prioritizes the vibe—not just for creators, but for the people on the other side of the screen.

## The matchmaker insight

This focus on the respondent's experience led us to a deeper realization: At their core, most forms are matchmaking tools. People don’t fill out forms because they want to fill out a form; they fill out forms because they want something—a job, a service, a connection. They're trying to find the right fit:

- A lead-gen quiz matches customers with products they'll love

- A patient intake form matches people with the right treatment plans

- A job application matches candidates with their ideal roles

Traditional forms handle these delicate matching processes with all the grace of a multiple-choice test. They're static, linear, and one-size-fits-all. When was the last time you saw a meaningful relationship develop through a rigid checklist?
This insight changed our entire approach. Instead of building just another form tool, we needed to create something that could facilitate genuine discovery and connection. Something that could adapt and respond like a skilled matchmaker would, reading signals, adjusting the conversation, and making thoughtful connections in real-time.

## Why AI changes everything

A few years ago, building a truly adaptive form would have meant hard-wiring an impossible tangle of logic. Now, with the right models and prompts, we can create something that feels alive and responsive, and turn it into a really fun experience. We can surface just the right question at just the right moment. We can rewrite questions in flight based on tone or sentiment. We can route someone to a different experience entirely based on subtle engagement signals.
But doing that requires rethinking the form experience from the ground up. This isn’t about adding an AI feature to a static product. It’s about asking what a form could be if it were AI-native from the start. That kind of thinking doesn’t fit easily into the roadmap of a legacy product. For established form-building companies, embracing this kind of adaptability would mean deprecating the very models their tools are built on.
We’re building a fundamentally different interaction model—one that tries to take full advantage of everything AI can do.

## What a vibe form does

Today, Freeform (soon to be renamed—thanks, [Apple](https://www.apple.com/newsroom/2022/12/apple-launches-freeform-a-powerful-new-app-designed-for-creative-collaboration/)!) is centered around this idea of the vibe form.
Here’s what it looks like in practice:

-
**Dynamic flow:** The form adapts as you go—asking different follow-ups based on how you respond.

-
**AI-powered context:** The system chooses question types, adjusts tone, and even rephrases on the fly to keep things moving.

-
**Persona testing:** Creators can simulate how different user types might experience the form.

-
**Smart routing:** Depending on how someone responds, they might get routed to a booking link or a softer touchpoint like a discount.

In early testing, especially in paid ad environments, we saw strong completion rates. People were staying engaged.
This isn’t just about better UX. It’s about rethinking how we value attention. Most form tools assume attention is a given. We’re working from the assumption that it’s not. It’s fragile. It’s precious. And if you lose it, you often don’t get it back.
We’re still learning as we go, but one thing we’re trying to stay grounded in is designing for vibe—for the subtle cues and shifts that make digital interactions feel human.

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3538/optimized_ff_gif_v3.gif)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3538/optimized_ff_gif_v3.gif)
*Source: Every.*

## Try it yourself

If any of this resonates, we’d love for you to try Freeform.
If you’re a subscriber to Every, you already have access to Freeform. Just click “Login to Freeform” and enter the email you use to receive emails from Every (if you’re not already a subscriber, [you can sign up here](https://every.to/subscribe)).

[Try Freeform](https://freeform.computer)

The future of forms doesn’t have to be static. It can be responsive, expressive, and tuned to the moment. If websites and feeds can shift based on who’s viewing them, why shouldn’t forms?
That’s the idea behind vibe forms. That’s what we’re trying to build—and we’re curious to see where it leads.

---

*Thanks to ****Katie Parrott**** for editorial support.*
***Cassius Kiani**** is an entrepreneur in residence at Every. He cofounded the nonprofit Pledges and health tech company Mora Medical. *
*To read more essays like this, subscribe to *[Every](https://every.to/subscribe)*, and follow us on X at *[@every](http://twitter.com/every)* and on *[LinkedIn](https://www.linkedin.com/company/everyinc/)*.*
*We also *[build AI tools](https://every.to/studio)* for readers like you. Automate repeat writing with *[Spiral](https://spiral.computer/?utm_source=everyfooter)*. Organize files automatically with *[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)*. Write something great with *[Lex](https://lex.page/?utm_source=everyfooter)*. Deliver yourself from email with *[Cora](https://cora.computer?utm_source=everyfooter)*.*
*Get paid for sharing Every with your friends. Join our *[referral program](https://every.getrewardful.com/signup)*.*

[Subscribe](https://every.to/subscribe)
