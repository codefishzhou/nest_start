import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodesModule } from './logical/nodes/nodes.module';
import { AuthModule } from './logical/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV}`,  // 显式指定可能的环境文件
        '.env'                           // 添加默认fallback
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.username,
      password: process.env.password,
      database: 'nestAi',
      synchronize: false, // 数据库同步, 生产环境需要设置为false - 开发环境设置为true
      autoLoadEntities: true, // 自动加载模块注册的实体
      driver: require('mysql2'),
    }),
    UserModule,
    NodesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
