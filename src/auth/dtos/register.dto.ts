import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { UserExists } from 'src/users/validadores/users.validadores';

export class RegisterDto {
  @UserExists()
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

export default RegisterDto;
