import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationSchema, Application } from './../entities/application';

@Module({
  imports: [MongooseModule.forFeature([{ name: Application.name, schema: ApplicationSchema }])],
  exports: [MongooseModule.forFeature([{ name: Application.name, schema: ApplicationSchema }])],
})
export class ApplicationModelModule {}
