import type { AIOutput } from '@brag-bank/shared';
import { OutputsRepository } from './outputs.repository';
import { CreateOutputRequest } from './outputs.dto';

export class OutputsService {
  constructor(private readonly repository: OutputsRepository) {}

  create(payload: CreateOutputRequest): AIOutput {
    return this.repository.create(payload);
  }
}
