import { Module } from '@nestjs/common';
import { UserModule } from './services';
@Module({
  imports: [UserModule],
  
})
export class AppModule {}
