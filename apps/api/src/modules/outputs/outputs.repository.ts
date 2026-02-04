import type { AIOutput, AIOutputType, DateRange } from '@brag-bank/shared';
import { PrismaService } from '../../prisma/prisma.service';

export type CreateOutputPayload = {
  userId: string;
  dateRange: DateRange;
  type: AIOutputType;
};

const toDateString = (value: Date) => value.toISOString().slice(0, 10);

type AiOutputRecord = Awaited<ReturnType<PrismaService['aiOutput']['create']>>;

const toOutput = (record: AiOutputRecord): AIOutput => ({
  id: record.id,
  userId: record.userId,
  dateRange: {
    from: toDateString(record.dateRangeFrom),
    to: toDateString(record.dateRangeTo)
  },
  type: record.type as AIOutputType,
  content: record.content,
  createdAt: toDateString(record.createdAt)
});

export class OutputsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateOutputPayload): Promise<AIOutput> {
    const output = await this.prisma.aiOutput.create({
      data: {
        userId: payload.userId,
        dateRangeFrom: new Date(payload.dateRange.from),
        dateRangeTo: new Date(payload.dateRange.to),
        type: payload.type,
        content:
          payload.type === 'resume'
            ? 'Led a 34% checkout latency reduction by redesigning API caching and removing blocking calls.'
            : 'Situation: Checkout latency spikes hurt conversion... Result: Achieved 34% improvement and stable p95.'
      }
    });

    return toOutput(output);
  }
}
