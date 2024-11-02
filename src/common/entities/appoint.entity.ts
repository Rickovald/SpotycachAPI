import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Stuff } from './stuff.entity';

@Entity()
export class Appoints {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', nullable: true })
  datetime: Date;

  @ManyToOne(() => User, user => user.id)
  bookedBy: User;

  @Column({ type: 'integer', nullable: true })
  room: number;

  @ManyToMany(() => Stuff, stuff => stuff.rentals, { cascade: true })
  @JoinTable() // Указывает TypeORM создать промежуточную таблицу
  stuff: Stuff[];
}

export interface Slot {
  id: number;
  datetime: string;
  booked: string;
  room: number;
}
export interface Slots {
  [key: string]: Appoints[];
}

export interface Schedule {
  id: number;
  week: string;
  slots: Slots;
}
