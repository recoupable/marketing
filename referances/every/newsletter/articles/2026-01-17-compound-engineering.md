---
title: "Compound Engineering"
subtitle: "The AI-native engineering philosophy"
author: "Kieran Klaassen, Claude , GPT "
date: 2026-01-17
column: guides
url: https://every.to/guides/compound-engineering
paywalled: true
layout: special
scraped_at: 2026-06-11T16:07:25.246Z
---

# Compound Engineering

*The AI-native engineering philosophy*

## The philosophy

The core philosophy of compound engineering is that each unit of engineering work should make subsequent units easier—not harder.
Most codebases get harder to work with over time because each feature you add injects more complexity. After 10 years, teams spend more time fighting their system than building on it because each new feature is a negotiation with the old ones. Over time, the codebase becomes harder to understand, harder to modify, and harder to trust.
Compound engineering flips this on its head. Instead of features adding complexity and fragility, they teach the system new capabilities. Bug fixes eliminate entire categories of future bugs. When they are codified, patterns become tools for future work. Over time, the codebase becomes easier to understand, easier to modify, and easier to trust.

## The main loop

Every runs six products—Cora, **[Monologue](https://www.monologue.to/)**, **[Proof](https://www.proofeditor.ai/)**, **[Sparkle](https://makeitsparkle.co/)**, **[Spiral](https://writewithspiral.com/)**, and our website [Every.to](http://every.to)—with primarily single-person engineering teams. The system that makes this possible is a seven-step loop that forms the basis of compound engineering:

### Ideate → brainstorm → plan → work → review → polish → compound → repeat

The loop separates work into three phases. At the beginning, a human decides what is worth building. In the middle, the agent plans, codes, tests, reviews, and prepares the pull request. At the end, a human judges whether the result is good enough for users and whether the system learned anything reusable.
Use whichever steps that fit the task. If you already know what to build, skip ideation. If the bug is obvious, go straight to debug. If the change is on the backend, polish may be light.
The goal is to move your effort to the highest-leverage decisions and make the system remember those decisions next time.

### 1. Ideate

Ideation turns ambiguity into a shortlist of product options. Use /ce-ideate when you need to decide what is worth building:

-
**Frame the search. **Which product area, user pain point, backlog item, or strategic question should the agent explore?

-
**Point it at sources. **Should it inspect the repository, GitHub issues, support tickets, Slack, research notes, usage data, or a specific feature area?

-
**Generate broadly.** What ideas come up when the agent looks at the problem from different angles—what’s causing friction, what could be removed, automated, simplified, or expanded?

-
**Score candidates.** Which ideas are we most confident about, will have the highest impact, and are also the least complicated to build?

-
**Choose survivors. **Which ideas deserve a focused brainstorm?

### 2. Brainstorm

Brainstorming turns a promising idea into concrete requirements. Use /ce-brainstorm when the idea is real enough to explore and still needs sharper edges:

-
**Define the user. **Who is this for, and what are they trying to do?

-
**Name the problem.** What pain point, opportunity, or failure mode are we solving?

-
**Set constraints**. Which technical, product, design, data, or business constraints bound the solution?

-
**Identify edge cases.** Where could the feature break, confuse users, or create downstream risk?

-
**Define success.** What should be true when the work is done?

-
**Write the artifact. **Save the brainstorm in the product section of the spec.

### 3. Plan

Planning transforms an idea into a blueprint, and better plans produce better results. Use `/ce-plan` when you want AI to:

-
**Understand the requirements.** What’s being built? Why? What constraints exist?

-
**Research the codebase.** How does similar functionality work? What patterns exist?

-
**Research externally.** What are the established best practices? If using existing frameworks, what does their documentation say?

-
**Design the solution.** What’s the approach? Which files need to change?

-
**Validate the plan.** Does it fully address the requirements?

### 4. Work

Execution follows the plan. `/ce-work` has the agent implement. Within this step, there are a few smaller tasks:

-
**Set up isolation.** Git worktrees (isolated copies of your repository) or branches keep work separate.

-
**Execute the plan.** The agent implements step by step.

-
**Run validations.** Run tests, linting (automated code checking), and type checking after each change.

-
**Track progress.** Check what work has been done, and what remains.

-
**Handle issues.** When something breaks, adapt the plan.

If you trust the plan, there’s no need to watch every line of code.

### 5. Review (assess)

Review catches issues before they ship. More importantly, it captures learnings for the next cycle—the basis for compound engineering. `/ce-review` walks through these steps in order:

-
**Have multiple agents review the output.** Multiple specialized reviewers examine the code in parallel.

-
**Prioritize findings.** Findings are marked P1 (must fix), P2 (should fix), or P3 (nice to fix).

-
**Resolve findings.** The agent fixes issues based on review feedback.

-
**Validate fixes.** Each fix is confirmed to be correct and complete.

-
**Capture patterns.** What went wrong is documented to prevent recurrence.

### 6. Polish

Polish turns working software into something that feels right. Use `/ce-polish-beta` when the PR (pull request) exists and the product needs a hands-on evaluation:

-
**Start the app. **Have the agent start the development server, find the right code branch, and open the relevant screen.

-
**Click through the flow. **Use the product the way a real user would.

-
**Look for what feels wrong. **Check speed, animation, copy, empty states, visual glitches, scroll behavior, and confusing transitions.

-
**Queue fixes. **Tell the agent what feels wrong and let it make the next pass while you keep testing.

-
**Judge readiness. **Decide whether the experience is good enough to put in front of a user.

### 7. Compound (the most important step)

Traditional development stops at step seven, but the compound step is where the gains are to be made. The previous steps (ideate, brainstorm, plan, work, review, and polish) produce a feature. The last step produces a system that builds features better each time.
In this final step, these are the actions you should take:

-
**Capture the solution.** Ask yourself: What worked? What didn’t? What’s the reusable insight?

-
**Make it findable.** Add YAML frontmatter to make sure it is tagged with the right metadata, tags, and categories for retrieval.

-
**Update the system.** Add new patterns into `CLAUDE.md`, the file the agent reads at the start of every session. Create new agents when warranted.

**Verify the learning.** Ask yourself: Would the system catch this automatically next time?

## The plugin

The compound engineering workflow ships as a plugin. Install it, and the full system is ready to use.

#### What’s in the box

-
**40+ specialized agents. **Each agent is trained for a specific job.

-
**30+ slash entry points. **These include the main loop, setup, testing, PR feedback, optimization, release notes, and utilities.

-
**35+ skills. **These provide workflow orchestration and domain expertise, such as [agent-native architecture](https://every.to/guides/agent-native), frontend design, Rails-specific styles, document review, and compound learning.

## Installation

Below are instructions for adding the plugin to some of the most common AI coding tools.

#### Claude Code

```
/plugin marketplace add EveryInc/compound-engineering-plugin
/plugin install compound-engineering
```

#### Cursor

In Cursor Agent chat, install from the plugin marketplace:

```
/add-plugin compound-engineering
```

Or search for “compound engineering” in the plugin marketplace.

#### Codex

Three steps: register the marketplace, install the agent set, then install the plugin through Codex’s TUI.

1. Register the marketplace with Codex:

2. `codex plugin marketplace add EveryInc/compound-engineering-plugin`

3. Install the Compound Engineering agents (Codex’s plugin spec does not register custom agents yet):

4. `bunx @every-env/compound-plugin install compound-engineering --to codex`

5. Install the plugin through Codex’s TUI: launch codex, run `/plugins`, find the Compound Engineering marketplace, select the compound-engineering plugin, and choose Install. Restart Codex after install completes. Codex’s CLI can register marketplaces, but it does not currently expose a plugin-install subcommand for plugins from an added marketplace—the `/plugins` TUI install is required for CE skills.

All three steps are needed. The marketplace registration plus TUI install handles skills; the Bun step adds the review, research, and workflow agents that skills like `$ce-code-review`, `$ce-plan`, and `$ce-work` spawn in Codex. Without the agent step, delegating skills will report missing agents.
For a non-default Codex profile, run every Codex-related step against the same `CODEX_HOME`. This example installs CE into a work profile:

```
CODEX_HOME=“$HOME/.codex/profiles/work” codex plugin marketplace add EveryInc/compound-engineering-plugin
CODEX_HOME=“$HOME/.codex/profiles/work” bunx @every-env/compound-plugin install compound-engineering --to codex
CODEX_HOME=“$HOME/.codex/profiles/work” codex
```

Inside Codex, run `/plugins`, select Compound Engineering, then install compound-engineering. The marketplace step only makes the plugin available; the TUI install is what activates the native CE skills for that profile.
For local development from this checkout, register the current worktree and use the local CLI:

```
CODEX_HOME=“$HOME/.codex/profiles/work” codex plugin marketplace add “$PWD”
CODEX_HOME=“$HOME/.codex/profiles/work” bun run src/index.ts install ./plugins/compound-engineering --to codex
CODEX_HOME=“$HOME/.codex/profiles/work” codex
```

Heads up: once Codex’s native plugin spec supports custom agents, the Bun agent step goes away. The TUI install alone will be sufficient.
If you previously used the Bun-only Codex install, back up stale CE artifacts before switching:

```
bunx @every-env/compound-plugin cleanup --target codex
```

For other tools like GitHub Copilot, Factory Droid, Qwen Code, OpenCode, Pi, Gemini, and Kiro, [read the documentation on GitHub](https://github.com/EveryInc/compound-engineering-plugin).

### Where things live

The plugin creates and uses these directories in your project:

```
your-project/
├── AGENTS.md or CLAUDE.md # Agent instructions, preferences, and patterns
├── .compound-engineering/
│ └── config.local.yaml # Optional project config created/used by /ce-setup
├── .claude/
│ └── launch.json # Optional dev-server config used by /ce-polish-beta
└── docs/
├── brainstorms/ # /ce-brainstorm output: requirements docs
├── plans/ # /ce-plan output: implementation plans
└── solutions/ # /ce-compound output: categories automatically created to match problems
├── performance-issues/
├── security-issues/
├── database-issues/
├── integration-issues/
├── architecture-patterns/
├── design-patterns/
├── conventions/
└── best-practices/
```

`AGENTS.md`—or** **`CLAUDE.md` if you’re using Claude Code**—**is the most important file the agent reads every session. Put your preferences, patterns, and project context here. When something goes wrong, add a note so the agent learns.
docs/brainstorms/** **stores requirements documents from `/ce-brainstorm`. These capture the product side of the spec: user problem, constraints, scope, success criteria, and open questions.
docs/plans/ stores implementation plans from `/ce-plan`. These capture the technical side of the spec: affected files, sequencing, validation strategy, risks, and decisions.
docs/solutions/** **builds your institutional knowledge because each solved problem becomes searchable documentation. Future sessions can find past solutions automatically.
`/ce-code-review`** **outputs findings in the review report and writes temporary run artifacts to `/tmp/compound-engineering/ce-code-review/<run-id>/`. If findings should survive beyond the session, the agent can file them to the project’s configured tracker, such as Linear or GitHub Issues.

### Plugin structure

The plugin itself is organized around agents and skills:

```
plugins/compound-engineering/
├── .claude-plugin/ # manifest (also .codex-plugin/, .cursor-plugin/)
├── agents/ # 43 subagents, plain *.md
│ ├── ce-*-reviewer.md # ~23 review lenses: security, performance,
│ │ # correctness, testing, design, scope, api…
│ ├── ce-*-researcher.md # repo, web, docs, slack, learnings
│ ├── ce-*-analyst.md # issue-intelligence, spec-flow, git-history
│ ├── ce-*-oracle/-guardian/-sentinel/-strategist.md
│ │ # deep-domain specialists
│ └── ce-design-iterator.md, ce-figma-design-sync.md # designers
│
└── skills/ # 38 skills, each a dir w/ SKILL.md
├── ce-ideate/
├── ce-brainstorm/
├── ce-plan/
├── ce-work/
├── ce-work-beta/
├── ce-debug/
├── ce-code-review/
├── ce-doc-review/
├── ce-simplify-code/
├── ce-compound/
├── ce-compound-refresh/
├── ce-optimize/
├── ce-strategy/
├── ce-commit/
├── ce-commit-push-pr/
├── ce-worktree/
├── ce-clean-gone-branches/
├── ce-test-browser/
├── ce-test-xcode/
├── ce-demo-reel/
├── ce-resolve-pr-feedback/
├── ce-polish-beta/
├── ce-dogfood-beta/
├── ce-product-pulse/
├── ce-report-bug/
├── ce-frontend-design/
├── ce-gemini-imagegen/
├── ce-proof/
├── ce-release-notes/
├── ce-agent-native-architecture/
├── ce-agent-native-audit/
├── ce-dhh-rails-style/
├── ce-sessions/
├── ce-slack-research/
├── ce-riffrec-feedback-analysis/
├── ce-setup/
├── ce-update/
└── lfg/
```

## Core commands

### /ce-ideate

When the next move is unclear, start with `/ce-ideate`.

```
/ce-ideate Where are users hitting the most friction, and what could we ship to fix it?
```

It acts like an ideation room full of agents. It can look at the codebase, inspect issues, analyze recurring pain, generate ideas through different frames, score them, reject weak ones, and return a smaller set of candidates worth exploring.
Use it for roadmap planning, backlog mining, UX improvement ideas, automation opportunities, and “what should we build next?” sessions.

### /ce-brainstorm

When you’re not sure what to build, start here.

```
/ce-brainstorm Add user notifications
```

This command helps you brainstorm answers about what to build and plan answers for how to build them. Use this when requirements are fuzzy. The command runs lightweight repo research, then asks questions one at a time to clarify purpose, users, constraints, and edge cases. The AI then proposes two to three approaches with pros and cons. Decisions are captured in `docs/brainstorms/` for handoff to `/ce-plan`.

### /ce-plan

Describe what you want; get back a plan for how to build it.

```
/ce-plan Add email notifications when users receive new comments
```

This command spawns three parallel research agents: repo-research-analyst (codebase patterns), framework-docs-researcher (documentation), and best-practices-researcher (industry standards). Then the spec-flow-analyzer agent analyzes user flows and edge cases. Results are merged into a structured plan with affected files and implementation steps.

### /ce-work

This is where the agent actually writes the code.

```
/ce-work
```

Runs in four phases: quick start (creates a git worktree—an isolated copy of your repo for parallel work—and sets up branch), execute (implements each task with progress tracking), quality check (optionally spawns over five reviewer agents—Rails, TypeScript, security, performance), and ship it (runs linting, creates PR). Each phase has clear entry and exit criteria.

### /ce-code-review

Get your PR reviewed by a dozen specialized agents at once.

```
/ce-code-review PR#123
```

`/ce-code-review` runs specialized review agents in parallel and returns prioritized findings. Review agents can look for security risks, performance problems, data integrity issues, architecture problems, test gaps, migration safety, framework convention violations, and project-standard drift.

#### Review agents

The review system is built from specialized agents, and the orchestrator chooses the right team for each pull request. Some agents run on every review; others are selected based on the diff.
Always-on reviewers:

-
**Correctness reviewer.** Looks for logic errors, edge cases, state bugs, error propagation, and intent mismatches.

-
**Testing reviewer. **Looks for coverage gaps, weak assertions, brittle tests, and missing edge case tests.

-
**Maintainability reviewer. **Looks for coupling, complexity, naming issues, dead code, and premature abstraction.

-
**Project standards reviewer. **Checks compliance with `CLAUDE.md`, `AGENTS.md`, naming, references, tool choices, and project conventions.

-
**Agent-native reviewer. **Checks whether new features are accessible to future agents.

-
**Learnings researcher. **Searches prior compound notes for relevant past issues, patterns, and solutions.

Conditional reviewers:

-
**Security reviewer. **Runs when a diff touches auth, public endpoints, user input, permissions, or secrets.

-
**Performance reviewer. **Runs when a diff touches database queries, caching, loops, async code, or expensive data transformations.

-
**API contract reviewer.** Runs when a diff changes routes, serializers, event schemas, exported types, or versioned interfaces.

-
**Data migrations reviewer.** Runs when a diff touches migrations, schema changes, backfills, or data transformations.

-
**Reliability reviewer.** Runs when a diff touches retries, timeouts, background jobs, error handling, health checks, or async handlers.

-
**Adversarial reviewer.** Runs for high-risk or large diffs and tries to break the implementation across component boundaries.

-
**CLI readiness reviewer.** Runs when a diff touches CLI commands, argument parsing, or command handlers.

-
**Previous comments reviewer.** Runs on PRs with existing review threads so earlier feedback is not lost.

Stack-specific reviewers:

-
**Rails reviewers.** Apply Rails-specific judgment on architecture, controllers, models, views, jobs, routes, Hotwire boundaries, and service object choices.

-
**Python reviewer.** Reviews Python modules, endpoints, services, scripts, and typed domain code.

-
**TypeScript reviewer.** Reviews TypeScript components, hooks, services, utilities, and shared types.

-
**Frontend races reviewer**. Looks for race conditions in Stimulus, Turbo, DOM event wiring, timers, animations, and async UI flows.

-
**Swift/iOS reviewer. **Reviews Swift, SwiftUI, UIKit, Core Data, privacy manifests, entitlements, packages, and relevant Xcode project changes.

Migration-specific agents:

-
**Schema drift detector.** Cross-references schema changes against included migrations to catch unrelated drift.

-
**Deployment verification agent.** Produces Go/No-Go deployment checklists, SQL verification queries, and rollback procedures for risky data changes.

### /ce-compound

This command documents a solved problem for future reference.

```
/ce-compound
```

This command spawns six parallel subagents: context analyzer (understands the problem), solution extractor (captures what worked), related docs finder (links to existing knowledge), prevention strategist (documents how to avoid recurrence), category classifier (tags for discovery), and documentation writer (formats the final doc). It creates a searchable markdown with YAML frontmatter that future sessions can find.

### /ce-compound-refresh

Your `CLAUDE.md` file may become out of date as your needs, taste, and tech stack change. `/ce-compound-refresh` It looks for stale, duplicate, overlapping, or obsolete learnings and decides whether to keep, update, merge, replace, or archive them.

### /lfg

With this command, you describe the feature, and the agent does the rest—planning, building, reviewing, and handing you a PR ready to merge.

```
/lfg Add dark mode toggle to settings page
```

This chains the autonomous middle of the workflow: plan → work → code review with autofix → persist review fixes → hand off residual findings → browser tests → commit, push, and open a PR. The plan step runs first and must produce a written plan before implementation begins. From there, `/lfg` runs without stopping for interactive decisions, using the plugin’s skills and review agents to move a feature toward a complete pull request.

## Beliefs to let go

We have all been trained to believe certain things about software development. With improvements in AI tools, some of those beliefs are now obstacles. Here are eight of them to unlearn:

#### ‘The code must be written by hand’

The actual requirement for you to do your job well as a software engineer is simply to write good code, which can be defined as clean, tested, maintainable code that solves the right problem. Who types—a human or an agent—doesn’t matter.

#### ‘Every line must be manually reviewed’

Again, a core requirement to be a good engineer is to write quality code. Manual line-by-line review is one method to get there, but so are automated systems that catch the same issues. One reason that developers still find themselves relying on manual review is that they don’t trust the results. If you don’t trust the results, fix the system, instead of compensating by doing everything yourself.

#### ‘Solutions must originate from the engineer’

When AI can research approaches, analyze tradeoffs, and recommend options, the engineer’s job becomes to add taste—knowing which solution fits this codebase, this team, and this context.

#### ‘Code is the primary artifact’

A system that produces code is more valuable than any individual piece of code. A single brilliant implementation matters less than a process that consistently produces good implementations.

#### ‘Writing code is the core job function’

A developer’s job is ship value. Code is just one input in that job—planning, reviewing, and teaching the system all count too. Effective compound engineers write less code than before and ship more.

#### ‘First attempts should be good’

In our experience, first attempts have a 95 percent garbage rate. Second attempts are still 50 percent. This isn’t failure—it’s the process.
Expecting perfection on attempt one is like expecting a junior developer to nail a complex feature without context. So make it your goal to get it right the first time. Focus on iterating fast enough that your third attempt lands in less time than attempt one.

#### ‘Code is self-expression’

Developers subconsciously see AI-assisted development as an attack on their identity. It feels like a blow to the ego.
But the code was never really yours. It belongs to the team, the product, and the users. Letting go of code as self-expression is liberating. No attachment means you take feedback better, refactor without flinching, and skip the arguments about whether the code is good enough.

#### ‘More typing equals more learning’

Many developers fear that by not typing it, they’re not learning it. It’s as if they’re afraid that competence is draining out of their fingers. However, the reality is that understanding matters more than muscle memory today. You learn and build understanding by reviewing, by catching mistakes, and by knowing when the AI is wrong. The developer who reviews 10 AI implementations understands more patterns than the one who hand-typed two.

#### ‘The code is what matters’

Code used to be the most visible artifact of engineering work. In an AI-native workflow, that is less true. The code still matters, but the more valuable artifact is the system that produces it: the plans, patterns, tests, agents, reviews, and feedback loops that make good implementations repeatable.

#### ‘Engineering thinking is separate from product thinking’

Coding and product management used to be distinct disciplines. AI brings them closer together because with AI taking on more of the code creation, your job shifts to deciding what to build. This requires expanding your thinking toward product judgment: understanding the user, choosing the right problem, shaping the interaction, and deciding whether the output is good enough to ship.

#### Transition challenges

Three psychological barriers consistently derail developers who are adopting the compound engineering workflow.
**Less typing feels like less work.** It isn’t. Directing an agent requires more thinking than implementation because you are spending less time on keystrokes and more time thinking about important decisions.
**Letting go feels risky.** Autonomous execution—handing things over to agents—triggers anxiety in many developers. This fades once they recognize they’re not ceding control. Instead, they’re encoding it into constraints, conventions, and review processes that scale better than manual oversight.
**Who built this?** Features shipping without directly writing the code can feel like cheating. But planning, reviewing, and ensuring quality standards *is* the work. You did the thinking. All the AI did was the writing.
These reactions indicate a fundamental shift in how work gets done, and they’re expected. By talking about them openly at Every, we hope to make it easier for others to speak about their experiences.

---

## Beliefs to adopt

#### Extract your taste into the system

Every codebase reflects the taste of the developers who built it, from naming conventions to error handling patterns and testing approaches. That taste usually isn’t documented anywhere. It lives in senior engineers’ heads and is transferred through code review. This neither scales nor lets others on the team learn.
The solution is to extract and document these choices. Write these preferences down in `CLAUDE.md` or `AGENTS.md` so the agent reads it every session. Build specialized agents for reviewing, testing, and deploying, as well as skills that reflect your taste. Add slash commands that encode your preferred approaches. Point the agent at your existing style guides, architecture docs, and decision records, which all include examples of the way that you like to build.
Once the AI understands how *you* like to write code, it’ll produce code you actually approve instead of code you have to fix.

#### The 50/50 rule

Previously, I suggested an 80/20 rule for building features: 80 percent of time planning and review, 20 percent on working and compounding. When you look at your broader responsibilities as a developer, you should allocate 50 percent of engineering time to building features, and 50 percent to improving the system—in other words, any work that helps build institutional knowledge rather than shipping something specific.
In traditional engineering, teams put 90 percent of their time into features and 10 percent into everything else. Work that isn’t a feature feels like a distraction—something you do when you have spare time, which you never do. But that “everything else” is what makes future features easier: things like creating review agents, documenting patterns, and building test generators. When you treat that work as overhead instead of an investment, the codebase accumulates debt.
An hour spent creating a review agent saves 10 hours of review over the next year. You can spend time building a test generator that saves weeks of manual test writing. System improvements make work progressively faster and easier, but feature work doesn’t.

#### Trust the process, build safety nets

AI assistance doesn’t scale if every line requires human review. You need to trust the AI. Trust doesn’t mean blind faith. It means setting up guardrails such as tests, automatic review, and monitoring, that flag issues so that you don’t have to watch every step.
When you feel as if you can’t trust the output, don’t compensate by switching to manually reviewing the code. Add a system that makes that step trustworthy, such as creating a review agent that flags issues.

#### Make your environment agent-native

If a developer can see or do something, the agent should be allowed to see or do it too.

- Running tests

- Checking production logs

- Debugging with screenshots

- Creating pull requests

Anything that you don’t let the agent handle, you have to do yourself manually. The goal should be full environmental parity between human and AI developers.

#### Parallelization is your friend

You used to be the bottleneck because human attention only allows a person to focus on one task at a time. The new bottleneck is compute—in other words, how many agents you can run at once. Embrace this new capability. Run multiple agents and multiple features at the same time. Perform review, testing, and documentation all at once. Parallelization is your friend.
When you are stuck on one task, start another, and let agents work while planning the next step.

#### Plans are the new code

The plan document is now the most important thing you produce. Instead of coding first and documenting later, as you might have traditionally, start with a plan. This becomes the source of truth your agents use to generate, test, and validate code.
Having a plan helps capture decisions before they become bugs. Fixing ideas on paper is cheaper than fixing code later.

#### ‘Engineers are product people now’

As AI makes implementation faster, choosing what to build becomes more important. Engineers should spend more time understanding users, defining the problem, and deciding what matters. The best engineer is the person who gives the system the best direction.

#### ‘Understand the problem before you build’

When agents can move quickly, unclear thinking gets expensive, fast. If the problem is wrong, the system will faithfully produce the wrong thing. Spend the time upfront. Talk to users. Study the behavior. The better you understand the problem, the better the agent can build.

#### ‘Let agents work while you are away’

You don’t have to babysit your models. Use agent orchestration systems that can run for hours, overnight, or while you are doing something else. A good system can research, plan, implement, review, test, and come back with a useful artifact. Your job is to set the direction, give it enough context, and build the verification loops that make you trust the result.

### Core principles

In summary, the beliefs that underpin this new approach to software development are:

-
**Every unit of work makes subsequent work easier.** Code, documentation, and tooling should build on each other and make future work faster, not slower.

-
**Taste belongs in systems, not in review.** Bake your judgment into configuration, schemas, and automated checks. If you don’t you’ll be spending time manually checking, which does not scale.

-
**Teach the system, don’t do the work yourself.** Time spent giving agents more context pays exponential dividends, but time spent typing code only solves the task in front of you.

-
**Build safety nets, not review processes.** The way to build trust in building with AI is by building verification infrastructure, not by gatekeeping manually at every step.

-
**Make environments agent-native.** Structure projects so AI agents can navigate, understand, and modify them autonomously.

-
**Apply compound thinking everywhere.** Every artifact—code, docs, tests, prompts—should enable the next iteration to move faster.

-
**Embrace the discomfort of letting go.** When you delegate to AI tools, you have to be okay with imperfect results that scale, rather than perfect results that don’t.

-
**Ship more value. Type less code.** Your output should be measured by the number of problems solved, not the number of keystrokes you logged.

-
**Assign outcomes, not tasks. **Don’t use agents as glorified auto-completers. Give them actual outcomes: Research this area, write the plan, implement the feature, review the PR, test the flow, summarize what changed.

-
**Use long-running orchestration. **Some AI work should happen while you are away. For bigger jobs, use the LFG method: Give the system the goal, context, constraints, and verification path, then let it plan, build, review, and come back with an artifact, however long it takes.

-
**Capture golden user data. **The system needs a steady source of truth about what users need. Make it easy to capture data directly from users, including feedback, support tickets, research notes, usage patterns, screenshots, transcripts, and your own observations from using the product.

The principles extend beyond engineering to design, research, or even writing—any discipline where codifying taste and context help make future work go faster and easier. The steps are the same: Plan, execute, review, compound.

## Getting started

The compound engineering loop—ideate, brainstorm, plan, work, debug, polish, review, compound—is the process. But how much of that process you allow the AI to own depends on where you are in your familiarity and aptitude with AI. There are five stages against which developers can plot themselves to understand where they sit.
Most developers who struggle with AI-assisted development don’t know where they are on this ladder. They hear about multi-agent review systems and parallel cloud execution, feel overwhelmed, and either give up or try to skip ahead. Skipping stages doesn’t work because you will feel uncomfortable and distrustful of the tools. Each rung builds the mental models and habits required for the next. So slow down, figure out where you are, and focus on building from there.

### The stages

#### Stage 0: Manual development

At this stage, you are writing code line by line without any AI. You perform research via documentation and Stack Overflow. Your debugging process happens through code reading and print statements. Manual development built great software for decades, but sadly it’s not fast enough in 2026.

#### Stage 1: Chat-based assistance

At this stage, you are using AI as a smart reference tool, querying ChatGPT, Claude, or Cursor, receiving code snippets, and copy-pasting what’s useful. The AI accelerates your research and boilerplate generation, but you are still fully in control, reviewing every line.

#### Stage 2: Agentic tools with line-by-line review

At this stage, agentic tools—AI assistants that can read files and make changes directly—enter the workflow: Claude Code, Cursor Composer, and Copilot Chat. You allow the AI to read files and make changes directly in the codebase based on the context you have provided. You are a gatekeeper, approving or rejecting everything that the agent proposes, which is still a painstaking process. Most developers plateau here and don’t get to enjoy the upside of handing more over to AI.

#### Stage 3: Plan-first, PR-only review

This is the stage where everything changes. You and AI collaborate on a detailed plan including requirements, approach, and edge cases. Then the developer steps away and allows the AI to implement the plan without supervision. The output is a pull request, which you then review. Finally, you are out of the line level of the code and can catch problems in the PR review instead of babysitting the AI while it builds.
Compound engineering begins here as each cycle of planning, building, and reviewing teaches the system something that makes the next cycle easier and faster.

#### Stage 4: Idea to PR (single machine)

You provide an idea, and the agent handles everything: codebase research, planning, implementation, test execution, self-review, issue resolution, and PR creation. At this stage,** **your involvement shrinks to three steps: ideation, PR review, and merge. However, you are still running one thing at a time on your own computer.

#### Stage 5: Parallel cloud execution (multiple devices)

This is the final stage. You move execution to the cloud and run things in parallel. Because you’re not tied to a laptop, you can direct your agents from anywhere—a coffee shop, a Panamanian beach, or your phone. You kick off three features, three agents work independently, and you review PRs as they finish. If you push it further, you allow agents to start monitoring feedback and proposing fixes without being asked. No longer an individual contributor are you. You’re commanding a fleet.

### How to level up

#### 0 → 1: Start collaborating

Here are some actions to take to move from level zero to level one:
**Pick one tool.** You will do better if you are comfortable with one tool that you use every day instead of being less comfortable with a few tools that you use occasionally.
**Ask questions first.** Before writing any code, ask the AI to explain the existing code, so you start to understand what it understands. Ask, “How do we send emails to customers?” and “What patterns do we use for data migrations, if any?”
**Delegate boilerplate.** Hand over the boring stuff to AI first, such as tests, config files, and repetitive functions. These are low-risk things that will save you time and give you a feel for what the AI handles well.
**Review everything.** The learning happens when you review every line.
**Compounding move:** Keep a running note of prompts that worked well. Good prompts are reusable.

#### 1 → 2: Let the agent in

**Switch to agentic mode.** This can be done in Claude Code, Codex, Cursor, or the equivalent. Give the agent file system access—in other words, the ability to read and write files on your device.
**Start with targeted changes.** Start with something narrow: “Add a test for this function.” Stick to one file and one purpose until you trust it.
**Approve each action.** Go through each action and approve or reject it. You’re building intuition for when you can trust the agent and when you can’t.
**Review diffs, not just code.** Remember that what changes matters more than what exists.
**Compounding move:** Create an `AGENTS.md` or `CLAUDE.md` file, and document your preferences. When the agent makes a mistake, add a note so that it improves with each correction.

#### 2 → 3: Trust the plan (key transition)

**Invest in planning.** Spell out requirements, the approach, and edge cases.
**Let the agent research.** Allow the AI to read the codebase, find patterns, and suggest approaches.
**Make the plan explicit.** Write the plan down, and make it specific so it is reviewable later.
**Execute and step away.** Ask the agent to implement the plan and leave it running until it’s complete.
**Review at PR level.** Check the final result instead of the individual steps or lines of code.
**Compounding move:** After each implementation, document what the plan missed so you can build faster the next time.

#### 3 → 4: Describe, don’t plan

**Give outcomes, not instructions.** Tell the agent to, “Add email notifications for new comments,” for example, and let it determine how to implement.
**Let the agent plan.** Planning should become its responsibility, given that it knows the codebase and does the research.
**Approve the approach.** Review the plan before implementation, and reject bad directions early.
**Review the PR.** agent reviews its own work along the way—you just check the final result.
**Compounding move:** Build a library of outcome-focused instructions that worked so you can tell the agent to “Add X like we did Y.”

#### 4 → 5: Parallelize everything

**Move to cloud execution.** Agents run on remote infrastructure because local machines are a bottleneck.
**Run parallel work streams.** Give three agents three different features to work on simultaneously.
**Build a queue.** Put ideas, bugs, and improvements into the queue, and agents can work on them in order when they have capacity.
**Enable proactive operation.** Agents can monitor user feedback, spot opportunities, and propose features on their own—you don’t have to triage every request yourself.
**Compounding move:** Document which tasks can be done in parallel well. If you aren’t careful, multiple agents can go do similar things, which can confuse them and make it hard to work. Some work is inherently serial, and knowing the difference will save you time on coordination.

### Three questions when you don’t have tooling

Even if you don’t have a fancy multi-agent review system at your fingertips, you can still get the benefits by asking these three questions before approving any AI output:

1.
**“What was the hardest decision you made here?” **This forces the AI to reveal where the tricky parts are and where it had to make judgment calls.

2.
**“What alternatives did you reject, and why?” **This shows you the options it considered and helps catch if it made a bad choice.

3.
**“What are you least confident about?” **This gets the AI to admit where it might be wrong. LLMs know where their weak spots are, but you have to ask.

### Keep reading this guide

Create a free Every account to unlock the rest of this guide—and get our best agent-friendly guides in your inbox.

![](https://every.to/assets/icons/email-10ff3ba37cc5acd6148e8d02a1968f35810765415fd1aef2ecdfe22c5fd25af3.svg)

Already have an account?
[Log in.](https://every.to/login?redirect_url=%2Fguides%2Fcompound-engineering%23best-practices)

## Best practices

Guide workflow

Best practice

### Agent-native architecture

Guide workflow

Best practice

### Skip permissions

Guide workflow

Best practice

### Design workflow

Guide workflow

Best practice

### Testing and polish

Guide workflow

Best practice

### Vibe coding

Guide workflow

Best practice

### Team collaboration

Guide workflow

Best practice

### User research

Guide workflow

Best practice

### Data pattern extraction

Guide workflow

Best practice

### Copywriting

Guide workflow

Best practice

### Product marketing

Guide workflow

[PAYWALL]
