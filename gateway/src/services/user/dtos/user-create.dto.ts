import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

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

}