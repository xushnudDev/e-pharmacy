import { IsArray, IsIn, IsNotEmpty, IsString } from "class-validator";
import { Roles } from "src/modules/enums";

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    // @IsArray()
    // @IsIn([Roles.ADMIN, Roles.CUSTOMER])
    // role: Roles.CUSTOMER
}