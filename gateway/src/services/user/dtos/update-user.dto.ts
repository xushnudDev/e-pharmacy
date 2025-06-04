import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsString()
  lastname: string;

  @ApiPropertyOptional()
  @IsString()
  firstname: string;

  @ApiPropertyOptional()
  @IsString()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  password: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone: string;
}
