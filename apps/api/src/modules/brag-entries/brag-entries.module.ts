import { Module } from '@nestjs/common';
import { BragEntriesController } from './brag-entries.controller';
import { BragEntriesRepository } from './brag-entries.repository';
import { BragEntriesService } from './brag-entries.service';

@Module({
  controllers: [BragEntriesController],
  providers: [BragEntriesRepository, BragEntriesService]
})
export class BragEntriesModule {}
