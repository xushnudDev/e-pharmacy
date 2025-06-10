import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdatePillDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()   
  @IsString()
  code: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @Type(() => Boolean)
  @IsBoolean()
  in_stock: boolean;
}
