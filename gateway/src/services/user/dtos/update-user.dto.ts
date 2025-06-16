import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRoles } from 'src/services/enum';

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
  balance: number;

  @ApiPropertyOptional()
  @IsEnum(UserRoles)
  @IsOptional()
  role: UserRoles;
}
