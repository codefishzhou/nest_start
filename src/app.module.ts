import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NodesModule } from './logical/nodes/nodes.module';
import { AuthModule } from './logical/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WsModule } from './logical/ws/ws.module';
import configuration from '../config/configuration';
import { Log4jsLogger } from './libs/log4js/logger.service';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
// import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV}`,  // 显式指定可能的环境文件
        '.env'                           // 添加默认fallback
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configuration() as unknown as TypeOrmModuleOptions),
    UserModule,
    NodesModule,
    AuthModule,
    WsModule,
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'node_modules', 'swagger-ui-dist'),
    //   serveRoot: '/swagger-assets',
    // }),
  ],
  controllers: [AppController],
  providers: [AppService, Log4jsLogger],
  exports: [Log4jsLogger]
})
export class AppModule implements NestModule {
  constructor(private readonly logger: Log4jsLogger) {}

  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(RequestLoggerMiddleware)
    //   .forRoutes('*'); // 应用到所有路由
      
    // this.logger.log('Request logger middleware initialized');
  }
}
