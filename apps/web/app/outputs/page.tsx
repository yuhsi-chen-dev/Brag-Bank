'use client';

import type { AIOutput } from '@brag-bank/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import AppShell from '../../components/AppShell';
import { createOutput, getOutputs } from '../../lib/endpoints';

const defaultUserId = '9b8d3d1f-7b4e-4c8f-9d5b-1c0d7e1f7b2a';

export default function OutputsPage() {
  const [range, setRange] = useState({ from: '2025-08-04', to: '2026-02-04' });
  const queryClient = useQueryClient();

  const queryKey = useMemo(
    () => ['ai-outputs', defaultUserId, range.from, range.to],
    [range.from, range.to]
  );

  const { data: outputs = [], isLoading } = useQuery<AIOutput[]>({
    queryKey,
    queryFn: () =>
      getOutputs({
        userId: defaultUserId,
        from: range.from,
        to: range.to
      })
  });

  const resumeMutation = useMutation({
    mutationFn: () =>
      createOutput({
        userId: defaultUserId,
        dateRange: range,
        type: 'resume'
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  const starMutation = useMutation({
    mutationFn: () =>
      createOutput({
        userId: defaultUserId,
        dateRange: range,
        type: 'star'
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  const isBusy = resumeMutation.isPending || starMutation.isPending;

  return (
    <AppShell title="Outputs">
      <section className="card">
        <strong>Date range</strong>
        <div className="form-grid">
          <label className="form-grid">
            <span className="kicker">From</span>
            <input
              className="input"
              type="date"
              value={range.from}
              onChange={(event) =>
                setRange((prev) => ({ ...prev, from: event.target.value }))
              }
            />
          </label>
          <label className="form-grid">
            <span className="kicker">To</span>
            <input
              className="input"
              type="date"
              value={range.to}
              onChange={(event) =>
                setRange((prev) => ({ ...prev, to: event.target.value }))
              }
            />
          </label>
        </div>
        <div className="hero-actions">
          <button
            className="button primary"
            type="button"
            onClick={() => resumeMutation.mutate()}
            disabled={isBusy}
          >
            {resumeMutation.isPending ? 'Generating…' : 'Generate Resume Bullets'}
          </button>
          <button
            className="button ghost"
            type="button"
            onClick={() => starMutation.mutate()}
            disabled={isBusy}
          >
            {starMutation.isPending ? 'Generating…' : 'Generate STAR Stories'}
          </button>
        </div>
        {(resumeMutation.isError || starMutation.isError) && (
          <p className="muted">Failed to generate output. Try again.</p>
        )}
      </section>

      <section>
        <h2 className="section-title">Latest outputs</h2>
        {isLoading ? (
          <p className="muted">Loading outputs…</p>
        ) : outputs.length === 0 ? (
          <p className="muted">Generate your first output to see it here.</p>
        ) : (
          <div className="panel-grid">
            {outputs.map((output) => (
              <div key={output.id} className="card output-card">
                <strong>
                  {output.type === 'resume'
                    ? 'Resume Bullets'
                    : 'STAR Story'}
                </strong>
                <p className="muted">{output.content}</p>
                <button className="button ghost" type="button">
                  Copy
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}
