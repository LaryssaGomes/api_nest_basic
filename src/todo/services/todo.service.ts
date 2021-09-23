import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDTO } from '../dtos/create-todo.dto';
import { UpdateTodoDTO } from '../dtos/update-todo.dto';
import { Todo } from '../entities/todo.entity';
import { TodoNotFoundException } from '../exceptions/todoNotFund.exception';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) throw new TodoNotFoundException(id);
    return todo;
  }

  async create(todo: CreateTodoDTO): Promise<Todo> {
    return await this.todoRepository.save(todo);
  }

  async update(id: string, dto: UpdateTodoDTO): Promise<Todo> {
    await this.todoRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const cc = await this.findOne(id);
    return this.todoRepository.delete(cc);
  }
}
