export default function DesignPage() {
  return (
    <div className="design-page">
      <div className="design-frame">
        <div className="kicker">Frame 01</div>
        <h2>Home</h2>
        <div className="card">
          <strong>Hero</strong>
          <p className="muted">Turn wins into interviews.</p>
          <div className="hero-actions">
            <button className="button primary">Log a win</button>
            <button className="button ghost">Generate outputs</button>
          </div>
        </div>
        <div className="panel-grid">
          <div className="card">
            <h3>Total entries</h3>
            <p>38</p>
          </div>
          <div className="card">
            <h3>Impact score</h3>
            <p>86</p>
          </div>
          <div className="card">
            <h3>Top tag</h3>
            <p>Leadership</p>
          </div>
        </div>
      </div>

      <div className="design-frame">
        <div className="kicker">Frame 02</div>
        <h2>Log Entry</h2>
        <div className="form-grid">
          <input className="input" placeholder="Title" />
          <input className="input" placeholder="Date" />
          <input className="input" placeholder="Situation" />
          <input className="input" placeholder="Task" />
          <input className="input" placeholder="Action" />
          <input className="input" placeholder="Result" />
          <input className="input" placeholder="Metrics" />
          <input className="input" placeholder="Stakeholders" />
          <input className="input" placeholder="Tags" />
          <input className="input" placeholder="Evidence links" />
          <button className="button primary">Save entry</button>
        </div>
      </div>

      <div className="design-frame">
        <div className="kicker">Frame 03</div>
        <h2>Timeline</h2>
        <div className="card">
          <strong>Date range</strong>
          <p className="muted">Jan 1, 2026 – Jun 30, 2026</p>
        </div>
        <div className="entry-list">
          <div className="card entry">
            <div className="entry-header">
              <strong>Improved checkout latency by 34%</strong>
              <span className="muted">Jan 12, 2026</span>
            </div>
            <p className="muted">Refactored API cache strategy for p95 stability.</p>
            <div className="tag-row">
              <span className="tag">Performance</span>
              <span className="tag">Reliability</span>
            </div>
          </div>
        </div>
      </div>

      <div className="design-frame">
        <div className="kicker">Frame 04</div>
        <h2>Outputs</h2>
        <div className="panel-grid">
          <div className="card output-card">
            <strong>Resume bullets</strong>
            <p className="muted">
              Led a 34% checkout latency reduction by redesigning caching and
              eliminating blocking calls.
            </p>
            <button className="button ghost">Copy</button>
          </div>
          <div className="card output-card">
            <strong>STAR story</strong>
            <p className="muted">
              Situation: Checkout latency spikes hurt conversion... Result:
              Achieved 34% improvement and stable p95.
            </p>
            <button className="button ghost">Copy</button>
          </div>
        </div>
      </div>

      <div className="design-frame">
        <div className="kicker">Frame 05</div>
        <h2>Settings</h2>
        <div className="form-grid">
          <input className="input" placeholder="Name" />
          <input className="input" placeholder="Target role" />
          <input className="input" placeholder="Output tone (e.g., concise)" />
          <button className="button primary">Save settings</button>
        </div>
      </div>
    </div>
  );
}
