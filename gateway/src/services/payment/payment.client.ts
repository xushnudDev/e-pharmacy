import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreatePaymentDto } from './dtos';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentClient {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'payment_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  };
   createPayment(data: CreatePaymentDto): Observable<any>  {
    return this.client.send('create-payment', data);
  }
}
