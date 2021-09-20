import { IsNotEmpty } from 'class-validator';

export class UpdateTodoDTO {
  @IsNotEmpty({ message: 'Campo obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'Campo obrigatório' })
  description: string;
}
