import type { BragEntry } from '@brag-bank/shared';
import { BragEntriesRepository } from './brag-entries.repository';

export class BragEntriesService {
  constructor(private readonly repository: BragEntriesRepository) {}

  list(from?: string, to?: string) {
    return this.repository.list(from, to);
  }

  create(payload: BragEntry) {
    return this.repository.create(payload);
  }
}
