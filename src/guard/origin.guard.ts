import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class OriginGuard implements CanActivate {
  private readonly whitelist = process.env.CORS_WHITELIST?.split(',') || [];

  private compileRegex(origin: string): RegExp {
    return new RegExp(`^https?://${origin.replace('*.', '([a-z0-9-]+\\.)*')}$`);
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const origin = request.headers.origin;

    // 允许无origin的请求
    if (!origin) return true;
    return true
    // 白名单验证
    return this.whitelist.some(pattern => {
      return pattern.includes('*') 
        ? this.compileRegex(pattern).test(origin)
        : origin === pattern;
    });
  }
}