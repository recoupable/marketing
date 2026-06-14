---
title: "Why We Don’t Ship Software as Fast as We Used To"
subtitle: "Don’t blame it all on bloat—the reason is complicated"
author: "Thorsten Ball"
date: 2023-10-11
column: p
url: https://every.to/p/why-we-don-t-ship-software-as-fast-as-we-used-to
paywalled: false
scraped_at: 2026-06-11T16:08:12.369Z
---

# Why We Don’t Ship Software as Fast as We Used To

*Don’t blame it all on bloat—the reason is complicated*

#### Sponsored By: Summit

This essay is brought to you by [Summit](https://www.summit.im/?utm_source=every). Summit is an AI-powered life coach that supports you on the journey to becoming the best version of yourself. Imagine having a 24/7 available coach, infinitely customizable and personalized specifically to you, who helps you shape, manage, and achieve your personal and professional goals. That's [Summit](https://www.summit.im/?utm_source=every).

[Try for Free](https://www.summit.im/?utm_source=every)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#9deeedf2f3eef2efeef5f4edeeddf8ebf8efe4b3e9f2).

Id software—the company that produced *Doom*, *Quake*, *Wolfenstein*, and other popular video games in the nineties—has a reputation for shipping fast. Total development time for *Wolfenstein 3D* was half a year; the first alpha version of *Doom* was playable after two months; the networked-mode for *Doom* took two weeks. Remarkably fast—anecdotally, much faster than most software projects today. (Some of these stories are outlined in John Romero’s memoir [Doom Guy](https://romero.com/shop/p/doomguy) and David Kushner’s [Masters of Doom](https://en.wikipedia.org/wiki/Masters_of_Doom).)
I found this [tweet](https://x.com/molecularmusing/status/1699085235588079962) commenting on Romero’s *Doom Guy* very interesting:

[![](https://pbs.twimg.com/profile_images/1623006596048494592/YddN87uV_normal.jpg)
Stefan Reinalter@molecularmusing

Halfway through this book, I'm constantly amazed by how fast the early id Software guys got things done and games released.Can't help but think that modern day SW dev has become bloated, overengineered, and slow, compared to earlier days.Wonder how @romero feels about that?

![](https://pbs.twimg.com/media/F5RdA6HWkAAWNEC.jpg)

September 5th 2023, 10:41am EST

13 Retweets242 Likes](https://twitter.com/molecularmusing/status/1699085235588079962)

The author of the tweet [goes on](https://twitter.com/molecularmusing/status/1699091999637270715):

[![](https://pbs.twimg.com/profile_images/1623006596048494592/YddN87uV_normal.jpg)
Stefan Reinalter@molecularmusing

Replying to @rangermann

@rangermann @romero Exactly!Coming up with new tech and shipping that in 4 months.Creating a SNES port in 3 weeks.No off-the-shelf engines available back then.Crazy.

September 5th 2023, 11:07am EST
12 Likes](https://twitter.com/molecularmusing/status/1699091999637270715)

A SNES port in three weeks? No matter *what* is being ported, three weeks for a platform port is fast. Has software development indeed become “bloated, overengineered, and slow”?

## Software is not as simple as it used to be

Let’s start with that first adjective—bloated. It comes up repeatedly on the internet: software has become bloated, meaning it uses too much memory, it’s slow, it’s inefficient, and it’s often unclear why we need all that crap.
I’m not sure that I buy it. Yes, if we compare CPU speeds from today with those from 1999, it’s easy to conclude that things should be a lot faster. The SNES, to which *Doom* was ported, had [a nominal clock speed of 3.58 MHz](https://en.wikipedia.org/wiki/Super_Nintendo_Entertainment_System#CPU_and_RAM)—the computer I’m writing this on has eight CPUs and each one has 3.9 GHz.
The comparison is not quite that simple, though. Hardware has gotten better and faster, but the workloads we throw at computers have also grown. To start, our screen resolution isn’t 640x480 anymore—we have 120Hz displays and watch 4K movies. Instead of text, we routinely share *screenshots of text* that take up more disk space than all of the images in a Windows 2000 installation combined (don’t fact-check me). Windows 95 had a 256-color palette, but when I open Slack today, there’s a chance I see three high-resolution, 200MB GIFs playing at the same time—of course, that uses more memory than paint.exe. That’s only one dimension—asset sizes—but you get the idea.
I’ve seen similar comparisons happen elsewhere. When we built our house three years ago, we’d wonder why it was so much more expensive than the house my parents built in the eighties—even though ours was smaller. Turns out expectations and standards slowly rose over the past 40 years: houses in the eighties didn’t have things like proper insulation, floor heating, multiple (triple-pane) windows, multiple power sockets, and Ethernet cables in every room. Quality and prices went up, but it’s hard to notice—most of it is hidden behind walls or floorboards. You end up with a comparison that doesn’t make a lot of sense.
Or take phones: a few years ago, non-tech friends of mine would say, “A thousand bucks for a phone?! I remember when I could get a phone for $100 and its battery lasted for five days!” Sure, but did that phone have a megapixel camera with post-processing software that made your DSLR look bad? Was that phone also constantly connected to the internet? Did it have a high-resolution, 120Hz display? Did you also use it for three hours every day? Did you use it as a navigation system in your car, your entertainment console at home, your book library, your video library, and as your online shopping device? That phone from a few years ago is not in the same league as the “phone” you use today. They don’t even play in the same stadium.

####

[Summit](https://www.summit.im/?utm_source=every) is like having a life coach in your pocket, ready 24/7 to provide guidance molded to your preferred style - be it a no-nonsense drill sergeant or a zen-like friend.

With [Summit](https://www.summit.im/?utm_source=every), your lofty goals become manageable daily plans, tailored to your progress and designed to foster consistent behavior. It takes a proactive role in your growth journey, ensuring you stay on track with diligent follow-ups that inspire motivation.

Our mission is to bring affordable, accessible coaching to everyone.[Summit](https://www.summit.im/?utm_source=every) is ideal for entrepreneurs, students, and growth seekers looking for personalized AI assistance to help you become the best version of yourself.

Join the Summit community and elevate your personal and professional growth.

[Try it for Free](https://www.summit.im/?utm_source=every)

[Want to sponsor Every? Click here](https://every.to/cdn-cgi/l/email-protection#285b5847465b475a5b4041585b684d5e4d5a51065c47).

## Much of today’s complexity is invisible

I don’t want to brush off the claim that software has become bloated. I think it has, but it’s more complicated than comparing memory usage and required disk space.
There are two other adjectives in the tweet from above—“overengineered” and “slow.” These two got me thinking—yes, the time-to-ship numbers that id Software put up do seem hard to achieve.
I have two thoughts here. The first is similar to the one about bloat: software has become more complex, which makes shipping take longer. But you don’t necessarily see the complexity, which is why the speed (or lack thereof) seems hard to explain. This is a hunch, a gut feeling, so instead of pointing to clear evidence, let me throw some ideas into the room and wave my arms wildly.
*Doom* was released for DOS first in 1993. DOS is a lot thinner than today's Windows or macOS. It didn't even have virtual memory: each program could only access the memory of other programs.
Software in the nineties didn't have to worry about multiple devices with different resolutions (like iPhone X and iPhone 15), or different network speeds (there was no network to speak of), or a lot of different hardware (because there wasn't that much hardware).
Have you ever tried to implement an OAuth authentication flow? Ever compared the sweat that came out of you with whether a user even thinks about what goes on in the background when they click “Login with …”?
Ever implemented something that works for hundreds of thousands of users at the same time? If so, have you ever heard a user say, “Wow, I can’t believe that 100,000 other people use this at the same time as me, without any problems—that’s magical”? Okay, I didn’t think so.
Ever made a website look *nearly* the same in four different browsers on desktops, phones, and even gaming consoles, just for one user to ask, “Why don’t you use this native element here?”
My point is that a lot of complexity is required just to meet today’s baseline expectations. When you meet them, a user doesn’t scream out in joy—they just use it. Maybe that’s one reason why software development has become slower.

## Slower is not necessarily worse

I’m going to leave you my second thought in classic give-’em-something-to-chew-on-and-walk-out fashion.
Maybe, *maybe*, software development has become slower, because that’s just what happens when you add more people to software projects (*Doom* was created [with a team of 5-6 people](https://en.wikipedia.org/wiki/Development_of_Doom)). And maybe that’s also what happened with the software ecosystem as a whole.
You start out knowing the whole stack of your project. You can move fast because you know where everything is. If you bump into a problem and something *over here* feels hard and cumbersome, you know that you can change something *all the way over there*, which will turn the problem you’re currently facing from I-need-to-duct-tape-this into oh-now-it’s-just-a-matter-of-configuration.
But then you realize you want to add more people and that won’t scale. But you also want to add more people because you want to ship more and faster. You add another person to your project and say, “You worry about this bit, I worry about that bit.” Then, later, when you bump into a similar problem as before, you know your bit, but you can’t make the change all the way over *there*. You have no clue how that system works anymore. So you need to wait for your buddy to change it for you.
You end up not knowing the full stack anymore. *Adding more people grows the stack in a way that makes it unknowable*.
This happens everywhere—on small projects with abstractions between programmers, on large projects with abstractions between teams, and on projects throughout the larger software ecosystem. We build and share libraries that other people and companies and teams can use. We build our software on top of other people’s code that we haven’t looked at once. When you sit on the shoulders of giants—giants that are made up of millions and millions of lines of code—nearly everything becomes an I-need-to-duct-tape-this problem, because you can’t wait for 100 people to make whatever change you want to make easy.
Does that mean the speed of software development is a function of programmers knowing the full stack? Well, I guess so. But there are caveats: what even is the “full stack”? Does it include the OS? The file system? The network? You have to have limits somewhere, don’t you? Even John Carmack, co-founder of id Software and a famously productive programmer, didn’t write his own OS to ship a game. He built his software on top of the existing OS.
Adding more people and abstractions slows you down. But while a 12-person team might not move as fast as a two-person team, the former is much faster at doing more.

---

*Thorsten Ball is a software engineering manager at Sourcegraph. He is the author of programming books *[Writing an Interpreter in Go](https://www.amazon.com/Writing-Interpreter-Go-Thorsten-Ball/dp/3982016118/ref=sr_1_1?crid=1M3WDQBSPZ9LU&keywords=writing+an+interpreter+in+go&qid=1696947272&sprefix=writing+an+interpre%2Caps%2C82&sr=8-1)* and *[Writing a Compiler in Go](https://www.amazon.com/Writing-Compiler-Go-Thorsten-Ball/dp/398201610X/ref=sr_1_1?crid=19IAGE407QUBN&keywords=writing+a+compiler+in+go&qid=1696947308&sprefix=writing+a+compiler+in+go%2Caps%2C78&sr=8-1)*. He also writes the *[Register Spill](https://registerspill.thorstenball.com/)* newsletter, where this piece was *[originally published](https://registerspill.thorstenball.com/p/has-software-development-become-slower). *You can also find him *[on X](https://twitter.com/thorstenball)*.*
