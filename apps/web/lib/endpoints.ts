import type { BragEntry } from '@brag-bank/shared';
import { apiFetch } from './api';

export const getBragEntries = (from?: string, to?: string) => {
  const params = new URLSearchParams();
  if (from) {
    params.set('from', from);
  }
  if (to) {
    params.set('to', to);
  }
  const query = params.toString();
  return apiFetch<BragEntry[]>(`/brag-entries${query ? `?${query}` : ''}`);
};
