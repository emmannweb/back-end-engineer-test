import { Injectable, Logger } from '@nestjs/common';
import { CsvProcessorService } from 'src/domain/csv/csv.service';

@Injectable()
export class ProducerService {
  private readonly logger = new Logger(ProducerService.name);

  constructor(private csv: CsvProcessorService) {}

  async generateBatch(file: string): Promise<void> {
    try {
      await this.csv.processCsvFile(file, 1000);
      this.logger.log('processing batches...');
    } catch (error) {
      this.logger.warn(`${error}`);
    }
  }
}
