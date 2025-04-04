import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // удалит лишние поля
    forbidNonWhitelisted: true, // ошибка, если поле лишнее
    transform: true, // приведёт типы (например, строку в число)
  }));

  
  
  const config = new DocumentBuilder()
  .setTitle('My API')
  .setDescription('Автогенерация через Swagger')
  .setVersion('1.0')
  .addTag('users')
    .addTag('documents')
    .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    
  app.enableCors();
  await app.listen(3006);
}
bootstrap();
