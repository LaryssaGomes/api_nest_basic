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
import { CreateTodoDTO, CreateTodoResponseDTO } from '../dto/create-todo.dto';
import { UpdateTodoDTO } from '../dto/update-todo.dto';
import { Todo } from '../entity/todo.entity';
import { TodoNotFoundException } from '../exception/todoNotFund.exception';
import { IController } from '../interface/controller.interface';
import { TodoService } from '../service/todo.service';

@Controller('todo')
export class TodoController implements IController<Todo> {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async add(@Body() todo: CreateTodoDTO): Promise<Todo> {
    return await this.todoService.create(todo);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    const todo = await this.todoService.findOne(id);
    if (!todo) throw new TodoNotFoundException(id);
    return todo;
  }

  @Get()
  async findAll(): Promise<Todo[]> {
    return await this.todoService.findAll();
  }

  @Delete(':id')
  async remove(id: string) {
    throw new Error('Method not implemented.');
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTodoDTO,
  ): Promise<Todo> {
    const todoOne = await this.todoService.findOne(id);
    if (!todoOne) throw new TodoNotFoundException(id);

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
