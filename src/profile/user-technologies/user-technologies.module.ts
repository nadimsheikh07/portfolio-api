import { Module } from '@nestjs/common';
import { UserTechnologiesService } from './user-technologies.service';
import { UserTechnologiesController } from './user-technologies.controller';

@Module({
  controllers: [UserTechnologiesController],
  providers: [UserTechnologiesService],
})
export class UserTechnologiesModule {}
