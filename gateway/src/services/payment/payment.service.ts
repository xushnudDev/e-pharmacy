import { firstValueFrom } from "rxjs";
import { CreatePaymentDto } from "./dtos";
import { PaymentClient } from "./payment.client";
import { UserClient } from "../user";
import { NotificationClient } from "../notification";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentClient: PaymentClient,
    private readonly userClient: UserClient,
    private readonly notificationClient: NotificationClient,
  ) {}

  async createPayment(data: CreatePaymentDto) {
    // 1. Balansdan yechish
    await firstValueFrom(
      this.userClient.decreaseBalance({ id: data.userId, amount: data.amount })
    );

    // 2. To'lovni yaratish
    const payment = await firstValueFrom(
      this.paymentClient.createPayment(data)
    );

    // 3. Notification yuborish
    await firstValueFrom(
      this.notificationClient.sendNotification({
        userId: data.userId,
        email: data.email,
        message: data.message,
        type: data.type,
        status: data.status,
      })
    );

    return {
      message: 'Payment created successfully',
      data: payment,
    };
  }
}