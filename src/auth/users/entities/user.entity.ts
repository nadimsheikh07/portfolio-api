import { Education } from 'src/profile/educations/entities/education.entity';
import { Experience } from 'src/profile/experiences/entities/experience.entity';
import { UserTechnology } from 'src/profile/user-technologies/entities/user-technology.entity';
import { UserTool } from 'src/profile/user-tools/entities/user-tool.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
  CUSTOMER = 'customer',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, length: 15 })
  mobile: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.CUSTOMER,
  })
  userType: UserType;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Education, (education) => education.user)
  educations: Education[];

  @OneToMany(() => Experience, (experience) => experience.user)
  experiences: Experience[];

  @OneToMany(() => UserTechnology, (userTechnology) => userTechnology.user)
  technologies: UserTechnology[];

  @OneToMany(() => UserTool, (userTool) => userTool.user)
  tools: UserTool[];
}
