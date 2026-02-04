# BragBank Architecture

## Overview
BragBank is a monorepo with a frontend web app, a backend API, and shared types.

```
apps/
  web/        # Next.js UI
  api/        # NestJS API
packages/
  shared/     # Shared types
```

## Runtime Flow
1. Web app calls API endpoints (TanStack Query).
2. API validates DTOs and writes to MySQL using Prisma.
3. Redis is reserved for caching AI outputs (future).

## Data Contracts
- Shared types live in `packages/shared` and are used by both web and API.
- DTOs live in `apps/api/src/modules/**` and are validated by `class-validator`.

## AI Flow (Planned)
1. User selects date range.
2. API collects brag entries for that range.
3. API builds prompt(s) and calls the AI provider.
4. Output is cached in Redis and stored in MySQL.

## Date Range Filtering
The frontend supplies `from` and `to` as `YYYY-MM-DD` query params:
```
GET /brag-entries?from=2026-01-01&to=2026-06-30
```

The API filters on `brag_entries.date`.
