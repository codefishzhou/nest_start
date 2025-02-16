import { NodesService } from './nodes.service';
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
import * as ExcelJS from 'exceljs';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateNodesDto } from './dto/create-nodes-dto';
import { NodesEntity } from 'src/entity/nodes.entity';
import { GetmonthNodesDto } from './dto/getmonth-nodes-dto';
import { DeleteNotesDto } from './dto/delete-nodes-dto';
import { AuthGuard } from '@nestjs/passport';
import { editNodesDto } from './dto/edit-nodes-dto';
import { query } from 'express';

@Controller('nodes')
export class NodesController {
  constructor(private readonly NodesService: NodesService) {}

  
   // 使用 'JWT' 进行验证
  @ApiTags('nodes')
  @Post('create')
  @HttpCode(200)
  @ApiOperation({ summary: '增加' })
  async create(@Body() CreateNodesDto: CreateNodesDto): Promise<NodesEntity> {
    return await this.NodesService.create(CreateNodesDto);
  }

  
   // 使用 'JWT' 进行验证
  @Get('all')
  @ApiTags('nodes')
  @ApiOperation({ summary: '获取所有记录' })
  @HttpCode(200)
  async all() {
    // 固定了返回结构~
    const r = new XCommonRet();
    r.setData(await this.NodesService.findAll());
    return r;
  }

  
   // 使用 'JWT' 进行验证
  @Post('get-by-month')
  @ApiTags('nodes')
  @ApiOperation({ summary: '根据月分获取记录' })
  @HttpCode(200)
  async findMonth(@Body() GetmonthNodesDto: GetmonthNodesDto) {
    // 固定了返回结构~
    const r = new XCommonRet();
    r.setData(await this.NodesService.findMonth(GetmonthNodesDto));
    return r;
  }

  
   // 使用 'JWT' 进行验证
  @Post('export')
  @ApiTags('nodes')
  @ApiOperation({ summary: '导出记录' })
  @HttpCode(200)
  async export(CreateNodesDto: CreateNodesDto): Promise<ArrayBuffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('excel表格');
    // 定义表头名称和字段名
    worksheet.columns = [
      { header: 'ID', key: 'id' },
      { header: '输入日期', key: 'date', width: 12 },
      { header: '周', key: 'zhou' },
      { header: '肖', key: 'xiao' },
      { header: '万', key: 'wan' },
      { header: '总计', key: 'total' },
      { header: '该记录创建时间', key: 'createDate', width: 12 },
      { header: '备注', key: 'remark' },
    ];
    const result = []; // result是通过前端传递的ids从数据库获取需要导出的信息
    let resultData =await this.NodesService.findAll()
    // workbook.data(“A1”,data,bold)
    result.push(...resultData)
    worksheet.addRows(resultData);
    let data = workbook.xlsx.writeBuffer();
    return data;
  }

  
   // 使用 'JWT' 进行验证
  @ApiTags('nodes')
  @Delete('delete')
  @ApiOperation({ summary: '删除记录' })
  async delete(@Body() DeleteNotesDto: DeleteNotesDto): Promise<any> {
    const r = new XCommonRet();
    r.setData(await this.NodesService.delete(DeleteNotesDto));
  }

  //编辑接口切记放在最下面
   // 使用 'JWT' 进行验证
  @ApiTags('nodes')
  @HttpCode(200)
  @Post(':id')
  @ApiOperation({ summary: '编辑记录' })
  async edit(
    @Body() CreateNodesDto: CreateNodesDto,
    @Param() param: editNodesDto,
  ): Promise<any> {
    const r = new XCommonRet();
    r.setData(await this.NodesService.edit(CreateNodesDto, param.id));
  }
}
