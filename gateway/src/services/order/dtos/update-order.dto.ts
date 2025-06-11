import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateOrderDto {
    @ApiPropertyOptional()
    @IsOptional()
    userId: string;

    @ApiPropertyOptional()
    @IsOptional()
    categoryId: number;

    @ApiPropertyOptional()
    @IsOptional()
    pillId: number;

    @ApiPropertyOptional()
    @IsOptional()
    quantity: number;

    @ApiPropertyOptional()
    @IsOptional()
    price: number;

    @ApiPropertyOptional()
    @IsOptional()
    status: string;
}