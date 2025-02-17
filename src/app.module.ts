import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NodesModule } from './logical/nodes/nodes.module';
import { AuthModule } from './logical/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WsModule } from './logical/ws/ws.module';
import configuration from '../config/configuration';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
