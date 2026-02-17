import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }
    const user = await this.usersService.create(createUserDto);
    return {
      id: user.id,
      email: user.email,    
      message : 'User registered successfully',
    };
    }

  async login(loginDto: LoginDto) {
  console.log('Login attempt with email:', loginDto.email);
  
  const user = await this.usersService.findByEmail(loginDto.email);
  console.log('User found:', user);

  if (!user) {
    throw new UnauthorizedException('Invalid email');
  }

  const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid Password');
  }

  const payload = { sub: user.id, email: user.email };
  const token = this.jwtService.sign(payload);

  return {
    access_token: token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
}
}