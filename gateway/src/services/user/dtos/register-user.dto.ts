import { IsArray, IsIn, IsNotEmpty, IsString } from "class-validator";
import { Roles } from "../../enum";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phone: string;

    // @ApiProperty()
    // @IsArray()
    // @IsIn([Roles.ADMIN, Roles.CUSTOMER])
    // role: Roles.CUSTOMER
}