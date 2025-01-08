import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';
//   import { PhotoEntity } from '../photo/photo.entity';

@Entity({ name: 'nodes' }) //数据表的名字
export class NodesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: ''})
  zhou: string;

  @Column({ default: '' })
  wan: string;

  @Column({ default: '' })
  xiao: string;

  @Column({ default: '' })
  total: string;

  @Column({ default: '' })
  remark: string;

  @Column({ default: '' })
  date: string;

  @CreateDateColumn({ default: '' })
  createDate: string;
}
