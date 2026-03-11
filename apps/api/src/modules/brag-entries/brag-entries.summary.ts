import type { BragEntry } from '@brag-bank/shared';

export const buildSummary = (entry: BragEntry) => {
  if (entry.summary) {
    return entry.summary;
  }

  const parts = [
    entry.title,
    entry.action,
    entry.result,
    entry.metrics
  ].filter(Boolean);

  return parts.join(' · ');
};
