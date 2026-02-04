'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'bragbank-theme';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = stored ?? 'light';
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  };

  return (
    <button className="button ghost" onClick={toggleTheme}>
      Theme: {theme === 'light' ? 'Light' : 'Dark'}
    </button>
  );
}
