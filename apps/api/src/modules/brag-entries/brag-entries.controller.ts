import { Body, Controller, Get, Query, Post } from '@nestjs/common';
import type { BragEntry } from '@brag-bank/shared';
import { BragEntriesService } from './brag-entries.service';

@Controller('brag-entries')
export class BragEntriesController {
  constructor(private readonly bragEntriesService: BragEntriesService) {}

  @Get()
  list(@Query('from') from?: string, @Query('to') to?: string) {
    return this.bragEntriesService.list(from, to);
  }

  @Post()
  create(@Body() payload: BragEntry) {
    return this.bragEntriesService.create(payload);
  }
}
