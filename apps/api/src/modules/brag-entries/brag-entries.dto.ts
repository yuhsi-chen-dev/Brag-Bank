import type { BragEntry } from '@brag-bank/shared';

export type CreateBragEntryRequest = BragEntry;

export type BragEntriesQuery = {
  from?: string;
  to?: string;
};
