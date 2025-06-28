import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ApplicationModelModule } from './database/application.model';

@Module({
  imports: [DatabaseModule, ApplicationModelModule],
  providers: [],
  exports: [DatabaseModule, ApplicationModelModule],
})
export class DomainModule {}
