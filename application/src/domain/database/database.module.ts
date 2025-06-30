import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: 'mongodb://test:test!123@mongo-db:27017/csvprocess?retryWrites=true&writeConcern=majority&authSource=admin', // docker // configService.get<string>('MONGODB_URI'),
        //uri: 'mongodb://localhost:27017/csvprocessnew', // configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
