import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  EntityManager,
  QueryBuilder,
  SelectQueryBuilder,
} from 'typeorm';
import { NodesEntity } from '../../entity/nodes.entity';
import { CreateNodesDto } from './dto/create-nodes-dto';
import { GetmonthNodesDto } from './dto/getmonth-nodes-dto';
import { DeleteNotesDto } from './dto/delete-nodes-dto';

@Injectable()
export class NodesService {
  constructor(
    @InjectRepository(NodesEntity)
    private nodesRepository: Repository<NodesEntity>,
  ) {}
  async create(CreateNodesDto: CreateNodesDto): Promise<any> {
    return await this.nodesRepository.save(CreateNodesDto);
  }

  // 找出表内全部项
  findAll() {
    return this.nodesRepository.find();
  }

  //分月查询
  findMonth(GetmonthNodesDto: GetmonthNodesDto) {
    return this.nodesRepository
      .createQueryBuilder('nodes')
      .where('date like :month', { month: `${GetmonthNodesDto.month}_%` })
      .getMany();
  }

  //删除数据
  async delete(DeleteNotesDto: DeleteNotesDto): Promise<any> {
    const { ids } = DeleteNotesDto;
    return await this.nodesRepository.delete(ids);
  }

  //编辑数据
  async edit(CreateNodesDto: CreateNodesDto,id:number): Promise<any> {
    return await this.nodesRepository.update(id,CreateNodesDto);
  }
  
}
