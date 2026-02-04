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
3. Generate:
   - Resume Bullets (action‑verb, impact‑first)
   - STAR Stories (2–4 structured stories)

## Tech Stack
Frontend:
- Next.js + React + TypeScript
- TanStack Query (API data fetching + caching)

Backend:
- NestJS + Node.js + TypeScript
- Prisma ORM

Database:
- MySQL
- Redis for caching AI outputs

## Repository Structure
```
apps/
  web/        # Next.js UI
  api/        # NestJS API
packages/
  shared/     # Shared types
```

## Getting Started

### 1) Install Dependencies
```bash
npm install
```

### 2) Start MySQL + Redis
```bash
docker compose up -d
```
MySQL: host `3307` → container `3306`
Redis: host `16379` → container `6379`

### 3) Configure Environment
API env lives in `apps/api/.env.example`.
Create `apps/api/.env` and set:
```
DATABASE_URL="mysql://bragbank:bragbank@localhost:3307/bragbank"
```

Web env lives in `apps/web/.env.example`.
Create `apps/web/.env.local` and set:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 4) Prisma (Schema Sync)
```bash
cd apps/api
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

### 5) Run the Apps
```bash
# API
cd apps/api
npm run dev

# Web
cd apps/web
npm run dev
```

## API Endpoints (Draft)
- `GET /health`
- `GET /brag-entries?from=YYYY-MM-DD&to=YYYY-MM-DD`
- `POST /brag-entries`
- `POST /ai/outputs`

Detailed API docs: `docs/api.md`

## AI Strategy (Planned)
See `docs/ai.md` for prompt and caching strategy.

## Architecture
See `docs/architecture.md` for system flow and contracts.

---

If you want, I can continue adding auth, output history, and AI integrations.
