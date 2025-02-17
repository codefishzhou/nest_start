// 创建新的守卫 (建议新建文件)
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { jwtConstants } from '../../../config/auth';
@Injectable()
export class DevAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 开发环境跳过验证
    if (process.env.NODE_ENV === 'development') {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    // 拼接全局前缀后的完整路径
    const fullPath = `/worknotes${request.path}`;
    
    // 同时检查原始路径和带前缀路径
    if (jwtConstants.authWhiteList.some(path => 
      path === request.path || path === fullPath
    )) {
      return true;
    }
    
    return super.canActivate(context);
  }
}