import { Module } from '@nestjs/common';
import { UserClient } from './user.client';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserClient,UserService],
  controllers: [UserController],
})
export class UserModule {}
