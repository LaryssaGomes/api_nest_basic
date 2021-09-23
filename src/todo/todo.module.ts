import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';
import configuration from './../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';

@Module({
  imports: [
    // Carregando e analisando .env
    // forRoot metodo de registro
    TypeOrmModule.forFeature([Todo]), // Monstrar com quais entitades eu quero usar
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
