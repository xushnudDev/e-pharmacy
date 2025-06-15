import { Injectable } from '@nestjs/common';
import { PaymentClient } from './payment.client';
import { UserClient } from '../user';
import { NotificationClient } from '../notification';
import { CreatePaymentDto } from './dtos';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentClient: PaymentClient,
    private readonly userClient: UserClient,
    private readonly notificationClient: NotificationClient,
  ) {}

  async createPayment(data: CreatePaymentDto) {
    await firstValueFrom(
      await this.userClient.decreaseBalance({ id: data.userId, amount: data.amount })
    );

    const payment = await firstValueFrom(
      await this.paymentClient.createPayment(data)
    );

    await firstValueFrom(
      await this.notificationClient.sendNotification({
        userId: data.userId,
        email: data.email,
        message: `Payment was executed successfully: ${data.amount}`,
        type: 'email',
        status: 'sent',
      })
    );

    return {
      message: 'Payment created successfully',
      data: payment,
    };
  }}
