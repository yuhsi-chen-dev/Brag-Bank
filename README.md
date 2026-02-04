# BragBank – Context-Aware Resume & STAR Story Builder

BragBank helps professionals capture accomplishments as they happen, then instantly turn them into resume bullets and STAR interview stories for any date range. It turns “brag documents” into a simple, repeatable workflow that rewards you immediately.

## Problem
People forget the details that make resumes and interviews strong. They record achievements inconsistently, and later struggle to recall impact, metrics, and examples. Updating a resume or preparing STAR stories becomes a last‑minute scramble.

## Solution
BragBank lets users log “wins” in seconds, then generate polished resume bullets and STAR stories on demand. It emphasizes:
- Fast capture with guided prompts
- Date‑range filtering for precise recall
- Deterministic organization + AI‑assisted phrasing
- Evidence links for credibility

## Core User Flow
1. Log an achievement (guided prompts).
2. Select a date range (e.g., last 6 months).
3. Click:
   - Generate Resume Bullets (action‑verb, impact‑first)
   - Generate STAR Stories (2–4 structured stories)

## MVP Features
- Auth (email + OTP; no passwords)
- Brag entry form with prompts
- Timeline / list view with filters
- Date‑range selector
- AI outputs:
  - Resume bullets
  - STAR stories
- Export options (copy to clipboard / PDF)
- Basic tags (leadership, reliability, cost, growth)

## Stretch Features
- “Impact score” ranking
- Evidence attachment (PRs, dashboards, docs)
- Role‑specific output templates
- Interview question generator
- Calendar reminder nudges
- Multi‑role resume variants

## Data Model (Minimal)
- users
  - id, email, name, role
- brag_entries
  - id, user_id, date, title, situation, task, action, result, metrics, stakeholders, tags, evidence_links
- ai_outputs
  - id, user_id, date_range, type (resume|star), content, created_at

## AI Strategy (Low Cost)
- Use AI for phrasing, not ranking.
- Cache AI outputs by date range to minimize calls.
- Keep prompts short and structured to reduce tokens.

## Tech Stack
Frontend:
- Next.js + React + TypeScript
- TanStack Query (API data fetching + caching)
- Tailwind CSS (or CSS Modules)

Backend:
- NestJS + Node.js + TypeScript
- Prisma ORM
- REST API (or GraphQL if desired)

Database:
- MySQL
- Redis for caching AI outputs

Infra/Dev:
- Docker Compose (MySQL + Redis)
- Cron job for reminders / summary digests

## Architecture Overview
- apps/web (Next.js)
- apps/api (NestJS)
- packages/shared (types, schemas)

## Local Dev (Docker)
Start MySQL + Redis for local development:
```bash
docker compose up -d
```
MySQL will be available on host port `3307` (container `3306`). Redis is on host port `16379` (container `6379`).

API environment variables live in `apps/api/.env.example`.

## Prisma Setup
```bash
cd apps/api
npx prisma generate
npx prisma db push
```
For early development we use `db push` (no migrations). Switch to `migrate dev` once schema stabilizes.

## Seed Data
```bash
cd apps/api
npm run prisma:seed
```

## API Endpoints (Draft)
- POST /auth/request-otp
- POST /auth/verify-otp
- POST /brag-entries
- GET /brag-entries?from=YYYY-MM-DD&to=YYYY-MM-DD
- POST /ai/resume-bullets
- POST /ai/star-stories

## Frontend + Backend Collaboration (SA View)
- Shared contracts live in `packages/shared` and are used by both API and UI.
- Backend owns endpoint shape and stability.
- Frontend consumes via TanStack Query and flags gaps quickly.
- Changes to payloads should update shared types first.

## Frontend Local API
Set `NEXT_PUBLIC_API_URL` to point the frontend at the API, e.g. `http://localhost:4000`.

## Prompting Guidelines (Draft)
- Resume bullets:
  - Start with strong verb
  - Include metric if available
  - 1–2 lines each

- STAR stories:
  - Situation, Task, Action, Result
  - 120–200 words each
  - Focus on impact and tradeoffs

## Why This Is a Strong Interview Project
- Solves a real, painful workflow
- Uses AI in a responsible, explainable way
- Demonstrates full‑stack architecture
- Easy to demo with sample data

## Next Steps
- Confirm MVP scope
- Create initial repo structure
- Implement data model and CRUD
- Add AI proxy endpoint
- Build UI for timeline + outputs

---

If you want, I can bootstrap the repo structure and start implementing the MVP.
