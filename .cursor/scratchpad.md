# Fairfield County Luxury Real Estate Website — Scratchpad

## Background and Motivation

Build a **custom, compliant, high-end real estate website** for a Fairfield County, CT real estate agent with three primary goals:

- **Lead generation**: capture high-intent sellers and serious buyers via Home Value (hybrid estimate), contact forms, and town/neighborhood + editorial content.
- **Authority & trust**: understated luxury aesthetic, credibility-first, aligned with brokerage **Higgins Group Private Brokerage**.
- **SEO + LLM optimization**: structured pages with clear hierarchy and entity relationships so both Google and LLMs can interpret/cite the site.

This document is the **single source of truth** for planning and execution. Foundation work is complete; remaining work is **layered refinement**, not re-architecture.

## Non-Negotiables (Compliance)

Must always maintain:

- Brokerage name spelled in full: **“Higgins Group Private Brokerage”**
- Brokerage contact info:
  - 1055 Washington Blvd., Stamford CT 06901
  - 203-658-8282
- Fair Housing disclaimer present site-wide (footer)
- No misleading valuation language (Home Value is an **estimate / starting point**, not an appraisal)
- IDX (later) must follow MLS + brokerage rules

## Locked Tech Stack

- **Next.js (App Router)**, TypeScript, Tailwind CSS
- `next/image` for imagery, Server Components where possible
- **Sanity (hosted)** with structured schemas (Town, Neighborhood, Post/Insights, FAQ; testimonials + video scripts later)
- Deployment target: Vercel (SEO blocked until launch; staged release after QA)

## Current State (What’s Built)

### Global

- Premium typography system (serif headlines + clean sans body)
- Neutral warm palette, responsive layout
- Header nav finalized: Buy, Sell, Towns, Insights, About, Contact, **Home Value (CTA button)**
- Footer includes compliance block

### Homepage (`/`)

- Hero: crossfade background imagery
- Explore Towns: hover-based background switching
- CTAs placed cleanly; no layout instability; image system live

### Towns & Neighborhoods

Routing complete:

- `/towns`
- `/towns/[townSlug]`
- `/towns/[townSlug]/[neighborhoodSlug]`

Each Town/Neighborhood page includes:

- Hero image with overlay
- Title + breadcrumb (for neighborhoods)
- Overview section (Sanity-driven)
- Placeholders for highlights, schools, market snapshot, listings (“Coming soon”)

### Insights (Blog)

- `/insights`
- `/insights/[category]`
- `/insights/[category]/[postSlug]`
- Categories: Market Update, Community, Real Estate Tips, News
- SEO fields included (title + description)
- Post rendering working

### Lead Generation

- Home Value tool (`/home-value`): hybrid model (Option A), compliance-safe language, placeholder estimate (intentional), submissions logged, leads stored in Sanity
- Contact form implemented; leads stored in Sanity

### Imagery

- 3 hero images implemented
- 6 town images implemented
- Graceful missing-image handling; no console errors; performance-safe

## Explicitly Out of Scope (for now)

- IDX / MLS listings
- Automated school/demographic/market stats
- Video generation/embedding
- Investor-focused tools

## Design Guardrails

- Calm, editorial, premium; understated luxury (credibility over flash)
- Full-bleed imagery + whitespace + hierarchy
- Motion subtle only (crossfades/hover transitions)
- No clutter/widgets/gimmicks

## Key Challenges and Analysis

- **Scope discipline**: do not redesign completed systems (routing, imagery system, nav, homepage behavior).
- **Compliance**: home value language and brokerage requirements must remain correct site-wide.
- **SEO foundation**: metadata + sitemap/robots + schema.org needs to be comprehensive but staged (block indexing until launch).
- **Content expansion**: town/neighborhood pages should stay structured and “LLM-readable” (clear sections, headings, entities).
- **Future IDX readiness**: keep placeholders and route structure intact; integrate later without route changes.

## High-level Task Breakdown (Planner-Approved Tickets)

### Ticket 11 — Core Pages: Buy / Sell / About (Immediate)

**Goal**: publish three premium editorial pages consistent with tone, compliance, and CT-local specificity, with tasteful CTAs.

**Subtasks (Executor completes one at a time; stop after each for review):**

1. **Buy page** (`/buy`)
   - Success criteria:
     - Renders premium editorial layout consistent with existing typography system
     - CT-focused copy: relocations, neighborhood knowledge, process clarity
     - CTA(s) present but not aggressive (contact + home value cross-link as appropriate)
     - No regressions to global nav/footer compliance
2. **Sell page** (`/sell`)
   - Success criteria:
     - Emphasizes valuation + process + strategy; compliance-safe valuation language
     - Links to Home Value tool as “estimate / starting point”
     - Strong trust signals (method, confidentiality, negotiation, marketing) without unverifiable claims
3. **About page** (`/about`) — refine/upgrade if needed
   - Success criteria:
     - Agent story + local roots + approach
     - Professional credibility tone; no gimmicks; clear contact CTA
4. **Copy QA pass**
   - Success criteria:
     - No compliance violations; brokerage name/contact present where required (footer)
     - Mobile readability excellent; no broken links

### Ticket 12 — SEO Foundation

**Goal**: make every route SEO-complete while keeping indexing blocked until launch.

**Subtasks**

1. Route metadata coverage (title/description) for all primary routes
2. OpenGraph + Twitter cards
3. `sitemap.xml`
4. `robots.txt` (block indexing pre-launch; allow in launch ticket)
5. Schema markup:
   - RealEstateAgent / LocalBusiness (site-level)
   - BlogPosting (insights posts)
   - Place (towns)

**Success criteria**

- All core pages have deterministic metadata (no missing titles/descriptions)
- `sitemap.xml` includes canonical routes (towns + neighborhoods + insights)
- `robots.txt` blocks indexing pre-launch
- Structured data validates in Google Rich Results Test (where applicable)

### Ticket 13 — Editorial Expansion

**Goal**: increase authority with town long-form content + FAQs and a sustainable Insights cadence.

#### Schema Status (Confirmed)

The Sanity schemas are already in place and need no modifications:

- **Town schema**: Has `overviewLong` (Portable Text), `lifestyle`, `marketNotes`, `faqs` (array of FAQ references), plus SEO fields
- **FAQ schema**: Has `question`, `answer`, `schemaEnabled`, `tags`
- **Post schema**: Has all needed fields including `relatedTowns`, `relatedNeighborhoods`, `faqs`, and SEO fields

#### Subtasks (Executor completes one at a time)

**1. Expand Town Page Rendering**
- Update `getTownBySlug()` query to fetch `lifestyle`, `marketNotes`, and `faqs` (with dereferenced FAQ data)
- Update Town type in `sanity.queries.ts` to include new fields
- Render new sections on `/towns/[townSlug]` page:
  - "Lifestyle" section (semantic H2)
  - "Market Notes" section (semantic H2)
  - Keep existing placeholders for schools/listings
- Success criteria: Town pages render all Sanity-driven content with proper heading hierarchy

**2. Add FAQ Rendering Component + Section**
- Create reusable `TownFAQs` component (accessible accordion or simple list)
- Render FAQs on town pages with proper H2/H3 hierarchy
- Apply styling consistent with existing design system
- Success criteria: FAQs display when present in Sanity; hidden gracefully when empty

**3. Populate Town Long-Form Content (Sanity)**
- Via Sanity Studio or MCP tools, add editorial content to at least 3-4 towns:
  - Westport, Fairfield, Greenwich, Darien (priority towns)
  - Content: lifestyle description, market notes, 2-3 FAQs per town
- Content must be premium, local-specific, and compliance-safe (no unverifiable claims)
- Success criteria: 3-4 towns have populated long-form content visible on site

**4. Create Editorial Calendar + Publish Initial Insights Batch**
- Document editorial calendar in `.cursor/editorial-calendar.md`:
  - Categories: Market Update, Community, Real Estate Tips, News
  - Suggested cadence: 2-4 posts/month
  - Initial batch topics (10-15 titles) aligned to Fairfield County luxury positioning
- Publish initial batch (3-5 posts) in Sanity with:
  - Clear thesis, scannable structure, local relevance
  - Town entity mentions where appropriate
  - Proper SEO title/description
- Success criteria: Editorial calendar documented; 3-5 posts live and rendering

**5. QA Pass**
- Verify town pages with new sections render correctly
- Verify FAQ accessibility (keyboard navigation, heading structure)
- Verify new Insights posts render with correct metadata
- No compliance regressions (brokerage name/contact + Fair Housing)
- Success criteria: All new content displays correctly; no regressions

**Success Criteria (Ticket 13 Complete)**

- Town pages display expanded long-form content (lifestyle, market notes) with clean semantic headings
- Each town can display a set of FAQs pulled from Sanity
- Editorial calendar documented with sustainable publishing cadence
- Insights has 3-5 initial posts live
- No compliance regressions

### Ticket 14 — Production Deployment / Launch Prep

**Goal**: deploy to Vercel, complete QA and compliance verification, then enable indexing.

**Subtasks**

- Vercel deploy + staging review
- Desktop + mobile QA pass
- Compliance verification checklist
- Flip robots/indexing to allow crawling

**Success criteria**

- No critical UX issues on mobile/desktop
- Compliance verified
- Indexing enabled only after sign-off

### Ticket 15 — IDX Integration (Post-Launch)

**Goal**: embed listings into existing placeholders scoped by town/neighborhood without route changes.

### Ticket 16 — Data Modules (Post-Launch)

Demographics, schools, market trends (automation later).

### Ticket 17 — Video Strategy (Post-Launch)

Town videos; scripts stored in Sanity; embedded on town pages.

## Project Status Board

- [x] Ticket 11: Buy / Sell / About pages
  - [x] Buy page (`/services/buy`) — approved
  - [x] Sell page (`/services/sell`) — approved
  - [x] About page refinement (`/about`) — approved
  - [x] Copy QA pass — all checks passed
- [x] Ticket 12: SEO foundation
  - [x] Metadata coverage for all routes
  - [x] OpenGraph + Twitter cards
  - [x] `sitemap.xml` (already existed)
  - [x] `robots.txt` (already existed, blocking pre-launch)
  - [x] Schema markup (RealEstateAgent, BlogPosting, Place)
- [x] Ticket 13: Editorial expansion (towns + FAQs + insights batch)
  - [x] Expand town page rendering (lifestyle, marketNotes sections)
  - [x] FAQ rendering component (`TownFAQs.tsx`)
  - [x] Town content in Sanity (4 towns: Westport, Fairfield, Greenwich, Darien)
  - [x] Editorial calendar (`.cursor/editorial-calendar.md`)
  - [x] Initial Insights batch (5 posts published)
  - [x] QA pass (rendering + compliance verified)
- [ ] Ticket 14: Deployment + QA + enable indexing
- [ ] Ticket 15: IDX integration (post-launch)
- [ ] Ticket 16: Data modules (post-launch)
- [ ] Ticket 17: Video strategy (post-launch)
- [ ] Ticket 18: Investing / Commercial pages (future)
  - [ ] Investing page (`/services/invest`) — expand placeholder
  - [ ] Commercial page (new or expand invest) — scope TBD
- [ ] Ticket 19: Live chat + AI chatbot (future)
  - [ ] Evaluate platforms (Intercom, Crisp, Tidio, Chatwoot, custom)
  - [ ] AI chatbot for common questions
  - [ ] Human escalation with SMS/app notification to agent
  - [ ] Scope TBD based on budget and integration preference

## Current Status / Progress Tracking

- Planning scratchpad created and aligned to the handoff document.
- Next planned execution: **Ticket 11**.
- Executor note: Header nav routes Buy/Sell to `/services/buy` and `/services/sell` (not `/buy` and `/sell`).
- **Ticket 11 complete**: Buy, Sell, About pages implemented and QA passed.
- **Ticket 12 COMPLETE**: SEO foundation.
  - **Subtask 1 (Metadata coverage)**: All routes now have title/description metadata.
    - Static pages: `/`, `/services/invest`, `/insights`, `/towns`, `/fair-housing`, `/privacy`, `/terms`
    - Dynamic pages with `generateMetadata`: `/insights/[categorySlug]`, `/insights/[categorySlug]/[postSlug]`, `/towns/[townSlug]`, `/towns/[townSlug]/[neighborhoodSlug]`
  - **Pre-existing**: `sitemap.xml` and `robots.txt` already implemented
  - **Subtask 2 (OpenGraph + Twitter cards)**:
    - Root layout: Default OG/Twitter with site-wide image, title template "| Fairfield County Luxury Real Estate"
    - Town pages: Town-specific images
    - Insights posts: Article type with publishedTime and author
  - **Subtask 3 (Schema markup)**:
    - RealEstateAgent (layout.tsx): Enhanced with geo, areaServed (9 towns), sameAs
    - BlogPosting (post pages): headline, datePublished, author, publisher, articleSection
    - Place (town pages): name, description, address, containedInPlace

---

**Ticket 13 COMPLETE** (Editorial Expansion) — 2026-01-30

- **Planning complete**: Detailed subtask breakdown confirmed schema readiness
- **Subtask 1 COMPLETE**: Town page rendering expanded
  - Added `FAQ` type and extended `Town` type in `sanity.queries.ts`
  - Updated `getTownBySlug()` to fetch `lifestyle`, `marketNotes`, `faqs[]->{ _id, question, answer, schemaEnabled }`
  - Added "Living in {Town}" and "Real Estate in {Town}" sections to town page
- **Subtask 2 COMPLETE**: FAQ rendering component
  - Created `TownFAQs.tsx` accessible accordion component (ARIA, keyboard nav)
  - Added FAQ section to town pages (renders when FAQs exist)
- **Subtask 3 COMPLETE**: Town content populated in Sanity
  - Created 12 FAQs (3 per town) for Westport, Fairfield, Greenwich, Darien
  - Added lifestyle + marketNotes content for 4 priority towns
  - All content published and live
- **Subtask 4 COMPLETE**: Editorial calendar + Insights batch
  - Created `.cursor/editorial-calendar.md` with categories, cadence, 20+ backlog topics
  - Published 5 initial Insights posts (2 Market Update, 2 Community, 1 Tips)
- **Subtask 5 COMPLETE**: QA pass
  - All sections render correctly, no linter errors
  - Compliance verified (brokerage name, address, phone, Fair Housing)

**Next**: Ticket 13B (Personal Branding + Content Expansion) — see `.cursor/ticket-13b-personal-branding-prompt.md`

---

## Ticket 13B: Personal Branding & Content Expansion (NEW)

**Context**: Site needs to be repositioned around Matt Caiola as the individual agent, not just the brokerage. This includes:
- Dual branding: Matt Caiola (primary) + Higgins Group (prominent for compliance/credibility)
- Personal bio/headshot integration
- ~87 neighborhoods to create content for
- All copy personalized to Matt (not generic "agent")

**Prompt created**: `.cursor/ticket-13b-personal-branding-prompt.md`
- For Opus 4.5: Programming/structural changes
- For GPT 5.2: All copywriting (towns, neighborhoods, FAQs, blog posts, About page)

**Status**: Prompt ready for handoff to new agent

## Local Development (View on localhost)

### Goal

Enable viewing the site locally in a browser via the Next.js dev server.

### Key Requirements / Notes

- **Node.js**: use Node **20 LTS** (recommended) or another version compatible with Next.js `16.1.1`.
- **Sanity env vars are required for reads**: the app uses non-null assertions for `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `NEXT_PUBLIC_SANITY_API_VERSION`. If these are missing, the server will likely error at runtime.
- **Sanity write token is optional for viewing**: `SANITY_API_WRITE_TOKEN` is only needed to persist leads to Sanity. If it’s missing, lead endpoints should still respond “success” but warn in logs.

### One-time Setup Steps (Windows / Cursor terminal)

1. Install dependencies (run from repo root):

```bash
npm install
```

2. Create a file named `.env.local` in the repo root with:

```bash
# Sanity (required for reading towns/posts/etc.)
NEXT_PUBLIC_SANITY_PROJECT_ID=phc36jlu
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Sanity (optional: required only if you want /api/lead to save leads in Sanity)
# SANITY_API_WRITE_TOKEN=...
```

### Start the Site (Dev Server)

Run from repo root:

```bash
npm run dev
```

Then open:

- `http://localhost:3000`

### Success Criteria (Planner verification checklist)

- Homepage loads at `http://localhost:3000` without a runtime crash.
- `Towns` and `Insights` pages render (Sanity reads working).
- Contact + Home Value pages render (lead/valuation APIs respond locally).

## Executor's Feedback or Assistance Requests

- Confirmed: Buy/Sell routes exist at `app/services/buy/page.tsx` and `app/services/sell/page.tsx` (these match header nav).
- Buy page has been upgraded to premium editorial layout and is ready for review at `/services/buy`.
- If copy guidance is needed, ask Planner for preferred voice (more “editorial narrative” vs “process-driven”).
- `npm run lint` currently fails due to pre-existing issues (e.g., `no-explicit-any`, `react/no-unescaped-entities`) and also appears to lint built files under `studio/dist/**`, producing a very large number of warnings/errors. Consider excluding `studio/dist/**` in ESLint config or ignore patterns as a separate cleanup ticket.
- **Image decision**: User chose Option B — finish text/structure for Buy/Sell/About first, then add images in a batch pass later to ensure visual consistency. Will add a follow-up ticket for service page imagery after Ticket 11 text work is complete.

## Lessons

- Keep compliance language exact; avoid “valuation” phrasing that implies appraisal.
- Prefer additive changes; no silent refactors.
- Include debugging info in outputs when relevant (forms/leads).
