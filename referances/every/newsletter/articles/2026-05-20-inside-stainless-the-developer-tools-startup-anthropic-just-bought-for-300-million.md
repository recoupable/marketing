---
title: "Inside Stainless, The Developer Tools Startup Anthropic Just Bought for $300 Million"
subtitle: "'AI & I' with CEO Alex Rattray"
author: "Dan Shipper"
date: 2026-05-20
column: podcast
url: https://every.to/podcast/inside-stainless-the-developer-tools-startup-anthropic-just-bought-for-300-million
paywalled: true
scraped_at: 2026-06-11T16:07:15.668Z
---

# Inside Stainless, The Developer Tools Startup Anthropic Just Bought for $300 Million

*'AI & I' with CEO Alex Rattray*

**The transcript of *[AI & I](https://every.to/podcast)* with Stainless CEO Alex Rattray is below. Watch on X or YouTube, or listen on Spotify or Apple Podcasts. [Disclosure: I’m a small investor in Stainless.]**

### Timestamps

1. Introduction: 00:01:15

2. APIs and MCP, the connectors of the new internet: 00:05:09

3. Why MCP exists: 00:11:00

4. Why MCP servers are hard to get right: 00:17:15

5. Design principles for reliable MCP servers: 00:20:24

6. Using MCP for business ops at Stainless: 00:25:06

7. Alex’s take on the security model for MCP: 00:40:57

8. How one-off AI actions become permanent production software: 00:44:42

**Dan Shipper**

The internet runs on computers talking to each other, but its entire architecture was built for a pre-AI world. Now we’re trying to hook AI up to the internet with MCP—Model Context Protocol—which turns any website or web service into a set of tools that an AI can use natively to get work done. And the software companies that learn how to do MCP well are going to win over the next decade.

That’s why I brought Alex Rattray, the founder and CEO of Stainless, onto the show. Stainless’s job is to help computers talk to each other. They make the APIs and SDKs for all the big companies you know about, like OpenAI and Anthropic, and they’re starting to build MCP servers too. Alex and I get into the nitty-gritty of what the future of MCP looks like, how to design good MCPs, why MCPs are actually really hard to scale and possibly insecure, and we try to figure out together what a better model for allowing AIs to use the internet might look like.

This is a great episode. Alex is a good friend of mine. Let’s dive in.

Alex, welcome to the show.

**Alex Rattray**

Thanks, Dan. It’s really exciting to be here.

**Dan Shipper**

It’s good to have you. For people who don’t know, you are the founder and CEO of Stainless, which is the API company. You make APIs for companies like OpenAI and Anthropic—just name your big company that you might use their API, and Stainless is probably behind it. Before that you worked at Stripe doing their API, which makes total sense. And before that, most importantly, we were very good friends in college and have remained good friends. We were both starting companies in college. I’m a tiny investor in Stainless. It’s been really fun to watch your journey and get to hang out together so much over the years, and I’m just very excited to bring you on to talk about AI and what you’re doing at Stainless.

**Alex Rattray**

Thanks, Dan. It’s been really fun over the years. When we were in college, I was working on a startup and you were working on a startup. You had a conference room at a venture capitalist office as your office, and you let me crash there with my co-founder and team. We were just on the other side of the conference table hacking away into the evening. Very fond memories of those days. And these days it’s not every evening, but on the weekends, whatever—the same thing is still happening. You don’t see that every day, and it’s a really nice feeling. It’s been great to see everything happening with Every along the way.

**Dan Shipper**

Thank you. As I say, I started from the bottom, now we’re here.

The thing I always say when I run into people and they ask me about you—in order to embarrass you—is that you’re the only person I know of who has consistently run barefoot through the streets of Philadelphia. When we first met, you were not a fan of shoes and you were a fan of running. You want to talk about that?

**Alex Rattray**

It wasn’t that I didn’t like the concept of shoes—it’s that I couldn’t find a good pair. At a certain point, I was running through Nikes and they would bust open every few months. I think what was actually going on is that I had really wide feet and was probably buying narrow shoes. Shoes would constantly get ruined, and on a college budget it’s just like, “This is no good.” Eventually I decided, okay, the longer you wear your shoes, the more worn out they get, but the longer you just wear your feet, the tougher they get.

**Dan Shipper**

“The longer you wear your feet.”

**Alex Rattray**

Try it out. Try this at home. What could go wrong? I actually currently have a really annoying splinter in one of my feet—so don’t actually try this at home. But—

**Dan Shipper**

Are you still running barefoot?

**Alex Rattray**

No, no. This is just from around the house.

**Dan Shipper**

Dangerous.

**Alex Rattray**

Yeah. But see, that’s the thing. If I had been going around on the asphalt without socks on, my feet would’ve been tougher and I’d have no splinter.

**Dan Shipper**

So when you’re not running barefoot, you’re running Stainless. You’re around 50 people now, right?

**Alex Rattray**

Just about, yeah.

**Dan Shipper**

That’s pretty wild. You started Stainless in a pre-AI world, and now we’re in an AI world, and I think you have some ideas for what the future of AI is going to be and how APIs fit into that, how MCPs fit into that. Do you want to paint a little picture for us about where we’re going?

**Alex Rattray**

I would love to. To start—what’s an API? Not everybody’s familiar with that. It stands for application programming interface. There will not be a quiz, right, Dan?

**Dan Shipper**

No quizzes.

**Alex Rattray**

Great. Basically, it’s how one computer program talks to another computer program. It’s how computers talk to computers, how apps talk to apps. APIs are the dendrites of the internet. Dendrites are where your neurons connect and actually exchange information with each other. If you have two neurons in your brain but they’re not talking to each other, you’re actually not thinking. There is no thought happening in a brain without connections between neurons.

And if you think about the internet—if all these servers in the cloud weren’t talking to each other, you wouldn’t have internet. Programs, internet software, does nothing without APIs, without connections to other programs. It’s really fundamental to the mesh of pretty much all modern software. Everything we think of when we think about technology—APIs are at the heart and center of that, just like dendrites are the center of the mesh of the brain and how we think.

Stainless’s mission from day one was to make it easier for computers to talk to computers. The long-running trend of technology is toward more automation. APIs are how most business-to-business interactions, in some format or another, become real, become automated.

What we see with the rise of AI is that a new computer has entered the chat. There’s a new kind of system that can talk to other systems—or at least we’d like it to be able to. You used to have either humans interacting with a computer through a user interface, or a computer interacting with a computer through an API. Now we have LLMs interacting with computers. What’s that through?

Anyone familiar with Every and who’s a regular listener will know MCP—Model Context Protocol—which is a system for connecting LLMs to computers broadly speaking. It’s an area we’re investing in at Stainless. It’s really part of our core mission of making it easy for computers to talk to computers.

The core product we first brought to market is software development kits, SDKs. These are ways of saying, “Okay, Stripe has this great REST API. You can send JSON over HTTP and get back JSON over HTTP. And if you want that to be really convenient, you’re going to use the Stripe Python library, the Stripe Python SDK.” If you’re a Python developer, you’ll go pip install stripe, and then in your application code you’ll write stripe.customers.create, and all of a sudden you have a nice new customer object in your Stripe database and you’re off to the races. Or stripe.charges.create in the old days, to charge a credit card.

SDKs give developers that easy way to interface with an API. What’s the thing that gives LLMs an easy way to interface with an API? You might say MCP, and in a sense you’d be right. But what we’re seeing so far as MCP rolls out into the world and people experiment with it is that it’s not working so great. It’s difficult to deliver on what I see as the core vision of what’s so exciting about MCP.

A dashboard and a user interface lets you click around, see a bunch of stuff, fill out forms, click buttons, do things—anything you’d do while interacting with software, you do through the UI. But LLMs interacting through MCP tend to be much more restricted. You can only do a few little things. There’s usually not a ton of tools you’re going to be exposing to the models.

**(00:10:00)**

**Dan Shipper**

Just to stop you there—what I’m hearing you say is that just like a website is built for humans to use, MCP is sort of the equivalent for models. You can think of it as exposing a set of tools the model can use to perform certain functions. Just like you might click a button on a website, MCP gives the model a bunch of things it can click on or use to get work done.

An example might be a Gmail MCP that has a send mail tool, a compose mail tool, a read inbox tool—that kind of thing. And instead of a human going on the Gmail website and doing it, the LLM is essentially logging in and using it itself. It’s a native interface for language models. But you’re saying that’s not working that well. Can you tell me more?

**Alex Rattray**

Let’s start with what I see as the big vision of MCP and, in some sense, the big vision of agentic AI in the first place. I’ll start with the most pedestrian example you can imagine.

Let’s say Dan walks into my store and buys a pair of stripey socks and maybe a few other things. The next day I hear back from Dan that there’s something wrong. It happens, you know? I turn to someone on my team and say, “Hey, can we refund Dan for those stripey socks he bought yesterday and send him a discount code for next time with a little thank-you note, because we like to take care of our customers?”

This is the most normal thing to do in software—some little task like this. What the member of my team would be doing is opening up their internal admin and looking around. They might go to the Stripe dashboard and look through the list of payments or transactions or orders to find one that has someone named Dan. Which Dan? There might be a bunch. Look through the list of products in the order to see whether there were stripey socks in there. That might be a few clicks. Find the right one, then go to the screen where you can create a refund, create the refund, make sure it’s the right amount, then go and create the discount, then take that discount code and send it over to some other SaaS app to send the mail automatically.

Of course, in a business-to-business context, you might be going into Salesforce and sending a Slack message to an account manager, so on and so forth. In the normal course of work, it’s just the most normal thing in the world—having one task involve going through five different apps, each time 15 different clicks and scrolls and loading spinners, just to do one simple thing.

The promise of agentic AI is to take that same prompt and type it into ChatGPT or Claude or whatever, say, “Hey, can you help refund my friend Dan?” and just have the AI go off and do that—go through these five different apps and the 15 different screens and the various button presses to complete the task and then come back and say, “Great, it’s done.”

In order to do that—and there are only so many tool calls you have to make as an AI model to perform that exact linear chain of events, so it’s somewhat tractable—but if you think about this in the general case, you want your agentic AI to be able to do anything that human operator would have done, without having to wait for a bunch of JavaScript to load on a website or anything like that.

That means you need not only the Stripe create refund tool and the Stripe list transactions tool and the Stripe list products and lookup customer and create discount tool—you need not only those tools, but you need everything you can do in the Stripe dashboard, which is basically everything you can do in the Stripe API. And that’s actually a lot. There are hundreds of different endpoints in the Stripe API. The Stripe dashboard is massive. It’s a huge application.

If you were to take that list of tools today and go to an LLM and say, “Hey, here’s our MCP definition for all of this. Here’s a create refund tool, here’s a create transactions tool,” so on and so forth, and tell it all about those tools—all the descriptions, all the different request properties, the response properties, all the documentation—everyone listening already knows: you’ve just burned through your entire context budget. That’s hundreds of thousands of tokens just in pretty much translating the Stripe OpenAPI spec directly over to MCP tools. Today’s models not only can’t handle that amount of context, it’s a poor use of context because you have a lot else going on. But it’s also just confusing to the model. It’s too much to hold in your brain at one time.

And that’s just the Stripe part of it. What you’re really trying to do is enable your operators to do anything they would normally do. And that spans many, many different SaaS tools. In the course of one interaction, it might be five. In the next interaction, it might be a different five. If you think about every single SaaS tool your business uses on a daily basis to get work done—ideally you’d want every single one of those tools exposed to your operators in their AI chat, with every single tool available, with every nook and cranny and corner case available, so you can do anything through AI. That’s the vision.

There are a lot of problems with that. The biggest is this context window limit. But you also have all sorts of security and permissions problems, because you don’t want the AI to color outside the lines and say, “In addition to refunding Dan’s socks, I also refunded every customer for all transactions ever. And then I sent a bunch of money to my own AI bank account.” There’s more to the challenge, but that’s the vision.

**Dan Shipper**

[PAYWALL]
