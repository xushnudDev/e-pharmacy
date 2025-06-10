import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Roles } from "../../enum";

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

    // @ApiProperty({enum: Roles,default: Roles.CUSTOMER})
    // @IsNotEmpty()
    // role: Roles
    

}