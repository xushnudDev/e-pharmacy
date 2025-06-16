import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dtos';
import { Protected, Roles } from 'src/decorator';
import { UserRoles } from '../enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiBearerAuth()
  @Post()
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  async createPayment(@Body() data: CreatePaymentDto) {
    return this.paymentService.createPayment(data);
  }
}
