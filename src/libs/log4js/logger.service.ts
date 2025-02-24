import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import * as log4js from 'log4js';
import {log4configuration} from '../../../config/configuration';

@Injectable()
export class Log4jsLogger implements NestLoggerService {
  private logger: log4js.Logger;

  constructor() {
    log4js.configure(log4configuration().log4js); // 使用你的配置
    this.logger = log4js.getLogger();
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(`${message}\n${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.trace(message);
  }

  httpLog(context: string, message: string) {
    this.logger.info(`[HTTP] ${context} - ${message}`);
  }
}