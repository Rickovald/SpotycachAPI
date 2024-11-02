import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StuffTypes } from './stuffTypes.entity';
import { Complects } from './complects.entity';
import { Rental } from './rental.entity';
import { Appoints } from './appoint.entity';

@Entity()
export class Stuff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'integer', nullable: false })
  price: number;

  @ManyToOne(() => Complects, (complect) => complect.id)
  complect: Complects;

  @ManyToOne(() => StuffTypes, (type) => type.id)
  type: StuffTypes;

  @ManyToMany(() => Rental, rental => rental.stuff)
  rentals: Rental[];

  @ManyToMany(() => Appoints, appoint => appoint.stuff)
  appoint: Appoints[];
}