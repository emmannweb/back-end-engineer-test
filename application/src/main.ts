import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RabbitMqExceptionFilter } from '@common/errors/rabbitFilterErrors';
import { RABBIT_URI } from '@common/constants/rabbitmqUrl';
import { CSV_PROCESS_QUEUE } from '@common/constants/csvProcessQueue';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`${RABBIT_URI}`],
      queue: `${CSV_PROCESS_QUEUE}`,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.useGlobalFilters(new RabbitMqExceptionFilter()); // Register the filter globally

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
