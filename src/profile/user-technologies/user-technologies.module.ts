import { Module } from '@nestjs/common';
import { UserTechnologiesService } from './user-technologies.service';
import { UserTechnologiesController } from './user-technologies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/users/entities/user.entity';
import { UserTechnology } from './entities/user-technology.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserTechnology])],
  controllers: [UserTechnologiesController],
  providers: [UserTechnologiesService],
  exports: [UserTechnologiesService],
})
export class UserTechnologiesModule {}
