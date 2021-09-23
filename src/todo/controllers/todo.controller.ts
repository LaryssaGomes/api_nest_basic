import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Redirect,
} from '@nestjs/common';
import { MyDecoratorMeta } from 'src/config/metadata.decorator';
import { MyDecorator } from 'src/config/my.decorator';
import { IController } from 'src/shared/controller.interface';
import { CreateTodoDTO, CreateTodoResponseDTO } from '../dtos/create-todo.dto';
import { UpdateTodoDTO } from '../dtos/update-todo.dto';
import { Todo } from '../entities/todo.entity';
import { TodoNotFoundException } from '../exceptions/todoNotFund.exception';

import { TodoService } from '../services/todo.service';

@Controller('todo')
export class TodoController implements IController<Todo> {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async add(@Body() todo: CreateTodoDTO): Promise<Todo> {
    return await this.todoService.create(todo);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    return await this.todoService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Todo[]> {
    return await this.todoService.findAll();
  }

  @Delete(':id')
  async remove(id: string) {
    return this.todoService.remove(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTodoDTO,
  ): Promise<Todo> {
    await this.todoService.findOne(id);
    return await this.todoService.update(id, dto);
  }

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
}
