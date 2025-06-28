import { Module } from '@nestjs/common';
import { ProducerModule } from './producer/producer.module';
import { CsvModule } from './domain/csv/csv.module';

@Module({
  imports: [ProducerModule, CsvModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
