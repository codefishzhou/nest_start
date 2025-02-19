import { WebSocketGateway, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { WsService } from './ws.service';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from './ws-auth.guard';

@UseGuards(WsAuthGuard)
@WebSocketGateway({
  port: 3050,
  namespace: 'ws',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization'],
    credentials: true
  },
  transports: ['websocket'],
  serveClient: false,
  pingInterval: 10000,  // 每10秒发送心跳
  pingTimeout: 5000    // 5秒无响应视为超时
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
    
    // 增加详细的token验证日志
    const token = client.handshake?.auth?.token ?? client.handshake?.headers?.authorization;
    console.log('原始Token:', token);
    console.log('请求头Authorization:', client.handshake.headers.authorization);
    
    // 增加关闭事件监听
    client.on('disconnect', (reason) => {
        console.log(`Client ${client.id} disconnected:`, reason);
    });

    // 增加错误事件监听
    client.on('error', (error) => {
        console.error(`Client ${client.id} error:`, error);
    });
    
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
    // 修正为读取实际配置的端口
    Logger.log(`websocket init... port: 3060`)
    this.wsService.server = server;
    // 重置 socketIds
    this.wsService.resetClients()
  }
  
}
