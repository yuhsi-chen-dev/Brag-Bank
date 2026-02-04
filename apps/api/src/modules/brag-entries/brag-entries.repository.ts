import type { BragEntry, BragTag } from '@brag-bank/shared';
import { PrismaService } from '../../prisma/prisma.service';

const toDateString = (value: Date) => value.toISOString().slice(0, 10);

type BragEntryRecord = NonNullable<
  Awaited<ReturnType<PrismaService['bragEntry']['findFirst']>>
>;

const toBragEntry = (record: BragEntryRecord): BragEntry => ({
  id: record.id,
  userId: record.userId,
  date: toDateString(record.date),
  title: record.title,
  summary: record.summary ?? undefined,
  situation: record.situation ?? undefined,
  task: record.task ?? undefined,
  action: record.action ?? undefined,
  result: record.result ?? undefined,
  metrics: record.metrics ?? undefined,
  stakeholders: record.stakeholders ?? undefined,
  tags: ((record.tags as string[]) ?? []) as BragTag[],
  evidenceLinks: (record.evidenceLinks as string[] | null) ?? undefined
});

export class BragEntriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list(from?: string, to?: string) {
    const entries = await this.prisma.bragEntry.findMany({
      where: from || to
        ? {
            date: {
              ...(from ? { gte: new Date(from) } : {}),
              ...(to ? { lte: new Date(to) } : {})
            }
          }
        : undefined,
      orderBy: { date: 'desc' }
    });

    return entries.map(toBragEntry);
  }

  async create(payload: BragEntry) {
    const entry = await this.prisma.bragEntry.create({
      data: {
        id: payload.id,
        userId: payload.userId,
        date: new Date(payload.date),
        title: payload.title,
        summary: payload.summary,
        situation: payload.situation,
        task: payload.task,
        action: payload.action,
        result: payload.result,
        metrics: payload.metrics,
        stakeholders: payload.stakeholders,
        tags: payload.tags,
        evidenceLinks: payload.evidenceLinks
      }
    });

    return toBragEntry(entry);
  }
}
