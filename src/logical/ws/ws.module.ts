import { Global, Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { WsService } from './ws.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../../entity/message.entity';
import { UsersEntity } from '../../entity/users.entity';
// import { WsController } from './ws.controller';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Message, UsersEntity])
  ],
  providers: [WsGateway, WsService], 
  controllers:[],      // 这个是 HTTP 服务, 可有可无
  exports: [WsService],
})
export class WsModule { }
