export type BragTag =
  | 'Leadership'
  | 'Reliability'
  | 'Cost'
  | 'Growth'
  | 'Performance'
  | 'Product'
  | 'Enablement'
  | 'Impact';

export type BragEntry = {
  id: string;
  userId: string;
  date: string;
  title: string;
  summary?: string;
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
  metrics?: string;
  stakeholders?: string;
  tags: BragTag[];
  evidenceLinks?: string[];
};

export type DateRange = {
  from: string;
  to: string;
};

export type AIOutputType = 'resume' | 'star';

export type AIOutput = {
  id: string;
  userId: string;
  dateRange: DateRange;
  type: AIOutputType;
  content: string;
  createdAt: string;
};
