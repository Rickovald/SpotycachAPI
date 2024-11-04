import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AppointState {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;
}

