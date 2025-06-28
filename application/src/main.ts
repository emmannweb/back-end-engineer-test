import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RABBIT_MQ_URL } from '@common/constants/rabbitmqUrl';
import { CSV_PROCESS_QUEUE } from '@common/constants/csvProcessQueue';
import { RabbitMqExceptionFilter } from '@common/errors/rabbitFilterErrors';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [RABBIT_MQ_URL],
      queue: CSV_PROCESS_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });
  app.useGlobalFilters(new RabbitMqExceptionFilter()); // Register the filter globally

  await app.listen();
}
bootstrap();
