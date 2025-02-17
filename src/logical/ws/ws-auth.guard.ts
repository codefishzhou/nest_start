import { CanActivate, ExecutionContext } from '@nestjs/common';

export class WsAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    const token = client.handshake.auth.token?.split(' ')[1];
    
    // 这里添加实际的token验证逻辑
    if (!token) throw new Error('未提供认证令牌');
    return true; // 临时返回true通过验证
  }
}