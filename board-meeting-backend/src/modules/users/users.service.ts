import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, In } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
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
  async findByEmails(emails: string[]) {
    return await this.usersRepository.find({
      where: {
        email: In(emails),
        deleted_at: IsNull(),
      },
    });
  }

  async findByPhoneNumbers(phoneNumbers: string[]) {
    return await this.usersRepository.find({
      where: {
        phone_number: In(phoneNumbers),
        deleted_at: IsNull(),
      },
    });
  } 
}