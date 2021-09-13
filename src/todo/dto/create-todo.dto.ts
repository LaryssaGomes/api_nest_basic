import { IsNotEmpty } from 'class-validator';
import { Todo } from '../entity/todo.entity';
import { DefaultResponseDTO } from './default-response.dto';

export class CreateTodoDTO {
  @IsNotEmpty({ message: 'Campo obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'Campo obrigatório' })
  description: string;
}

export class CreateTodoResponseDTO extends DefaultResponseDTO<Todo[]> {}
