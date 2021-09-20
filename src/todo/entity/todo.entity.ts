import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../interface/base/base-entity';

@Entity({ name: 'todos' }) // Definindo nome da tabela
export class Todo extends BaseEntity {
  @Column({ nullable: false }) // Não pode ser nulo
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false, default: false }) // Definindo valor padrão
  is_done: boolean;
}
