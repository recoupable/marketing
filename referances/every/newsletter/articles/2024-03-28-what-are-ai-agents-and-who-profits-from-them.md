---
title: "What Are AI Agents—And Who Profits From Them?"
subtitle: "The newest wave of AI research is changing everything"
author: "Evan Armstrong"
date: 2024-03-28
column: napkin-math
url: https://every.to/napkin-math/what-are-ai-agents-and-who-profits-from-them
paywalled: true
scraped_at: 2026-06-11T16:08:05.708Z
---

# What Are AI Agents—And Who Profits From Them?

*The newest wave of AI research is changing everything*

Most races have a prize pool. The New York City  marathon winner gets $100,000. 2023’s F1 winner took home a [$140 million pot](https://racingnews365.com/f1-hands-out-billion-dollar-prize-money-thats-how-much-red-bull-and-other-teams-get).

The winner of the race I’m going to describe will earn billions. Maybe tens of billions. They’ll bend the arc of the universe. They’ll materially increase GDP.

This is the race toward the AI agent. Agents are the next step in the AI race and the focus of every major tech company, research lab, and leading AI startup.

I’ve spent months talking with [founders](https://every.to/c/next-billion-dollar-company), investors, and scientists, trying to understand what this technology is and who the players are. Today, I’m going to share my findings. I’ll cover:

- What an AI agent is

- The major players

- The technical bets

- The future

Let’s get into it.

## What is an agentic workflow?

An AI agent is a type of model architecture that enables a new kind of workflow.

The AI we started with formulates an answer and returns it. Ask it something simple, like “Does an umbrella block the rain?” and GPT-4 returns the answer, “Of course it does, you dumbass.” The large language model is able to answer the question without relying on external data by using internal data and executes on the prompt without a plan. It's a straightforward line connecting input and output. And every time you want a new output, you have to provide a prompt.

Agentic workflows are *loops*—they can run many times in a row without needing a human involved for each step in the task. A language model will make a plan based on your prompt, utilize tools like a web browser to execute on that plan, ask itself if that answer is right, and close the loop by getting back to you with that answer. If you ask, “What is the weather in Boston for the next seven days, and will I need to pack an umbrella?” the agentic workflow would form a plan, use a web browsing tool to check the weather, and use its existing corpus of knowledge to know that if it is raining, you would need an umbrella. Then, it would check if its answers are right and, finally, say, “It’ll be raining (like it always does in Boston, you dumbass) so yes, pack an umbrella.”

What makes agentic workflows so powerful is that because there are multiple steps to accomplish the task, you can optimize each step to be more performative. Perhaps it is faster and/or cheaper to have one model do the planning, while smaller, more specialized models do each sub-task contained within the plan—or maybe you can build specialized tools to incorporate into the workflow. You get the idea.

But agentic workflows are an architecture, not a product. It gets even more complicated when you incorporate agents into products that customers will buy.

## Solving users problems > flashy demos

The only thing that matters in startups is solving customers’ problems. Agentic workflows are only useful as a product if they solve problems better than existing models. The tricky thing is that no one knows how to make AI agents a consistently better product right now. The pieces are all there, but no one has figured out how to put them all together.

This moment is strongly reminiscent of the early 1980s of personal computing, when Apple, Hewlett-Packard, and IBM were duking it out. They all had similar ideas about the user interface (the use of a mouse, the need to display applications, etc.), but the details of implementation were closely guarded secrets. These companies competed on the quality of their technical components and how each of those components fit together to solve customer problems.

Companies that make AI agents are also competing on both individual component quality and how these components are combined. In broad strokes, think of these arenas of competitive intensity scattered across five components:

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3020/optimized_7Y0Xmldx4yVNiOMZnMEKJBcUPWfXVy-SVd7Nv0iprW2FgdRcUFt1uitWQypwtbf6WSag8MxhneIots37AhlSFdvN70EJFPlio2LKeUjkm2ZxebOb7F9MVSRXXKINTv4GP15-jDpfNtVAnLqTiAclthY.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3020/optimized_7Y0Xmldx4yVNiOMZnMEKJBcUPWfXVy-SVd7Nv0iprW2FgdRcUFt1uitWQypwtbf6WSag8MxhneIots37AhlSFdvN70EJFPlio2LKeUjkm2ZxebOb7F9MVSRXXKINTv4GP15-jDpfNtVAnLqTiAclthY.png?link=true)

*Every illustration.*

1.
**Data inputs**: The agent needs access to unique data sets or be better able to parse public data sets (such as scraping the web). Where does the agent draw its data from? Can it access internal data repositories—note-taking systems for individuals or corporate knowledge bases for enterprise use cases—to make answers better?

2.
**Models: **For the past year, when you heard “AI” it typically meant this component—the large language models (LLMs) like GPT-4. Within the model companies like OpenAI, there are a variety of approaches that I’ll cover in a minute.

3.
**Tools: **Think of these like giving the handyman (an LLM) a [new set of screwdrivers](https://every.to/chain-of-thought/gpt-4-can-use-tools-now-that-s-a-big-deal?sid=39491). This is an area I’m excited about. In 2023, I used a tool from OpenAI called Code Interpreter that has been able to replace [many finance workflows](https://every.to/napkin-math/openai-s-code-interpreter-is-about-to-remake-finance). Code Interpreter provides the LLM with a coding environment that allows the LLM to modify spreadsheets.

4.
**Interface**: Knowing how to integrate these capabilities into a user’s workflow is just as important as—if not more than—what the agent can actually do. Is the agent nestled within a typical LLM chatbot? Is it operating behind the scenes as part of an application's code? Does the AI need to be in its own separate UI and app? Or should it be integrated into an existing workflow app like Salesforce or Excel?

5.
**AI glue: **This is my own term (you can tell because it sounds dumber than the rest), but in my interviews with founders building AI agent companies, the most common thing I heard was that “AI agents are an engineering problem, not an AI problem.” There is a sense that while each of the previous components is important, what matters is figuring out how to stick them all together. Glue is traditional, deterministic software that programs a set of logical steps.

[PAYWALL]
