import { Module } from '@nestjs/common';
import { BragEntriesModule } from '../brag-entries/brag-entries.module';
import { OutputsController } from './outputs.controller';
import { OutputsRepository } from './outputs.repository';
import { OutputsService } from './outputs.service';

@Module({
  imports: [BragEntriesModule],
  controllers: [OutputsController],
  providers: [OutputsRepository, OutputsService]
})
export class OutputsModule {}
