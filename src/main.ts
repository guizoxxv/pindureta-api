import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLoggerService } from './modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const logger = app.get(AppLoggerService);
  const config = app.get(ConfigService);
  const port = parseInt(config.get<string>('APP_PORT', '8080'));

  logger.info(`Application started in port ${port}.`);

  await app.listen(port);
}
bootstrap();
