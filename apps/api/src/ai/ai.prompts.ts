import type { BragEntry } from '@brag-bank/shared';

export const buildOutputPrompt = (params: {
  type: 'resume' | 'star';
  entries: BragEntry[];
  from: string;
  to: string;
}) => {
  const header = `You are an expert career coach. Generate ${
    params.type === 'resume' ? 'resume bullets' : 'STAR stories'
  } from the user achievements. Date range: ${params.from} to ${params.to}.`;

  const rules =
    params.type === 'resume'
      ? [
          'Return 3 to 6 bullets.',
          'Each bullet starts with a strong verb.',
          'Include metrics if available.',
          'Keep each bullet under 2 lines.'
        ]
      : [
          'Return 2 to 4 STAR stories.',
          'Each story must include Situation, Task, Action, Result.',
          'Keep each story 120 to 200 words.',
          'Focus on impact and tradeoffs.'
        ];

  const entryLines = params.entries
    .map((entry, index) => {
      const tags = entry.tags.length ? `Tags: ${entry.tags.join(', ')}` : '';
      const details = [
        `Title: ${entry.title}`,
        entry.summary ? `Summary: ${entry.summary}` : '',
        entry.situation ? `Situation: ${entry.situation}` : '',
        entry.task ? `Task: ${entry.task}` : '',
        entry.action ? `Action: ${entry.action}` : '',
        entry.result ? `Result: ${entry.result}` : '',
        entry.metrics ? `Metrics: ${entry.metrics}` : '',
        entry.stakeholders ? `Stakeholders: ${entry.stakeholders}` : '',
        tags
      ]
        .filter(Boolean)
        .join('\n');

      return `Entry ${index + 1} (${entry.date})\n${details}`;
    })
    .join('\n\n');

  return [
    header,
    'Rules:',
    ...rules.map((rule) => `- ${rule}`),
    '',
    'Entries:',
    entryLines,
    '',
    'Output:'
  ].join('\n');
};
