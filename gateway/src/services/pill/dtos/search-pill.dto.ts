import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchPillDto {
  @ApiPropertyOptional({ description: "Pill name", example: "Paracetamol" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: "Pill code", example: "P001" })
  @IsOptional()
  @IsString()
  code?: string;
}
