import { Inject, Injectable } from '@nestjs/common';
import type { AIOutput, AIOutputType, DateRange } from '@brag-bank/shared';
import { PrismaService } from '../../prisma/prisma.service';

export type CreateOutputPayload = {
  userId: string;
  dateRange: DateRange;
  type: AIOutputType;
  content: string;
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

@Injectable()
export class OutputsRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async create(payload: CreateOutputPayload): Promise<AIOutput> {
    const output = await this.prisma.aiOutput.create({
      data: {
        userId: payload.userId,
        dateRangeFrom: new Date(payload.dateRange.from),
        dateRangeTo: new Date(payload.dateRange.to),
        type: payload.type,
        content: payload.content
      }
    });

    return toOutput(output);
  }

  async list(params: {
    userId?: string;
    from?: string;
    to?: string;
    type?: AIOutputType;
  }): Promise<AIOutput[]> {
    const outputs = await this.prisma.aiOutput.findMany({
      where: {
        ...(params.userId ? { userId: params.userId } : {}),
        ...(params.type ? { type: params.type } : {}),
        ...(params.from ? { dateRangeFrom: { gte: new Date(params.from) } } : {}),
        ...(params.to ? { dateRangeTo: { lte: new Date(params.to) } } : {})
      },
      orderBy: { createdAt: 'desc' }
    });

    return outputs.map(toOutput);
  }
}
