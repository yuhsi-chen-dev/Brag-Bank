'use client';

import type { AIOutput, BragEntry } from '@brag-bank/shared';
import { useQuery } from '@tanstack/react-query';
import AppShell from '../components/AppShell';
import { getBragEntries } from '../lib/endpoints';

const outputs: AIOutput[] = [
  {
    id: 'output-1',
    userId: 'user-1',
    dateRange: { from: '2025-08-04', to: '2026-02-04' },
    type: 'resume',
    content:
      'Led a 34% checkout latency reduction by redesigning API caching and removing blocking calls, improving conversion and lowering infra costs.',
    createdAt: '2026-02-04'
  },
  {
    id: 'output-2',
    userId: 'user-1',
    dateRange: { from: '2025-08-04', to: '2026-02-04' },
    type: 'star',
    content:
      'Situation: Checkout latency spikes hurt conversion... Result: Achieved 34% improvement and stable p95.',
    createdAt: '2026-02-04'
  }
];

export default function HomePage() {
  const { data: entries = [], isLoading } = useQuery<BragEntry[]>({
    queryKey: ['brag-entries'],
    queryFn: () => getBragEntries()
  });

  return (
    <AppShell title="Home">
      <section className="hero">
        <div className="kicker">Context-aware career journal</div>
        <h1>Turn wins into interviews.</h1>
        <p>
          Capture accomplishments in minutes, then generate resume bullets and
          STAR stories for any date range.
        </p>
        <div className="hero-actions">
          <button className="button primary">Log a win</button>
          <button className="button ghost">Generate outputs</button>
        </div>
      </section>

      <section className="stats">
        <div className="card">
          <h3>Total entries</h3>
          <p>{entries.length}</p>
        </div>
        <div className="card">
          <h3>Top tag</h3>
          <p>Leadership</p>
        </div>
        <div className="card">
          <h3>Last export</h3>
          <p>3 days ago</p>
        </div>
        <div className="card">
          <h3>Impact score</h3>
          <p>86</p>
        </div>
      </section>

      <section>
        <h2 className="section-title">Recent entries</h2>
        {isLoading ? (
          <p className="muted">Loading entries…</p>
        ) : (
          <div className="entry-list">
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
          </div>
        )}
      </section>

      <section>
        <h2 className="section-title">Latest outputs</h2>
        <div className="panel-grid">
          {outputs.map((output) => (
            <div key={output.id} className="card output-card">
              <strong>
                {output.type === 'resume'
                  ? 'Resume Bullets — Last 6 Months'
                  : 'STAR Story — Launch Reliability'}
              </strong>
              <p className="muted">{output.content}</p>
              <button className="button ghost">Copy</button>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
