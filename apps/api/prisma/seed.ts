import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const userId = '9b8d3d1f-7b4e-4c8f-9d5b-1c0d7e1f7b2a';

  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: 'demo@bragbank.dev',
      name: 'Demo User',
      role: 'Product Engineer'
    }
  });

  await prisma.bragEntry.createMany({
    data: [
      {
        id: '2f1b7e1a-0a55-4b8a-9e35-92a6c4f7d2fb',
        userId,
        date: new Date('2026-01-12'),
        title: 'Improved checkout latency by 34%',
        summary:
          'Refactored API cache strategy and removed blocking calls across 2 services.',
        tags: ['Reliability', 'Cost', 'Performance'],
        evidenceLinks: ['https://dashboard.example.com/checkout']
      },
      {
        id: 'd5f7d4a7-3d2a-4a72-8c28-0a7df6b6ef2f',
        userId,
        date: new Date('2025-12-02'),
        title: 'Mentored 2 new hires to production readiness',
        summary:
          'Built onboarding plan, weekly pairing sessions, and a quality checklist.',
        tags: ['Leadership', 'Enablement']
      },
      {
        id: '9c1fd95e-09c5-4b79-9b6f-6d1a3f2b7c8a',
        userId,
        date: new Date('2025-12-18'),
        title: 'Built self-serve onboarding flow',
        summary: 'Reduced time-to-value from 5 days to 2 days for new customers.',
        tags: ['Growth', 'Product']
      }
    ],
    skipDuplicates: true
  });

  await prisma.aiOutput.createMany({
    data: [
      {
        id: 'a2e4d5b2-5bd0-4c8e-9c6b-8e9f2f35f8b2',
        userId,
        dateRangeFrom: new Date('2025-08-04'),
        dateRangeTo: new Date('2026-02-04'),
        type: 'resume',
        content:
          'Led a 34% checkout latency reduction by redesigning API caching and removing blocking calls, improving conversion and lowering infra costs.'
      },
      {
        id: '1b4b3c2a-3b6d-4d1d-8a7c-5c7d1f9a6f1a',
        userId,
        dateRangeFrom: new Date('2025-08-04'),
        dateRangeTo: new Date('2026-02-04'),
        type: 'star',
        content:
          'Situation: Checkout latency spikes hurt conversion... Result: Achieved 34% improvement and stable p95.'
      }
    ],
    skipDuplicates: true
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
