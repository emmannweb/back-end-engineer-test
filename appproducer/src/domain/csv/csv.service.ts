import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { ClientProxy } from '@nestjs/microservices';
import { DataBatchInterface } from '../../common/interfaces/dataBatchInterface';
import { PRODUCERS_SERVICE } from '../../common/constants/producer_service';

@Injectable()
export class CsvProcessorService {
  private readonly logger = new Logger(CsvProcessorService.name);
  constructor(@Inject(PRODUCERS_SERVICE) private client: ClientProxy) {}

  async processCsvFile(
    filePath: string,
    batchSize: number = 1000,
  ): Promise<void> {
    try {
      const parser = createReadStream(filePath).pipe(
        parse({
          columns: true, // Treat the first row as headers
          skip_empty_lines: true,
        }),
      );

      let batch: any[] = [];
      let numbBatch: number = 0;

      for await (const record of parser) {
        batch.push(record);

        if (batch.length >= batchSize) {
          await this.processBatch(batch);
          batch = []; // Clear the batch
          numbBatch++;
          console.log('nb of batches processed', numbBatch);
        }
      }

      // Process any remaining records in the last batch
      if (batch.length > 0) {
        await this.processBatch(batch);
      }
    } catch (error) {
      this.logger.log('Error occured while reading and  processing the file!');
      throw new BadRequestException();
    }
  }

  private async processBatch(batch: any[]): Promise<void> {
    try {
      //data transformation
      let value: any;
      await batch.reduce((accumulator, currentItem) => {
        const currentId = currentItem.id;
        const state = currentItem.state;
        if (!accumulator[currentId]) {
          accumulator[state] = (accumulator[state] || 0) + 1;
        }
        value = accumulator;
        return accumulator;
      }, {});

      console.log(`Processing batch of ${batch.length} records:`, value);

      //format data to send to DB
      this.formatToInserToDB(value);

      // delay the function with an asynchronous operation of 1S.
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      this.logger.log('Error occured while processing the file!');
    }
  }

  private async formatToInserToDB(val: DataBatchInterface): Promise<void> {
    let arr: DataBatchInterface[] = [];
    var keys = Object.keys(val);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = val[key];

      let rowObj: DataBatchInterface = {
        state: key,
        quantity: value,
      };
      arr.push(rowObj);
      if (arr.length > 1000) {
        arr = [];
      }
    }
    //sending data transformation to other microservice
    this.client.emit('Csv_Process', arr);
  }
}
