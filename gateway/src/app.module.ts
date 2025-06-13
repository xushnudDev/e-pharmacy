import { Module } from '@nestjs/common';
import { CategoryModule, OrderModule, UserModule, PillModule, NotificationModule } from './services';
@Module({
  imports: [UserModule,CategoryModule,PillModule,OrderModule,NotificationModule],
  
})
export class AppModule {}
