import { Module } from '@nestjs/common';
import { EducationsModule } from './educations/educations.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { UserToolsModule } from './user-tools/user-tools.module';
import { UserTechnologiesModule } from './user-technologies/user-technologies.module';

@Module({
  imports: [EducationsModule, ExperiencesModule, UserToolsModule, UserTechnologiesModule]
})
export class ProfileModule {}
