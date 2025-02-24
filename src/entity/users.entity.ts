import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
//   import { PhotoEntity } from '../photo/photo.entity';
import { Message } from './message.entity';

@Entity({ name: 'users' }) //数据表的名字
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, default: '1' }) //字段及相关限制
  name: string;

  @Column({ length: 32, default: '123456' })
  password: string;

  @Column({ length: 255,default: '1' })
  status: string;

  @Column({ length: 255,default: new Date() })
  createDate: string;

  @OneToMany(() => Message, (message) => message.receiver)
  messages: Message[];
}
