import { Module } from '@nestjs/common';
import { CategoryModule, OrderModule, UserModule, PillModule } from './services';
@Module({
  imports: [UserModule,CategoryModule,PillModule,OrderModule],
  
})
export class AppModule {}
