import { Injectable } from '@nestjs/common';
import { UserClient } from './user.client';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(private readonly userClient: UserClient) {}

  async findAllUsers() {
    return await this.userClient.findAllUsers();
  };

  async findUserById(data: {id: string}) {
    return await this.userClient.findUserById(data);
  };

  async createUser(payload: CreateUserDto) {
    return await this.userClient.createUser(payload);
  };

  async updateUser(data: {id: string, payload: UpdateUserDto}) {
    return await this.userClient.updateUser(data);
  };

  async deleteUser(data: {id: string}) {
    return await this.userClient.deleteUser(data);
  }
}
