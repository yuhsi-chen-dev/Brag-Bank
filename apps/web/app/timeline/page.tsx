'use client';

import type { BragEntry } from '@brag-bank/shared';
import { useQuery } from '@tanstack/react-query';
import AppShell from '../../components/AppShell';
import { getBragEntries } from '../../lib/endpoints';

const dateRange = {
  from: '2026-01-01',
  to: '2026-06-30'
};

export default function TimelinePage() {
  const { data: entries = [], isLoading } = useQuery<BragEntry[]>({
    queryKey: ['brag-entries', dateRange],
    queryFn: () => getBragEntries(dateRange.from, dateRange.to)
  });

  return (
    <AppShell title="Timeline">
      <section className="card">
        <strong>Date range</strong>
        <p className="muted">Jan 1, 2026 – Jun 30, 2026</p>
      </section>

      {isLoading ? (
        <p className="muted">Loading entries…</p>
      ) : (
        <section className="entry-list">
          {entries.map((entry) => (
            <div key={entry.id} className="card entry">
              <div className="entry-header">
                <strong>{entry.title}</strong>
                <span className="muted">{entry.date}</span>
              </div>
              <p className="muted">{entry.summary}</p>
              <div className="tag-row">
                {entry.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </AppShell>
  );
}
