import { BaseEntity } from 'src/shared/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'todos' }) // Definindo nome da tabela
export class Todo extends BaseEntity {
  @Column({ nullable: false }) // Não pode ser nulo
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false, default: false }) // Definindo valor padrão
  is_done: boolean;
}
