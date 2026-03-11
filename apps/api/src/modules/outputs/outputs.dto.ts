import type { AIOutputType, DateRange } from '@brag-bank/shared';
import { IsIn, IsObject, IsUUID } from 'class-validator';

export class CreateOutputRequest {
  @IsUUID()
  userId!: string;

  @IsObject()
  dateRange!: DateRange;

  @IsIn(['resume', 'star'])
  type!: AIOutputType;
}
