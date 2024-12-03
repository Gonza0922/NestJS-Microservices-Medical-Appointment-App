import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RcpExceptionFilter } from './common/rcp-exception.filter';
import { envs } from './config/envs';

//Gateway
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new RcpExceptionFilter());

  //Swagger
  const options = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription(
      'API Gateway that manages the endpoints of all microservices',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  console.log('el token secure del gateway es: ' + envs.tokenSecure);
  console.log('el serve NATS del gateway es: ' + envs.natsServer);

  await app.listen(3000);
}
bootstrap();
