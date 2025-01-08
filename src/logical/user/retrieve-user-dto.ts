import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class RetrieveUserDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number;
}
