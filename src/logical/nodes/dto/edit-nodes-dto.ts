import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
export class editNodesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
