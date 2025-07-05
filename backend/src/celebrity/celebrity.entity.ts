import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Celebrity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  location: string;

  @Column()
  bio: string;

  @Column({ nullable: true })
  image?: string;
}
