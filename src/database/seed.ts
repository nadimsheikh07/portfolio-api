import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import 'dotenv/config';

import { RoleSeeder } from './seeders/role.seed';
import { AppModule } from 'src/app.module';
import { PermissionSeeder } from './seeders/permission.seed';

async function bootstrap() {
  const logger = new Logger('Seeder');

  try {
    logger.log('🚀 Starting database seeding...');

    const app = await NestFactory.createApplicationContext(AppModule);

    logger.log('✅ Nest application context created');

    const dataSource = app.get(DataSource);

    logger.log('✅ Database connection established');

    logger.log('🌱 Running PermissionSeeder...');
    await new PermissionSeeder(dataSource).run();
    logger.log('✅ PermissionSeeder completed');

    logger.log('🌱 Running RoleSeeder...');
    await new RoleSeeder(dataSource).run();
    logger.log('✅ RoleSeeder completed');

    logger.log('🎉 Database seeding completed successfully');

    await app.close();

    logger.log('👋 Seeder process finished');
    process.exit(0);
  } catch (error) {
    const logger = new Logger('Seeder');

    logger.error('❌ Seeder execution failed', error?.stack || error);

    process.exit(1);
  }
}

bootstrap();
