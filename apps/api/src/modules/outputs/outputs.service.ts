import type { AIOutput, AIOutputType, DateRange } from '@brag-bank/shared';

export type CreateOutputRequest = {
  userId: string;
  dateRange: DateRange;
  type: AIOutputType;
};

export class OutputsService {
  create(payload: CreateOutputRequest): AIOutput {
    const output: AIOutput = {
      id: `output-${Date.now()}`,
      userId: payload.userId,
      dateRange: payload.dateRange,
      type: payload.type,
      content:
        payload.type === 'resume'
          ? 'Led a 34% checkout latency reduction by redesigning API caching and removing blocking calls.'
          : 'Situation: Checkout latency spikes hurt conversion... Result: Achieved 34% improvement and stable p95.',
      createdAt: new Date().toISOString().slice(0, 10)
    };

    return output;
  }
}
