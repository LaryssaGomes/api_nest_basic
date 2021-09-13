import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'todos' }) // Definindo nome da tabela
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: false }) // Não pode ser nulo
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false, default: false }) // Definindo valor padrão
  is_done: boolean;

  @CreateDateColumn({ nullable: false, name: 'created_at' })
  created_at: string;
}
