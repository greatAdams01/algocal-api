import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const devOrigins = [
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
  ];
  const prodOrigins = [
  ];

  const origin = devOrigins

  const PORT = process.env.PORT || 8000;
  app.use(express.json({ limit: '50mb' }));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    Logger.log(`server started on port ${PORT}`);
  });
}
bootstrap();
