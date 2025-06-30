import { CreateApplicationDto } from '../../common/dto/create-application-dto';
import { ApplicationService } from '../application.service';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('consumer')
export class ConsumerController {
  private readonly logger = new Logger(ConsumerController.name);

  constructor(private readonly applicationService: ApplicationService) {}

  @EventPattern('Csv_Process')
  async receiveFromQueue(@Payload() payload: CreateApplicationDto): Promise<string> {
    if (!Array.isArray(payload)) {
      this.logger.error('Invalid payload: expected an array.');
      throw new Error('Invalid payload: expected an array.');
    }

    // const batch = payload.slice(0, 1000);

    this.logger.log(`Processing batch of size ${payload.length}`);

    this.logger.debug(`Batch content: ${JSON.stringify(payload, null, 2)}`);

    await this.applicationService.create(payload);

    return `Processed batch of size ${payload.length}`;
  }
}
