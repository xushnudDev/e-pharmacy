import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserClient } from './user.client';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { PillClient } from '../pill';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    private readonly userClient: UserClient,
    private readonly pillClient: PillClient,
  ) {}

  async findAllUsers() {
    return await this.userClient.findAllUsers();
  }

  async findUserById(data: { id: string }) {
    return await this.userClient.findUserById(data);
  }

  async getPillsByUser() {
  try {
    const users = await lastValueFrom(this.userClient.findAllUsers());

    const result = await Promise.all(users.data.map(async (c) => {
      try {
        const userId = c._id?.toString();
        if (!userId) throw new Error("userId is undefined");

        const pills = await lastValueFrom(this.pillClient.getPillsByUser(userId));
        return {
          ...c,
          pills: pills?.data || [],
        };
      } catch (err) {
        console.error(`Error in User ID ${c._id}:`, err.message);
        return {
          ...c,
          pills: [],
        };
      }
    }));

    return { data: result };
  } catch (e) {
    console.error("Error occured", e.message);
    throw new InternalServerErrorException('Error in getting pills by user:');
  }
}



  async createUser(payload: CreateUserDto) {
    return await this.userClient.createUser(payload);
  }

  async updateUser(data: { id: string; payload: UpdateUserDto }) {
    return await this.userClient.updateUser(data);
  }

  async deleteUser(data: { id: string }) {
    return await this.userClient.deleteUser(data);
  }
}
