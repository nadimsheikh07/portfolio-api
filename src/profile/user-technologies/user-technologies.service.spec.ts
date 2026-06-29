import { Test, TestingModule } from '@nestjs/testing';
import { UserTechnologiesService } from './user-technologies.service';

describe('UserTechnologiesService', () => {
  let service: UserTechnologiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTechnologiesService],
    }).compile();

    service = module.get<UserTechnologiesService>(UserTechnologiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
