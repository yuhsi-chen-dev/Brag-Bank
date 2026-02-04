import type { AIOutput, BragEntry, AIOutputType, DateRange } from '@brag-bank/shared';
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

export const createBragEntry = (payload: BragEntry) =>
  apiFetch<BragEntry>('/brag-entries', {
    method: 'POST',
    body: payload
  });

type CreateOutputRequest = {
  userId: string;
  dateRange: DateRange;
  type: AIOutputType;
};

export const createOutput = (payload: CreateOutputRequest) =>
  apiFetch<AIOutput>('/ai/outputs', {
    method: 'POST',
    body: payload
  });
