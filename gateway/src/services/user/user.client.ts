import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateUserDto } from './dtos';

@Injectable()
export class UserClient {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    });
  };

  async onModuleInit() {
    await this.client.connect();
  };

  findAllUsers() {
    return this.client.send('get_all_users', '');
  };

  findUserById(data: {id: string}) {
    return this.client.send('get_user_by_id', data);
  };

  createUser(payload: CreateUserDto) {
    return this.client.send('create_user', payload);
  };

  updateUser(data:{id: string, payload: CreateUserDto}) {
    return this.client.send('update_user', data);
  };

  deleteUser(data: {id: string}) {
    return this.client.send('delete_user', data);
  };
}
