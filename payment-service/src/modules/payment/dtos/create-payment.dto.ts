import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  orderId: number;

  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  type: string; // 'debit', 'credit', 'transfer'

  @IsString()
  email: string;

  @IsString()
  message: string;

  @IsString()
  status: string;
}
