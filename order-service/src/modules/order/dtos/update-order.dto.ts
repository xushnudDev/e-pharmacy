import { IsOptional } from "class-validator";

export class UpdateOrderDto {
    @IsOptional()
    userId: string;

    @IsOptional()
    categoryId: number;

    @IsOptional()
    pillId: number;

    @IsOptional()
    quantity: number;

    @IsOptional()
    price: number;

    @IsOptional()
    status: string;
}