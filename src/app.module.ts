import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Secured } from './config/Secured';
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config';

@Module({
  imports: [
    TodoModule,
    UsersModule,
    ConfigModule.forRoot({
      // load que faz o carregamento
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // ConfigService.get metodo que ler as variaveis
      useFactory: (configService: ConfigService) =>
        configService.get('bankOptions'),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: Secured,
    },
  ],
})
export class AppModule {}
