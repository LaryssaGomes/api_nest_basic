import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { MyDecoratorMeta } from 'src/config/metadata.decorator';
import { MyDecorator } from 'src/config/my.decorator';
import { CreateTodoDTO, CreateTodoResponseDTO } from './dto/create-todo.dto';
import { TodoService } from './todo.service';

@Controller({ host: 'admin.example.com' })
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @MyDecoratorMeta()
  async index(@MyDecorator() ip: string): Promise<CreateTodoResponseDTO> {
    console.log(ip);
    try {
      return {
        status: 'success',
        code: HttpStatus.OK,
        errors: null,
        result: await this.todoService.findAll(),
      };
    } catch (err) {
      return {
        status: 'error',
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        errors: err.errors,
        result: [],
      };
    }
  }

  @Get(':id')
  //@Redirect('https://docs.nestjs.com', 302)
  async find(@Param('id') id: string) {
    /*if (id === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
    */
    return await this.todoService.findOne(id);
  }

  @Post()
  async create(@Body() todo: CreateTodoDTO) {
    return await this.todoService.create(todo);
  }
}
