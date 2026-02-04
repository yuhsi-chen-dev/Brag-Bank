import AppShell from '../../components/AppShell';

const promptFields = [
  { label: 'Title', placeholder: 'Summarize the win' },
  { label: 'Date', placeholder: 'YYYY-MM-DD' },
  { label: 'Situation', placeholder: 'What was happening?' },
  { label: 'Task', placeholder: 'What did you need to do?' },
  { label: 'Action', placeholder: 'What did you do?' },
  { label: 'Result', placeholder: 'What changed?' },
  { label: 'Metrics', placeholder: 'Add numbers if possible' },
  { label: 'Stakeholders', placeholder: 'Who was involved?' },
  { label: 'Tags', placeholder: 'Leadership, Impact, Reliability' },
  { label: 'Evidence links', placeholder: 'PRs, dashboards, docs' }
];

export default function LogPage() {
  return (
    <AppShell title="Log Entry">
      <section className="card">
        <p className="muted">
          Capture wins while they are fresh. Use clear impact and numbers.
        </p>
      </section>
      <section className="card">
        <div className="form-grid">
          {promptFields.map((field) => (
            <label key={field.label} className="form-grid">
              <span className="kicker">{field.label}</span>
              <input className="input" placeholder={field.placeholder} />
            </label>
          ))}
          <button className="button primary">Save entry</button>
        </div>
      </section>
    </AppShell>
  );
}
