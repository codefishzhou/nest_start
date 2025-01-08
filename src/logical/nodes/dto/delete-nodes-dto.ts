import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteNotesDto {
  @ApiProperty()
  @IsArray()
  ids: [];
}
