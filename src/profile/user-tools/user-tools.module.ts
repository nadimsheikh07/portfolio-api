import { Module } from '@nestjs/common';
import { UserToolsService } from './user-tools.service';
import { UserToolsController } from './user-tools.controller';
import { UserTool } from './entities/user-tool.entity';
import { User } from 'src/auth/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserTool])],
  controllers: [UserToolsController],
  providers: [UserToolsService],
  exports: [UserToolsService],
})
export class UserToolsModule {}
