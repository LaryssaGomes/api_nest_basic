import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../repository/user.repository';

@ValidatorConstraint({ name: 'userName', async: true })
@Injectable()
export class UserExists implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async validate(email: string) {
    try {
      await this.userRepository.getOneOrFail(email);
      return false;
    } catch (e) {
      return true;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `User doesn't exist`;
  }
}
