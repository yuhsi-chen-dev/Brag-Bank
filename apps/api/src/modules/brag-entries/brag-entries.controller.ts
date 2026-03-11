import { Body, Controller, Get, Inject, Query, Post } from '@nestjs/common';
import { BragEntriesService } from './brag-entries.service';
import { BragEntriesQuery, CreateBragEntryRequest } from './brag-entries.dto';

@Controller('brag-entries')
export class BragEntriesController {
  constructor(
    @Inject(BragEntriesService)
    private readonly bragEntriesService: BragEntriesService
  ) {}

  @Get()
  async list(@Query() query: BragEntriesQuery) {
    return this.bragEntriesService.list(query.from, query.to);
  }

  @Post()
  async create(@Body() payload: CreateBragEntryRequest) {
    return this.bragEntriesService.create(payload);
  }
}
