import { Module } from '@nestjs/common';
import { CategoryModule, UserModule } from './services';
import { PillModule } from './services/pill/pill.module';
@Module({
  imports: [UserModule,CategoryModule,PillModule],
  
})
export class AppModule {}
