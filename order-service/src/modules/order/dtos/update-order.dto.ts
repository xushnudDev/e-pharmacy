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
    totalPrice: number;

    @IsOptional()
    status: string;
}