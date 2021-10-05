import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../repository/user.repository';

@ValidatorConstraint({ name: 'userName', async: true })
@Injectable()
export class UserExists implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(email: string, arg: ValidationArguments) {
    try {
      await this.userRepository.findOneEmail(email);
    } catch (e) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `User doesn't exist!`;
  }
}
