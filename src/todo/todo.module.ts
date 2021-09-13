import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import configuration from './../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entity/todo.entity';

@Module({
  imports: [
    // Carregando e analisando .env
    // forRoot metodo de registro
    ConfigModule.forRoot({
      // load que faz o carregamento
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // ConfigService.get metodo que ler as variaveis
      useFactory: (configService: ConfigService) =>
        configService.get('mysqlOptions'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Todo]), // Monstrar com quais entitades eu quero usar
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
