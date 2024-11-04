import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Stuff } from './stuff.entity';
import { User } from './user.entity';

@Entity()
export class Rental {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', nullable: true })
  datetime: Date;

  @ManyToOne(() => User, user => user.id)
  bookedBy: User;

  @Column({ type: 'varchar', nullable: false })
  userName: string;

  @ManyToMany(() => Stuff, stuff => stuff.rentals, { cascade: true })
  @JoinTable() // Указывает TypeORM создать промежуточную таблицу
  stuff: Stuff[];
}