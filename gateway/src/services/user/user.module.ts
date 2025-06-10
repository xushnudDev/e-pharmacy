import { Module } from '@nestjs/common';
import { UserClient } from './user.client';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PillClient } from '../pill';

@Module({
  providers: [UserClient,UserService,PillClient],
  controllers: [UserController],
})
export class UserModule {}
