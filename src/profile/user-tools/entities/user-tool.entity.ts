import { User } from 'src/auth/users/entities/user.entity';
import { Tool } from 'src/catalog/tools/entities/tool.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_tools')
export class UserTool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  tool_id: number;

  @ManyToOne(() => User, (user) => user.tools, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Tool, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tool_id' })
  tool: Tool;

  @Column({ length: 100, nullable: true })
  version: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
