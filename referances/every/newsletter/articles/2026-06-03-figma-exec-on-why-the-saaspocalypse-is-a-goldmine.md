---
title: "Figma Exec on Why the SaaSpocalypse Is a Goldmine"
subtitle: "'AI & I' with director of product management for developers Matt Colyer"
author: "Dan Shipper"
date: 2026-06-03
column: podcast
url: https://every.to/podcast/figma-exec-on-why-the-saaspocalypse-is-a-goldmine
paywalled: true
scraped_at: 2026-06-11T16:04:34.328Z
---

# Figma Exec on Why the SaaSpocalypse Is a Goldmine

*'AI & I' with director of product management for developers Matt Colyer*

The transcript of *AI & I *with **Matt Colyer, ** Figma’s director of product management for developers, is below. Watch on [X](https://x.com/danshipper/status/2062202908306030915) or [YouTube](https://www.youtube.com/watch?v=kYKebKB3-d0), or listen on [Spotify](https://open.spotify.com/episode/4qTiIlvhxgnGI0cG06aFw5?si=rUdSykRfRhmfQ4F7f5UJ0A&nd=1&dlsi=207e4630daf24e2b) or [Apple Podcasts](https://podcasts.apple.com/us/podcast/ai-i/id1719789201).

### Timestamps

1. Introduction: 00:01:03

2. The SaaSpocalypse narrative has it backwards: 00:02:15

3. Matt’s email-agent origin story: 00:05:27

4. Divergent vs. convergent design thinking: 00:13:21

5. Figma’s MCP server: 00:17:39

6. Why design agents need personalization: 00:19:45

7. Every problem is a context problem: 00:22:09

8. Apple and Google as the reigning kings of context: 00:25:12

9. Review is the new bottleneck: 00:28:18

### Transcript

(00:00:00)

**Matt Colyer**

The SaaSpocalypse—or, more positively, the next era of software. I’m really excited about it, because I think the number of developers in the world is about to go from tens of millions to a billion, maybe more. We’re moving through this incredible democratization of technology, and the end result is dramatically more software in the world. If you’re an established product in that space, it’s not a casualty—it’s a goldmine.

(00:01:03)

**Dan Shipper**

Matt, welcome to the show.

**Matt**

Thanks for having me, Dan.

**Dan Shipper**

For people who don’t know you, you are the director of product management for developers at Figma. I want to start with what I think is the big question on everyone’s mind. I bought a bunch of Figma stock about two months ago, partly because of this whole SaaS apocalypse narrative—and I want to get into that with you. You have a lot to share about AI and product management, all the stuff you’ve been doing yourself. But I’d love to start with: what is going to happen to SaaS tools in the AI era? Figma is a really interesting example, because there are people saying, “Oh, I don’t have to use Figma anymore”—and at the same time, you just launched an agent inside your product, and you have Figma MCP. So if you’re transitioning from a world where there was no AI when Figma started, to now being a big scaled product in an AI world—how does that work? How are you thinking about whether to open the product up to agents, build your own agent, what’s working, what’s not?

*(00:02:15)*

**Matt**

I’d love to talk about that. For me it comes from a couple of different angles. The first is the SaaSpocalypse—or, as a more positive framing, the next era of software. I’m really excited about it. I’ve worked in developer tools for a long time, and maybe five or ten years ago, the estimate for the number of developers worldwide was somewhere around 25 to 40 million. What’s most exciting about this moment is that I think it’s going to be a billion—maybe more than that. There’s this incredible democratization of technology happening. There’s a lot of catchphrases around homegrown software, and we can get into that. But the end result is that there is dramatically more software in the world. If you’re in that space, it means it’s a goldmine—there’s all this opportunity, and I’m really excited about it. Figma and a lot of other SaaS businesses are too.

The other part—responding to the more negative sentiment you see online—is the question of, well, what if I could just vibe-code every app? January of this year was the moment that narrative went mainstream. I’d been doing this stuff for probably 18 months before that, so I was already in “let’s go build everything” mode. But I feel like the whole world caught up in January, and people are building. What I know from my own personal journey is that it’s really fun to build the initial version. I actually built one of my own agents two years ago—the very first one was an email agent. It started as a terrible Python script, rickety, replies sometimes didn’t work.

The larger narrative here is that software companies build more than just code. There’s a reason I pay for Gmail to run my email—it turns out it’s pretty unpleasant when you have to worry about upgrading the SMTP version yourself and you just want to receive email. As I’ve run my own agents for my personal life, I’ve experienced the pain of: the product I want doesn’t exist, I built it, and now I own the ongoing cost of it. Honestly, I’m buying more software these days than I ever did before, because I’m like, “That tool seems useful. I’ll just pay somebody else to run my agent for me.”

*(00:04:48)*

**Dan **

I totally agree. As someone who has vibe-coded my fair share of tools—yes, there’s the personal maintenance burden, but also I’ve vibe-coded tools we’ve released into production, and let me tell you, it is not as simple as saying “fix this bug.” That’s really missed in the SaaSpocalypse discourse.

That said—if one of the first things you built was an email agent, I’m super curious how you’re managing email right now, because I feel like things have gotten to a point where you can just sort of do your email without actually doing your email.

*(00:05:27)*

**Matt**

Yeah. The problem that started two years ago: I was using chatbots at work, because at that point that was the primary interface—agent usage wasn’t really a thing yet. In my personal life, I have kids in three schools. If there are any parents listening, you know what it’s like to get the PTO emails—what’s the theme for today, what’s spirit day. The worst parent feeling in the world is missing crazy hair day because your kid didn’t do it. I’d done that more than once, and I was like: I cannot miss another one.

I had to track maybe 15 emails a day. You think corporate America produces a lot of email—wait until you get to the PTO emails from school. I thought: who can read all of these? Agents. Why can’t I just hook this up? The missing piece was the email inbox connection. So the first version was literally: grab the inbox, grab the top email, paste it to an LLM, dump the response back. My favorite prompt in those days was basically just “extract the facts”—and it was always shocking to me that I’d send a multi-page email and get three bullet points back.

Dan Shipper

I remember those days—the manual wiring-up and copy-pasting. It feels so far away, but it was only a year or two ago.

*(00:07:03)*

**Matt**

And then I added a memory system. The proactive piece—I think OpenAI’s Codex hit on this—was the real unlock. My version of it was having the agent send me a summary email every day at a set time. Instead of having to go to a tool and ask for the thing, it would just show up. Not because it was particularly smart—it just ran at the same time every day. But I think where agents are going is much more proactive than that: thinking about when to reach out and let you know what’s going on, without being asked.

**Dan**

So given where you were a couple of years ago—what are the workflow things you rely on now that you’re excited about?

**Matt**

One thing I’m still trying to figure out in my work life is summarization. Part of the job is understanding an immense amount of information and filtering it—teaching the agent which things matter and which don’t. It’s a genuinely hard problem, because there’s a lot of stuff that seems unimportant at first read and then matters three days later. How do you describe to a system which things are worth keeping?

*(00:08:36)*

**Dan**

It also feels like the agents are a little bit... one thing I do is have Codex go through all my company meetings—we record everything in Notion—and surface the things I might care about. Which is great, because I can effectively be in meetings I wasn’t in. But if it gives me stuff that’s not quite right and I correct it, it overcorrects—it gives me everything I said I wanted, way too literally and way too much. It’s never quite right in this weird way.

**Matt**

I was curious where you’re at on that, because it feels like one of the genuinely unsolved problems. We’re all grasping for it. Relatedly—with your email inbox, have you fully automated it? Does it reply on your behalf, or do you approve every reply?

*(00:09:30)*

**Dan**

I approve every reply. What I have is a small app I built in Codex that I open in the Codex in-app browser—it runs locally. Every day it sweeps through all my emails and gives me a page where every email is listed with a draft reply: here’s what I’m probably going to say. Because it has access to my computer, if it’s an email from my lawyers it can go search and come back with essentially what it thinks I should say. Then I just scroll through and talk to it using Monologue—I dictate: “No, fix this,” or “Yes, send that draft.” I’ve been at inbox zero for four straight weeks, which has never happened before. My assistant literally asked me what the hell was going on.

**Matt**

I am a member of the inbox zero religion. I’ve been running it for years and I believe in it—but it sure takes a lot of work. I’m curious about the Monologue thing. Do you actually talk to it, or do you type?

Dan Shipper

I talk to it. It’s audio only right now.

*(00:10:45)*

[PAYWALL]
