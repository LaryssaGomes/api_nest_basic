import { NotFoundException, HttpStatus } from '@nestjs/common';

export class TodoNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Task com o id ${id} não foi encontrado`);
  }
}
