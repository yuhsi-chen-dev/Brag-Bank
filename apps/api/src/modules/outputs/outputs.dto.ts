import type { AIOutputType, DateRange } from '@brag-bank/shared';

export type CreateOutputRequest = {
  userId: string;
  dateRange: DateRange;
  type: AIOutputType;
};
