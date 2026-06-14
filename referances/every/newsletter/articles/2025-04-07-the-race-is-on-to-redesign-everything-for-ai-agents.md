---
title: "The Race Is On to Redesign Everything for AI Agents"
subtitle: "There are billion-dollar markets to be seized—if you can learn to see like an agent."
author: "Tina He"
date: 2025-04-07
column: thesis
url: https://every.to/thesis/the-race-is-on-to-redesign-everything-for-ai-agents
paywalled: true
scraped_at: 2026-06-11T16:07:46.085Z
---

# The Race Is On to Redesign Everything for AI Agents

*There are billion-dollar markets to be seized—if you can learn to see like an agent.*

***Tina He**** has always been able to see around corners, and as a *[writer](https://fakepixels.substack.com/)*, designer, and entrepreneur, she’s been actively involved in building the future. I met her when she was running Station Labs, which was building developer infrastructure for Web3 (and for which I did freelance content strategy). She’s now leading a team building [developer](https://every.to/c/ai-frontiers) tools at Base, which acquired Station last year. We’re delighted to feature her work in *[Thesis](https://every.to/thesis)*. In her piece, she explores a paradigm shift that she’s been witnessing first hand: AI agents are independently selecting vendors, negotiating deals, reading documentation, and writing code. So what happens when agents supplant humans as your primary users and customers? Read on to learn what she sees as the three critical dimensions to focus on that will help you succeed in building for AIs—and a roadmap to four billion-dollar opportunities in this emerging landscape.—*[Kate Lee](https://every.to/on-every/kate-lee-joins-every-as-editor-in-chief)* *

*Was this newsletter forwarded to you? *[Sign up](https://every.to/account)* to get it in your inbox.*

---

Last month, [I built an AI agent](https://x.com/fkpxls/status/1896627431215448121) and set it free to see if it can successfully integrate a tool for me. I’d worked on it and tested it extensively, so I had some idea of what to expect. But still, watching it read through documents for a new tool and then use what it learned to deploy code that actually worked—all on its own—was a heady moment. I thought:* We’ve got to start designing everything with agents in mind. *Because in addition to millions of humans, your customers will soon be *billions* of AIs that see the world in a totally different way.

Autonomous agents are already performing a range of business-critical roles. They [provide customer support](https://sierra.ai/product), [select vendors](https://glama.ai/mcp/servers), and [negotiate deals](https://pactum.com/). At [Base](https://www.base.org/builders), where I lead a team building tools for developers, I've witnessed this firsthand. We built developer tools for humans but found that coding agents were increasingly parsing our documentation—writing code themselves to help with tool integration. Soon, it will be commonplace for agents to work on their own like this, similar to how the one I built did. This demands we reconsider how we build, distribute, and engage with users—be they human or AI.

There are three key dimensions we need to focus on, each of which I’ll go into in detail below:

- Designing for agent interpretability

- Optimizing for what I call “agentic attention”

- Creating human-agent collaboration models

The stakes are tremendous, as is the opportunity: Fail to consider your product from the standpoint of an agent and your company risks becoming invisible to these new decision-makers. Do it right, however, and you’ll create brand-new, potentially multibillion-dollar markets for your product.

## Beyond user experience—to agent experience

[![](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3544/optimized_Computer.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3544/optimized_Computer.png)

*Source: Sarah Jay Halliday* *for Every.*

First and foremost are developer tools. When you’re designing tools for human developers, you have to think about usability, clarity, and reliability. You must offer documentation that people can read and understand easily, consistent APIs, and supportive communities that help people adopt and integrate your tools quickly.

Things look different when we know most of our users will be LLMs.

This shift is accelerating with the rise of Model Context Protocol (MCP) servers. MCP lets an LLM-based agent reach out beyond its usual knowledge and use special tools and fresh data from other sources. For example, ChatGPT normally can’t see real-time news, weather, or your calendar. But with MCP, it can check today's weather through a weather service, or use updated financial data from a financial platform.

MCP makes this possible by defining clear rules for how the model communicates with external tools and incorporates their responses back into conversations. This standardization is critical for the agent ecosystem, creating a common language for AI-to-service communication.

Alongside developer and user experience, a new discipline called [agent experience (AX)](https://resend.com/blog/agent-experience) has emerged. Netlify CEO **Mathias Biilmann **[defines it](https://biilmann.blog/articles/introducing-ax/) as "the holistic experience AI agents have as users of a product or platform."* *Great AX is when an agent performs a task exactly as you wanted it to, and can perform everything it needs to the first time it’s asked. The process also must be cost-effective, with no human intervention needed.

Achieving that goal takes careful consideration of several different criteria:

-
**Onboarding:** Agent onboarding involves verifying permissions, providing secure access tokens, and offering structured documentation that AI can interpret.

-
**Developer kits: **When building a software development kit (SDK) for humans, you focus on intuitive APIs, detailed error messages, and comprehensive examples that mirror real-world use cases. Agents, however, need standardized, machine-readable product descriptions, explicit instruction flows, and robust metadata so they can understand and take advantage of your tool’s functionality.

-
**Interactions and permissions:** You need to make sure that when an agent connects to your system, it can prove it’s a good actor, and that anything it does can be audited in case something goes wrong.

[PAYWALL]
