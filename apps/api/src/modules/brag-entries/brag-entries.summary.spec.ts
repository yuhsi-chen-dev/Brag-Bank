import { describe, expect, it } from 'vitest';
import type { BragTag } from '@brag-bank/shared';
import { buildSummary } from './brag-entries.summary';

const baseEntry = {
  id: 'id',
  userId: 'user',
  date: '2026-02-01',
  title: 'Improved checkout latency',
  tags: ['Reliability'] as const as BragTag[],
  evidenceLinks: []
};

describe('buildSummary', () => {
  it('returns existing summary when provided', () => {
    const summary = buildSummary({
      ...baseEntry,
      summary: 'Custom summary',
      action: 'Did the thing'
    });

    expect(summary).toBe('Custom summary');
  });

  it('builds summary from available fields', () => {
    const summary = buildSummary({
      ...baseEntry,
      action: 'Refactored caching',
      result: 'Reduced p95 latency',
      metrics: '34% faster'
    });

    expect(summary).toBe(
      'Improved checkout latency · Refactored caching · Reduced p95 latency · 34% faster'
    );
  });
});
