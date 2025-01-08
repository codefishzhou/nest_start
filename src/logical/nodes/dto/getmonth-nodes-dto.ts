import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
export class GetmonthNodesDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  month: string;

}
