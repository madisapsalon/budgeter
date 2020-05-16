import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    validationError: {
      target: false,
      value: false,
    },
  }));
  const port: number = 3000;
  await app.listen(port);
  logger.log(`Budgeter API is running on port ${ port }`);
}
bootstrap();
