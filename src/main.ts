import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OriginGuard } from './guard/origin.guard';
import { TransformInterceptor } from './logical/interceptor/transform.interceptor';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';
import { Log4jsLogger } from './libs/log4js/logger.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  // 根据环境变量判断
  const isDev = process.env.NODE_ENV === 'development';
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('worknotes');
  !isDev &&app.useGlobalInterceptors(new TransformInterceptor()); // 全局注册拦截器
  // 全局注册守卫
  app.useGlobalGuards(new OriginGuard());
  app.useLogger(app.get(Log4jsLogger));
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
  app.useStaticAssets(join(__dirname, '..', 'node_modules', 'swagger-ui-dist'), {
    prefix: '/',
  });
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'API Docs',
    customCssUrl: '/swagger-ui.css',
    customJs: [
      '/swagger-ui-bundle.js',
      '/swagger-ui-standalone-preset.js'
    ]
  });
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
