import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { PROTECTED_KEY } from 'src/decorator';


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isProtected = this.reflector.get<boolean>(PROTECTED_KEY, context.getHandler());
    if (isProtected === false) return true;

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token not found');
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET not set in .env');

    try {
      const decoded = jwt.verify(token, secret);      
      request.user = decoded; 
      return true;
    } catch (err) {
      console.error('JWT verify error:', err.message); 
      throw new UnauthorizedException('Invalid token');
    }
  }
}
