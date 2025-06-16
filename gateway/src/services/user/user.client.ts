import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateUserDto, LoginUserDto, RegisterUserDto } from './dtos';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class UserClient {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'user_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  async onModuleInit() {
    await this.client.connect();
  }

  findAllUsers() {
    return this.client.send('get_all_users', '');
  }

  findUserById(data: { id: string }) {
    return this.client.send('get_user_by_id', data);
  }

  createUser(payload: CreateUserDto) {
    return this.client.send('create_user', payload);
  }

  updateUser(data: { id: string; payload: CreateUserDto }) {
    return this.client.send('update_user', data);
  };

  registerUser(payload: RegisterUserDto) {
    return this.client.send('register_user', payload);
  };

  loginUser(payload: LoginUserDto) {
    return this.client.send('login_user', payload);
  }

  decreaseBalance(data: { id: string; amount: number }): Observable<any> {
    return this.client.send('decrease_user_balance', data);
  }
  deleteUser(data: { id: string }) {
    return this.client.send('delete_user', data);
  }
}
