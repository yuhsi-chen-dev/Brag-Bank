import { describe, expect, it, vi } from 'vitest';
import { OutputsRepository } from './outputs.repository';

const makeRepo = () => {
  const prisma = {
    aiOutput: {
      findMany: vi.fn().mockResolvedValue([]),
      create: vi.fn()
    }
  };

  return { repo: new OutputsRepository(prisma as any), prisma };
};

describe('OutputsRepository.list', () => {
  it('builds filters from query params', async () => {
    const { repo, prisma } = makeRepo();

    await repo.list({
      userId: 'user-1',
      from: '2026-01-01',
      to: '2026-02-01',
      type: 'resume'
    });

    expect(prisma.aiOutput.findMany).toHaveBeenCalledWith({
      where: {
        userId: 'user-1',
        type: 'resume',
        dateRangeFrom: { gte: new Date('2026-01-01') },
        dateRangeTo: { lte: new Date('2026-02-01') }
      },
      orderBy: { createdAt: 'desc' }
    });
  });
});
