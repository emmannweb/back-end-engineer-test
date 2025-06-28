import {
  BadRequestException,
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProducerService } from 'src/producer/producer.service';
import { diskStorage } from 'multer';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProperty,
} from '@nestjs/swagger';

@Controller('create')
export class ProducerController {
  private readonly logger = new Logger(ProducerController.name);

  constructor(private readonly producerService: ProducerService) {}

  @ApiOperation({ summary: 'Upload CSV file Endpoint' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @Post('batch')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '../../../../domain/uploads', // Specify  upload directory
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
      limits: { files: 1, fileSize: 1024 * 1024 * 10 },
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['text/csv'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          cb(new BadRequestException('Invalid file type'), false);
        } else if (file?.size > 1024 * 1024 * 10) {
          // 10MB
          cb(
            new BadRequestException('Max File Size Reached. Max Allowed: 10MB'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async createBatchMethod(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    try {
      let res = await this.producerService.generateBatch(file.path);
      this.logger.log(`${res}`);
      return 'File was processed successfully!';
    } catch (error) {
      this.logger.warn(`${error}`);
      throw new BadRequestException(`${error}`);
    }
  }
}
