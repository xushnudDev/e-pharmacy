import { Module } from '@nestjs/common';
import {
  CategoryModule,
  OrderModule,
  UserModule,
  PillModule,
  NotificationModule,
  PaymentModule,
} from './services';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    UserModule,
    CategoryModule,
    PillModule,
    OrderModule,
    NotificationModule,
    PaymentModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
