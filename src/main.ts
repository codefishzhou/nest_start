import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OriginGuard } from './guard/origin.guard';
import { TransformInterceptor } from './logical/interceptor/transform.interceptor';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  // 根据环境变量判断
  const isDev = process.env.NODE_ENV === 'development';
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('worknotes');
  !isDev &&app.useGlobalInterceptors(new TransformInterceptor()); // 全局注册拦截器
  // 全局注册守卫
  app.useGlobalGuards(new OriginGuard());
  app.enableCors({
    origin: process.env.CORS_WHITELIST?.split(',') || [],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Max-Age', '86400');
      return res.sendStatus(204);
    }
    next();
  });
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
