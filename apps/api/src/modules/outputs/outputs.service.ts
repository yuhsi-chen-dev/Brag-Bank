import { Inject, Injectable } from '@nestjs/common';
import type { AIOutput } from '@brag-bank/shared';
import { OutputsRepository } from './outputs.repository';
import { CreateOutputRequest } from './outputs.dto';

@Injectable()
export class OutputsService {
  constructor(
    @Inject(OutputsRepository)
    private readonly repository: OutputsRepository
  ) {}

  async create(payload: CreateOutputRequest): Promise<AIOutput> {
    return this.repository.create(payload);
  }
}
