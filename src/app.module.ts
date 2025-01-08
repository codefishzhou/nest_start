import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodesModule } from './logical/nodes/nodes.module';
import { AuthModule } from './logical/auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '',
      port: 3306,
      username: 'root',
      password: '',
      database: 'new_dev',
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    NodesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
