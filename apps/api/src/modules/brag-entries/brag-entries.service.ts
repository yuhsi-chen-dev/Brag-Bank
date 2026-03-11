import { Inject, Injectable } from '@nestjs/common';
import type { BragEntry } from '@brag-bank/shared';
import { BragEntriesRepository } from './brag-entries.repository';
import { buildSummary } from './brag-entries.summary';

@Injectable()
export class BragEntriesService {
  constructor(
    @Inject(BragEntriesRepository)
    private readonly repository: BragEntriesRepository
  ) {}

  async list(from?: string, to?: string) {
    return this.repository.list(from, to);
  }

  async create(payload: BragEntry) {
    const summary = buildSummary(payload);
    return this.repository.create({ ...payload, summary });
  }
}
