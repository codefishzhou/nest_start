import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UsersEntity } from '../../entity/users.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
// 创建了User.module.ts，注意整个module需要在app.modules.ts引入哦~
@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [UserService,AuthService,JwtService],
  controllers: [UserController],
  exports: [TypeOrmModule], 
})
export class UserModule {}