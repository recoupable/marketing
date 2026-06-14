---
title: "What Comes After SaaS?"
subtitle: "Bespoke apps for everyone—customized by AI"
author: "Dan Shipper"
date: 2023-07-20
column: chain-of-thought
url: https://every.to/chain-of-thought/what-comes-after-saas
paywalled: false
scraped_at: 2026-06-11T16:08:16.892Z
---

# What Comes After SaaS?

*Bespoke apps for everyone—customized by AI*

#### Brought to you by Designing Your Next Career Step

Embark on a transformative 2-week [Designing Your Next Career Step Course](https://maven.com/s/course/215c93d677) led by Simone Stolzoff, a leading figure from IDEO and author of 'The Good Enough Job'. You’re not just planning a career move; you’re curating it for optimal impact.

Design your career, and create your future. Join our upcoming cohort, Aug 8-17, 2023.

[Enroll Today](https://maven.com/s/course/215c93d677)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#7201021d1c011d00011a1b020132170417000b5c061d).

Operating a SaaS app is like running a one-room hotel that has unlimited occupancy. It’s as if you’ve figured out how to rent the same hotel room to many guests at a time through some weird tricks of quantum superposition. It is the greatest business in the world.
Customers pay for your hotel room by the month. Each one gets the same basic setup: bed, desk, and Wi-Fi that never works when you need it. When you make changes to the core room, all guests get the new version. But they can also request customizations personal to them, like a wake-up call—5 am for the gym rats, 1 pm for the barflies. Guests tend to stay for months or years at a time, paying for the same room as everyone else.
It is an absolute license to print money.
Quantum hotel rooms are not all roses and free cash flows though. There are two crucial things to know about being the owner/proprietor of a business like this. The first is that transitioning from a single-user room to infinite occupancy takes effort. Your quantum superposition technology is a little complex to build. The second is that the longer you’re in business the more of your time and money you’re going to spend enabling “personalizations” for each guest. In the end, each guest customizes your hotel room so much that it looks like their own home.
This is very expensive and frustrating to deal with, but you console yourself by wiping your tears with stacks of thousand-dollar bills.
What is true for quantum hotel rooms, is also true for SaaS apps: Everyone gets the same basic app. You can host infinitely many users in parallel. People tend to stay for months or years at a time.
But making the app available for many users at once requires a lot of up-front effort. You need to build login systems, a database architecture and code that accounts for multiple users, you need to deal with keeping user data secure, and you need to build lots of settings screens so that customers can configure the product. The more time goes on, the more money and effort you’re going to expend building customizations for users, instead of building core product improvements.
This is the way of the world. It makes SaaS harder for solo developers to build products, and it means that the larger you get the less time you can spend on fundamental innovation.
There are a few converging trends in software that I think might significantly shift this dynamic, though:

- First, web-based development environments that allow you to write, run and deploy code from your browser, like [Replit](https://www.replit.com) and [Val.town](https://www.val.town), are becoming powerful.

- Second, these tools make it easy to duplicate, collaborate on, and remix existing apps to fit your own needs.

- Third, AI makes it easy for users to change any app to meet their needs even if they don’t know how to code.

Rather than having the same users on one app, you can just spin up a new version of the app on a new server for a new user at the touch of a button. Then, instead of incrementally building customization options for your users you can allow them to modify the app however they see fit—using AI. They can do this in a way that will never affect other users, and that keeps their data secure.
Suddenly, instead of building a single-room quantum hotel, you’re building a suburban development. All of the houses on the block are in the same style, and you can build a new one for a new renter at the touch of a button. When renters move in, they can customize the house themselves without requiring any of your time or money—and without affecting any of the other houses.
This vision of software turns traditional SaaS into something far more bespoke, customizable, and remixable than the current generation of software allows for. The computer science researcher, Geoffrey Litt, who I interviewed [here](https://every.to/superorganizers/action-item-how-to-see-the-future?sid=22846), calls this [Malleable Software](https://www.geoffreylitt.com/2023/03/25/llm-end-user-programming.html). I’ve been calling it Malleable Source. Malleable source means any app that allows you to modify its underlying code with AI. These apps can be open-source or closed.
It’s clear that this is a new paradigm on the horizon. I know because I stumbled into it.

####

Reimagine your career with Simone Stolzoff's 2-week [Designing Your Next Career Step](https://maven.com/s/course/215c93d677) Course. You're not just making a job switch, you're making decisions for maximal effectiveness.

Utilize Design Thinking's transformative power to sift through career prospects, pinpoint your individual goals, and plot a path toward achieving them. Turn aspirations into an empowering game plan for your future amidst uncertainty.

Unlock your purpose with [this course](https://maven.com/s/course/215c93d677) and launch into a sure-headed future brimming with a clear strategy. Engage with like-minded professionals, fostering a supportive community extending post-course.

Craft your career, and shape your future. Be part of the next cohort starting Aug 8-17, 2023. Sign up today!

[Enroll Today](https://maven.com/s/course/215c93d677)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#3340435c5d405c41405b5a434073564556414a1d475c).

## My experience with malleable source

I built a little app recently to help me map my mind. It shoots me a series of texts every few hours that asks me questions about what’s going on: thoughts, feelings, emotions. It also sends a follow-up with a big question I’m currently wrestling with: “What’s your big goal?” When I get these texts, I dash off a few quick responses without thinking about it too much. I want to get as close to the snap answers that come to mind, and then move on with my day.
The cool thing about the app is that it then uses AI to generate a summary of what’s on my mind. It helps me see, day to day, what I’m thinking about and feeling. It also tries to condense a definitive answer to big questions I’m wrestling with—taking into account all of the different ways I’ve answered it—and provides observations about patterns it finds in my answers.
It’s been quite helpful for me.
I was chatting with my friend, Every writer, coach, and fellow psychology nerd [Casey Rosengren](https://every.to/@caseyrosengren) about the app recently and he asked if he could try it. I tensed up a bit at the amount of work required.
See, it’s currently very easy to build something like this for one person. But making it available for multiple people is a harder problem. In order to do this I’d have to implement logins, make the code multiplayer, build an interface to let him customize questions, and make sure my data doesn’t get mixed in with his. Especially for an app like this, where you’re sharing private thoughts, it’s just a bit of a hairball.
But then I had a little brainwave. I had built the app on Replit—so the problem was already solved.
Replit is an all-in-one browser-based development and deployment environment. It allows you to code an app, and press one button to host it live on the internet.
The interesting thing about Replit is that it allows you to easily make new copies of your app. All you have to do is hit “Fork” and it will duplicate your codebase and environment. Then you press “Run” and the new copy is live on a new URL. It’s pretty magical.
I realized, if I wanted to let Casey use this app, all I had to do was hit “Fork.” Then I just replaced his phone number with mine in the code, and pressed “Run.” Suddenly, he was getting texts from the mind-mapping bot, too.
Best of all, he can make his own modifications to the app. He can head into the code and make any edits he wants. If he prefers to be asked different questions, it’s a few keystrokes away. If he’d like to see the AI summaries of his answers, it’s just a few more lines of code. This is all made easier by the fact that *he doesn’t have to write any of the code himself.* He can just use ChatGPT (or Replit’s built-in AI tool) and ask it to make modifications.
We’re both using the same basic piece of software. But he can customize his version however he wants. His data is in his own database in his own cloud environment. And all it required from me was to press “Fork.”

## Implications for the future of software

I think something like this might be a new future for a certain kind of software. It’s enabled by AI and [vertically integrated, browser-based developer environments like Replit](https://every.to/chain-of-thought/ai-and-the-future-of-programming). It probably doesn’t totally replace SaaS but it does open up new business models and opportunities.

- It will make it easier to build small SaaS apps that keep data secure

- It blurs the distinction between developer and user

- It makes bespoke software easier to build, therefore more of a reflection of your personality—rather than a mass-produced good

Let’s go through these one by one.

### It’s much easier to build multi-user apps that keep data secure

Each app that gets built in this style is used by one person and lives in its own environment. This makes dealing with user accounts and logins simpler. It also makes data security issues less relevant—each user has their own database that’s tied to the new environment, and no data gets mixed.
For really early projects, like the one I mentioned above, this saves a lot of time in terms of speed to market. You can get going with having multiple users of your app without having to build a lot of traditional infrastructure. That’s a big deal.
It could mean the rise of more of the indie or micro SaaS apps—that are built by small teams without significant funding—that have become popular in the latest AI wave—like PhotoAI by [Pieter Levels](https://twitter.com/levelsio?lang=en). Or it could mean more businesses and individuals choose to build their own software rather than buy from a vendor.

### The distinction between users and developers is blurred

Right now, there’s a hard line between people who use apps and people who build them. AI blurs this distinction, as the CEO of Replit, Amjad Massad, noted in [a recent talk](https://www.khoslaventures.com/a-new-cloud-is-forming-the-ai-devcloud/). The software world could change drastically once everyone has the equivalent of a junior developer at their disposal *and* a malleable source app they can customize.
Most software in the world today is the equivalent of a Coke: it’s mass-produced, and everyone gets the same thing. The software of tomorrow might be more diverse, creative, and bespoke than that. Like fashion or food, your chosen software could become a reflection of your who you are rather than a default choice everyone is required to make.
Software as a reflection of who you are already happens to some degree—techies use Macbooks with VS Code, and finance bros use Windows loaded with Excel. But better, cheaper customizations will accelerate it.

### New business models are possible

In a world where anyone can fork a piece of software and make their own modifications to it, new business models might become popular.
It might look a lot more like the world of games where modding and customizations are quite common, and there are whole economies devoted to making and selling mods of popular games. In a world like this, rather than building a new app from scratch, individual developers or small teams might choose to start out with an already-existing app, fork it, and mod it for a niche to resell it.
Perhaps, whoever made the original version of the software could collect a cut of the revenue generated by any modded versions. Or, perhaps, they’d charge a services fee for use of the AI needed to customize the software—in the way SaaS companies charge large enterprises for custom integrations today.
There are significant challenges inherent in this model as well.

## Challenges of malleable software

### AI will break

If you’re shipping a piece of software that doesn’t give users access to the code—but does give them the ability to modify the underlying code with AI, your AI better be great at coding. GPT-4 is close to this level for some coding tasks—but it’s still a dicey proposition.
It’s going to be a serious challenge to build an AI that can modify apps without breaking them. It will also be critical for these AIs to impose sensible limits on what users can do (for example, refusing to rebrand your SaaS app with a swastika would be a sensible limit.) Given how finicky it can be to adequately steer AIs, it might take some time to address corner cases. But it will be extremely valuable when that challenge is solved.
In the meantime, I think the best use cases for malleable source projects are ones where the code is viewable by the user—so if the AI breaks the app, the user can debug it.

### It’s hard to ship updates when everyone has their own version of the code

One of the benefits of SaaS is that if you ship an update to the app, it automatically gets shipped to everyone. This is not as easy to do when you have many versions of your app, customized by AIs, running in their own environments.
If you ship an update for your app, it’s unclear how that update would get propagated to users who have made their own modifications—especially if those modifications conflict with your updates. This is a problem faced by the enterprise software world all the time, where large organizations make customizations to software that they run on their own cloud infrastructure—so it’s solvable. It’s just complicated.

### Today, malleable software has to be open source

One of the big questions for companies building this type of software is whether to make it available as open source or not. Closed source is easier to monetize because you can control who makes copies and how those copies are used. But if you want to try something like this today, it has to be open source.
The platforms I mentioned at the top of the piece, Replit and Val.Town, that enable this kind of functionality are built as developer environments—so any time you duplicate a project, you get automatic access to its code. This is the way things are going to stay for the foreseeable future—at least until AI is good enough to make code changes without oversight.
This will limit the kind of founders and developers who attempt to build under this paradigm, for now.

## Try it yourself

Okay, I’ve spent the 2,000 words waxing poetic about this malleable software thing. Now it’s time for me to put my money where my mouth is. I want you to try it out for yourself.
For this article, I used ChatGPT to build a simple little app on Replit as a demo. It’s a web server coded in Python that hosts a web page with a special message. You can go see my version live on the internet [here](http://malleable-source-web-app.danshipper1.repl.co/):
[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2701/optimized_arc.png)](http://malleable-source-web-app.danshipper1.repl.co/)
Now it's your turn. I built this on Replit, and so if you want to run it yourself. The steps are pretty simple. [Click here](https://replit.com/@DanShipper1/Malleable-Source-Web-App?v=1) and press Run:[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/2701/optimized_CleanShot%202023-07-21%20at%2011.24.42@2x.png)](https://replit.com/@DanShipper1/Malleable-Source-Web-App?v=1)
Replit will create an entirely new version of the app, run it, and host it on the public internet specifically for you.
Want to make changes? Just press “Fork”. You’ll be able to get access to the app, modify any piece of it, and host it on the public internet yourself just by pressing the big green “Play” button at the top of the interface.
To take this back to my metaphor at the top, doing this is like setting up a suburban development. I've built a model house, and now anyone can set up their own copy on my block. Best of all, you can do whatever you want with it! Your changes won't affect mine, but you can build on top of my progress with very little effort.
I can’t tell you how big of a deal this is. Previously, allowing someone to run an app and hosted it on the public internet was a hundred-step process that was completely inaccessible to non-technical users. Today, all you have to do is click one button.
You can make changes by asking ChatGPT for help—even if you're not a developer. The opportunities for customization are endless.
If I wanted to monetize this, I could put the link to my Replit behind a paywall. Or only share it if you take a course with me—and this is exactly what I do with my [chatbot course](https://www.chatbot-course.com).
This ability to easily duplicate, remix, and run apps with AI is going to change everything about how software works over the next 10 years.
If that doesn’t get you excited about the future, I don’t know what will.
