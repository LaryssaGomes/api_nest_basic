import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import CreateUserDto from '../dtos/create-user.dto';
import User from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  getOneOrFail(email: string) {
    return this.findOne({ email });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.create(createUserDto);
    try {
      this.save(newUser);
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException('Error ao cadastrar usuário.');
    }
  }
  async findOneUser(id: string): Promise<User> {
    return this.findOne({ id });
  }

  async findOneEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }
}
