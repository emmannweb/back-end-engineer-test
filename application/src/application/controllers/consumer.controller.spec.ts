import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerController } from './consumer.controller';
import { ApplicationService } from '../application.service';

describe('ConsumerController', () => {
  let controller: ConsumerController;
  let fakeApplicationService: Partial<ApplicationService>;

  beforeEach(async () => {
    fakeApplicationService = {
      create: jest.fn().mockReturnValue(Promise.resolve()),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumerController],
      providers: [
        {
          provide: ApplicationService,
          useValue: fakeApplicationService,
        },
      ],
    }).compile();

    controller = module.get<ConsumerController>(ConsumerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
