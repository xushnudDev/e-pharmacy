import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        example: 'Category name',
        description: 'The name of the category',
        type: String,
        required: true,
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: 'Category description',
        description: 'The description of the category',
        type: String,
        required: true,
    })
    @IsString()
    description: string
}