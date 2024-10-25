import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stuff {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'integer', nullable: false })
  price: number;

  @Column({ type: 'integer', nullable: true })
  complect: number;

  @Column({ type: 'integer', nullable: false })
  type: number;
}