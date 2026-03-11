import { IsIn, IsOptional, IsUUID } from 'class-validator';
import type { AIOutputType } from '@brag-bank/shared';

export class OutputsQuery {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  from?: string;

  @IsOptional()
  to?: string;

  @IsOptional()
  @IsIn(['resume', 'star'])
  type?: AIOutputType;
}
