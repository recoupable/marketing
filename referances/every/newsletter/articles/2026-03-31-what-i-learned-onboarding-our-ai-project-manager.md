---
title: "What I Learned Onboarding Our AI Project Manager"
subtitle: "Claudie saves us 15 hours a week, but getting her up to speed was harder than hiring a human "
author: "Nityesh  Agarwal"
date: 2026-03-31
column: p
url: https://every.to/p/what-i-learned-onboarding-our-ai-project-manager
paywalled: true
scraped_at: 2026-06-11T16:07:19.500Z
---

# What I Learned Onboarding Our AI Project Manager

*Claudie saves us 15 hours a week, but getting her up to speed was harder than hiring a human *

*Was this newsletter forwarded to you? [Sign up](https://every.to/account) to get it in your inbox.*

---

Every’s consulting team is growing. Right now, we have two potential new hires in a trial period: Jean-Claude, who’d manage our sales pipeline, and Claudette, a visual designer.

You might be surprised to learn that they’re both AI agents. If they’re able to reliably do what we need them to and we bring them on full-time, our team will consist of four human and three agent employees.

Claudie, our first AI colleague, has been with us for two months. **[Natalia Quintero](https://every.to/@natalia_2944)**, Every’s head of consulting, and I rely on her to [track where every client project stands](https://every.to/podcast/everys-head-of-consulting-just-automated-her-job) and to make sure nothing falls through the cracks, work that saves the team 15 hours per week. It’s hard to imagine operations without her.

Getting her up to speed, however, was neither a seamless nor a linear process. That road is paved with previous iterations of Claudie we had to fire because they were not structured right.

Each Claudie revealed more about what it takes to get an agent to be a reliable co-worker—lessons that have only become more urgent as more companies deploy agents, creating what Every CEO **[Dan Shipper](https://every.to/@danshipper)** has called a [“parallel organization chart](https://every.to/on-every/introducing-plus-one-one-click-openclaw-agents-by-every)[”](%E2%80%9Cparallel%20organization%20chart%E2%80%9D) of AI colleagues, each with a name, manager, and real responsibilities. At Every, we’ve started helping others build the same setup through our hosted agents, called [Plus Ones](https://every.to/plus-one). Claudie was our crash course. Here’s what she helped us figure out.

## Define the job before you hire for it

Built in Claude Code—hence her name—Claudie was designed to handle administrative tasks that consumed too much of Natalia’s week. The albatross was maintaining the dashboard that shows the status of all our client work, which meant staying on top of a constant flood of information from Natalia’s email, Google Docs, Google Sheets, meeting transcripts, and her calendar. Before Claudie, Natalia was spending hours that could have been dedicated to strategy and client relations finding data across dozens of sources and manually copy and pasting it in the right tab.

The first step was to give Claudie access to various sources of information and ask her to gather everything she needed before making a single update to a client’s database, which required tracking a dizzying number of moving pieces: action items, client feedback, and names of employees who attended each client session, and on and on.

Claudie required lots of oversight at first. For example, she failed to input details discussed in client meetings and wasn’t presenting data the way we’d like—simple fixes once we realized she just needed access to Natalia’s meeting transcripts and a tool for creating pivot tables in Excel. Each time something went wrong, Natalia flagged it, and we dug in to diagnose the cause.

It’s an easy thing to overlook: Agents can only work with the context and tools you give them. Before you bring one onto your team, get specific about what they’ll be responsible for, and what information they’ll need to actually do the job.

## Understand how your agent does its best work

At first, we treated Claudie like any other new hire—telling her to find what needed updating and asking her to go do it. An experienced project manager would have hit the ground running. Claudie failed spectacularly.

The problem was the context window, or the maximum amount of text an LLM can access at one time. Claudie was trying to process too much, and information kept getting lost. So we broke Claudie into layers. We built a central orchestration agent that delegates to several fleets of subagents, each responsible for a discrete task: extracting data, identifying needed updates, and making those changes. Results improved but remained unreliable. Key dates regarding client sessions and discovery calls were frequently dropped altogether.

[PAYWALL]
