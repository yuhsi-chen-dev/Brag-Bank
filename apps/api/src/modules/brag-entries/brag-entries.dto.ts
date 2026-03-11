import type { BragEntry, BragTag } from '@brag-bank/shared';
import { IsArray, IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateBragEntryRequest implements BragEntry {
  @IsUUID()
  id!: string;

  @IsUUID()
  userId!: string;

  @IsDateString()
  date!: string;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  situation?: string;

  @IsOptional()
  @IsString()
  task?: string;

  @IsOptional()
  @IsString()
  action?: string;

  @IsOptional()
  @IsString()
  result?: string;

  @IsOptional()
  @IsString()
  metrics?: string;

  @IsOptional()
  @IsString()
  stakeholders?: string;

  @IsArray()
  tags!: BragTag[];

  @IsOptional()
  @IsArray()
  evidenceLinks?: string[];
}

export type BragEntriesQuery = {
  from?: string;
  to?: string;
};
