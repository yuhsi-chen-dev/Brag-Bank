import { Module } from '@nestjs/common';
import { BragEntriesController } from './brag-entries.controller';
import { BragEntriesService } from './brag-entries.service';

@Module({
  controllers: [BragEntriesController],
  providers: [BragEntriesService]
})
export class BragEntriesModule {}
