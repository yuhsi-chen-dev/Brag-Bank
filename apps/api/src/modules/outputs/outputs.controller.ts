import { Body, Controller, Post } from '@nestjs/common';
import { OutputsService } from './outputs.service';
import { CreateOutputRequest } from './outputs.dto';

@Controller('ai/outputs')
export class OutputsController {
  constructor(private readonly outputsService: OutputsService) {}

  @Post()
  create(@Body() payload: CreateOutputRequest) {
    return this.outputsService.create(payload);
  }
}
