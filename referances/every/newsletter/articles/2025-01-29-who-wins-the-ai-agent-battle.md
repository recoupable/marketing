---
title: "Who Wins the AI Agent Battle?"
subtitle: "What OpenAI’s Operator tells us about what comes next in artificial intelligence "
author: "Evan Armstrong"
date: 2025-01-29
column: napkin-math
url: https://every.to/napkin-math/who-wins-the-ai-agent-battle
paywalled: true
scraped_at: 2026-06-11T16:07:49.958Z
---

# Who Wins the AI Agent Battle?

*What OpenAI’s Operator tells us about what comes next in artificial intelligence *

*Was this newsletter forwarded to you? *[Sign up](https://every.to/account)* to get it in your inbox.*

---

Big tech has [agents](https://every.to/c/next-billion-dollar-company) on the brain.

At the World Economic Forum in Davos last week, OpenAI chief product officer Kevin Weil[argued](https://www.axios.com/2025/01/23/davos-2025-ai-agents) that 2025 was the year of the AI agent, the next evolution beyond the chatbot in which AI software goes out into the world and executes tasks on behalf of users. Meta CEO Mark Zuckerberg has predicted that the company will have an AI agent [with the skills](https://fortune.com/2025/01/24/mark-zuckerberg-ai-engineer-capex-spend/#:~:text=%E2%80%9CProbably%20in%202025%2C%20we%20at,Zuckerberg%20said%20in%20the%20interview.) of a “mid-level” engineer by the end of the year.

These forecasts are quickly becoming reality. Two days after Weil’s comment, OpenAI[released Operator](https://every.to/chain-of-thought/we-tried-openai-s-new-agent-here-s-what-we-found), the company’s first publicly available agent. Operator works by accessing a remote web browser. You give it a task and virtually watch over its shoulder within the ChatGPT interface as it completes that task. It could, say, make a restaurant reservation or [fix your code](https://x.com/kieranklaassen/status/1882585726560469173). OpenAI isn’t first to market: There are more than a[dozen competitors](https://x.com/johnrushx/status/1883872258319687942) offering a similar product. But OpenAI is the biggest game in town, boasting [300 million](https://www.theinformation.com/briefings/openai-surpasses-300-million-weekly-active-users?rc=fy9sio) weekly active users.

If agents fulfill the promise that Silicon Valley has made, then we are in for a dramatic reinvention of both knowledge work and busy work over the next year. But first we need to answer a really important question: What is an AI agent? And from there we need to establish how these products will work—and which companies will dominate with them.

## Defining agents

Here’s a boring, technical definition: An AI agent is a type of model architecture that enables a new kind of workflow.

The [AI architecture](https://every.to/napkin-math/what-are-ai-agents-and-who-profits-from-them) that has underpinned ChatGPT takes a command, formulates a response, and returns it. Ask it something simple, like, “Does an umbrella block the rain?” and GPT-4o returns the answer, “Of course it does, dumbass.” The large language model answers the question using its own internal data—its training set and the prompt you’ve fed it. It’s a straightforward, linear workflow: Enter one prompt, receive on output.

By contrast, agentic workflows are loops—they can run many times in a row without needing a human involved for each step in the task. A language model will make a plan based on your prompt, utilize tools like a web browser to execute on that plan, ask itself if that answer is right, and close the loop by getting back to you. If you ask, “What is the weather in Boston for the next seven days, and will I need to pack an umbrella?” an agent would form a plan, use a web browsing tool to check the weather, and apply its existing corpus of knowledge to know that if it’s raining, you would need an umbrella. After that, it would check if its answers are right and finally say, “It’ll be raining (like it always does in Boston, you dumbass) so, yes, pack an umbrella.” Here, one input elicits multiple actions by the model. You’re not starting a call-and-response, you’re conducting an orchestra.

Agentic workflows are so powerful because there are multiple steps to accomplish the task, each of which you can optimize to be more performative. Perhaps it is faster and/or cheaper for one model to do the planning and smaller, specialized models handle each sub-task contained within the plan. Or maybe you build specialized tools to incorporate into the workflow. You get the idea.

With the release of Operator, two new dimensions of agents were thrown into sharp relief:

1. The context the agent has, and

2. The user interface that can oversee the agent.

## Context is king

If you ever worked with someone who doesn’t share your native language, you know that sometimes requests get lost in translation and you end up with something different than what you asked for. Whether due to cultural differences or language confusion, the end result requires tweaking.

It’s the same way with agents. Their success is contingent on them having the right context for the task. After all, their first language isn’t English—it’s math. To get an agent to accomplish a task, you need to give it examples of what success looks like.

Here’s an example: If you ask a generalist model like GPT-4o, “Turn this essay into a tweet,” it will almost certainly give you something with emojis, hashtags, and sloppy writing. If you prompt, “Give me a tweet in the style of [insert your favorite X account here],” you’ll typically get a better output. If you give 5–10 examples of tweets in the style you are looking for, you’ll get something much closer to the mark.

You’re feeding it “cultural context.” The model doesn’t know what it is seeing, but it is an amazing pattern matcher. Writing is an exceptionally challenging task to complete with AI because there are thousands of subtle things that go into crafting a sentence. (If you want to learn how, I’m teaching a course on[How to Write With AI](https://www.writewithai.xyz/). Registration closes soon, so [act quickly](https://writewithai.xyz/) if you want to join).

This context problem is compounded when you move from simple generation to AI agents having permission to take action. So when we consider who has a winning AI agent, the first box to check is context. Does the agent have easy access to enough examples and data so that it can complete the task?

You can visualize agents on a spectrum. On the left-hand side is “vertical task automation,” and on the right is “horizontal selling of AI agents.” A vertical work application automates a variety of tasks within one industry—think AI agents drafting legal documents, such as[Harvey](https://news.bloomberglaw.com/business-and-practice/ai-startup-harvey-seeking-all-sorts-of-lawyers-in-hiring-spree). In the middle are AI agents geared toward one task, such as software engineering.[Cognition Labs](https://www.cognition-labs.com/), the maker of Devin, focuses on performing one large task—writing code—that cuts across many industries. On the far right are companies that sell AI agents as a service. You pay to access AI agents that can do a variety of horizontal tasks, like calendaring, note-taking, or making a PDF summary.[Lindy](https://www.lindy.ai/), which offers a tool that has dozens of AI agents, is an example of this kind of company.

[PAYWALL]
