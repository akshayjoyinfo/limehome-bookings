import { HttpStatus, RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { bold } from 'colorette';
import { AppModule } from './app.module';
import { IConfigService } from './global/config/config.adapter';
import { DEFAULT_TAG, SWAGGER_API_ROOT } from './utils/docs/constants';
import { AppExceptionFilter } from './utils/filters/app-exception.filter';
import { ExceptionInterceptor } from './utils/interceptors/exceptions/http-exception.interceptor';
import { HttpLoggerInterceptor } from './utils/interceptors/loggers/http-logger.interceptor';
import { Logger } from 'nestjs-pino';
import { LimeHomeValidationPipe } from './global/pipes/lime-home-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  });

  app.useLogger(app.get(Logger));

  app.useGlobalPipes(
    new LimeHomeValidationPipe({
      transform: true, transformOptions: {enableImplicitConversion: true} 
    }),
  );

  app.useGlobalInterceptors(
    new ExceptionInterceptor(),
    new HttpLoggerInterceptor(),
  );

  const configService = app.get(IConfigService);
  const PORT = configService.get('API_PORT');
  const ENV = configService.get('NODE_ENV');

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  const config = new DocumentBuilder()
    .setTitle('LimeHome API')
    .setDescription('Swagger Documentation for LimeHome Bookings API')
    .setVersion('v1')
    .addTag(DEFAULT_TAG)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);

  console.log(
    `🟢 LimeHome Bookings API listening at ${bold(PORT)} on ${bold(
      ENV?.toUpperCase(),
    )} 🟢\n`,
  );

  await app.listen(process.env.PORT || PORT);

  const openApiURL = `/${SWAGGER_API_ROOT}`;

  console.log(`🔵 swagger listening at ${bold(openApiURL)}`);
}
bootstrap();
