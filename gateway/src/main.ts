import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from './filter';
import { JwtAuthGuard, RolesGuard } from './guard';
import { NotAcceptableException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionFilter());

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));

  app.enableCors({
    allowedHeaders: ['authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
    origin: (reqOrigin, callBack) => {
      const allowedOrigin = process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',')
        : ['*'];

      if (allowedOrigin.includes(reqOrigin) || allowedOrigin.includes('*')) {
        return callBack(null, true);
      } else {
        callBack(
          new NotAcceptableException(`${reqOrigin} is not allowed by CORS`),
        );
      }
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('E-Pharmacy Microservice')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = Number(process.env.APP_PORT) || 3000;
  app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}/api`);
  });
}
bootstrap();
