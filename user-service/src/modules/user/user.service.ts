import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll() {
    const users = await this.userModel.find();
    return {
      message: 'Users fetched successfully',
      count: users.length,
      data: users,
    };
  }

  async findOneById(id: string) {
    const user = await this.userModel.findById(id);

    return {
      message: 'User fetched successfully',
      data: user,
    };
  }

  async create(payload: CreateUserDto) {
    const foundedUser = await this.userModel.findOne({ email: payload.email });

    if (foundedUser) throw new ConflictException('User already exists');

    const newUser = await this.userModel.create({
      firstname: payload.firstname,
      lastname: payload.lastname,
      email: payload.email,
      password: payload.password,
      phone: payload.phone,
      // role: payload.role,
    });

    return {
      message: 'User created successfully',
      data: newUser,
    };
  }

  async update(id: string, payload: UpdateUserDto) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found');

    const updateUser = await this.userModel.findByIdAndUpdate(id, payload, {
      new: true,
    });

    return {
      message: 'User updated successfully',
      data: updateUser,
    };
  };

  async delete(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found');

    await this.userModel.findByIdAndDelete(id);
    return {
      message: 'User deleted successfully',
    };
  }
}
