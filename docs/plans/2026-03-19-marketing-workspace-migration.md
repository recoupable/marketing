# Marketing Workspace Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert `marketing/` from a single Next.js app into a workspace that can house public and internal marketing apps, while keeping the current website deployable on Vercel from `apps/web`.

**Architecture:** The current public website becomes `apps/web`. A new `apps/ops` app becomes the home for internal marketing tooling. Shared context (`content/`, `transcripts/`, `swipe/`) stays at the repo root, and root-level workspace scripts coordinate app-level builds and development.

**Tech Stack:** pnpm workspaces, Next.js 16, React 19, Tailwind CSS, TypeScript, Vercel

---

### Task 1: Document the workspace architecture

**Files:**
- Create: `docs/plans/2026-03-19-marketing-workspace-migration.md`
- Modify: `AGENTS.md`
- Modify: `README.md`

**Step 1: Write the desired architecture**

Document the new repo shape:
- `apps/web` for the public website
- `apps/ops` for internal marketing tooling
- root `content/`, `transcripts/`, and `swipe/` shared by both apps
- root workspace scripts for `dev`, `build`, and `lint`

**Step 2: Update the docs**

Update `AGENTS.md` and `README.md` so contributors know:
- where the public app lives
- where internal tooling lives
- what Vercel root to use for the public website

### Task 2: Create the workspace shell

**Files:**
- Create: `pnpm-workspace.yaml`
- Modify: `package.json`

**Step 1: Create the workspace file**

Declare `apps/*` as workspace packages.

**Step 2: Replace the root package scripts**

Turn the current root package into a workspace coordinator with scripts that run the public web app from `apps/web`.

### Task 3: Move the current website into `apps/web`

**Files:**
- Move: `app/` -> `apps/web/app/`
- Move: `components/` -> `apps/web/components/`
- Move: `contexts/` -> `apps/web/contexts/`
- Move: `lib/` -> `apps/web/lib/`
- Move: `public/` -> `apps/web/public/`
- Move: `next.config.ts` -> `apps/web/next.config.ts`
- Move: `next-env.d.ts` -> `apps/web/next-env.d.ts`
- Move: `postcss.config.mjs` -> `apps/web/postcss.config.mjs`
- Move: `tailwind.config.ts` -> `apps/web/tailwind.config.ts`
- Move: `tsconfig.json` -> `apps/web/tsconfig.json`
- Move: `package.json` details into `apps/web/package.json`
- Move: `pnpm-lock.yaml` stays at repo root

**Step 1: Move application files**

Physically move the current website app into `apps/web`.

**Step 2: Fix workspace-relative paths**

Update scripts, TypeScript aliases, and any config assumptions so `apps/web` can still read its shared repo-root content.

### Task 4: Add the internal app placeholder

**Files:**
- Create: `apps/ops/package.json`
- Create: `apps/ops/next.config.ts`
- Create: `apps/ops/tsconfig.json`
- Create: `apps/ops/next-env.d.ts`
- Create: `apps/ops/app/layout.tsx`
- Create: `apps/ops/app/page.tsx`

**Step 1: Create a minimal internal app**

Add a tiny authenticated-tooling placeholder app so the repo structure is real, not theoretical.

**Step 2: Keep it intentionally small**

Do not build internal features yet. Only scaffold enough so the structure and future deployment target are clear.

### Task 5: Verify build and deployment assumptions

**Files:**
- Modify: `README.md`
- Modify: `AGENTS.md`

**Step 1: Run the public build**

Run the public app build from the workspace and make sure `apps/web` still builds.

**Step 2: Document Vercel deployment**

Record that:
- repo = `marketing`
- public Vercel root = `apps/web`
- internal app can be a separate Vercel project rooted at `apps/ops`

### Task 6: Record the migration

**Files:**
- Modify: `/Users/sidneyswift/Documents/Projects/Recoup/mono/PROGRESS.md`

**Step 1: Append the task summary**

Document what changed, that `marketing/` is now a workspace, and that Vercel should deploy the public site from `apps/web`.
