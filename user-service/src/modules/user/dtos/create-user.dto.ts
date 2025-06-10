import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Roles } from "src/modules/enums";

export class CreateUserDto {
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

    // @IsEnum(Roles)
    // role: Roles;
}
