import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Roles } from '../../enum';

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

  @ApiPropertyOptional()
  @IsEnum(Roles)
  @IsOptional()
  role: Roles;
}
