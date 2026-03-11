# AI Strategy

## Goals
- Generate resume bullets and STAR stories quickly.
- Keep costs low with caching and short prompts.

## Prompt Inputs
- Selected date range
- Brag entries within range
- Output type (resume or STAR)

## Caching Plan
- Cache outputs by (userId, dateRange, type) in Redis.
- Persist final outputs in MySQL for history.

## Safety + Cost Controls
- Enforce max output length per entry.
- Reject calls when no entries exist in range.
- Use deterministic templates before AI for fallback.

## OpenAI Configuration
- `OPENAI_API_KEY` is required to generate outputs.
- `OPENAI_MODEL` defaults to `gpt-4.1-mini`.
