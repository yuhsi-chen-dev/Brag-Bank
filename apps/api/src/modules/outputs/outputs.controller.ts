import { Body, Controller, Inject, Post } from '@nestjs/common';
import { OutputsService } from './outputs.service';
import { CreateOutputRequest } from './outputs.dto';

@Controller('ai/outputs')
export class OutputsController {
  constructor(
    @Inject(OutputsService)
    private readonly outputsService: OutputsService
  ) {}

  @Post()
  async create(@Body() payload: CreateOutputRequest) {
    return this.outputsService.create(payload);
  }
}
