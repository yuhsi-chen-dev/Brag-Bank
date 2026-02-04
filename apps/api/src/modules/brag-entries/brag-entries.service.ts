import type { BragEntry } from '@brag-bank/shared';

const seedEntries: BragEntry[] = [
  {
    id: 'entry-1',
    userId: 'user-1',
    date: '2026-01-12',
    title: 'Improved checkout latency by 34%',
    summary:
      'Refactored API cache strategy and removed blocking calls across 2 services.',
    tags: ['Reliability', 'Cost', 'Performance']
  },
  {
    id: 'entry-2',
    userId: 'user-1',
    date: '2025-12-02',
    title: 'Mentored 2 new hires to production readiness',
    summary:
      'Built onboarding plan, weekly pairing sessions, and a quality checklist.',
    tags: ['Leadership', 'Enablement']
  }
];

export class BragEntriesService {
  private entries = [...seedEntries];

  list(from?: string, to?: string) {
    if (!from && !to) {
      return this.entries;
    }

    return this.entries.filter((entry) => {
      const date = entry.date;
      if (from && date < from) {
        return false;
      }
      if (to && date > to) {
        return false;
      }
      return true;
    });
  }

  create(payload: BragEntry) {
    this.entries = [payload, ...this.entries];
    return payload;
  }
}
