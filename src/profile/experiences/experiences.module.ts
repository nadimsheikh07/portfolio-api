import { Module } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { ExperiencesController } from './experiences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/users/entities/user.entity';
import { Experience } from './entities/experience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Experience])],
  controllers: [ExperiencesController],
  providers: [ExperiencesService],
  exports: [ExperiencesService],
})
export class ExperiencesModule {}
