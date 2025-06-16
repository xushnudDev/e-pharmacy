import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { hash } from 'bcryptjs';

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

    const hashedPassword = await hash(payload.password, 10);

    const newUser = await this.userModel.create({
      ...payload,
      password: hashedPassword,
    });

    return {
      message: 'User created successfully',
      data: newUser,
    };
  }
  async decreaseBalance( userId: string, amount: number) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');    

    if (user.balance < amount)
      throw new ConflictException('Insufficient balance');

    user.balance -= amount;
    await user.save();
    return {
      message: 'Balance updated successfully',
      balance: user.balance,
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
  }

  async delete(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found');

    await this.userModel.findByIdAndDelete(id);
    return {
      message: 'User deleted successfully',
    };
  }
}
