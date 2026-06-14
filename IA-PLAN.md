# Site IA Restructure Plan — Offerings & Navigation

> Status: IMPLEMENTED (2026-06-14). Reorganizes the marketing site around three
> offerings with a "learn → build/use → done-for-you" funnel. Supersedes the
> header-nav rationale in `lib/nav.ts` and the bundled `/platform` page.
>
> Shipped defaults: dropdown-only Products (no `/products` page), `/developers`
> kept standalone, `/blog` URL kept (nav labeled "Resources"), Recoup OS priced
> at $99/year. `/platform` 301-redirects to `/skills`.

---

## 1. The model

**Three offerings, one funnel:**

```
Resources  →  Products  →  Consulting
 (learn)      (build it yourself OR use the hosted version)   (have us do it)
```

The "build vs. use" fork lives **inside Products** (this is the real choice a
buyer makes), which is what removes the old "Platform vs. Chat" confusion:

```
Products
├── Skills          → install & run it yourself
│   └── Recoup OS    → the flagship paid mega-plugin (all skills, one download)
└── Chat            → the hosted web app, nothing to install
```

**Value ladder (low commitment → high):**
free individual skills → **Recoup OS** (paid bundle) → **Chat** (hosted) →
**Consulting** (done for you).

---

## 2. Naming decisions (locked)

| Decision | Choice | Why |
|---|---|---|
| Web app name | **Chat** | Concrete, matches `chat.recoupable.com`; "Platform" was umbrella fog. |
| Products umbrella | **Products** | Now unambiguous because Chat is *inside* it, not a sibling. |
| Flagship SKU | **Recoup OS** | One downloadable mega-plugin = all skills bundled (PM-OS analogy). Gets its own page. |
| Content hub | **Resources** | "Learn" tier of the funnel. |
| Retire | **"Platform"** as a label | It was an umbrella, never a single offering. |

---

## 3. Route map

### New / changed routes

| Route | Page | Source today | Action |
|---|---|---|---|
| `/` | Home | `app/page.tsx` | Reframe around 3 offerings + funnel |
| `/resources` | Resources hub | `/blog` | Label as Resources; keep `/blog` working (alias or rename) |
| `/products` | Products overview | — | **New** — splits into Skills + Chat |
| `/skills` | Skills index | half of `/platform` | **New** — open skills, plugins, MCP, API; features Recoup OS |
| `/recoup-os` | Recoup OS product page | — | **New** — flagship paid download, launch-style |
| `/chat` | Chat (web app) landing | half of `/platform` + `appUrl` | **New** — hosted workspace, CTAs into `chat.recoupable.com` |
| `/consulting` | Consulting | `app/consulting/page.tsx` | Keep |

### Migrations / redirects
- `/platform` → split. Redirect `/platform` → `/products` (301). Salvage its
  copy: engine/Chat half → `/chat`; skills/plugins/MCP/API half → `/skills`.
- `/developers` → fold into `/skills` (API/MCP section) **or** keep as the deep
  API-docs entry linked from `/skills`. (Decision below.)
- `/partners` → keep; link from `/consulting` (partnerships are a consulting
  motion). Secondary nav.

### Unchanged (secondary)
`/pricing`, `/trust`, `/audit`, `/diligence`, `/company`, `/company/about`,
`/company/vision`, `/company/recoup-records`, `/privacy-policy`,
`/terms-of-use`.

---

## 4. Navigation spec

Header is now a hamburger menu (all breakpoints). Proposed grouped structure:

```
Resources
Products
  ├─ Recoup OS        (/recoup-os)   ← featured
  ├─ Skills           (/skills)
  └─ Chat             (/chat)
Consulting
Pricing
Trust
```

**Footer** keeps: Company/About/Vision/Recoup Records, Developers/API Docs,
Partners, Audit, Privacy, Terms, socials, newsletter.

`lib/nav.ts` changes from a flat list to a grouped structure (items may have
`children`). Header renders groups as labeled sections inside the menu panel.

---

## 5. Page specs

### `/recoup-os` (flagship, launch-style)
- Hero: what Recoup OS is (all skills, one install), price, primary CTA (Buy /
  Download), secondary CTA (see what's inside).
- "What's inside" — the skill categories it bundles.
- How it installs (one command / download) + supported hosts (Claude, Cursor, Codex).
- Proof: we run it on our own label (link `/company/recoup-records`).
- Pricing block + FAQ (JSON-LD).
- Close: mantra + CTA.

### `/skills` (Products → Skills index)
- Lead: the open/free individual skills (current skills strip content).
- **Recoup OS** feature band → links to `/recoup-os`.
- Plugins (individual, à la carte) + marketplace.
- API / MCP developer surface at the bottom → link to `/developers` docs.

### `/chat` (Products → Chat)
- The hosted workspace value prop (no install), screenshots/usage.
- Pull the "one engine / Ask anything" demo content from today's `/platform`.
- Primary CTA → `chat.recoupable.com`; pricing link.

### `/products` (overview, optional)
- Two-card fork: **Skills** (build it yourself) vs **Chat** (use it hosted),
  with Recoup OS called out under Skills. Mostly a router; could be a dropdown
  only and skip a standalone page (decision below).

### `/resources` (= today's `/blog`)
- No structural change; relabel + ensure nav/footer point here. Beats, per-post
  covers, newsletter all stay.

### `/` (home)
- Reframe the "How we work" section to the 3 offerings + funnel.
- Add a Products fork (Skills/Recoup OS vs Chat).
- Keep stats, proof, mantra, objections.

---

## 6. Open decisions (need a call before build)

1. **`/products` page or dropdown-only?** Recommend dropdown-only at first
   (Skills + Chat are the real pages); add `/products` overview later if needed.
2. **`/developers`**: keep as standalone API-docs entry, or fully fold into
   `/skills`? Recommend keep standalone, link from `/skills`.
3. **`/resources` vs keep `/blog` URL**: rename with redirect, or keep `/blog`
   and just relabel nav to "Resources"? Recommend keep `/blog`, relabel nav
   (no SEO/link churn).
4. **Recoup OS pricing**: needed for `/recoup-os` + `/pricing`. Placeholder vs real number?

---

## 7. Build phases (atomic tickets)

- **IA-01** `lib/nav.ts` → grouped structure (Products → Recoup OS/Skills/Chat); update Header menu to render groups.
- **IA-02** Create `/recoup-os` page (flagship) + copy in `lib/copy/`.
- **IA-03** Create `/skills` page; migrate skills/plugins/MCP/API copy from `/platform`; feature Recoup OS.
- **IA-04** Create `/chat` page; migrate hosted-app + engine demo copy from `/platform`.
- **IA-05** Redirect `/platform` → `/products` (or `/skills`); update internal links + sitemap + footer.
- **IA-06** Relabel Resources in nav/footer; confirm `/blog` funnel framing.
- **IA-07** Home: reframe "How we work" to 3 offerings + Skills/Chat fork.
- **IA-08** Pricing: add Recoup OS SKU.
- **IA-09** e2e: update nav test (grouped menu), add `/recoup-os`, `/skills`, `/chat` smoke tests; sitemap entries.
