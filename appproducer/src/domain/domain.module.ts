import { Module } from '@nestjs/common';
import { CsvProcessorService } from './csv/csv.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCERS_SERVICE } from 'src/common/constants/producer_service';
import { RABBIT_MQ_URL } from 'src/common/constants/rabbitmqUrl';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCERS_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [RABBIT_MQ_URL],
          queue: 'Csv_Process',
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
