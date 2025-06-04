import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/user-service"),
    UserModule,
  ],
  
})
export class AppModule {}
