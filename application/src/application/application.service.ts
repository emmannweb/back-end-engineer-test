import { CreateApplicationDto } from '@common/dto/create-application-dto';
import { Application } from '../domain/entities/application';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ApplicationService {
  private readonly logger = new Logger(ApplicationService.name);
  constructor(@InjectModel(Application.name) private applicationModel: Model<Application>) {}

  async create(createApplicationDto: CreateApplicationDto) {
    try {
      const result = await this.applicationModel.insertMany(createApplicationDto);
      return result;
    } catch (error) {
      this.logger.log('An error occured while  registring to the DB');
      throw new Error('An error occured while  registring to the DB');
    }
  }

  findAll() {
    return this.applicationModel.find();
  }
}
