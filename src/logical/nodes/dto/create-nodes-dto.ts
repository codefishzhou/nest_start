import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
export class CreateNodesDto {
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  zhou: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  xiao: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  wan: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  total: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  date: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  remark: string;

}
