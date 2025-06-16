import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsBoolean } from "class-validator";
import { Type } from "class-transformer";

export class CreatePillDto {
  @ApiProperty({ description: 'The name of the pill', example: 'Paracetamol' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The description of the pill', example: 'A pill that helps to relieve pain' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'The code of the pill', example: 'P001' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ description: 'The price of the pill', example: 1000 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'The quantity of the pill', example: 10 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  categoryId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: "The status of the pill", example: true })
  @IsNotEmpty()
  @Type(() => Boolean)
  @IsBoolean()
  in_stock: boolean;
}
