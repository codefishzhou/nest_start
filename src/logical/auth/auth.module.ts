import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { APP_GUARD } from '@nestjs/core';
import { DevAuthGuard } from './auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '8h' }, // token 过期时效
    }),
    UserModule
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    {
      provide: APP_GUARD,
      useClass: DevAuthGuard
    }
  ],
  exports: [AuthService],
})
export class AuthModule {}