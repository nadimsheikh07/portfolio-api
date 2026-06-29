import { Module } from '@nestjs/common';
import { EducationsModule } from './educations/educations.module';
import { ExperiencesModule } from './experiences/experiences.module';

@Module({
  imports: [EducationsModule, ExperiencesModule]
})
export class ProfileModule {}
