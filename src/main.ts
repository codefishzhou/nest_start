import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './logical/interceptor/transform.interceptor';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  // 根据环境变量判断
  const isDev = process.env.NODE_ENV === 'development';
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('worknotes');
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('worknotes')
    .setDescription('供后台管理界面调用的服务端API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  console.log('isDev', isDev);
  // if (isDev) {
  //   document.security = [];
  //   document.components.securitySchemes = {};
  // }
  await app.listen(3050);
  console.log('http://localhost:3050');
  console.log('http://localhost:3050/api-docs');
  console.log('http://0.0.0.0:3050');
  console.log('http://0.0.0.0:3050/api-docs');
}
bootstrap();
