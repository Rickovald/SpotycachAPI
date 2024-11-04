import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Stuff } from './stuff.entity';

@Entity()
export class StuffTypes {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @OneToMany(() => Stuff, stuff => stuff.type)
  stuff: Stuff[];
}