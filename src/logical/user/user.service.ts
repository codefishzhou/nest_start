import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  EntityManager,
  QueryBuilder,
  SelectQueryBuilder,
  getConnection,
} from 'typeorm';
import { XCommonRet } from 'xmcommon';
// 引入实体表
import { UsersEntity } from '../../entity/users.entity';
import { CreateUserDto } from './create-user-dto';
import { DeleteUserDto } from './delete-user-dto';
import { LoginUserDto } from './login-user-dto';
import { jwtConstants } from '../auth/constants';
import { encryptPassword } from '../../utils/cryptogram';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}
  // 找出表内全部项
  async findAll() {
    return this.usersRepository.find();
  }
  //找出Id为某值得数据
  findOne(id) {
    return this.usersRepository.findOneById(id);
  }

  async login(LoginUserDto: LoginUserDto) {
    const { name, password } = LoginUserDto;
    return await this.usersRepository
      .createQueryBuilder('users')
      .where('name = :name', { name: name })
      .getMany();
  }

  async loginNoToken(LoginUserDto: LoginUserDto) {
    let data = await this.usersRepository
      .createQueryBuilder('users')
      .where('name = :name and password =:password', {name: LoginUserDto.name,password: LoginUserDto.password,})
      .getMany();
      if(data){
        return data
      }
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

  findOneByName(name: string): Promise<any> {
    return this.usersRepository
      .createQueryBuilder('users')
      .where('name = :name', { name: name })
      .getOne();
  }

  findOneByNames(LoginUserDto: LoginUserDto): Promise<any> {
    return this.usersRepository
      .createQueryBuilder('users')
      .where('name = :name', { name: name })
      .getOne();
  }

  addOne(data) {
    return this.usersRepository
      .createQueryBuilder()
      .insert() //声明插入操作
      .into(UsersEntity) //插入的实体
      .values(
        //插入的值，可插入多个
        [
          {
            name: data.name,
            id: data.id,
            status: data.status,
            password: data.password,
          },
        ],
      )
      .execute(); //执行
  }
  async create(LoginUserDto: LoginUserDto): Promise<any> {
    const {name,password} = LoginUserDto
    let hardPassword = encryptPassword(password,jwtConstants.salt)
    return await this.usersRepository.save({password:hardPassword,name});
  }
  //  更新数据
  async update(updateUserDate): Promise<any> {
    const { id, UpdateUserDto } = updateUserDate;
    let data =await this.usersRepository
    .createQueryBuilder('users')
    .where('id = :id', { id: id })
    .getOne();
    if(!data){
      return {
        code:'500',
        msg:'当前用户不存在'
      }
    }
    console.log(data,'user')
    return await this.usersRepository.update(id, UpdateUserDto);
  }

  //删除数据
  async delete(DeleteUserDto: DeleteUserDto): Promise<any> {
    const { ids } = DeleteUserDto;
    return await this.usersRepository.delete(ids);
  }
}
