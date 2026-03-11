import { BadRequestException, Inject, Injectable, ServiceUnavailableException } from '@nestjs/common';
import type { AIOutput, AIOutputType } from '@brag-bank/shared';
import { getOpenAIClient, getOpenAIModel } from '../../ai/openai.client';
import { buildOutputPrompt } from '../../ai/ai.prompts';
import { BragEntriesRepository } from '../brag-entries/brag-entries.repository';
import { OutputsRepository } from './outputs.repository';
import { CreateOutputRequest } from './outputs.dto';

@Injectable()
export class OutputsService {
  constructor(
    @Inject(OutputsRepository)
    private readonly repository: OutputsRepository,
    @Inject(BragEntriesRepository)
    private readonly bragEntriesRepository: BragEntriesRepository
  ) {}

  async create(payload: CreateOutputRequest): Promise<AIOutput> {
    const entries = await this.bragEntriesRepository.listByUserAndRange({
      userId: payload.userId,
      from: payload.dateRange.from,
      to: payload.dateRange.to
    });

    if (entries.length === 0) {
      throw new BadRequestException('No entries found for the selected date range.');
    }

    const client = getOpenAIClient();
    if (!client) {
      throw new ServiceUnavailableException('OpenAI API key is not configured.');
    }

    const prompt = buildOutputPrompt({
      type: payload.type,
      entries,
      from: payload.dateRange.from,
      to: payload.dateRange.to
    });

    const response = await client.responses.create({
      model: getOpenAIModel(),
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 500
    });

    const text =
      response.output_text ||
      response.output
        ?.flatMap((item) => item.content ?? [])
        .map((part) => (part.type === 'output_text' ? part.text : ''))
        .join('')
        .trim();

    if (!text) {
      throw new ServiceUnavailableException('AI returned an empty response.');
    }

    return this.repository.create({
      userId: payload.userId,
      dateRange: payload.dateRange,
      type: payload.type,
      content: text
    });
  }

  async list(params: {
    userId?: string;
    from?: string;
    to?: string;
    type?: AIOutputType;
  }): Promise<AIOutput[]> {
    return this.repository.list(params);
  }
}
