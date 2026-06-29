import { Test, TestingModule } from '@nestjs/testing';
import { UserTechnologiesController } from './user-technologies.controller';
import { UserTechnologiesService } from './user-technologies.service';

describe('UserTechnologiesController', () => {
  let controller: UserTechnologiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTechnologiesController],
      providers: [UserTechnologiesService],
    }).compile();

    controller = module.get<UserTechnologiesController>(UserTechnologiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
