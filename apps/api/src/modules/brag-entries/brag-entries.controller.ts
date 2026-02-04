import { Body, Controller, Get, Query, Post } from '@nestjs/common';
import { BragEntriesService } from './brag-entries.service';
import { BragEntriesQuery, CreateBragEntryRequest } from './brag-entries.dto';

@Controller('brag-entries')
export class BragEntriesController {
  constructor(private readonly bragEntriesService: BragEntriesService) {}

  @Get()
  list(@Query() query: BragEntriesQuery) {
    return this.bragEntriesService.list(query.from, query.to);
  }

  @Post()
  create(@Body() payload: CreateBragEntryRequest) {
    return this.bragEntriesService.create(payload);
  }
}
