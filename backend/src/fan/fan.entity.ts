import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Celebrity } from '../celebrity/celebrity.entity';

@Entity()
export class Fan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @ManyToMany(() => Celebrity)
  @JoinTable()
  following: Celebrity[];
}
