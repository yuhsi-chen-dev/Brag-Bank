import type { BragEntry } from '@brag-bank/shared';
import AppShell from '../../components/AppShell';

const entries: BragEntry[] = [
  {
    id: 'entry-3',
    userId: 'user-1',
    title: 'Improved checkout latency by 34%',
    date: 'Jan 12, 2026',
    summary:
      'Refactored API cache strategy and removed blocking calls across 2 services.',
    tags: ['Reliability', 'Cost', 'Performance']
  },
  {
    id: 'entry-4',
    userId: 'user-1',
    title: 'Built self-serve onboarding flow',
    date: 'Dec 18, 2025',
    summary: 'Reduced time-to-value from 5 days to 2 days for new customers.',
    tags: ['Growth', 'Product']
  }
];

export default function TimelinePage() {
  return (
    <AppShell title="Timeline">
      <section className="card">
        <strong>Date range</strong>
        <p className="muted">Jan 1, 2026 – Jun 30, 2026</p>
      </section>

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
    </AppShell>
  );
}
