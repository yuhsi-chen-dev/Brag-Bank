import { Module } from '@nestjs/common';
import { OutputsController } from './outputs.controller';
import { OutputsRepository } from './outputs.repository';
import { OutputsService } from './outputs.service';

@Module({
  controllers: [OutputsController],
  providers: [OutputsRepository, OutputsService]
})
export class OutputsModule {}
