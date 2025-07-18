import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [ApplicationModule, DomainModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
