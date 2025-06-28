import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ProducerController } from './controllers/producer/producer.controller';
import { DomainModule } from 'src/domain/domain.module';

@Module({
  imports: [DomainModule],
  providers: [ProducerService],
  controllers: [ProducerController],
})
export class ProducerModule {}
