import { Test, TestingModule } from '@nestjs/testing';
import { AppointsService } from './appoints.service';

describe('AppointsService', () => {
  let service: AppointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointsService],
    }).compile();

    service = module.get<AppointsService>(AppointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
