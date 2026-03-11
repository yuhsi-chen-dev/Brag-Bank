import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

type AppShellProps = {
  title?: string;
  children: React.ReactNode;
};

export default function AppShell({ title, children }: AppShellProps) {
  return (
    <div className="page">
      <aside className="sidebar">
        <div className="brand">BragBank</div>
        <nav className="nav">
          <Link href="/" className={title === 'Home' ? 'active' : ''}>
            Home
          </Link>
          <Link href="/log" className={title === 'Log Entry' ? 'active' : ''}>
            Log Entry
          </Link>
          <Link href="/timeline" className={title === 'Timeline' ? 'active' : ''}>
            Timeline
          </Link>
          <Link href="/outputs" className={title === 'Outputs' ? 'active' : ''}>
            Outputs
          </Link>
          <Link href="/settings" className={title === 'Settings' ? 'active' : ''}>
            Settings
          </Link>
          <Link href="/design" className={title === 'Design' ? 'active' : ''}>
            Design
          </Link>
        </nav>
        <ThemeToggle />
        <div className="card">
          <div className="kicker">Streak</div>
          <h3>14 days</h3>
          <p className="muted">Last entry: yesterday</p>
        </div>
      </aside>

      <main className="content">
        {title ? <h1 className="section-title">{title}</h1> : null}
        {children}
      </main>
    </div>
  );
}
