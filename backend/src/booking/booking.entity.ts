import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Fan } from '../fan/fan.entity';
import { Celebrity } from '../celebrity/celebrity.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Fan, { eager: true })
  fan: Fan;

  @ManyToOne(() => Celebrity, { eager: true })
  celebrity: Celebrity;

  @Column()
  date: string;

  @Column()
  message: string;
}
