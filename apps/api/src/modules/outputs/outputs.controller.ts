import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { OutputsService } from './outputs.service';
import { CreateOutputRequest } from './outputs.dto';
import { OutputsQuery } from './outputs.query';

@Controller('ai/outputs')
export class OutputsController {
  constructor(
    @Inject(OutputsService)
    private readonly outputsService: OutputsService
  ) {}

  @Get()
  async list(@Query() query: OutputsQuery) {
    return this.outputsService.list({
      userId: query.userId,
      from: query.from,
      to: query.to,
      type: query.type
    });
  }

  @Post()
  async create(@Body() payload: CreateOutputRequest) {
    return this.outputsService.create(payload);
  }
}
