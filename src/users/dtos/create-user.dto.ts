import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  Matches,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
  Validate,
} from 'class-validator';

//https://ichi.pro/pt/nest-js-e-o-tubo-de-validacao-personalizado-38556743344192
//https://ondwn.com/en/blog-20190519/
export class CreateUserDto {
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
