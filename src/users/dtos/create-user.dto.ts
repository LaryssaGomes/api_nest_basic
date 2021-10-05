import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  Validator,
  Validate,
} from 'class-validator';
import { UserExists } from '../validadores/users.validadores';

//https://ondwn.com/en/blog-20190519/
export class CreateUserDto {
  @Validate(UserExists)
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório name' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @MinLength(7)
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  phoneNumber: string;
}

export default CreateUserDto;
