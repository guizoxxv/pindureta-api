import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLoggerService } from './modules/logger/logger.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  const logger = app.get(AppLoggerService);
  const config = app.get(ConfigService);
  const nodeEnv = config.get<string>('NODE_ENV');
  const port = parseInt(config.get<string>('APP_PORT', '8080'));

  // Swagger
  if (nodeEnv === 'development') {
    const options = new DocumentBuilder()
      .setTitle('pindureta')
      .setDescription('REST API of an small vending spot for trustfull users.')
      .setVersion('1.0.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  logger.info(`Application started in port ${port}.`);

  await app.listen(port);
}
bootstrap();
