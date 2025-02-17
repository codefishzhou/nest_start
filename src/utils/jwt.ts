import { JwtPayload, verify } from 'jsonwebtoken';
import { Logger } from '@nestjs/common';

export interface JwtInterface {
  name: string;
  password: string;
}

export function validateToken(token: string): JwtInterface | null {
  try {
    return verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256']
    }) as JwtInterface;
  } catch (e) {
    Logger.error(`JWT验证失败: ${e.message}`, e.stack);
    return null;
  }
} 