import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Appoints {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: true })
  datetime: Date;

  @Column({ type: 'varchar', length: 40, nullable: true })
  booked: string;
}

export interface Slot {
  id: number;
  datetime: string;
  booked: string;
}
export interface Slots {
  [key: string]: Appoints[];
}

export interface Schedule {
  id: number;
  week: string;
  slots: Slots;
}
