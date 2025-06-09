import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateCategoryDto {
    @ApiPropertyOptional({
        example: 'Category name',
        description: 'The name of the category',
        type: String,
        required: false,
    })
    @IsString()
    name?: string;

    @ApiPropertyOptional({
        example: 'Category description',
        description: 'The description of the category',
        type: String,
        required: false,
    })
    @IsString()
    description?: string
}