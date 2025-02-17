// src/logical/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '../../utils/cryptogram';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(name: string, password: string): Promise<any> {
    console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.usersService.findOneByName(name);
    if (user) {
      const hashedPassword = user.password;
      const salt = process.env.JWT_SALT;
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const hashPassword = encryptPassword(password, salt);
      if (hashedPassword === hashPassword) {
        console.log('correct')
        // 密码正确
        return {
          code: 1,
          user,
        };
      } else {
        console.log('error')
        // 密码错误
        return {
          code: 2,
          user: null,
        };
      }
    }
    // 查无此人
    return {
      code: 3,
      user: null,
    };
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    const payload = {
      username: user.name, sub: user.password, realName: user.id, role: user.status
    };
    console.log('JWT验证 - Step 3: 处理 jwt 签证', payload);
    try {
      const token = this.jwtService.sign(payload, { 
        secret: process.env.JWT_SECRET_KEY,
        algorithm: 'HS256'
      });
      console.log(token,'token')
      return {
        code: 200,
        data: {
          token,
        },
        msg: `登录成功`,
      };
    } catch (error) {
      console.log(error,'error')
      return {
        code: 600,
        msg: `账号或密码错误`,
      };
    }
  }
}
