import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRoles } from 'src/services/enum';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsInt()
  balance: number;

  @ApiProperty({ enum: UserRoles, default: UserRoles.CUSTOMER })
  @IsNotEmpty()
  role: UserRoles;
}
