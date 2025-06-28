import { Module } from '@nestjs/common';
import { CsvProcessorService } from './csv/csv.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCERS_SERVICE } from 'src/common/constants/producer_service';
import { RABBIT_URI } from 'src/common/constants/rabbitmqUrl';
import { CSV_PROCESS_QUEUE } from 'src/common/constants/csvProcessQueue';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCERS_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [`${RABBIT_URI}`],
          queue: `${CSV_PROCESS_QUEUE}`,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [CsvProcessorService],
  exports: [CsvProcessorService],
})
export class DomainModule {}
