import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Education } from 'src/profile/educations/entities/education.entity';
import { Experience } from 'src/profile/experiences/entities/experience.entity';
import { UserTechnology } from 'src/profile/user-technologies/entities/user-technology.entity';
import { UserTool } from 'src/profile/user-tools/entities/user-tool.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Education,
      Experience,
      UserTechnology,
      UserTool,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
