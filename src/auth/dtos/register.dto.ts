import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  Validate,
} from 'class-validator';
import User from 'src/users/entities/user.entity';
import { Unique } from 'typeorm';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @MinLength(7)
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  phoneNumber: string;
}
