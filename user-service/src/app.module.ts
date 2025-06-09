import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/user-service"),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
  ],
  
})
export class AppModule {}
