import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { WSResponse } from '../../message/model/ws-response.model';
import { validateToken } from '../../utils/jwt';
import { Message } from '../../entity/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../entity/users.entity';
import { HashUtil } from '../../common/utils/hash.util';
import { encryptPassword } from '../../utils/cryptogram';
/**
 * 消息类型，0 用户消息, 1 系统消息，2 事务消息
 */
enum MessageType {
  person = 0,
  system = 1,
  transactional = 2
}

/**
 * WebSocket 订阅地址
 */
enum MessagePath {
  /**
   * 用户消息, 系统消息, 事务消息
   */
  message = 'message',
  /**
   * 错误通知
   */
  error = 'error'
}

@Injectable()
export class WsService {
  constructor(
    @InjectRepository(Message) private messageRepo: Repository<Message>,
    @InjectRepository(UsersEntity) private userRepo: Repository<UsersEntity>,
  ) { }

  // ws 服务器, gateway 传进来
  server: Server;

  // 存储连接的客户端
  connectedClients: Map<string, Socket> = new Map();
  /**
   * 登录
   * @param client socket 客户端
   * @param token token
   * @returns
   */
  async login(client: Socket, token: string): Promise<void> {
    console.log('token: ', token)
    if (!token) {
      Logger.error('token error: ', token)
      client.send('token error')
      client.disconnect()
      return
    }
    
    // 认证用户
    const res: any = validateToken(token.replace('Bearer ', ''))
    if (!res) {
      Logger.error('token 验证不通过')
      client.send('token 验证不通过')
      client.disconnect()
      return
    }

    const { name, password } = res
    if (!name || !password) {
      Logger.log('token 缺少必要字段')
      client.send('token 无效')
      client.disconnect()
      return
    }

    // 验证用户存在性
    const user = await this.userRepo.findOne({ where: { name } })
    if (!user) {
      Logger.error('用户不存在', name)
      client.send('用户不存在')
      client.disconnect()
      return
    }

    // 密码验证流程
    const md5Password = HashUtil.md5(password)
    const hardPassword = encryptPassword(md5Password, process.env.JWT_SALT)
    if (user.password !== hardPassword) {
      Logger.error('密码验证失败', name)
      client.send('密码错误')
      client.disconnect()
      return
    }

    // 处理多端登录
    if (this.connectedClients.get(name)) {
      this.connectedClients.get(name).send(`${name} 已在其他客户端登录，当前连接将被断开`)
      this.connectedClients.get(name).disconnect()
    }

    // 保存连接
    this.connectedClients.set(name, client)
    Logger.log(`${name} 连接成功，当前在线用户: ${this.connectedClients.size}`)
    client.send(`${name} 认证成功，当前在线用户: ${this.connectedClients.size}`)
  }

  /**
   * 登出
   * @param client client
   */
  async logout(client: Socket) {
    // 移除在线 client
    this.connectedClients.forEach((value, key) => {
      if (value === client) {
        this.connectedClients.delete(key);
        Logger.log(`${key} disconnected, onLine: ${this.connectedClients.size}`)
      }
    });
  }
  /**
   * 重置 connectedClients
   */
  resetClients() {
    this.connectedClients.clear()
  }

  /**
   * 发送公共消息(系统消息)
   * @param messagePath 发布地址
   * @param response 响应数据
   */
  async sendPublicMessage(response: WSResponse) {
    try {
      // const message = await this.messageRepo.save(response.data)
      // if (!message) {
      //   throw new Error('消息保存错误')
      // }
      const res = this.server?.emit(response.path, response)
      if (!res) {
        Logger.log('websocket send error', response)
      }
    } catch (error) {
      throw new Error(error?.toString())
    }
  }

  /**
   * 发送私人消息(事务消息、个人消息)
   * @param messagePath 发布地址
   * @param response 响应数据
   * @param name 接收者工号
   */
  async sendPrivateMessage(response: WSResponse, name: string) {
    try {
      // const message = await this.messageRepo.save(response.data)
      // if (!message) {
      //   throw new Error('消息保存错误')
      // }
      const res = this.connectedClients.get(name)?.emit(response.path, response)
      if (!res) {
        Logger.log('websocket send error', response)
      }
    } catch (error) {
      throw new Error(error?.toString())
    }
  }

  /**
   * 发送事务消息通知
   * @param message 消息
   */
  sendTransactionWs(message: Message) {
    try {      
      const wsRes = new WSResponse(MessagePath.message, message.title, message)
      this.sendPrivateMessage(wsRes, message.receiver.name)
    } catch (error) {
      Logger.debug('发送事务消息通知', error)
    }
  }
}
