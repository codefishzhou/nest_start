import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY || 'shimanuo11.11',
    });
  }
  
  // JWT验证 - Step 4: 
  /**
   * 
   * @param payload {name:'用户名',password:'密码'}
   * @returns 
   */
  async validate(payload: any) {
    console.log(`JWT验证 - Step 4: 被守卫调用`);
    return { username: payload.name, password: payload.password};
  }
}