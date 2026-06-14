---
title: "Claude Code for Product Managers"
subtitle: "How one general manager runs a full product using AI for planning, monitoring, and research "
author: "Marcus Moretti"
date: 2026-05-01
column: source-code
url: https://every.to/source-code/claude-code-for-product-managers
paywalled: true
scraped_at: 2026-06-11T16:07:17.110Z
---

# Claude Code for Product Managers

*How one general manager runs a full product using AI for planning, monitoring, and research *

*This piece is an accompaniment to ****[Spiral](https://writewithspiral.com/)**** general manager ****[Marcus Moretti](https://every.to/@marcus_fd8302_1)***’*s guide for product management using Claude. [Read the full guide](https://every.to/guides/ai-product-management-guide) and the essay below to learn how he built a workflow that helps him run a full product as a solo practitioner. When you’re ready to get started yourself, [download the plugin](https://github.com/EveryInc/compound-engineering-plugin).—[Kate Lee](https://every.to/@kate_1767) *

[Read the AI-native product management guide](https://every.to/guides/ai-product-management-guide?source=post_button)

---

As the general manager of **[Spiral](https://writewithspiral.com/)**, Every’s AI writing partner, I’m a [“two-slice team.”](https://every.to/chain-of-thought/the-two-slice-team) I’m responsible for all aspects of a product: the code, customer support, marketing, and product management. I could not do this job without Claude.

Claude Code has eliminated the drudgery of product management. The busywork that used to happen across 10 different apps now happens in a single chat thread. I’ve come to view the work of product management through the lens of this conversation—the conversation is the work.

These days, I experience what’s left of product management work in flow state—thinking through gnarly design problems, looking at interesting data, and talking to customers. **Cat Wu**, Claude Code’s head of product, recently [said](https://youtu.be/PplmzlgE0kg?si=ysy0wvHkTVEkzYie&t=1092), “As code becomes much cheaper to write, the thing that becomes more valuable is deciding what to write.”

I wrote up the main skills that run my product management workflow [in a guide](https://every.to/guides/ai-product-management-guide). Below, I trace how I arrived at those skills and reflect on post-AI product management and software.

## Write the roadmap and nothing else

In my new role, the only product document I’ve written is the roadmap. Everything else—every PRD and every ticket—has been written by Claude.

Writing is thinking, so as a new general manager, I wanted to take my time drafting Spiral’s roadmap. I spent several days understanding the product, usage trends, user feedback, and the market. I wrote about the problem Spiral can solve, how Spiral can solve it, and the features we’d need to build to deliver on it. I spent hours talking to several people at the company who’d worked on previous versions of Spiral and were current or former users of it themselves. (In the guide, I talk about the new /ce:strategy skill in [compound engineering](https://github.com/EveryInc/compound-engineering-plugin) that interviews you to produce this document for your own product.)

After six drafts of the roadmap, I created a GitHub project and added it as the project’s [README](https://en.wikipedia.org/wiki/README). I’m already using GitHub to host all my code, so I figured I might as well use it for tickets as well, or as GitHub calls them, “issues.”

From there, I asked Claude to use the GitHub command line interface (CLI) to read the README and give feedback. We went back and forth on a few tweaks, and then I asked it to review the codebase and do a first pass of the tickets required to deliver the roadmap. Within a few minutes, Claude produced about 100 detailed tickets, each with strategic context, supporting data, acceptance criteria, and technical implementation notes.

To be fair, the roadmap I wrote was pretty detailed; Claude wasn’t hallucinating features. And it had access to a library of user feedback and recent usage reports (more on that below). But it was shocking to see something that had previously taken me days or weeks get done by Claude in minutes. It felt like the PM equivalent of vibe coding.

[PAYWALL]
