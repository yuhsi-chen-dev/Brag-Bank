import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BragEntriesModule } from './modules/brag-entries/brag-entries.module';
import { HealthModule } from './modules/health/health.module';
import { OutputsModule } from './modules/outputs/outputs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BragEntriesModule,
    OutputsModule,
    HealthModule
  ]
})
export class AppModule {}
