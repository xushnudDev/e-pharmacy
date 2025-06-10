import { ApiProperty } from "@nestjs/swagger";

export class CreatePillDto {
    @ApiProperty({
        description: 'The name of the pill',
        example: 'Paracetamol'
    })
    name: string;

    @ApiProperty({
        description: 'The description of the pill',
        example: 'A pill that helps to relieve pain'
    })
    description: string;

    @ApiProperty({
        description: 'The code of the pill',
        example: 'P001'
    })
    code: string;

    @ApiProperty({
        description: 'The price of the pill',
        example: 1000
    })
    price: number

    @ApiProperty({
        description: 'The quantity of the pill',
        example: 10
    })
    quantity: number

    @ApiProperty()
    categoryId: number;

    @ApiProperty()
    userId: string;

    @ApiProperty({
        description: "The status of the pill",
        example: true
    })
    in_stock: boolean;
}