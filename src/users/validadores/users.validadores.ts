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
      const user = await this.userRepository.getOneOrFail(email);
      console.log(user.name);
      return false;
    } catch (e) {
      return true;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Usuario com esse email já existe`;
  }
}
