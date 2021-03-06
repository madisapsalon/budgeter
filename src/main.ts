import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe({
    validationError: {
      target: false,
      value: false,
    },
  }));

  const port: number = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Budgeter API is running on port ${ port }`);
}
bootstrap();
