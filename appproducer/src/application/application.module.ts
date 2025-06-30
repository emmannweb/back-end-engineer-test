import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ProducerController } from './controllers/producer.controller';
import { DomainModule } from '../domain/domain.module';

@Module({
  imports: [DomainModule],
  providers: [ApplicationService],
  controllers: [ProducerController],
})
export class ApplicationModule {}
