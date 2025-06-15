import { Module } from '@nestjs/common';
import { CategoryModule, OrderModule, UserModule, PillModule, NotificationModule, PaymentModule } from './services';
@Module({
  imports: [UserModule,CategoryModule,PillModule,OrderModule,NotificationModule,PaymentModule],
  
})
export class AppModule {}
