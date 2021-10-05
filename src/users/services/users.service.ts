import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dtos/register.dto';

import { Repository } from 'typeorm';
import CreateUserDto from '../dtos/create-user.dto';

import User from '../entities/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository,
  ) {}

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userData: CreateUserDto) {
    return await this.userRepository.createUser(userData);
  }

  async getById(id: string) {
    const user = await this.userRepository.findOneUser({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
  async findOne(email) {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  async findEmail(email: string) {
    console.log('findEmail');
    const user = await this.userRepository.findOne({ email });
    return user;
  }
  async lista(): Promise<RegisterDto[]> {
    return await this.userRepository.find();
  }
}
