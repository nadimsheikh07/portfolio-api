import { User } from 'src/auth/users/entities/user.entity';
import { Technology } from 'src/catalog/technologies/entities/technology.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_technologies')
export class UserTechnology {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  technology_id: number;

  @ManyToOne(() => User, (user) => user.technologies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Technology, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'technology_id' })
  technology: Technology;

  @Column({ length: 100, nullable: true })
  version: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
