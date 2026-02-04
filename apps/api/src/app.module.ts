import { Module } from '@nestjs/common';
import { BragEntriesModule } from './modules/brag-entries/brag-entries.module';
import { HealthModule } from './modules/health/health.module';
import { OutputsModule } from './modules/outputs/outputs.module';

@Module({
  imports: [BragEntriesModule, OutputsModule, HealthModule]
})
export class AppModule {}
