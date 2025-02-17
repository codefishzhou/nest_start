import { WebSocketGateway, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { WsService } from './ws.service';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from './ws-auth.guard';

@UseGuards(WsAuthGuard)
@WebSocketGateway({
  port: 3060,
  namespace: '/worknotes',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
    credentials: true
  },
  transports: ['websocket'],
  serveClient: false
})
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  constructor(private readonly wsService: WsService) {}


  // server 实例
  @WebSocketServer()
  server: Server;
  /**
   * 用户连接上
   * @param client client
   * @param args
   */
  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    console.log('握手详情:', client.handshake);
    console.log('认证令牌:', client.handshake.auth.token);
    console.log('请求头:', client.handshake.headers);
    // 注册用户
    const token = client.handshake?.auth?.token ?? client.handshake?.headers?.authorization    
    return this.wsService.login(client, token)
  }

  /**
   * 用户断开
   * @param client client
   */
  handleDisconnect(client: Socket) {
    // 移除数据 socketID
    this.wsService.logout(client)
  }

  /**
   * 初始化
   * @param server
   */
  afterInit(server: Server) {
    Logger.log('websocket init... port: ' + process.env.PORT)
    this.wsService.server = server;
    // 重置 socketIds
    this.wsService.resetClients()
  }
  
}
