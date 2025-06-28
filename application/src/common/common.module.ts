import { Module } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application-dto';

@Module({
  providers: [CreateApplicationDto],
  exports: [CreateApplicationDto],
})
export class CommonModule {}
