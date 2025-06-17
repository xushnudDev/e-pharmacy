import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchPillDto {
  @ApiProperty({ description: "name", example: "Paracetamol", required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: "code", example: "P001", required: false })
  @IsString()
  @IsOptional()
  code?: string;
}