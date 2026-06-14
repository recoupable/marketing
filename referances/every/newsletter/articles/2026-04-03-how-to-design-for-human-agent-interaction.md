---
title: "How to Design for Human-agent Interaction"
subtitle: "Unreliable AI products are a design problem. Here’s how to solve it."
author: "Karri Saarinen"
date: 2026-04-03
column: thesis
url: https://every.to/thesis/how-to-design-for-human-agent-interaction
paywalled: true
scraped_at: 2026-06-11T16:07:19.539Z
---

# How to Design for Human-agent Interaction

*Unreliable AI products are a design problem. Here’s how to solve it.*

***Karri Saarinen**** has spent his career—at Airbnb and Coinbase, and now as CEO of Linear—crafting software that keeps its promises. His argument is that AI’s unpredictability isn’t a model problem, it’s an interface one: An agent sends a customer an email you meant to review first. The model did what it was told, but the interface never gave you a chance to stay stop. In this piece, he shares the six-principle framework Linear has developed for how agents and humans should work together inside the same product, plus his nuanced take on a thorny question in AI design: Who should be accountable when an agent does something wrong? If you enjoy the piece, watch his episode on [X](https://x.com/danshipper/status/2039357127903350960) or [YouTube](https://youtu.be/8QcW9-dal0g), or listen on [Spotify](https://open.spotify.com/episode/4YX4enhm6QgqTz388Ezqpu?si=8aBRh6sWTXqPQKyp0hfvBA) or [Apple Podcasts](https://podcasts.apple.com/us/podcast/if-saas-is-dead-linear-didnt-get-the-memo/id1719789201?i=1000758668076).—[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief)*

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

I learned to design in a world where product design was a promise.

It was a promise that a product would work how it’s supposed to work. You sketch a user flow on a whiteboard, build it, and the system behaves the way you made it behave. A button does exactly what it says it will do, every time, and if it doesn’t, that’s a bug. This shaped my approach as a principal designer at Airbnb and Coinbase, and now as the CEO of Linear.

Lately I’ve been spending time with a different kind of tool, and that promise has grown harder to keep. I ask for help writing a plan, summarizing a discussion, and turning rough notes into something clearer. Sometimes the result is excellent, but small changes to my input shift the output in ways I didn’t expect. The capability is impressive when it works, but the experience often feels slippery. I’m not always sure what I’ll get back, or how much I should trust it.

Non-deterministic software breaks the contract. When outcomes can vary, sometimes wildly, based on what someone types into the same chat window, designing for reliability becomes genuinely harder. This slippery feeling is the design problem of this era, and it almost always traces back to the interface rather than the language model—which means it belongs to designers, not researchers.

## The limits of chat

The first interface that spread for AI tools was the chat window. That makes sense. When you don’t know what something can do, the safest approach is to let people ask. A conversation feels familiar, it stretches across many situations, and it doesn’t force a specific structure up front.

But the more you use chat for real work, the more its weakness shows. Everything becomes a stream of text that’s hard to hold onto, hard to compare, and hard to connect to the rest of what you’re doing. The quality of the output depends enormously on the quality of the input, which means two people asking for the same thing in slightly different ways can get drastically different results. There are few guardrails, and little structure nudging you toward a good outcome. The interface is essentially a blank page with a blinking cursor, and all the burden of getting value from it falls on the person typing.

For exploration, that’s fine. For serious, repeated work inside a team, it’s not enough. We need interfaces that bring more structure to AI interactions, that guide people (and agents) toward better outcomes without being so brittle they break the moment someone wants to use them in a way you hadn’t anticipated.

## Designing for new actors

There’s a second, newer dimension to this problem that goes beyond improving interfaces for humans. Agents are [already showing up](https://every.to/thesis/the-race-is-on-to-redesign-everything-for-ai-agents) inside products, working alongside people, and most software wasn’t designed with that in mind.

For decades, interfaces have been designed so that humans can navigate them—buttons, menus, folders, navigation hierarchies. These patterns assume a person is looking at a screen, making decisions, and clicking through options. But when an agent is interacting with a product, the design challenge changes. The agent doesn’t need a menu to find something. It doesn’t browse. It acts, and the people around it need to understand what it did and why, often after the fact.

We need a new set of principles for how agents show up inside the tools people already use. Not principles for building agents themselves, but principles for designing ways that agents and humans interact within a shared product. At Linear, we’ve started calling these [Agent Interaction Guidelines](https://linear.app/developers/aig), and while they’re still evolving, they represent how we think about this problem today.

### An agent should always disclose that it’s an agent

[PAYWALL]
