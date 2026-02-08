import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, In } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hasedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hasedPassword,
    });
    return await this.usersRepository.save(user); 
  }

  async findAll() {
    return await this.usersRepository.find({
      where: { deleted_at: IsNull() }, 
    });
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne({
      where: { id, deleted_at: IsNull() },
    });
  }

  async update(id: string, updateUserDto: Partial<CreateUserDto>) {
    await this.usersRepository.update(id, updateUserDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (user) {
      user.softDelete();
      return await this.usersRepository.save(user);
    }
    return null;
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({
    where: { email, deleted_at: IsNull() },
    });
  }

  async findByPhoneNumber(phone_number: string) {
    return await this.usersRepository.findOne({
      where: {
        phone_number,
        deleted_at: IsNull(),
      },
    });
  } 
}