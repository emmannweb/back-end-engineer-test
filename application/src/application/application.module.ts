import { ApplicationService } from './application.service';
import { Module } from '@nestjs/common';
import { ConsumerController } from '@application/controllers/consumer.controller';
import { DomainModule } from '@domain/domain.module';
import { CommonModule } from '@common/common.module';

@Module({
  imports: [DomainModule, CommonModule],
  controllers: [ConsumerController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
