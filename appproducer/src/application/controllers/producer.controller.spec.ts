import { Test, TestingModule } from '@nestjs/testing';
import { ProducerController } from './producer.controller';
import { ApplicationService } from '../application.service';

describe('ProducerController', () => {
  let controller: ProducerController;
  let fakeApplicationService: Partial<ApplicationService>;

  beforeEach(async () => {
    fakeApplicationService = {
      generateBatch: jest.fn().mockReturnValue(Promise.resolve()),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerController],
      providers: [
        {
          provide: ApplicationService,
          useValue: fakeApplicationService,
        },
      ],
    }).compile();

    controller = module.get<ProducerController>(ProducerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
