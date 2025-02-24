import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Log4jsLogger } from '../libs/log4js/logger.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Log4jsLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { method, originalUrl, ip, headers } = req;

    // 请求开始日志
    this.logger.log(`[${method}] ${originalUrl} from ${ip} - Started`);

    res.on('finish', () => {
      const duration = Date.now() - start;
      const { statusCode } = res;
      const logMessage = `[${method}] ${originalUrl} - ${statusCode} ${duration}ms - UA: ${headers['user-agent']}`;

      // 根据状态码区分日志级别
      if (statusCode >= 500) {
        this.logger.error(logMessage, '');
      } else if (statusCode >= 400) {
        this.logger.warn(logMessage);
      } else {
        this.logger.log(logMessage);
      }
    });

    next();
  }
}