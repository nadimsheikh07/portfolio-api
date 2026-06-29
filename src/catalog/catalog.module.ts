import { Module } from '@nestjs/common';
import { ToolsModule } from './tools/tools.module';
import { TechnologiesModule } from './technologies/technologies.module';

@Module({
  imports: [ToolsModule, TechnologiesModule]
})
export class CatalogModule {}
