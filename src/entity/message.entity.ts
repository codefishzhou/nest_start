import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UsersEntity } from './users.entity';

enum MessageType {
  person = 0,
  system = 1,
  transactional = 2
}// 注意实际路径可能需要调整
//   import { PhotoEntity } from '../photo/photo.entity';

@Entity({ name: 'users' }) //数据表的名字
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '消息标题' })
  title: string;

  @Column({ type: 'text', comment: '消息内容' })
  content: string;

  @Column({ 
    type: 'enum',
    enum: MessageType,
    default: MessageType.person,
    comment: '消息类型 0-个人 1-系统 2-事务'
  })
  type: MessageType;

  @ManyToOne(() => UsersEntity, user => user.messages)
  receiver: UsersEntity;

  @CreateDateColumn({ comment: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: Date;
}
