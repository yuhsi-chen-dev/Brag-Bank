# BragBank API

## Base URL
- Local: `http://localhost:4000`

## Endpoints

### GET /health
Simple health check.

**Response**
```json
{ "status": "ok" }
```

### GET /brag-entries
Fetch brag entries by date range.

**Query Params**
- `from` (optional) `YYYY-MM-DD`
- `to` (optional) `YYYY-MM-DD`

**Response**
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "date": "2026-01-12",
    "title": "Improved checkout latency by 34%",
    "summary": "Refactored API cache strategy...",
    "tags": ["Reliability", "Cost"],
    "evidenceLinks": ["https://example.com"]
  }
]
```

### POST /brag-entries
Create a brag entry.

**Request**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "date": "2026-01-12",
  "title": "Improved checkout latency by 34%",
  "summary": "Optional",
  "situation": "Optional",
  "task": "Optional",
  "action": "Optional",
  "result": "Optional",
  "metrics": "Optional",
  "stakeholders": "Optional",
  "tags": ["Reliability", "Cost"],
  "evidenceLinks": ["https://example.com"]
}
```

**Response**
```json
{ "id": "uuid", "title": "...", "summary": "..." }
```

### POST /ai/outputs
Generate outputs for a date range.

**Request**
```json
{
  "userId": "uuid",
  "dateRange": { "from": "2025-08-04", "to": "2026-02-04" },
  "type": "resume" | "star"
}
```

**Response**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "dateRange": { "from": "2025-08-04", "to": "2026-02-04" },
  "type": "resume",
  "content": "...",
  "createdAt": "2026-02-04"
}
```
