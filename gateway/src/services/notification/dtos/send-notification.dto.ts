import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateNotificationDto {
    @ApiProperty({
        description: "User Id",
        example: "123456789"
    })
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty({
        description: "Message",
        example: "Hello World"
    })
    @IsNotEmpty()
    @IsString()
    message: string;

    @ApiProperty({
        description: "Email",
        example: "example@gmail.com"
    })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({
        description: "Type",
        example: "email"
    })
    @IsNotEmpty()
    @IsString()
    type: string;

    @ApiProperty({
        description: "Status",
        example: "sent"
    })
    @IsNotEmpty()
    @IsString()
    status: string;
}