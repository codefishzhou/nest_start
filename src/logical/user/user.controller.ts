import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  Param,
  Query,
  Delete,
  UseGuards 
} from '@nestjs/common';
import { XCommonRet } from 'xmcommon';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user-dto';
import { LoginUserDto } from './login-user-dto';
// 引入实体表
import { UsersEntity } from '../../entity/users.entity';
import { post } from '@typegoose/typegoose';
import { UpdateUserDto } from './update-user-dto';
import { RetrieveUserDto } from './retrieve-user-dto';
import { DeleteUserDto } from './delete-user-dto';
import { AuthService } from '../auth/auth.service';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // 此时访问的路径为user/all
   // 使用 'JWT' 进行验证
  @Get('all')
  @ApiOperation({ summary: '获取所有用户' })
  @HttpCode(200)
  async all() {
    // 固定了返回结构~
    const r = new XCommonRet();
    r.setData((await this.userService.findAll()).map(item=>{
      return {
        ...item,
        password: undefined
      }
    }));
    return r;
  }

  
   // 使用 'JWT' 进行验证
  @ApiTags('users')
  @Get(':id')
  @ApiOperation({ summary: '根据id获取用户' })
  async findOne(@Param() params: RetrieveUserDto) {
    const r = new XCommonRet();
    r.setData(await this.userService.findOne(params.id));
    return r;
  }

  
   // 使用 'JWT' 进行验证
  @ApiTags('users')
  @HttpCode(200)
  @Post('create')
  @ApiOperation({ summary: '用户注册' })
  async create(@Body() LoginUserDto: LoginUserDto): Promise<UsersEntity> {
    return await this.userService.create(LoginUserDto);
  }

  
   // 使用 'JWT' 进行验证
  @ApiTags('users')
  @Post('find-by-name')
  @ApiOperation({ summary: '根据name获取用户' })
  async findByName(@Body() body: LoginUserDto) {
    return await this.userService.findOneByName(body.name);
  }

  @ApiTags('users')
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: '获取token登录' })
  async logins(@Body() loginParmas: LoginUserDto): Promise<any> {
    console.log(loginParmas, 'data');
    const authResult = await this.authService.validateUser(
      loginParmas.name,
      loginParmas.password,
    );
    console.log(authResult,'result')
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(LoginUserDto);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }

  
   // 使用 'JWT' 进行验证
  @ApiTags('user')
  @Post('verity')
  @HttpCode(200)
  @ApiOperation({ summary: '无token登录' })
  async loginToken(@Body() body: LoginUserDto) {
    const r = new XCommonRet();
    return this.userService.loginNoToken(body);
  }

  
   // 使用 'JWT' 进行验证
  @ApiTags('users')
  @Delete('delete')
  @ApiOperation({ summary: '删除用户' })
  async delete(@Body() DeleteUserDto: DeleteUserDto): Promise<any> {
    const r = new XCommonRet();
    r.setData(await this.userService.delete(DeleteUserDto));
  }

  //修改用户
   // 使用 'JWT' 进行验证
  @ApiTags('users')
  @Post(':id')
  @HttpCode(200)
  @ApiOperation({ summary: '修改/更新用户' })
  async update(
    @Param() params: RetrieveUserDto,
    @Body() UpdateUserDto: UpdateUserDto,
  ): Promise<any> {
    return await this.userService.update({ id: params.id, UpdateUserDto });
  }
}
