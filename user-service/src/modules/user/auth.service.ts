import { InjectModel } from '@nestjs/mongoose';
import { User } from './models';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dtos/register-user.dto';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(payload: RegisterUserDto) {
  const existing = await this.userModel.findOne({ email: payload.email });
  if (existing) throw new ConflictException('User already exists');

  const hashedPassword = await hash(payload.password, 10);

  const user = await this.userModel.create({
    ...payload,
    password: hashedPassword,
  });

  const accessToken = this.jwtService.sign(
    { id: user._id, role: user.role },
    {secret: process.env.JWT_SECRET, expiresIn: '1d' }
  );

  return {
    message: 'User registered successfully',
    data: user,
    accessToken,
  };
}

async login(payload: LoginUserDto) {
  const user = await this.userModel.findOne({
    email: new RegExp(`^${payload.email}$`, 'i'),
  });

  if (!user) throw new ConflictException('User does not exist');
  const isMatch = await compare(payload.password, user.password);

  if (!isMatch) throw new UnauthorizedException('Invalid credentials');

  const token = this.jwtService.sign(
    { id: user._id, role: user.role },
    { secret: process.env.JWT_SECRET,expiresIn: '1d' }
  );

  return {
    message: 'User logged in successfully',
    token,
    data: user,
  };
}

}
