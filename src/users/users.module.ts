import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UserRepository } from './repository/user.repository';
import { UsersService } from './services/users.service';
import { UserExists } from './validadores/users.validadores';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController],
  providers: [UserExists, UsersService],
  exports: [UserExists, UsersService],
})
export class UsersModule {}
