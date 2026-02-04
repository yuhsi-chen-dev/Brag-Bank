'use client';

import type { BragEntry, BragTag } from '@brag-bank/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import AppShell from '../../components/AppShell';
import DatePickerInput from '../../components/DatePickerInput';
import { createBragEntry } from '../../lib/endpoints';

type FormState = {
  title: string;
  date: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  metrics: string;
  stakeholders: string;
  tags: BragTag[];
  evidenceLinks: string;
};

const emptyForm: FormState = {
  title: '',
  date: '',
  situation: '',
  task: '',
  action: '',
  result: '',
  metrics: '',
  stakeholders: '',
  tags: [],
  evidenceLinks: ''
};

const defaultUserId = '9b8d3d1f-7b4e-4c8f-9d5b-1c0d7e1f7b2a';

const tagOptions: BragTag[] = [
  'Leadership',
  'Reliability',
  'Cost',
  'Growth',
  'Performance',
  'Product',
  'Enablement',
  'Impact'
];

const parseList = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

export default function LogPage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: BragEntry) => createBragEntry(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['brag-entries'] });
      setForm(emptyForm);
    }
  });

  const isSubmitting = mutation.isPending;

  const formEntries = useMemo(
    () =>
      [
        { key: 'title', label: 'Title', placeholder: 'Summarize the win' },
        { key: 'date', label: 'Date', placeholder: 'YYYY-MM-DD' },
        { key: 'situation', label: 'Situation', placeholder: 'What was happening?' },
        { key: 'task', label: 'Task', placeholder: 'What did you need to do?' },
        { key: 'action', label: 'Action', placeholder: 'What did you do?' },
        { key: 'result', label: 'Result', placeholder: 'What changed?' },
        { key: 'metrics', label: 'Metrics', placeholder: 'Add numbers if possible' },
        { key: 'stakeholders', label: 'Stakeholders', placeholder: 'Who was involved?' },
        { key: 'evidenceLinks', label: 'Evidence links', placeholder: 'PRs, dashboards, docs' }
      ] satisfies Array<{
        key: keyof FormState;
        label: string;
        placeholder: string;
        type?: string;
      }>,
    []
  );

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggleTag = (tag: BragTag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((item) => item !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: BragEntry = {
      id: crypto.randomUUID(),
      userId: defaultUserId,
      date: form.date,
      title: form.title,
      situation: form.situation || undefined,
      task: form.task || undefined,
      action: form.action || undefined,
      result: form.result || undefined,
      metrics: form.metrics || undefined,
      stakeholders: form.stakeholders || undefined,
      tags: form.tags,
      evidenceLinks: parseList(form.evidenceLinks),
      summary: undefined
    };

    mutation.mutate(payload);
  };

  return (
    <AppShell title="Log Entry">
      <section className="card">
        <p className="muted">
          Capture wins while they are fresh. Use clear impact and numbers.
        </p>
      </section>
      <section className="card">
        <form className="form-grid" onSubmit={handleSubmit}>
          {formEntries.map((field) => (
            <label key={field.key} className="form-grid">
              <span className="kicker">{field.label}</span>
              {field.key === 'date' ? (
                <DatePickerInput
                  value={form.date}
                  onChange={(next) => handleChange('date', next)}
                  placeholder={field.placeholder}
                />
              ) : (
                <input
                  className="input"
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={(event) => handleChange(field.key, event.target.value)}
                />
              )}
            </label>
          ))}
          <div className="form-grid">
            <span className="kicker">Tags</span>
            <div className="tag-row">
              {tagOptions.map((tag) => (
                <label key={tag} className="tag-option">
                  <input
                    type="checkbox"
                    checked={form.tags.includes(tag)}
                    onChange={() => handleToggleTag(tag)}
                  />
                  <span>{tag}</span>
                </label>
              ))}
            </div>
          </div>
          {mutation.isError ? (
            <p className="muted">Failed to save entry. Try again.</p>
          ) : null}
          <button className="button primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : 'Save entry'}
          </button>
        </form>
      </section>
    </AppShell>
  );
}
