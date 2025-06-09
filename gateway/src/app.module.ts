import { Module } from '@nestjs/common';
import { CategoryModule, UserModule } from './services';
@Module({
  imports: [UserModule,CategoryModule],
  
})
export class AppModule {}
