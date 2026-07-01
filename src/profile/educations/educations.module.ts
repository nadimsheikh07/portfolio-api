import { Module } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { EducationsController } from './educations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/users/entities/user.entity';
import { Education } from './entities/education.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Education])],
  controllers: [EducationsController],
  providers: [EducationsService],
  exports: [EducationsService],
})
export class EducationsModule {}
