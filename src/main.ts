import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //==========================================================
  // Implementing Versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  //==========================================================
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //======================================================
  // CORS Resolved
  app.enableCors({
    // origin: process.env.FRONTEND_URL,
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  //======================================================
  //Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Car Management Applicaton')
    .setDescription(
      'Spyne Assignment Car Management Application API description',
    )
    .setVersion('1.0')
    .addTag('users')
    .build();
  //======================================================
  //======================================================
  //======================================================

  const documentV1 = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentV1);
  console.log('url: ', 'http://localhost:3000/');
  await app.listen(process.env.PORT ?? 3000);
  return app.getHttpServer();
}
// bootstrap();
export default bootstrap();
